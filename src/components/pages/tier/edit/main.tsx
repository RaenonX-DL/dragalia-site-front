import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {ApiResponseCode, Dimension, DimensionKey} from '../../../../api-def/api';
import {GeneralPath} from '../../../../const/path/definitions';
import {AppReactContext} from '../../../../context/app/main';
import {useI18n} from '../../../../i18n/hook';
import {overrideObject} from '../../../../utils/override';
import {makeGeneralUrl} from '../../../../utils/path/make';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {ModalFlexContent} from '../../../elements/common/modal/flex';
import {ModalStateFlex} from '../../../elements/common/modal/types';
import {useUnitId} from '../../../elements/gameData/hook';
import {AutoComplete} from '../../../elements/input/autoComplete';
import {ProtectedLayout} from '../../layout/protected';
import styles from '../main.module.css';
import {TierNoteDimensionEntry} from './dimension';
import {useTierNoteEditResources} from './hook';
import {PointTypeIcon} from './icon';
import {TierNoteUnitOverview} from './unit';


export const TierNoteEdit = () => {
  const {t, lang} = useI18n();
  const uid = React.useContext(AppReactContext)?.session?.user.id.toString() || '';

  const unitId = useUnitId();
  const {unitInfoMap} = useUnitInfo();

  const [modal, setModal] = React.useState<ModalStateFlex>({
    show: false,
    title: '',
    message: '',
  });

  if (!unitId) {
    return <></>;
  }

  const {
    unitTierNote,
    setUnitTierNote,
    keyPointEntries,
    keyPointLookup,
  } = useTierNoteEditResources(unitId);

  const unitInfo = unitInfoMap.get(unitId);
  if (!unitInfo) {
    return <></>;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Remove tier note marked to be deleted in payload before send
    const tierNoteToSend = {
      ...unitTierNote,
      tier: Object.fromEntries(
        Object.entries(unitTierNote.tier)
          .filter(([_, value]) => !value.toDelete)
          .map(([key, value]) => {
            const {toDelete, ...processed} = value;

            return [key, processed];
          }),
      ),
    };

    ApiRequestSender.updateUnitTierNote(uid, lang, unitId, tierNoteToSend)
      .then((response) => {
        if (!response.success) {
          setModal({...modal, message: ApiResponseCode[response.code]});
          return;
        }

        window.location.assign(makeGeneralUrl(GeneralPath.TIER, {lang}));
      })
      .catch((e) => {
        console.error(e);
        setModal({...modal, message: e.message});
      });
  };

  return (
    <ProtectedLayout>
      <ModalFlexContent state={modal} setState={setModal}/>
      <form onSubmit={onSubmit}>
        <TierNoteUnitOverview unitInfo={unitInfo}/>
        <hr/>
        <h4>{t((t) => t.game.unitTier.tier.title)}</h4>
        {Object.keys(Dimension).map((dimension) => (
          <TierNoteDimensionEntry
            key={dimension}
            dimension={dimension as DimensionKey}
            inputData={unitTierNote.tier[dimension as DimensionKey]}
            setInputData={(updatedNote) => {
              setUnitTierNote(overrideObject(
                unitTierNote,
                {tier: {[dimension]: updatedNote}},
              ));
            }}
          />
        ))}
        <hr/>
        <h4>{t((t) => t.game.unitTier.points.title)}</h4>
        <AutoComplete
          options={keyPointEntries}
          getText={(option) => option.description}
          getValue={(option) => option.id}
          isOptionSelected={(option) => unitTierNote.points.includes(option.id)}
          payload={unitTierNote}
          minLength={0}
          getArray={(payload) => payload.points}
          setArray={(points: Array<string>) => setUnitTierNote(overrideObject(unitTierNote, {points}))}
          renderOption={(option) => (
            <div className={styles.pointEntry}>
              <PointTypeIcon type={option.type}/>
              {option.description}
            </div>
          )}
          renderEntries={(pointId) => {
            const entry = keyPointLookup[pointId];

            if (!entry) {
              return <>{`PID: ${pointId}`}</>;
            }

            return (
              <div className={styles.pointEntry}>
                <PointTypeIcon type={entry.type}/>
                <span>{keyPointLookup[pointId].description}</span>
              </div>
            );
          }}
        />
        <hr/>
        <Row noGutters className="text-right">
          <Col>
            <Button type="submit" variant="outline-light" className="ml-2">
              {t((t) => t.misc.update)}
            </Button>
          </Col>
        </Row>
      </form>
    </ProtectedLayout>
  );
};
