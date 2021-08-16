import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../i18n/hook';
import {overrideObject} from '../../../../utils/override';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {useFetchStateProcessed} from '../../../elements/common/fetch';
import {Loading} from '../../../elements/common/loading';
import {useUnitId} from '../../../elements/gameData/hook';
import {Dimension, DimensionKey, getUnitTierDataEdit, UnitTierNoteEdit, UnitTierNoteEditResponse} from '../mock';
import {TierNoteDimensionEntry} from './dimension';
import {TierNoteUnitOverview} from './unit';


export const TierNoteEdit = () => {
  const {t} = useI18n();
  const unitId = useUnitId();
  const {unitInfoMap} = useUnitInfo();
  const {
    fetchStatus: unitTierNote,
    fetchFunction: fetchUnitTierNote,
    setFetchStatus: setUnitTierNote,
  } = useFetchStateProcessed<UnitTierNoteEdit, UnitTierNoteEditResponse>(
    {tier: {}},
    getUnitTierDataEdit,
    'Failed to fetch unit tier note for update.',
    (response) => response.data,
  );

  if (!unitId) {
    return <></>;
  }

  const unitInfo = unitInfoMap.get(unitId);
  if (!unitInfo) {
    return <></>;
  }

  fetchUnitTierNote();

  if (!unitTierNote.fetched) {
    return <Loading/>;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit');
  };

  // each dimensions and note, reference with auto-complete
  return (
    <form onSubmit={onSubmit}>
      <TierNoteUnitOverview unitInfo={unitInfo}/>
      <hr/>
      <h4>{t((t) => t.game.unitTier.tier.title)}</h4>
      {Object.keys(Dimension).map((dimension) => (
        <TierNoteDimensionEntry
          key={dimension}
          dimension={dimension as DimensionKey}
          inputData={unitTierNote.data.tier[dimension as DimensionKey]}
          setInputData={(updatedNote) => {
            setUnitTierNote(overrideObject(
              unitTierNote,
              {data: {tier: {[dimension]: updatedNote}}},
            ));
          }}
        />
      ))}
      <Row className="text-right">
        <Col>
          <Button type="submit" variant="outline-light" className="ml-2">
            {t((t) => t.misc.update)}
          </Button>
        </Col>
      </Row>
    </form>
  );
};
