import {UpdatedIndexCatalog} from '../../../../../api-def/resources';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../../elements/common/fetch';


type UseDatamineCatalogReturn = {
  catalog: UpdatedIndexCatalog,
  getFileName: (versionCode: string) => string | undefined,
};

export const useDatamineCatalog = (): UseDatamineCatalogReturn => {
  const {
    fetchStatus: catalog,
    fetchFunction: fetchCatalog,
  } = useFetchState(
    [],
    () => ResourceLoader.getDatamineIndexCatalog(),
    'Failed to fetch datamine index catalog.',
  );

  const getFileName = (versionCode: string) => (
    catalog.data.find((entry) => entry.versionCode === versionCode)?.fileName
  );

  fetchCatalog();

  return {catalog: catalog.data, getFileName};
};
