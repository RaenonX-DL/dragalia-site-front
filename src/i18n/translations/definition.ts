import {Efficiency} from '../../components/elements/gameData/skillAtk/out/types';

export type PageMetaTranslations = {
  title: string,
  description: string,
}

export type TranslationStruct = {
  donation: {
    tierS1: string,
    tierS2: string,
    tierSSS: string,
  },
  game: {
    data: {
      titleSelf: string,
      titleActive: string,
      titleEx: string,
      titleOthers: string,
      titlePassive: string,
      titleSkillAtk: string,
      titleSkillSup: string,
      titleStory: string,
    },
    ex: {
      name: {
        filterElement: string,
        filterExBuffParam: string,
        filterChainedExBuffParam: string,
        exAbility: string,
        chainedExAbility: string,
      },
      desc: {
        filterElement: string,
        filterExBuffParam: string,
        filterChainedExBuffParam: string,
        exAbility: string,
        chainedExAbility: string,
      },
      badge: {
        infoCooldown: string,
        infoDurationCount: string,
        infoDurationSec: string,
        infoMaxOccurrences: string,
        infoMaxStackCount: string,
        infoProbabilityPct: string,
        infoTargetAction: string,
      },
    },
    skillAtk: {
      name: {
        atk: string,
        atkInGame: string,
        atkConditional: string,
        atkBuff: string,
        buffBoost: string,
        buffCount: string,
        buffZoneSelf: string,
        buffZoneAlly: string,
        ex: string,
        exBlade: string,
        exWand: string,
        crt: string,
        crtRate: string,
        crtDamage: string,
        crtInspired: string,
        skill: string,
        skillBuff: string,
        skillPassive: string,
        skillEnergized: string,
        punisher: string,
        punisherBk: string,
        punisherOthers: string,
        other: string,
        otherElementBonus: string,
        otherHp: string,
        target: string,
        targetElement: string,
        targetAffliction: string,
        targetState: {
          title: string,
          none: string,
          od: string,
          bk: string,
        },
        targetDefDown: string,
        targetDef: string,
        targetDefBk: string,
        filter: string,
        filterElement: string,
        filterAffliction: string,
        filterOther: string,
        filterSharedOnly: string,
        filterDispelOnly: string,
      },
      desc: {
        atk: string,
        atkInGame: string,
        atkConditional: string,
        atkBuff: string,
        buffBoost: string,
        buffCount: string,
        buffZoneSelf: string,
        buffZoneAlly: string,
        ex: string,
        crt: string,
        crtRate: string,
        crtDamage: string,
        skill: string,
        skillBuff: string,
        skillPassive: string,
        punisher: string,
        punisherBk: string,
        punisherOthers: string,
        other: string,
        otherElementBonus: string,
        otherHp: string,
        target: string,
        targetElement: string,
        targetAffliction: string,
        targetState: {
          title: string,
        },
        targetDefDown: string,
        targetDef: string,
        targetDefBk: string,
        filter: string,
        filterElement: string,
        filterAffliction: string,
        filterOther: string,
      },
      display: {
        title: string,
        desc: string,
        options: {
          actualDamage: string,
          damageInfo: string,
          damageDistribution: string,
          affliction: string,
          spInfo: string,
          animationInfo: string,
        },
      }
      entry: {
        notCancelable: string,
        cancelable: string,
        stackable: string,
        unstackable: string,
        affliction: string,
        buffCount: string,
        buffCountDescCapped: string,
        buffCountDescUncapped: string,
        buffZone: string,
        buffZoneDesc: string,
        dispel: string,
        dispelDesc: string,
        crisisUp: string,
        crisisUpDesc: string,
        crisisDown: string,
        crisisDownDesc: string,
      },
      summary: {
        atk: string,
        atkData: string,
        buff: string,
        buffData: string,
        ex: string,
        exBlade: string,
        exWand: string,
        exNone: string,
        crt: string,
        crtInspired: string,
        crtRate: string,
        crtDamage: string,
        skill: string,
        skillPassive: string,
        skillBuff: string,
        skillEnergized: string,
        punisher: string,
        punisherData: string,
        target: string,
        targetData: {
          element: string,
          afflictions: string,
          state: string,
          def: string,
        },
        other: string,
        otherData: string,
      },
      collapse: string,
      error: {
        noInfoToDisplay: string,
        noResult: string,
        presetMustLogin: string,
      },
      animation: {
        earliest: string,
        earliestUnavailable: string,
        hitTiming: string,
        hitTimingHeader: string,
        cancelInfo: string,
        cancelHeader: {
          action: string,
          time: string,
          preConditions: string,
        },
      },
      sort: {
        text: string,
        damageDesc: string,
        sp: string,
        ssp: string,
      },
      spInfo: {
        efficiencyIndexes: string,
        efficiency: {[index in keyof Efficiency]: string},
        sp: string,
        ssp: string,
        ssCost: string,
      },
      info: {
        affliction: string,
        animation: string,
        preset: string,
        presetExpiry: string,
      },
    },
    tools: {
      titleSelf: string,
      rotation: string,
    },
  },
  userControl: {
    noUid: string,
    noUidDetails: string,
    login: string,
    logout: string,
    loading: string,
  },
  lang: {
    inUse: string,
  },
  message: {
    donation: {
      url: string,
      info: string,
    },
    warning: {
      adminOnly: string,
      truncated: string,
    },
    info: {
      constructing: string,
      fetching: string,
      welcome: string,
    },
    error: {
      auth: {
        noProvider: string,
      }
    }
  },
  misc: {
    add: string,
    omMember: string,
    omGroup: string,
    openGif: string,
    remove: string,
    search: string,
    searchKeyword: string,
  },
  meta: {
    inUse: {
      about: PageMetaTranslations,
      analysisIndex: PageMetaTranslations,
      analysisNewChara: PageMetaTranslations,
      analysisNewDragon: PageMetaTranslations,
      analysisEdit: PageMetaTranslations,
      analysisPost: PageMetaTranslations,
      home: PageMetaTranslations,
      questEdit: PageMetaTranslations,
      questList: PageMetaTranslations,
      questNew: PageMetaTranslations,
      questPost: PageMetaTranslations,
      site: PageMetaTranslations,
      thanks: PageMetaTranslations,
      gameData: {
        ex: PageMetaTranslations,
        skillAtk: PageMetaTranslations,
      },
      auth: {
        signIn: PageMetaTranslations,
      }
    },
    error: {
      401: PageMetaTranslations,
      404: PageMetaTranslations,
    }
    temp: {
      constructing: PageMetaTranslations,
    },
    suffix: string,
  },
  posts: {
    analysis: {
      titleSelf: string,
      forceStrike: string,
      keywords: string,
      normalAttack: string,
      notesDragon: string,
      unitName: string,
      unitType: string,
      passive: string,
      skills: string,
      story: string,
      suitable: string,
      summary: string,
      summonResult: string,
      summonExplanation: {
        title: string,
        description: string,
      },
      tipsBuilds: string,
      ultimate: string,
      videos: string,
      error: {
        noPostId: string,
        noResult: string,
        unknownType: string,
        unavailable: string,
      },
      skill: {
        name: string,
        info: string,
        rotations: string,
        tips: string,
      },
      type: {
        character: string,
        dragon: string,
      },
    },
    info: {
      titleSelf: string,
      id: string,
      lastModified: string,
      published: string,
      title: string,
      viewCount: string,
      viewCountComplete: string,
    },
    manage: {
      add: string,
      addChara: string,
      addDragon: string,
      addNote: string,
      collapse: string,
      edit: string,
      fetchListFailed: string,
      fetchPostFailed: string,
      md: string,
      editNote: string,
      modifyTime: string,
      postNotExists: string,
      preview: string,
      publish: string,
      publishFailed: string,
    },
    message: {
      altLang: string,
      otherLang: string,
      published: string,
    },
    misc: {
      titleSelf: string,
    },
    quest: {
      titleSelf: string,
      addendum: string,
      builds: string,
      character: string,
      general: string,
      positional: string,
      rotations: string,
      tips: string,
      title: string,
      video: string,
    },
  },
}
