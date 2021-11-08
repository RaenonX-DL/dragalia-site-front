export type EnmityData = {
  mod: {
    enmity: {
      original: number,
      effective: number,
    },
    skill: {
      original: number,
      effective: number,
    },
  },
  hp: {
    currentPct: number,
    val: {
      current: number,
      max: number,
    },
  },
};
