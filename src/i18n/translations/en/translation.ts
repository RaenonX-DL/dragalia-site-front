import {TranslationStruct} from '../definition';


export const translation: TranslationStruct = {
  donation: {
    tierS1: 'Tier S-1',
    tierS2: 'Tier S-2',
    tierSSS: 'Tier SSS',
  },
  game: {
    data: {
      titleSelf: 'Game Data',
      titleActive: 'Active',
      titleEx: 'Co-ability / CCA',
      titleOthers: 'Others',
      titlePassive: 'Passive',
      titleSkillAtk: 'Skill (Attack)',
      titleSkillSup: 'Skill (Support)',
      titleStory: 'Story',
    },
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
      name: {
        atk: 'STR',
        atkInGame: 'In game',
        atkConditional: 'Cond. STR (%)',
        atkBuff: 'Buff (%)',
        buffBoost: 'Buff Stacks',
        buffCount: 'Buff Count',
        buffZoneSelf: 'Buff Zone (Self)',
        buffZoneAlly: 'Buff Zone (Team)',
        ex: 'CoAb',
        exBlade: 'Blade',
        exWand: 'Wand',
        crt: 'CRT',
        crtRate: 'CRT (%)',
        crtDamage: 'CDMG (%)',
        crtInspired: 'Inspiration',
        skill: 'SD',
        skillBuff: 'Buff (%)',
        skillPassive: 'Passive SD (%)',
        skillEnergized: 'Energize',
        punisher: 'Punisher',
        punisherBk: 'BK Punisher (%)',
        punisherOthers: 'Other Punisher (%)',
        other: 'Other',
        otherElementBonus: 'Elemental Bonus (%)',
        otherHp: 'HP (%)',
        target: 'Target',
        targetElement: 'Target Element',
        targetAffliction: 'Target Affliction',
        targetState: {
          title: 'State',
          none: 'None',
          od: 'OD',
          bk: 'BK',
        },
        targetDefDown: 'Def Down (%)',
        targetDef: 'Base Def',
        targetDefBk: 'BK Def Rate',
        filter: 'Filter',
        filterElement: 'Element',
        filterAffliction: 'Affliction',
        filterOther: 'Other',
        filterSharedOnly: 'Shared Skill Only',
      },
      desc: {
        atk: 'Any parameter that relates to strength',
        atkInGame: 'Also known as base strength. ' +
          'This parameter refers to the displayed STR when you open a character’s info. ' +
          'Includes dragon, wyrmprints, and augments. ' +
          'This parameter is temporary. ' +
          'A function will be added in the future to automatically choose dragons and weapons' +
          ' after you pick the character.',
        atkConditional: 'Any conditional STR buff. For example: Flurry STR, HP > 70%, etc.',
        atkBuff: 'During a quest, the STR buff value that is displayed, capped at 200%.',
        buffBoost: 'For any skill that scales with buff counts.',
        buffCount: 'Amount of buffs applied. ' +
          'Note: Energize and Inspiration, no matter what stage, are considered as 1 buff.',
        buffZoneSelf: 'Number of self-cast buff zones you are in.',
        buffZoneAlly: 'Number of ally-cast buff zones you are in.',
        ex: 'Co-ability. For elemental damage (Peony), Reduced Str/Def punisher (Gala Leif), ' +
          'CDMG (H!Mym, V!Melody) please input directly in their respective fields.',
        crt: 'Any parameter that relates to crit.',
        crtRate: 'Crit rate. Note: If inspired is checked, ' +
          'no matter what is inputted here the calculation will assume crit.',
        crtDamage: 'Crit damage % increase. The base 1.7x crit damage is already included.',
        skill: 'Any parameter that relates to skill damage.',
        skillBuff: 'During a quest, the skill damage buff value that is displayed, capped at 200%. ' +
          'Note: Cat Sith’s +180% SD is in this field.',
        skillPassive: 'SD% from dragon and wyrmprints. ' +
          'Note: Cat Sith’s passive is a buff and not in this field.',
        punisher: 'Any parameter that relates to punisher',
        punisherBk: 'Punisher to enemies in the break state. ' +
          'Note: The def reduction from break state is not in this field.',
        punisherOthers: 'Other punishers such as affliction punishers (wyrmprint), ' +
          'OD punisher, reduced Str/Def punisher (Gala Leif) are in this field.',
        other: 'Other parameters that increase damage such as elemental damage.',
        otherElementBonus: 'Other elemental bonus such as Peony’s co-ability and Gala Reborn Poseidon’s passive.',
        otherHp: 'Current HP',
        target: 'Any parameter relating to the target',
        targetElement: 'Target element',
        targetAffliction: 'Affliction applied to target',
        targetState: {
          title: 'Target’s current state',
        },
        targetDefDown: 'Def down applied to target. Displayed above the boss’s HP bar during the quest.',
        targetDef: 'Target’s base def. Usually 10; Kai Yan is 15 (2020/12/20).',
        targetDefBk: 'Target’s def reduction during break state. Usual 0.6; ' +
          'Tartarus and LVolk are 0.8 (BSK 1.25)',
        filter: 'If any filter is selected, then the parameters that apply will be listed. ' +
          'Otherwise, they will be skipped.',
        filterElement: 'If multiple elements are selected, such as flame and wind, ' +
          'then all flame and wind characters’ skills will be listed, otherwise they will be skipped.',
        filterAffliction: 'If multiple afflictions are selected, such as poison and burn, ' +
          'then anything that applies poison or burn will be listed, otherwise they will be skipped. ' +
          'Note: This filters for skills that apply afflictions, not ones that have affliction punishers.',
        filterOther: 'Other filter options. ' +
          'If Shared Skill Only is selected, then when filtering and calculating, ' +
          'only shared skills will be considered and displayed.',
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
        crisisUp: 'Crisis Scaling',
        crisisUpDesc: 'Max {{maxRate}}x',
        crisisDown: 'Stamina Scaling',
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
    },
    tools: {
      titleSelf: 'Game Tools',
      rotation: 'Rotations Calculator',
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
        'results are truncated ({{displayed}} Displayed / {{returned} Available). ' +
        'To display the truncated results, please narrow the search condition.',
    },
    info: {
      constructing: 'Under construction. ' +
        'Will announce upon completion somewhere.\n\n' +
        '### Completed before email notification system has been completed\n\n' +
        'We will announce it in social media (Reddit, FB groups, etc.).\n\n' +
        '### Completed after the email notification system has been implemented\n\n' +
        'Users who logged in before or signed up for the email list will receive an email about the new release.',
      fetching: 'Fetching...',
      welcome: 'Welcome to the DL info website constructed and maintained ' +
        'by the members of the alliance - Oasis of the Maniacs (OM)!\n\n' +
        'Most of the pages and the features are still under construction.\n\n' +
        '**HDTs/Agitos, Unit Analysis** are completed. Take a look!\n\n' +
        'Head to the pages/functions which are still under construction to get more details.',
    },
    error: {
      auth: {
        noProvider: 'No authentication providers available.',
      },
    },
  },
  misc: {
    add: 'Add',
    omMember: 'OM Alliance Member',
    omGroup: 'OM Group Member',
    openGif: 'Click to open GIF',
    remove: 'Remove',
    search: 'Search',
    searchKeyword: 'Keyword',
  },
  meta: {
    inUse: {
      about: {
        title: 'About',
        description: 'Information about this website.',
      },
      analysisIndex: {
        title: 'Index of analysis',
        description: 'List of character/dragon analyses.',
      },
      analysisNewChara: {
        title: 'New character analysis',
        description: 'Page to add a new character analysis.',
      },
      analysisNewDragon: {
        title: 'New dragon analysis',
        description: 'Page to add a new dragon analysis.',
      },
      analysisEdit: {
        title: 'Edit analysis - {{name}}',
        description: 'Page to edit the analysis of {{name}}.',
      },
      analysisPost: {
        title: '【Analysis】{{name}}',
        description: '{{summary}}',
      },
      home: {
        title: 'Homepage',
        description: 'Homepage of DL info website by OM.',
      },
      questEdit: {
        title: 'Edit quest guide - {{title}}',
        description: 'Page to edit quest guide: {{title}}.',
      },
      questList: {
        title: 'Index of quest guides',
        description: 'Index page of the quest guides.',
      },
      questNew: {
        title: 'New quest guide',
        description: 'Page to create a new High-Difficulty quest guide.',
      },
      questPost: {
        title: '【Quest Guide】{{title}}',
        description: 'Visit for the details.',
      },
      site: {
        title: 'DL Info by OM',
        description: 'Dragalia Lost info website by Oasis of the Maniacs.',
      },
      thanks: {
        title: 'Special Thanks',
        description: 'List of the contributors of this website.',
      },
      gameData: {
        ex: {
          title: 'Co-ab / CCA lookup',
          description: 'Page to search for all Co-abilities/Chained Co-abilities in the game.',
        },
        skillAtk: {
          title: 'Attacking skill lookup',
          description: 'Page to search for all attacking skills in the game.',
        },
      },
      auth: {
        signIn: {
          title: 'Login',
          description: 'Sign-in to the website to enable more features.',
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
    suffix: ' | DL Info by OM',
  },
  posts: {
    analysis: {
      titleSelf: 'Unit Analysis',
      forceStrike: 'Force Strike Module',
      keywords: 'Keywords',
      normalAttack: 'Normal Attack Module',
      notesDragon: 'Notes',
      unitName: 'Unit Name',
      unitType: 'Unit Type',
      passive: 'Passive',
      skills: 'Skill',
      story: 'Story',
      suitable: 'Suitable Characters',
      summary: 'Summary',
      summonResult: 'My Summoning Result',
      tipsBuilds: 'Tips & Builds',
      ultimate: 'Ultimate',
      videos: 'Related Videos',
      error: {
        noPostId: 'Analysis ID is not specified.',
        noResult: 'No matching results. Please verify your searching condition.',
        unknownType: 'Unknown post type - {{analysisType}}.',
        unavailable: 'Analysis Unavailable',
      },
      skill: {
        name: 'Skill Name',
        info: 'Skill Info',
        rotations: 'Skill Rotations',
        tips: 'Skill Tips',
      },
      type: {
        character: 'Character',
        dragon: 'Dragon',
      },
    },
    info: {
      titleSelf: 'Post Information',
      id: 'ID',
      lastModified: 'Last Modified',
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
      collapse: 'Collapse/Expand',
      edit: 'Edit Post',
      fetchListFailed: 'Failed to fetch the post list. ({{error}})',
      fetchPostFailed: 'Failed to fetch the post. ({{error}})',
      md: 'Markdown',
      editNote: 'Modification Note',
      modifyTime: 'Modified at',
      postNotExists: 'Post not exists.',
      preview: 'Preview',
      publish: 'Publish',
      publishFailed: 'Failed to publish',
    },
    message: {
      altLang: 'This post does not have a version in {{langUi}}. Therefore, we\'re displaying it in {{langPost}}.',
      otherLang: 'This post is multilingual.',
      published: 'Post published.',
    },
    misc: {
      titleSelf: 'Others',
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
};
