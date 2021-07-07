import React from 'react';

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import {DepotPaths} from '../../../../../../../api-def/resources';
import {useI18n} from '../../../../../../../i18n/hook';
import {ImageWithOverlay} from '../../../../../common/image';
import {EnumDataPack} from '../../props';
import {SectionSpInfoProps} from './main';


type CellProps = Pick<EnumDataPack, 'statusEnums'> & {
  data: { [StatusCode in number]: number }
}

export const AfflictionDataCell = ({data, statusEnums}: CellProps) => {
  const {lang} = useI18n();

  return (
    <>
      {Object.entries(data).map(([code, efficiency], idx) => {
        const efficiencyStr = efficiency.toFixed(2);

        const affliction = statusEnums.status.find((entry) => entry.code === +code);
        if (!affliction) {
          return <p key={idx}>(Unknown affliction: {code}): {efficiencyStr}</p>;
        }

        const afflictionName = affliction.trans[lang];
        if (!affliction.imagePath) {
          return <p key={idx}>{afflictionName}: {efficiencyStr}</p>;
        }

        return (
          <p key={idx}>
            <ImageWithOverlay
              text={afflictionName}
              src={DepotPaths.getImageURL(affliction.imagePath)}
              style={{width: '1rem'}}
            />&nbsp;
            {afflictionName}: {efficiencyStr}
          </p>
        );
      })}
    </>
  );
};

export const SpEfficiencyTable = ({calculatedData, statusEnums}: SectionSpInfoProps) => {
  const {t} = useI18n();

  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button variant="outline-light" size="sm" className="mt-2" onClick={() => setShow(!show)}>
        <i className="bi bi-arrows-collapse"/>&nbsp;
        {t((t) => t.game.skillAtk.spInfo.efficiencyIndexes)}
      </Button>
      <Collapse in={show}>
        <div className="mt-2">
          <table>
            <tbody>
              <tr>
                <td>{t((t) => t.game.skillAtk.spInfo.efficiency.modPctPer1KSp)}</td>
                <td>{calculatedData.efficiency.modPctPer1KSp.toFixed(2)}%</td>
              </tr>
              {
                calculatedData.skillEntry.skill.sharable &&
                <tr>
                  <td>{t((t) => t.game.skillAtk.spInfo.efficiency.modPctPer1KSsp)}</td>
                  <td>{calculatedData.efficiency.modPctPer1KSsp.toFixed(2)}%</td>
                </tr>
              }
              {
                calculatedData.skillEntry.skill.spGradualPctMax > 0 &&
                <tr>
                  <td>{t((t) => t.game.skillAtk.spInfo.spPctPerSec)}</td>
                  <td>{calculatedData.skillEntry.skill.spGradualPctMax.toFixed(2)}%</td>
                </tr>
              }
              {
                !!calculatedData.skillEntry.skill.afflictions.length &&
                <>
                  {
                    !calculatedData.skillEntry.skill.spGradualPctMax &&
                    <tr>
                      <td>{t((t) => t.game.skillAtk.spInfo.efficiency.secPer1KSp)}</td>
                      <td>
                        <AfflictionDataCell statusEnums={statusEnums} data={calculatedData.efficiency.secPer1KSp}/>
                      </td>
                    </tr>
                  }
                  {
                    calculatedData.skillEntry.skill.sharable &&
                    <tr>
                      <td>{t((t) => t.game.skillAtk.spInfo.efficiency.secPer1KSsp)}</td>
                      <td>
                        <AfflictionDataCell statusEnums={statusEnums} data={calculatedData.efficiency.secPer1KSsp}/>
                      </td>
                    </tr>
                  }
                </>
              }
            </tbody>
          </table>
        </div>
      </Collapse>
    </>
  );
};
