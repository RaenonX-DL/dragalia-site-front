import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DataPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makeDataUrl} from '../../../../../utils/path/make';
import {ResourceLoader} from '../../../../../utils/services/resources/loader';
import {sortDescending} from '../../../../../utils/sort';
import {TimeAgo} from '../../../../../utils/timeago';
import {AdsPageTop, AdsToolBottom} from '../../../../elements/common/ads/main';
import {SlicedEntryBar} from '../../../../elements/common/entryBar';
import {useFetchState} from '../../../../elements/common/fetch';
import {InternalLink} from '../../../../elements/common/link/internal';


const renderCount = 20;

export const DatamineCatalog = () => {
  const {lang} = useI18n();

  const [resultCount, setResultCount] = React.useState(20);

  const {
    fetchStatus: catalog,
    fetchFunction: fetchCatalog,
  } = useFetchState(
    [],
    () => ResourceLoader.getDatamineIndexCatalog(),
    'Failed to fetch datamine index catalog.',
  );

  fetchCatalog();

  const catalogEntries = catalog.data
    .map((entry) => ({timestampEpoch: new Date(entry.timestampIso).getTime(), ...entry}))
    .sort(sortDescending({getComparer: (element) => new Date(element.timestampEpoch).getTime()}));

  return (
    <>
      <AdsPageTop/>
      <Row>
        {catalogEntries.slice(0, resultCount).map(({timestampEpoch, versionCode}, idx) => (
          <Col key={idx} md={6} className="mb-3 px-2">
            <Card className="section p-0">
              <Card.Body>
                <Card.Title>
                  <InternalLink
                    content={versionCode}
                    locale={lang}
                    href={makeDataUrl(DataPath.GAME_DATAMINE_DETAIL, {id: versionCode, lang})}
                  />
                </Card.Title>
                <Card.Text className="float-right">
                  <TimeAgo epoch={timestampEpoch}/>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <SlicedEntryBar
          resultCount={resultCount}
          setResultCount={setResultCount}
          renderCount={renderCount}
          maxCount={catalogEntries.length}
        />
      </Row>
      <AdsToolBottom/>
    </>
  );
};
