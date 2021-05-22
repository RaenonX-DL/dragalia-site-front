import {TranslationStruct} from '../definition';

export const translation: TranslationStruct = {
  donation: {
    tierS1: 'Tier S-1',
    tierS2: 'Tier S-2',
    tierSSS: 'Tier SSS',
  },
  game: {
    data: {
      titleSelf: 'ゲーム情報',
      titleActive: 'スキル',
      titleEx: 'EX / リンクEX',
      titleOthers: '他の情報',
      titlePassive: 'アビリティ',
      titleSkillAtk: '攻擊スキル',
      titleSkillSup: 'サポートスキル',
      titleStory: 'ストーリー',
    },
    ex: {
      name: {
        filterElement: '角色屬性',
        filterExBuffParam: 'EX 加成參數',
        filterChainedExBuffParam: 'CEX 加成參數',
        exAbility: 'EX 效果',
        chainedExAbility: 'CEX 效果',
      },
      desc: {
        filterElement: '如果複選屬性，例如: 火、風，則所有火屬性角色或風屬性角色的條目將會被列入，否則略過。' +
          '如果沒有選擇任何屬性，將會顯示所有條目。',
        filterExBuffParam: '如果複選條件，則顯示符合任一條件的條目。如果沒有選擇任何參數，將會顯示所有條目。',
        filterChainedExBuffParam: '如果複選條件，則顯示符合任一條件的條目。如果沒有選擇任何參數，將會顯示所有條目。',
        exAbility: '同效果在隊伍內不可重複。套用效果範圍皆為全隊，並且不限受益者屬性。',
        chainedExAbility: '又稱連鎖 EX。預設套用效果範圍皆為全隊，然而，通常會有目標屬性限制。' +
          '和 EX 不同的是，CEX 的效果可以重複。',
      },
      badge: {
        infoCooldown: '冷卻 {{cooldownSec}} 秒',
        infoDurationCount: '可用 {{durationCount}} 次',
        infoDurationSec: '持續 {{durationSec}} 秒',
        infoMaxOccurrences: '最多 {{maxOccurrences}} 次',
        infoMaxStackCount: '最多 {{maxStackCount}} 層',
        infoProbabilityPct: '{{probabilityPct}}% 機率',
        infoTargetAction: '目標行為: {{targetAction}}',
      },
    },
    skillAtk: {
      name: {
        atk: '攻擊',
        atkInGame: '遊戲顯示',
        atkConditional: '條件增攻 (%)',
        atkBuff: 'Buff (%)',
        buffBoost: 'Buff 數增傷',
        buffCount: 'Buff 擁有數',
        buffZoneSelf: 'Buff 區域 (自己)',
        buffZoneAlly: 'Buff 區域 (隊友)',
        ex: 'EX',
        exBlade: '刀',
        exWand: '法',
        crt: '爆擊',
        crtRate: '爆擊機率 (%)',
        crtDamage: '爆擊傷害 (%)',
        crtInspired: '超靈感',
        skill: '技能傷害',
        skillBuff: 'Buff (%)',
        skillPassive: '被動總和 (%)',
        skillEnergized: '超活力',
        punisher: '特攻',
        punisherBk: 'BK 特攻 (%)',
        punisherOthers: '其他特攻 (%)',
        other: '其它',
        otherElementBonus: '屬性增傷 (%)',
        otherHp: 'HP (%)',
        target: '目標相關',
        targetElement: '屬性',
        targetAffliction: '異常狀態',
        targetState: {
          title: '目標狀態',
          none: '無',
          od: 'OD',
          bk: 'BK',
        },
        targetDefDown: '降防 (%)',
        targetDef: '基礎防禦',
        targetDefBk: 'BK 降防率',
        filter: '條件篩選',
        filterElement: '屬性',
        filterAffliction: '異常狀態',
        filterOther: '其他',
        filterSharedOnly: '限定共享技',
      },
      desc: {
        atk: '泛指所有遊戲內與攻擊力有關的參數。',
        atkInGame: '俗稱表攻。此數值為直接打開角色資訊頁面時，包含龍、護符、加值在內的攻擊力。' +
          '此為暫時欄位，日後預計新增直接選擇角色並且自動配置龍、武器的功能。',
        atkConditional: '任何需要條件的攻擊上升屬於此類別。例如: 疾風怒濤、HP > 70% 等。',
        atkBuff: '任務中，下方 Buff 列所顯示的攻擊增益。此項目上限值為 200%。',
        buffBoost: '泛指所有藉由 Buff 數量提升傷害的參數。',
        buffCount: '當前身上所擁有的 Buff 數。注意，靈感、活力無論等級，都只算做 1 個 Buff。',
        buffZoneSelf: '當前所在由自己建立的 Buff 區域數量。',
        buffZoneAlly: '當前所在由隊友建立的 Buff 區域內的數量。',
        ex: '後台 EX 被動。屬性增傷 (皮亞尼)、降攻 / 降防特攻 (龍絆日李弗)、爆擊傷害 (萬聖慕慕、情人女僕斧) ' +
          '請直接輸入至對應區塊內。',
        crt: '泛指所有和爆擊相關的參數。',
        crtRate: '爆擊機率。注意，如果超靈感有勾選的話，無論此項數值為何，計算過程都會直接認定絕對爆擊。',
        crtDamage: '爆擊傷害提升率。遊戲內所計算的 1.7x 爆擊增傷已經計算在內。',
        skill: '泛指所有和技能傷害有關的參數。',
        skillBuff: '任務中，下方 Buff 列所顯示的技能增傷。此項目上限值為 200%。注意，貓的技能傷害 +180% 屬於此類別。',
        skillPassive: '龍、護符的技能傷害增益。注意，貓的被動屬於 Buff，不屬於此類別。',
        punisher: '泛指所有和特攻有關的參數。',
        punisherBk: '敵人於 Break 狀態中的特攻。注意，BK 後的降防不屬於此類別。',
        punisherOthers: '其他特攻，例如異常狀態特攻 (護符)、OD 特攻、降攻 / 降防特攻 (龍絆日李弗) 都屬於此類別。',
        other: '泛指所有未歸類的增傷手段，例如屬性增傷。',
        otherElementBonus: '其它屬性增傷。皮亞尼、波賽頓．勇的屬性增傷屬於此類別。',
        otherHp: '當前血量。',
        target: '泛指所有和目標相關的參數',
        targetElement: '目標的屬性。',
        targetAffliction: '目標當前擁有的異常狀態。',
        targetState: {
          title: '目標當前的狀態。',
        },
        targetDefDown: '對目標有效的降防。任務中，Boss 血條上方可以查看。',
        targetDef: '目標基礎防禦。通常為 10；光牙為 15 (2020/12/20)。',
        targetDefBk: 'BK 時，目標的防禦變動係數。通常為 0.6；暗牙、絕牙為 0.8 (BSK 1.25)。',
        filter: '如果此區塊中有任何條件被勾選，則符合任一勾選條件的技能條目將會被列入，否則略過。',
        filterElement: '如果複選屬性，例如: 火、風，則所有火屬性角色或風屬性角色的技能條目將會被列入，否則略過。',
        filterAffliction: '如果複選異常狀態，例如: 毒、火燒，則所有會上毒或火燒的條目將會被列入，否則略過。' +
          '注意，這邊的條件篩選指的是技能本身所帶的異常狀態，並非異常特攻。',
        filterOther: '其他篩選條件。如果有勾選限定共享技，則篩選、計算時，只會考慮、顯示共享技能。',
      },
      entry: {
        notCancelable: '此技能無法取消。',
        cancelable: '此技能可於 {{cancelTime}} 秒後取消。',
        stackable: '可堆疊',
        unstackable: '不可疊',
        affliction: '於 {{afflictionTime}} 秒 ({{afflictionProbabilityPct}}% / {{afflictionDuration}} 秒)',
        buffCount: 'Buff 數增傷',
        buffCountDescCapped: '+{{each}}% of the total mod for each buff; Capped at {{limit}}%',
        buffCountDescUncapped: '+{{each}}% of the total mod for each buff; Uncapped',
        buffZone: 'Buff 區域數增傷',
        buffZoneDesc: '{{selfBoost}}% mod for each self-built area / {{allyBoost}}% mod for each ally-built area',
        dispel: 'Dispel',
        dispelDesc: 'At {{dispelTiming}} sec',
        crisisUp: '低血增傷',
        crisisUpDesc: '最多增傷 {{maxRate}} 倍',
        crisisDown: '滿血增傷',
        crisisDownDesc: '最低血時 {{maxRate}} 倍',
      },
      summary: {
        atk: '攻擊 - {{atkVal}}',
        atkData: '表攻: {{atkInGame}} / 被動: +{{atkConditionalPct}}% / Buff: +{{atkBuffPct}}%',
        buff: 'Buff',
        buffData: '數量: {{buffCount}} / 區域: {{buffZoneSelf}} (自己) {{buffZoneAlly}} (隊友)',
        ex: 'EX',
        exBlade: '刀',
        exWand: '法',
        exNone: '(無)',
        crt: '爆擊 - {{crtVal}}',
        crtInspired: '超靈感',
        crtRate: '爆擊率 {{crtRate}} %',
        crtDamage: '爆擊傷害 +{{crtDamage}} %',
        skill: '技能 - {{skillVal}}',
        skillPassive: '被動 +{{skillPassivePct}}%',
        skillBuff: 'Buff +{{skillBuffPct}}%',
        skillEnergized: '超活力',
        punisher: '特攻 - {{punisherVal}}',
        punisherData: 'BK 特攻 {{punishersBkPct}}% / 其他特攻 {{punishersOtherPct}}%',
        other: '其它',
        otherData: '屬性增傷 +{{otherElemBonusPct}}% / HP {{otherCurrentHpPct}}%',
        sharedOnly: '只顯示共享技',
      },
      collapse: 'ズームイン/アウト',
    },
    tools: {
      titleSelf: '他のツール',
      rotation: 'ルーティン計算',
    },
  },
  googleSignin: {
    noUid: '不正確なGoogleアカウント',
    noUidDetails: '不正確なGoogleアカウント。もう一度ログインしてください。',
    login: 'Googleログイン',
    loginError: 'エラー: {{error}}',
    loginFailed: 'ログイン失敗',
    loginUnknown: '不明なエラーが発生，ログインができない。({{error}})',
    loginOfflineDisallowed: '無法使用離線登入。請連至網路後重試。({{code}})',
    logout: 'Googleログアウト',
    logoutFailed: 'ログアウト失敗',
    logoutUnknown: '不明なエラーが発生，ログアウトができない。',
    requestFailed: 'ログインのリクエストが失敗',
  },
  lang: {
    inUse: '使用中',
  },
  message: {
    donation: {
      url: '捐款網址',
      info: '只要每個月捐款超過 USD $1 以上，即可無廣告瀏覽網站！\n\n' +
        '如果使用 Ko-Fi 或是 Paypal 一次性捐款者，只要捐款超過 $1，一樣可以享有無廣告瀏覽。有效期為無廣告開始日起一個月內。\n\n' +
        '捐款後，請使用捐款時所使用的 Email 信箱登入網站，以利開啟無廣告服務。',
    },
    warning: {
      adminOnly: 'You must have admin privilege to access this page.',
      pageNav: 'このページ閉じますか？',
      truncated: '項目が多過ぎるため、一部だけ展示されてます。({{displayed}} 表示中 / 全 {{returned}})。' +
        '第{{displayed}}個項目の以後の結果も欲しいという方は検索範囲を指定してください。',
    },
    info: {
      constructing: 'サイト機能工事中。後で発布する。\n\n' +
        '### メール通知システムが完成する前は\n\n各SNSの上発表する (例: 掲示板、Facebook 、LINE…など) 。' +
        '\n\n### メール通知システム完成後\n\nログインした者や，通知機能登録した者は新機能について、メールに送ります。',
      welcome: 'OM製作のドラガリ攻略サイトへようこそ！大部分の機能や、ページやまた工事中なので，よろしくお願い致します。\n\n' +
        '今 **高難易度クエスト攻略、キャラ、ドラゴン評価** は完成してる，ご覧ください。\n\n' +
        'ページに選択したら說明もついてます。',
    },
    alert: {
      ads: '每個月捐款超過 USD $1 即可無廣告瀏覽網站！[詳情請點此](/thanks)',
      migration: '目前網站基礎正在翻新中。使用過程中若有任何持續問題，請到各大 SNS 上聯繫我，感謝！',
    },
  },
  misc: {
    add: '追加',
    omMember: 'OM 同盟成員',
    omGroup: 'OM グループ成員',
    remove: '削除',
    search: '搜尋',
    searchKeyword: 'Keyword',
  },
  meta: {
    inUse: {
      about: {
        title: 'サイトについて',
        description: 'description',
      },
      analysisList: {
        title: '評価のカタログ',
        description: 'description',
      },
      analysisNewChara: {
        title: '新キャラの評価',
        description: 'description',
      },
      analysisNewDragon: {
        title: '新ドラゴンの評価',
        description: 'description',
      },
      analysisEdit: {
        title: '編輯評測 - {{title}}',
        description: 'description',
      },
      analysisEditChara: {
        title: '編輯評測 - {{title}}',
        description: 'description',
      },
      analysisEditDragon: {
        title: '編輯評測 - {{title}}',
        description: 'description',
      },
      analysisPost: {
        title: '評価',
        description: 'description',
      },
      home: {
        title: 'ホームページ',
        description: 'description',
      },
      questEdit: {
        title: '高難易度クエスト攻略の編集 #Q{{pid}}',
        description: 'description',
      },
      questList: {
        title: '高難易度クエスト攻略のカタログ',
        description: 'description',
      },
      questNew: {
        title: '高難易度クエスト攻略の追加',
        description: 'description',
      },
      questPost: {
        title: '高難易度クエスト攻略',
        description: 'description',
      },
      site: {
        title: 'ドラガリ攻略サイト by OM',
        description: 'description',
      },
      thanks: {
        title: 'ご協力に感謝',
        description: 'description',
      },
      gameData: {
        ex: {
          title: 'TBA',
          description: 'description',
        },
        skillAtk: {
          title: 'TBA',
          description: 'description',
        },
      },
    },
    error: {
      404: {
        title: '頁面不存在',
        description: 'description',
      },
    },
    temp: {
      constructing: {
        title: '工事中',
        description: 'description',
      },
    },
    suffix: ' | ドラガリ攻略サイト by OM',
  },
  posts: {
    analysis: {
      titleSelf: 'ユニット評価',
      forceStrike: 'バーストアタック',
      keywords: 'キーワード',
      normalAttack: '通常殴り',
      notesDragon: '記事',
      unitName: '評価の名前',
      unitType: '評価の対象',
      passive: 'アビリティ',
      skills: 'スキル情報',
      story: 'ストーリー',
      suitable: '相性良いキャラ',
      summary: '結論',
      summonResult: '個人のガチャ結果',
      tipsBuilds: 'ポイント & おすすめ配置',
      ultimate: '必殺技',
      videos: '関する動画',
      error: {
        noPostId: '文章 ID 未指定。',
        unknownType: '文の種類が分別できない - {{analysisType}}。',
      },
      skill: {
        name: 'スキルの名前',
        info: 'スキルの情報',
        rotations: 'スキルのシフト',
        tips: 'スキルのポイント',
      },
      type: {
        character: 'キャラ',
        dragon: 'ドラゴン',
      },
    },
    info: {
      titleSelf: '本ページの情報',
      id: 'ID',
      lastModified: '最後の編集時間',
      published: '発表時間',
      title: 'お題',
      viewCount: 'ご覽回數',
    },
    manage: {
      add: '文を追加する',
      addChara: '文を追加する (キャラ)',
      addDragon: '文を追加する(ドラゴン)',
      addNote: '指定 IDあれば，文が多国言語版もあります。サイトはその ID と言語検査する。対応できない文のID は使えない。',
      collapse: 'ズームイン/アウト',
      edit: '文を編集',
      fetchListFailed: '文のリスト獲得失敗。({{error}})',
      fetchPostFailed: '文の獲得失敗。({{error}})',
      md: 'Markdown',
      modifyNote: '記事を編集する',
      modifyTime: '日期を編集する',
      postNotExists: '文がございません。',
      preview: 'プレビュー',
      publish: '文を発表する',
      publishFailed: '発表失敗',
    },
    message: {
      altLang: '本ページは言語が {{langUi}} の版がございませんなので。展示した言語が{{langPost}} の版に変えました。',
      otherLang: '本ページが他言語の版もあります。',
      published: '文を発表しました。',
    },
    misc: {
      titleSelf: '他の文章',
    },
    quest: {
      titleSelf: 'クエスト攻略',
      addendum: '記事',
      builds: '配置',
      character: 'キャラ',
      general: '通常注意ポイント',
      positional: 'キャラ/職業別の攻略',
      rotations: 'ルーティン / スキル順番',
      tips: 'ポイント',
      title: 'お題',
      video: '関する動画',
    },
  },
};
