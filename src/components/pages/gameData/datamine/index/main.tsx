import React from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DataPath} from '../../../../../const/path/definitions';
import {useI18n} from '../../../../../i18n/hook';
import {makeDataUrl} from '../../../../../utils/path/make';
import {sortDescending} from '../../../../../utils/sort';
import {TimeAgo} from '../../../../../utils/timeago';
import {AdsPageTop, AdsToolBottom} from '../../../../elements/common/ads/main';
import {SlicedEntryBar} from '../../../../elements/common/entryBar';
import {RowRegular} from '../../../../elements/common/grid/row';
import {InternalLink} from '../../../../elements/common/link/internal';
import {useDatamineCatalog} from '../fetch/catalog';


const renderCount = 20;

export const DatamineCatalog = () => {
  const {lang} = useI18n();

  const [resultCount, setResultCount] = React.useState(20);

  const {catalog} = useDatamineCatalog();

  const catalogEntries = catalog
    .map((entry) => ({timestampEpoch: new Date(entry.timestampIso).getTime(), ...entry}))
    .sort(sortDescending({getComparer: (element) => new Date(element.timestampEpoch).getTime()}));

  return (
    <>
      <AdsPageTop/>
      <RowRegular className="mb-3">
        {catalogEntries.slice(0, resultCount).map(({timestampEpoch, versionCode}, idx) => (
          <Col key={idx} md={6}>
            <Card className="section p-0">
              <Card.Body>
                <Card.Title>
                  <InternalLink
                    content={versionCode}
                    locale={lang}
                    href={makeDataUrl(DataPath.GAME_DATAMINE_DETAIL, {id: versionCode, lang})}
                  />
                </Card.Title>
                <Card.Text className="float-end">
                  <TimeAgo epoch={timestampEpoch}/>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </RowRegular>
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
