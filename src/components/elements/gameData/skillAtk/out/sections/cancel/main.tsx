import React from 'react';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import {CancelUnit} from '../../../../../../../api-def/resources';
import {useI18n} from '../../../../../../../i18n/hook';
import {reverseEnumTransLookup} from '../../../../../../../utils/services/resources/utils';
import {SectionAnimationProps} from '../animation';


type Props = Pick<SectionAnimationProps, 'skillEnums' | 'conditionEnumMap'> & {
  cancelUnits: Array<CancelUnit>,
}

export const CancelAction = ({cancelUnits, skillEnums, conditionEnumMap}: Props) => {
  const {t, lang} = useI18n();

  const [show, setShow] = React.useState(false);

  const isAnyCancelHasPreconditions = cancelUnits.some((cancelUnit) => !!cancelUnit.conditions.length);
  const earliest = Math.min(...cancelUnits.map((cancelUnit) => cancelUnit.time));
  const isAvailable = earliest !== Infinity;

  return (
    <>
      <Button
        variant="outline-light" size="sm"
        onClick={() => setShow(!show)} disabled={!isAvailable}
      >
        <i className="bi bi-arrows-collapse"/>&nbsp;
        {t((t) => t.game.skillAtk.animation.cancelInfo)}&nbsp;-&nbsp;
        {
          isAvailable ?
            t((t) => t.game.skillAtk.animation.earliest, {time: earliest.toFixed(2)}) :
            t((t) => t.game.skillAtk.animation.earliestUnavailable)
        }
      </Button>
      <Collapse in={show}>
        <div className="mt-2">
          <table>
            <thead>
              <tr>
                <th>{t((t) => t.game.skillAtk.animation.cancelHeader.action)}</th>
                <th>{t((t) => t.game.skillAtk.animation.cancelHeader.time)}</th>
                {
                  isAnyCancelHasPreconditions &&
                  <th>{t((t) => t.game.skillAtk.animation.cancelHeader.preConditions)}</th>
                }
              </tr>
            </thead>
            <tbody>
              {
                cancelUnits.map((cancelUnit, idx) => (
                  <tr key={idx}>
                    <td>{
                      reverseEnumTransLookup(
                        skillEnums.cancel,
                        cancelUnit.action,
                        lang,
                        cancelUnit.action.toString(),
                      )
                    }</td>
                    <td>{cancelUnit.time.toFixed(2)}</td>
                    {
                      isAnyCancelHasPreconditions &&
                      <td>{
                        cancelUnit.conditions
                          .map((conditionCode) => conditionEnumMap[String(conditionCode)].trans[lang])
                          .join(' & ')
                      }</td>
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </Collapse>
    </>
  );
};
