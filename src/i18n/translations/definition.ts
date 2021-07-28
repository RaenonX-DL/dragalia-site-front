import {UnitType} from '../../api-def/api';
import {Efficiency} from '../../components/elements/gameData/skillAtk/out/types';
import {SortOrder} from '../../components/elements/gameData/unitInfo/lookup/in/types';

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
      input: {
        atk: {
          title: {
            name: string,
            desc: string,
          },
          inGame: {
            name: string,
            desc: string,
          },
          conditional: {
            name: string,
            desc: string,
          },
          buff: {
            name: string,
            desc: string,
          },
        },
        buff: {
          boost: {
            name: string,
            desc: string,
          },
          count: {
            name: string,
            desc: string,
          },
          zone: {
            self: {
              name: string,
              desc: string,
            },
            ally: {
              name: string,
              desc: string,
            },
          },
        },
        ex: {
          title: string,
          description: string,
          blade: string,
          wand: string,
        },
        crt: {
          title: {
            name: string,
            desc: string,
          },
          rate: {
            name: string,
            desc: string,
          },
          damage: {
            name: string,
            desc: string,
          },
          inspired: string,
        },
        skill: {
          title: {
            name: string,
            desc: string,
          },
          buff: {
            name: string,
            desc: string,
          },
          passive: {
            name: string,
            desc: string,
          },
          energized: string,
        },
        punisher: {
          title: {
            name: string,
            desc: string,
          },
          bk: {
            name: string,
            desc: string,
          },
          others: {
            name: string,
            desc: string,
          },
        },
        dragon: {
          title: {
            name: string,
            desc: string,
          },
          facility: {
            name: string,
            desc: string,
          },
          passive: {
            name: string,
            desc: string,
          },
        },
        other: {
          title: {
            name: string,
            desc: string,
          },
          elemBonus: {
            name: string,
            desc: string,
          },
          hp: {
            name: string,
            desc: string,
          },
        },
        target: {
          title: {
            name: string,
            desc: string,
          },
          element: {
            name: string,
            desc: string,
          },
          affliction: {
            name: string,
            desc: string,
          },
          state: {
            title: {
              name: string,
              desc: string,
            },
            none: string,
            od: string,
            bk: string,
          },
          def: {
            base: {
              name: string,
              desc: string,
            },
            down: {
              name: string,
              desc: string,
            },
            bk: {
              name: string,
              desc: string,
            },
          },
        },
        filter: {
          title: {
            name: string,
            desc: string,
          },
          element: {
            name: string,
            desc: string,
          },
          affliction: {
            name: string,
            desc: string,
          },
          unitType: {
            name: string,
            desc: string,
          },
          other: {
            name: string,
            desc: string,
          },
          ssCostMax: {
            name: string,
            desc: string,
          },
          only: {
            dispel: string,
            shared: string,
          },
        },
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
        dragon: string,
        dragonData: string,
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
        mods: string,
        damage: string,
        sp: string,
        ssp: string,
      },
      spInfo: {
        efficiencyIndexes: string,
        efficiency: { [index in keyof Omit<Efficiency, 'spFullFillSec'>]: string },
        sp: string,
        spGradualFill: string,
        spPctPerSec: string,
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
    unitInfo: {
      header: {
        combo: {
          index: string,
          mods: string,
          hitCount: string,
          sp: string,
          utp: string,
          odRate: string,
          crisisMods: string,
          nextComboSec: string,
          spPerSec: string,
        },
      },
      title: {
        passive: string,
        coAbility: {
          official: string,
          parsed: string,
          global: string,
          chained: string,
        },
        normalAttack: string,
        skills: {
          all: string,
          official: string,
          parsed: {
            atk: string,
          },
        },
      },
      info: {
        passive: string,
        coAbility: string,
        skill: {
          official: string,
          parsed: string,
        },
      },
      links: {
        analysis: string,
        info: string,
      },
      text: {
        total: string,
        relatedLinks: string,
      },
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
      home: PageMetaTranslations,
      site: PageMetaTranslations,
      thanks: PageMetaTranslations,
      post: {
        analysis: {
          newChara: PageMetaTranslations,
          newDragon: PageMetaTranslations,
          edit: PageMetaTranslations,
          post: PageMetaTranslations
        },
        quest: {
          edit: PageMetaTranslations,
          list: PageMetaTranslations,
          new: PageMetaTranslations,
          post: PageMetaTranslations,
        },
      },
      gameData: {
        info: PageMetaTranslations,
        ex: PageMetaTranslations,
        skillAtk: PageMetaTranslations,
      },
      auth: {
        signIn: PageMetaTranslations,
      },
      unit: {
        info: PageMetaTranslations,
      },
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
  nav: {
    unitInfo: string,
  },
  posts: {
    analysis: {
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
      sort: {
        title: string,
      } & { [order in SortOrder]: string },
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
  enum: {
    unitType: { [U in UnitType]: string },
  },
}
