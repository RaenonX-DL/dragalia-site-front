import {UnitType} from '../../../api-def/api/other/unit';
import {TranslationStruct} from '../definition';


export const translation: TranslationStruct = {
  autoComplete: {
    selected: 'Selected',
    inputPlaceholder: 'Enter keyword here',
    noMatchingOptions: 'No available options.',
    noneSelected: 'None selected.',
  },
  donation: {
    tierS1: 'Tier S-1',
    tierS2: 'Tier S-2',
    tierSSS: 'Tier SSS',
  },
  game: {
    ex: {
      name: {
        filterElement: 'Element',
        filterExBuffParam: 'Co-ab Buff Parameter',
        filterChainedExBuffParam: 'CCA Buff Parameter',
        exAbility: 'Co-ability',
        chainedExAbility: 'Chain Co-ability',
      },
      desc: {
        filterElement: 'If multiple elements are selected, such as flame and wind, ' +
          'then all flame and wind units will be listed. ' +
          'If no elements are selected, then all will be listed.',
        filterExBuffParam: 'If multiple co-abilities are selected, ' +
          'then anything that matches a selected co-abilities will be listed. ' +
          'If none are selected, then all will be listed.',
        filterChainedExBuffParam: 'If multiple CCA are selected, ' +
          'then anything that matches a selected CCA will be listed. ' +
          'If none are selected, then all will be listed.',
        exAbility: 'Multiples of the same co-ability will not stack. ' +
          'Applies to the whole party and is not restricted by element.',
        chainedExAbility: 'Also known as CCA. Applies to the whole party, ' +
          'but is generally restricted by element. ' +
          'Unlike co-abilities, CCAs of the same effect will stack.',
      },
      badge: {
        infoCooldown: 'Cooldown {{cooldownSec}} secs',
        infoDurationCount: 'Usable {{durationCount}} times',
        infoDurationSec: 'Lasts {{durationSec}} secs',
        infoMaxOccurrences: 'Max {{maxOccurrences}} times',
        infoMaxStackCount: 'Max {{maxStackCount}} stacks',
        infoProbabilityPct: '{{probabilityPct}}% chance',
        infoTargetAction: 'Target action: {{targetAction}}',
      },
    },
    skillAtk: {
      input: {
        atk: {
          title: {
            name: 'STR',
            desc: 'Any parameter that relates to strength.',
          },
          inGame: {
            name: 'In game',
            desc: 'Also known as base strength. ' +
              'This parameter refers to the displayed STR when you open a character’s info. ' +
              'Includes dragon, wyrmprints, and augments. ' +
              'This parameter is temporary. ' +
              'A function will be added in the future to automatically choose dragons and weapons' +
              ' after you pick the character.',
          },
          conditional: {
            name: 'Cond. STR (%)',
            desc: 'Any conditional STR buff. For example: Flurry STR, HP > 70%, etc.',
          },
          buff: {
            name: 'Buff (%)',
            desc: 'During a quest, the STR buff value that is displayed, capped at 200%.',
          },
        },
        buff: {
          boost: {
            name: 'Buff Stacks',
            desc: 'For any skill that scales with buff counts.',
          },
          count: {
            name: 'Buff Count',
            desc: 'Amount of buffs applied. ' +
              'Note: Energize and Inspiration, no matter what stage, are considered as 1 buff.',
          },
          zone: {
            self: {
              name: 'Buff Zone (Self)',
              desc: 'Number of self-casted buff zones you are in.',
            },
            ally: {
              name: 'Buff Zone (Team)',
              desc: 'Number of ally-casted buff zones you are in.',
            },
          },
        },
        ex: {
          title: 'CoAb',
          description: 'Co-ability. For elemental damage (Peony), Reduced Str/Def punisher (Gala Leif), ' +
            'CDMG (H!Mym, V!Melody) please input directly in their respective fields.',
          blade: 'Blade',
          wand: 'Wand',
        },
        crt: {
          title: {
            name: 'CRT',
            desc: 'Any parameter that relates to crit.',
          },
          rate: {
            name: 'CRT (%)',
            desc: 'Crit rate. Note: If inspired is checked, ' +
              'no matter what is inputted here the calculation will assume crit.',
          },
          damage: {
            name: 'CDMG (%)',
            desc: 'Crit damage % increase. The base 1.7x crit damage is already included.',
          },
          inspired: 'Inspiration',
        },
        skill: {
          title: {
            name: 'SD',
            desc: 'Any parameter that relates to skill damage.',
          },
          buff: {
            name: 'Buff (%)',
            desc: 'During a quest, the skill damage buff value that is displayed, capped at 200%. ' +
              'Note: Cat Sith\'s +180% SD is in this field.',
          },
          passive: {
            name: 'Passive SD (%)',
            desc: 'SD% from dragon and wyrmprints. ' +
              'Note: Cat Sith\'s passive is a buff and not in this field.',
          },
          energized: 'Energized',
        },
        punisher: {
          title: {
            name: 'Punisher',
            desc: 'Any parameter that relates to punisher.',
          },
          bk: {
            name: 'BK Punisher (%)',
            desc: 'Punisher to enemies in the break state. ' +
              'Note: The def reduction from break state is not in this field.',
          },
          others: {
            name: 'Other Punisher (%)',
            desc: 'Other punishers such as affliction punishers (wyrmprint), ' +
              'OD punisher, reduced Str/Def punisher (Gala Leif) are in this field.',
          },
        },
        dragon: {
          title: {
            name: 'Dragon',
            desc: 'Any parameter that relates to dragon damage.',
          },
          facility: {
            name: 'Facility (%)',
            desc: 'Mainly obtained from Dracolith. This info can be found in the info page of the castle.',
          },
          passive: {
            name: 'Passive (%)',
            desc: 'All effects related to dragon damage up, ' +
              'such as the effect originated from a print or chained co-ability.',
          },
        },
        other: {
          title: {
            name: 'Other',
            desc: 'Other parameters that increase damage such as elemental damage.',
          },
          elemBonus: {
            name: 'Elemental Bonus (%)',
            desc: 'Other elemental bonus such as Peony’s co-ability and Gala Reborn Poseidon’s passive.',
          },
          hp: {
            name: 'HP (%)',
            desc: 'Current HP',
          },
        },
        target: {
          title: {
            name: 'Target',
            desc: 'Any parameter relating to the target',
          },
          element: {
            name: 'Target Element',
            desc: 'Target element',
          },
          affliction: {
            name: 'Target Affliction',
            desc: 'Affliction applied to target',
          },
          state: {
            title: {
              name: 'State',
              desc: 'Target’s current state',
            },
            none: 'None',
            od: 'OD',
            bk: 'BK',
          },
          def: {
            base: {
              name: 'Base Def',
              desc: 'Target\'s base def. Usually 10; Kai Yan is 15 (2020/12/20).',
            },
            down: {
              name: 'Def Down (%)',
              desc: 'Def down applied to target. Displayed above the boss’s HP bar during the quest.',
            },
            bk: {
              name: 'BK Def Rate',
              desc: 'Target\'s def reduction during break state. Usual 0.6; ' +
                'Tartarus and LVolk are 0.8 (BSK 1.25)',
            },
          },
        },
        filter: {
          title: {
            name: 'Filter',
            desc: 'If any filter is selected, then the parameters that apply will be listed. ' +
              'Otherwise, they will be skipped.',
          },
          element: {
            name: 'Element',
            desc: 'If multiple elements are selected, such as flame and wind, ' +
              'then all flame and wind characters’ skills will be listed, otherwise they will be skipped.',
          },
          affliction: {
            name: 'Affliction',
            desc: 'If multiple afflictions are selected, such as poison and burn, ' +
              'then anything that applies poison or burn will be listed, otherwise they will be skipped. ' +
              'Note: This filters for skills that apply afflictions, not ones that have affliction punishers.',
          },
          unitType: {
            name: 'Unit Type',
            desc: 'Unit type of the skill. ' +
              'All skills from all types of units will be returned if none of the options are selected.',
          },
          other: {
            name: 'Other',
            desc: 'Other filter options. ' +
              'If Shared Skill Only is selected, then when filtering and calculating, ' +
              'only shared skills will be considered and displayed.',
          },
          ssCostMax: {
            name: 'SS Cost (Max)',
            desc: 'All skills will be returned when this is 0. ' +
              'Otherwise, show skills which SS cost is equal to or less than the given value.',
          },
          only: {
            dispel: 'Dispel Only',
            shared: 'Shared Skill Only',
          },
        },
      },
      display: {
        title: 'Info to Display',
        desc: 'Info to display in the results.',
        options: {
          actualDamage: 'Actual Damage',
          damageInfo: 'Damage Info',
          damageDistribution: 'Damage Spread',
          affliction: 'Affliction',
          spInfo: 'SP Info / Efficiency',
          animationInfo: 'Animation',
        },
      },
      entry: {
        notCancelable: 'This skill is not cancelable',
        cancelable: 'This skill can be canceled after {{cancelTime}} seconds.',
        stackable: 'Stackable',
        unstackable: 'Unstackable',
        affliction: '{{affliction}} @ {{afflictionTime}} s ' +
          '({{afflictionProbabilityPct}}% / {{afflictionDuration}} s)',
        buffCount: 'Buff Counts',
        buffCountDescCapped: '+{{each}}% of the total mod for each buff; Capped at {{limit}}%',
        buffCountDescUncapped: '+{{each}}% of the total mod for each buff; Uncapped',
        buffZoneDesc: '{{selfBoost}}% mod for each self-built area / {{allyBoost}}% mod for each ally-built area',
        buffZone: 'Buff Zone',
        dispel: 'Dispel',
        dispelDesc: 'At {{dispelTiming}} sec',
        crisisUp: 'Enmity',
        crisisUpDesc: 'Max {{maxRate}}x',
        crisisDown: 'HP Scaling',
        crisisDownDesc: '{{maxRate}}x at the lowest HP',
      },
      summary: {
        atk: 'STR - {{atkVal}}',
        atkData: 'In game: {{atkInGame}} / Cond. STR: +{{atkConditionalPct}}% / Buff: +{{atkBuffPct}}%',
        buff: 'Buff',
        buffData: 'Count: {{buffCount}} / Zone: {{buffZoneSelf}} (self-built) {{buffZoneAlly}} (ally-built)',
        ex: 'CoAb',
        exBlade: 'Blade',
        exWand: 'Wand',
        exNone: '(None)',
        crt: 'CRT - {{crtVal}}',
        crtInspired: 'Inspired',
        crtRate: 'CRT {{crtRate}} %',
        crtDamage: 'CDMG +{{crtDamage}} %',
        skill: 'SD - {{skillVal}}',
        skillPassive: 'Passive +{{skillPassivePct}}%',
        skillBuff: 'Buff +{{skillBuffPct}}%',
        skillEnergized: 'Energized',
        punisher: 'Punisher - {{punisherVal}}',
        punisherData: 'BK {{punishersBkPct}}% / Other {{punishersOtherPct}}%',
        dragon: 'Dragon - {{dragonVal}}',
        dragonData: 'Facility +{{facilityPct}}% / Passive +{{passivePct}}%',
        target: 'Target Status',
        targetData: {
          element: 'Element: ',
          afflictions: 'Afflictions: ',
          state: 'State: {{state}}',
          def: 'Base DEF {{def}} / DEF Down -{{defDownPct}}% / BK Rate {{defBkRate}}',
        },
        other: 'Others',
        otherData: 'Element +{{otherElemBonusPct}}% / HP {{otherCurrentHpPct}}%',
      },
      collapse: 'Collapse/Expand',
      error: {
        noInfoToDisplay: 'Please select at least 1 info to display.',
        noResult: 'No available results.',
        presetMustLogin: 'You must login to use the input parameter preset via link.',
      },
      animation: {
        earliest: '{{time}} sec @ Earliest',
        earliestUnavailable: 'Unavailable',
        hitTiming: 'Hit Timing',
        hitTimingHeader: 'Hit Timing (sec)',
        cancelInfo: 'Cancel Info',
        cancelHeader: {
          action: 'Action',
          time: 'Time (sec)',
          preConditions: 'Other Conditions',
        },
      },
      sort: {
        text: 'Order: {{sortBy}}',
        mods: 'Mods',
        damage: 'Actual Damage',
        sp: 'SP',
        ssp: 'SSP',
      },
      spInfo: {
        efficiencyIndexes: 'Efficiency Indexes',
        efficiency: {
          modPctPer1KSp: '% / 1K SP',
          modPctPer1KSsp: '% / 1K SSP',
          secPer1KSp: 'Affliction (sec) / 1K SP',
          secPer1KSsp: 'Affliction (sec) / 1K SSP',
        },
        sp: 'SP',
        spGradualFill: '{{secs}} secs ({{sp}})',
        spPctPerSec: 'SP Regen % / sec',
        ssp: 'SSP',
        ssCost: 'SS Cost',
      },
      info: {
        affliction: 'Duration for some afflictions are variable, especially freeze and stun. ' +
          'Calculations below are using the maximum duration.',
        animation: 'Animation info might be inaccurate. Actual animation provided in the analysis if available.',
        preset: 'Click on the share button to create a preset link.',
        presetExpiry: 'The link expires 30 days after the last usage.',
      },
    },
    tools: {
      titleSelf: 'Game Tools',
      rotation: 'Rotations Calculator',
      enmity: 'Enmity Mods',
    },
    unitInfo: {
      header: {
        combo: {
          index: '#',
          mods: 'Mods',
          hitCount: 'Hits',
          sp: 'SP',
          utp: 'UTP',
          odRate: 'OD Rate',
          crisisMods: 'Crisis Mods',
          nextComboSec: 'Next combo after (sec)',
          spPerSec: 'SP / sec',
        },
      },
      title: {
        passive: 'Passive',
        coAbility: {
          official: 'Co-abilities (Official)',
          parsed: 'Co-abilities (Parsed)',
          global: 'Co-ability',
          chained: 'Chained Co-ability',
        },
        normalAttack: 'Normal Attack Combo Chain',
        skills: {
          all: 'Skills',
          official: 'Official Texts',
          parsed: {
            atk: 'Auto-parsed (ATK)',
          },
        },
      },
      info: {
        passive: 'These are official texts. ' +
          'Consult [the corresponding analysis]({{analysis}}) for better breakdown and details.',
        coAbility: 'These are official texts. Welcome to [Co-ability searching]({{exLookup}}) feature.' +
          'Texts displayed below may be different the texts in-game due to the application design choice.\n\n\n' +
          'Co-ability is applied regardless the unit element. The effect is unstackable. ' +
          'Chained co-ability is limited to same element only in general. However, the effect is stackable.',
        skill: {
          official: 'These are official texts. ' +
            'Consult [the corresponding analysis]({{analysis}}) for better breakdown and details.',
          parsed: 'These are automatically parsed. Some content might be inaccurate. ' +
            'Welcome to use the [ATK skill lookup]({{atkSearch}}) for searching.',
        },
      },
      links: {
        analysis: 'Analysis',
        tier: 'Ranking / Tier',
        info: 'Info',
        story: 'Story',
      },
      text: {
        total: '(Total)',
        relatedLinks: 'Related Links',
        iconOnly: 'Icon Only',
      },
      tips: {
        clickNameForLinks: 'Click the unit name above for related links.',
      },
    },
    unitTier: {
      tier: {
        title: 'Ranking',
        ranking: 'Ranking',
        isCompDependent: 'Comp-dependent',
        notRanked: 'Not Ranked',
        edit: 'Edit Ranking',
      },
      tips: {
        main: 'It is strongly recommended to read the unit analysis to know ' +
          'the actual strength, how-to-use, and the other details!',
        notRanked: 'This unit is not yet ranked.',
        compIcon: 'Needs specific companion for the corresponding tier',
      },
      points: {
        edit: 'Edit Key Point Content',
        title: 'Key Points',
        type: {
          title: 'Type',
          strength: 'Strength',
          weakness: 'Weakness',
          trait: 'Trait',
        },
        description: 'Description',
        tipsOnClick: 'Clicking on the "i" icon to get more details, ' +
          'such as the list of adventurers/dragons sharing the same key point.',
        info: {
          linkedUnits: 'Adventurers / Dragons who has this key point',
          error: {
            noLinkedUnits: 'No adventurers / dragons are sharing this key point.',
          },
        },
      },
      dimension: {
        conSolo: {
          name: 'CoN (Solo)',
          description: 'Ranking when playing the quest where Curse of Nihility (CoN) is available ' +
            '(for example, Lilith\'s encroaching shadow) in solo mode.',
        },
        conCoop: {
          name: 'CoN (Co-op)',
          description: 'Ranking when playing the quest where Curse of Nihility (CoN) is available ' +
            '(for example, Lilith\'s encroaching shadow) in co-op mode.',
        },
        conAi: {
          name: 'CoN (AI)',
          description: 'Ranking when playing the quest where Curse of Nihility (CoN) is available ' +
            '(for example, Lilith\'s encroaching shadow) as AI.',
        },
        normalSolo: {
          name: 'Normal (Solo)',
          description: 'Ranking when playing the normal quest ' +
            '(for example, Legend Agito, High Dragons Trial) in solo mode.',
        },
        normalCoop: {
          name: 'Normal (Co-op)',
          description: 'Ranking when playing the normal quest ' +
            '(for example, Legend Agito, High Dragons Trial) in co-op mode.',
        },
        normalAi: {
          name: 'Normal (AI)',
          description: 'Ranking when playing the normal quest ' +
            '(for example, Legend Agito, High Dragons Trial) as AI.',
        },
        sharedSkill: {
          name: 'Shared Skill',
          description: 'Shared skill ranking. Adventurer only.',
        },
      },
      display: {
        conSolo: 'CoN (Solo)',
        conCoop: 'CoN (Co-op)',
        conAi: 'CoN (AI)',
        normalSolo: 'Normal (Solo)',
        normalCoop: 'Normal (Co-op)',
        normalAi: 'Normal (AI)',
        sharedSkill: 'SS',
        all: 'Show All',
      },
      sort: {
        unitId: 'Unit ID',
        avgRanking: 'Average Ranking',
      },
      alert: {
        refRemoval: 'If the removed key point entry is used by any unit, ' +
          'the key point reference of the linked unit is also removed.',
        noUnitInRank: 'No adventurers / dragons fall into this rank.',
      },
    },
    nameRef: {
      manage: 'Unit Name Config',
      unitId: 'Unit ID',
      actualName: 'Actual Name',
      desiredName: 'Desired Name',
      error: {
        invalidUnitId: 'Invalid Unit #',
      },
      status: {
        updated: 'Updated!',
        error: 'Failed to update: {{error}}',
      },
    },
    calc: {
      enmity: {
        mod: {
          enmity: {
            original: {
              title: 'Enmity Mod',
              description: 'Enmity mod from all types of the equipment.',
            },
            effective: {
              title: 'Effective Enmity Mod',
              description: 'Effective enmity mod according to the current HP %.根據當前 HP ，實際有效的背水倍率。',
            },
          },
          skill: {
            original: {
              title: 'Skill Mod',
              description: 'Original skill mod.',
            },
            effective: {
              title: 'Effective Skill Mod',
              description: 'Actual skill mod after applying the effective enmity mod.',
            },
          },
        },
        hp: {
          currentPct: {
            title: 'HP %',
            description: 'Current HP in %.',
          },
          val: {
            current: {
              title: 'Current HP',
              description: 'Current HP in number.',
            },
            max: {
              title: 'Max HP',
              description: 'Max HP in number.',
            },
          },
        },
        title: {
          mod: 'Mods',
          hp: 'HP',
        },
      },
    },
    datamine: {
      catalog: {
        timestamp: 'Timestamp',
        version: 'Version Code',
        action: 'Action',
      },
    },
  },
  userControl: {
    noUid: 'No user ID',
    noUidDetails: 'User ID not found. Please re-login.',
    login: 'Login',
    logout: 'Logout',
    loading: 'Loading...',
  },
  lang: {
    inUse: 'Currently in-use',
  },
  message: {
    donation: {
      url: 'Donation URLs',
      info: '**Thanks for your donation!**\n\n' +
        'One-time donations over USD $1 via Ko-Fi or Paypal also benefits from ads-free experience for a month.\n\n' +
        'Please login to the website using the email address used for the donation.',
    },
    warning: {
      adminOnly: 'You must have admin privilege to access this page.',
      truncated: 'Due to excessive number of results, ' +
        'results are truncated ({{displayed}} Displayed / {{returned}} Available). ' +
        'To display the truncated results, please narrow the search condition.',
    },
    info: {
      constructing: 'Under construction. ' +
        'Will announce upon completion somewhere.\n\n' +
        '### Completed before email notification system has been completed\n\n' +
        'We will announce it in social media (Reddit, FB groups, etc.).\n\n' +
        '### Completed after the email notification system has been implemented\n\n' +
        'Users who logged in before or signed up for the email list will receive an email about the new release.',
      welcome: 'Welcome to the Dragalia Lost info website constructed and maintained ' +
        'by the members of the alliance - Oasis of the Maniacs (OM)!\n\n' +
        'Most of the pages and the features are still under construction.\n\n' +
        '**HDTs/Agitos, Unit Analysis** are completed. Take a look!\n\n' +
        'Head to the pages/functions which are still under construction to get more details.',
      videoTips: 'For the Chinese audience who can\'t see the videos, ' +
        'please visit [my Bilibili](https://space.bilibili.com/1052053443).',
    },
    error: {
      auth: {
        noProvider: 'No authentication providers available.',
      },
    },
  },
  misc: {
    omMember: 'OM Alliance Member',
    omGroup: 'OM Group Member',
    openImage: 'Click to open the image',
    search: 'Search',
    searchKeyword: 'Keyword',
    noResult: 'No matching results. Please verify your searching condition.',
    showMore: 'Show More',
    showAll: 'Show All',
    update: 'Update',
    sortBy: 'Sort by {{order}}',
    timestamp: {
      lastModified: 'Last Modified',
      lastUpdated: 'Last Updated',
    },
    unitType: {
      [UnitType.CHARACTER]: 'Character',
      [UnitType.DRAGON]: 'Dragon',
    },
    collapse: 'Collapse/Expand',
    collapseAll: 'Collapse/Expand All',
  },
  meta: {
    inUse: {
      about: {
        title: 'About',
        description: 'Information about this website.',
      },
      home: {
        title: 'Homepage',
        description: 'Homepage of Dragalia Lost info website by OM.',
      },
      site: {
        title: 'Dragalia Lost info site by OM',
        description: 'Dragalia Lost info website by Oasis of the Maniacs.',
      },
      thanks: {
        title: 'Special Thanks',
        description: 'List of the contributors of this website.',
      },
      post: {
        analysis: {
          newChara: {
            title: 'New character analysis',
            description: 'Page to add a new character analysis.',
          },
          newDragon: {
            title: 'New dragon analysis',
            description: 'Page to add a new dragon analysis.',
          },
          edit: {
            title: 'Edit analysis - {{name}}',
            description: 'Page to edit the analysis of {{name}}.',
          },
          post: {
            title: '【Analysis】{{name}}',
            description: '{{summary}}',
          },
        },
        quest: {
          edit: {
            title: 'Edit quest guide - {{title}}',
            description: 'Page to edit quest guide: {{title}}.',
          },
          list: {
            title: 'Index of quest guides',
            description: 'Index page of the quest guides.',
          },
          new: {
            title: 'New quest guide',
            description: 'Page to create a new High-Difficulty quest guide.',
          },
          post: {
            title: '【Quest Guide】{{title}}',
            description: 'Visit for the details.',
          },
        },
        misc: {
          edit: {
            title: 'Edit post - {{title}}',
            description: 'Page to edit post: {{title}}.',
          },
          list: {
            title: 'Index of miscellaneous posts',
            description: 'Index page of the other miscellaneous posts.',
          },
          new: {
            title: 'New misc. post',
            description: 'Page to create a new miscellaneous post.',
          },
          post: {
            title: '【Misc】{{title}}',
            description: 'Visit for the details.',
          },
        },
      },
      tier: {
        lookup: {
          title: 'Unit Tier',
          description: 'Unit tier under different environment and its reasoning for all types of unit.',
        },
        edit: {
          title: 'Edit unit tier',
          description: 'Page to edit the rankings and the related info of each unit.',
        },
        points: {
          index: {
            title: 'Key Point Index',
            description: 'Adventurers/Dragons key point index.',
          },
          usage: {
            title: 'Key Point: {{title}}',
            description: 'Information about the key point: {{title}}. ' +
              'Things like the adventurers/dragons having this key point are displayed here.',
          },
          edit: {
            title: 'Edit Key Points',
            description: 'Page to edit the content of the key points.',
          },
        },
        unit: {
          title: '【Ranking / Key Point】{{unitName}}',
          description: 'Ranking and the key points of {{unitName}} .',
        },
      },
      gameData: {
        info: {
          title: 'Chara/Dragon info lookup',
          description: 'Page to search for the info or the analysis of all characters/dragons.',
        },
        ex: {
          title: 'Co-ab / CCA lookup',
          description: 'Page to search for all Co-abilities/Chained Co-abilities in the game.',
        },
        skillAtk: {
          title: 'Attacking skill lookup',
          description: 'Page to search for all attacking skills in the game.',
        },
        datamine: {
          index: {
            title: 'Datamine info index',
            description: 'Datamine info index page.',
          },
          detail: {
            title: 'Datamine - {{versionCode}}',
            description: 'Datamine info of version code {{versionCode}}.',
          },
        },
      },
      auth: {
        signIn: {
          title: 'Login',
          description: 'Sign-in to the website to enable more features.',
        },
      },
      unit: {
        info: {
          title: '{{unitName}}',
          description: 'Unit info of {{unitName}}.',
        },
        name: {
          title: 'Unit Name Config',
          description: 'Page to configure the custom unit names.',
        },
      },
      calc: {
        enmity: {
          title: 'Enmity Mod Calculator',
          description: 'Tool to calculate the enmity mod at a certain HP level, ' +
            'or the HP level required for a certain enmity mod.',
        },
      },
      story: {
        unit: {
          title: '【Unit Story】{{unitName}}',
          description: 'All unit stories of {{unitName}}.',
        },
      },
    },
    error: {
      401: {
        title: 'Access Denied',
        description: 'Access denied. Please check your current login status.',
      },
      404: {
        title: 'Page not exists',
        description: 'The page does not exist.',
      },
    },
    temp: {
      constructing: {
        title: 'Under construction',
        description: 'The page is currently under construction.',
      },
    },
    suffix: ' | Dragalia Lost Info by OM',
  },
  nav: {
    gameData: {
      self: 'Game Data',
      passive: 'Passive',
      ex: 'Co-ability / CCA',
      active: 'Active',
      skillAtk: 'Skill (Attack)',
      skillSup: 'Skill (Support)',
      others: 'Others',
      story: 'Story',
      datamine: 'Datamine',
    },
    unitInfo: 'Chara/Dragon Info',
    unitTier: 'Tier List',
  },
  posts: {
    analysis: {
      forceStrike: 'Force Strike Module',
      normalAttack: 'Normal Attack Module',
      notesDragon: 'Notes',
      unitName: 'Unit Name',
      unitType: 'Unit Type',
      passive: 'Passive',
      skills: 'Skill',
      suitable: 'Suitable Characters',
      summary: 'Summary',
      summonResult: 'My Summoning Result',
      summonExplanation: {
        title: 'About this section',
        description: 'Some people may wonder why this is listed in my analysis. ' +
          'When I started writing analysis, ' +
          'I wanted to let people know that getting lucky is pure luck; ' +
          'getting unlucky is just a usual thing. ' +
          'I never thought that I would end up dedicating writing analysis like this, ' +
          'and I still want to let people know what was mentioned about luck, ' +
          'so I decided to leave it instead of removing it.',
      },
      tipsBuilds: 'Tips & Builds',
      ultimate: 'Ultimate',
      videos: 'Related Videos',
      error: {
        noPostId: 'Analysis ID is not specified.',
        unknownType: 'Unknown post type - {{analysisType}}.',
        unavailable: 'Analysis Unavailable',
      },
      skill: {
        name: 'Skill Name',
        info: 'Skill Info',
        rotations: 'Skill Rotations',
        tips: 'Skill Tips',
      },
      sort: {
        unitId: 'Unit ID',
        published: 'Published',
        lastModified: 'Last Modified',
        viewCount: 'View Count',
      },
    },
    info: {
      titleSelf: 'Post Information',
      id: 'ID',
      published: 'Published',
      title: 'Title',
      viewCount: 'View Count',
      viewCountComplete: 'Viewed {{count}} times',
    },
    manage: {
      add: 'New Post',
      addChara: 'New Post (Character)',
      addDragon: 'New Post (Dragon)',
      addNote: 'Specify ID to post multi-language version of a post. ' +
        'The web app will check if the combination of the post ID and the language code is available. ' +
        'ID without any related posts is unavailable.',
      edit: 'Edit Post',
      fetchListFailed: 'Failed to fetch the post list. ({{error}})',
      fetchPostFailed: 'Failed to fetch the post. ({{error}})',
      md: 'Markdown',
      editNote: 'Modification Note',
      postNotExists: 'Post not exists.',
      preview: 'Preview',
      publish: 'Publish',
    },
    message: {
      altLang: 'This post does not have a version in {{langUi}}. Therefore, we\'re displaying it in {{langPost}}.',
      otherLang: 'This post is multilingual.',
      published: 'Post published.',
    },
    misc: {
      titleSelf: 'Others',
      section: {
        title: 'Title',
        content: 'Content',
      },
    },
    quest: {
      titleSelf: 'Quest Guides',
      addendum: 'Addendum',
      builds: 'Builds',
      character: 'Character',
      general: 'General Tips',
      positional: 'For each position/character',
      rotations: 'Rotations',
      tips: 'Tips',
      title: 'Title',
      video: 'Video',
    },
  },
  enum: {
    unitType: {
      [UnitType.CHARACTER]: 'Character',
      [UnitType.DRAGON]: 'Dragon',
    },
  },
};
