import {calcEnmityMod} from '../../../../utils/game/enmity';
import {overrideObject} from '../../../../utils/override';
import {EnmityData} from './types';


export const generateEnmityData = (): EnmityData => {
  const defaultEnmityMod = 1.6;
  const defaultSkillMod = 1616;
  const defaultCurrentHp = 2400;
  const defaultMaxHp = 3000;
  const defaultCurrentHpPct = defaultCurrentHp / defaultMaxHp * 100;

  const effectiveEnmity = calcEnmityMod(defaultCurrentHpPct, defaultEnmityMod);

  return formatEnmityData({
    mod: {
      enmity: {
        original: defaultEnmityMod,
        effective: effectiveEnmity,
      },
      skill: {
        original: defaultSkillMod,
        effective: defaultSkillMod * effectiveEnmity,
      },
    },
    hp: {
      currentPct: defaultCurrentHpPct,
      val: {
        current: defaultCurrentHp,
        max: defaultMaxHp,
      },
    },
  });
};

export const formatEnmityData = (data: EnmityData): EnmityData => overrideObject(
  data,
  {
    mod: {
      enmity: {effective: +data.mod.enmity.effective.toFixed(3)},
      skill: {
        effective: +data.mod.skill.effective.toFixed(0),
      },
    },
    hp: {
      currentPct: +data.hp.currentPct.toFixed(2),
      val: {
        current: +data.hp.val.current.toFixed(0),
        max: +data.hp.val.max.toFixed(0),
      },
    },
  },
);
