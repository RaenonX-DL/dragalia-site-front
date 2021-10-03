import React from 'react';


import {Dimension, DimensionKey} from '../../../../api-def/api';
import {UnitPath} from '../../../../const/path/definitions';
import {AppReactContext} from '../../../../context/app/main';
import {useI18n} from '../../../../i18n/hook';
import {overrideObject} from '../../../../utils/override';
import {makeUnitUrl} from '../../../../utils/path/make';
import {processText} from '../../../../utils/process/text';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {Loading} from '../../../elements/common/loading';
import {AjaxForm} from '../../../elements/form/ajax/main';
import {useUnitId} from '../../../elements/gameData/hook';
import {AutoComplete} from '../../../elements/input/autoComplete/main';
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

  if (!unitId) {
    return <></>;
  }

  const {
    unitTierNote,
    setUnitTierNote,
    keyPointEntries,
    keyPointLookup,
    isFetchingResources,
  } = useTierNoteEditResources(unitId);

  if (isFetchingResources) {
    return <Loading/>;
  }

  const unitInfo = unitInfoMap.get(unitId);
  if (!unitInfo) {
    return <></>;
  }

  return (
    <ProtectedLayout>
      <AjaxForm
        unloadDependencies={[unitTierNote]}
        submitPromise={async () => {
          const tierNoteToSend = {
            ...unitTierNote,
            tier: Object.fromEntries(
              await Promise.all(Object.entries(unitTierNote.tier)
                .filter(([_, value]) => !value.toDelete)
                .map(async ([key, value]) => {
                  const {toDelete, ...processed} = value;

                  processed.note = await processText({lang, text: processed.note});

                  return [key, processed];
                })),
            ),
          };

          return ApiRequestSender.updateUnitTierNote(uid, lang, unitId, tierNoteToSend);
        }}
        formControl={{
          variant: 'outline-light',
          submitText: t((t) => t.misc.update),
        }}
        getRedirectUrlOnSuccess={() => makeUnitUrl(UnitPath.UNIT_TIER, {id: unitId, lang})}
      >
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
      </AjaxForm>
    </ProtectedLayout>
  );
};
