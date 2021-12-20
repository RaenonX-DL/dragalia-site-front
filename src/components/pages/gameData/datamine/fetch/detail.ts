import {UpdatedIndex} from '../../../../../api-def/resources';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {useFetchState} from '../../../../elements/common/fetch';
import {useDatamineCatalog} from './catalog';


type UseDatamineDetailReturn = {
  datamineDetail: UpdatedIndex | null,
};

export const useDatamineDetail = (versionCode: string): UseDatamineDetailReturn => {
  const {getFileName} = useDatamineCatalog();

  const fileName = getFileName(versionCode);

  const {
    fetchStatus: datamineDetail,
    fetchFunction: fetchDatamineDetail,
  } = useFetchState<UpdatedIndex | null>(
    null,
    () => fileName ? ResourceLoader.getDatamineIndexDetail(fileName) : Promise.resolve(null),
    'Failed to fetch datamine index detail.',
  );

  if (!fileName) {
    return {datamineDetail: null};
  } else {
    fetchDatamineDetail();
  }

  return {datamineDetail: datamineDetail.data};
};
