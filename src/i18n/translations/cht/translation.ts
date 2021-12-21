import {UnitType} from '../../../api-def/api';
import {TranslationStruct} from '../definition';


export const translation: TranslationStruct = {
  autoComplete: {
    noMatchingOptions: '無可用選項。',
    selected: '已選擇',
    noneSelected: '尚未選擇任何選項。',
    inputPlaceholder: '輸入關鍵字',
  },
  donation: {
    tierS1: 'Tier S-1',
    tierS2: 'Tier S-2',
    tierSSS: 'Tier SSS',
  },
  game: {
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
      input: {
        atk: {
          title: {
            name: '攻擊',
            desc: '泛指所有遊戲內與攻擊力有關的參數。',
          },
          inGame: {
            name: '遊戲顯示',
            desc: '俗稱表攻。此數值為直接打開角色資訊頁面時，包含龍、護符、加值在內的攻擊力。' +
              '此為暫時欄位，日後預計新增直接選擇角色並且自動配置龍、武器的功能。',
          },
          conditional: {
            name: '條件增攻 (%)',
            desc: '任何需要條件的攻擊上升屬於此類別。例如: 疾風怒濤、HP > 70% 等。',
          },
          buff: {
            name: 'Buff (%)',
            desc: '任務中，下方 Buff 列所顯示的攻擊增益。此項目上限值為 200%。',
          },
        },
        buff: {
          boost: {
            name: 'Buff 數增傷',
            desc: '泛指所有藉由 Buff 數量提升傷害的參數。',
          },
          count: {
            name: 'Buff 擁有數',
            desc: '當前身上所擁有的 Buff 數。注意，靈感、活力無論等級，都只算做 1 個 Buff。',
          },
          zone: {
            self: {
              name: 'Buff 區域 (自己)',
              desc: '當前所在由自己建立的 Buff 區域數量。',
            },
            ally: {
              name: 'Buff 區域 (隊友)',
              desc: '當前所在由隊友建立的 Buff 區域內的數量。',
            },
          },
        },
        ex: {
          title: 'EX',
          description: '後台 EX 被動。屬性增傷 (皮亞尼)、降攻 / 降防特攻 (龍絆日李弗)、爆擊傷害 (萬聖慕慕、情人女僕斧) ' +
            '請直接輸入至對應區塊內。',
          blade: '刀',
          wand: '法',
        },
        crt: {
          title: {
            name: '爆擊',
            desc: '泛指所有和爆擊相關的參數。',
          },
          rate: {
            name: '爆擊機率 (%)',
            desc: '爆擊機率。注意，如果超靈感有勾選的話，無論此項數值為何，計算過程都會直接認定絕對爆擊。',
          },
          damage: {
            name: '爆擊傷害 (%)',
            desc: '爆擊傷害提升率。遊戲內所計算的 1.7x 爆擊增傷已經計算在內。',
          },
          inspired: '超靈感',
        },
        skill: {
          title: {
            name: '技能傷害',
            desc: '泛指所有和技能傷害有關的參數。',
          },
          buff: {
            name: 'Buff (%)',
            desc: '任務中，下方 Buff 列所顯示的技能增傷。此項目上限值為 200%。注意，貓的技能傷害 +180% 屬於此類別。',
          },
          passive: {
            name: '被動總和 (%)',
            desc: '龍、護符的技能傷害增益。注意，貓的被動屬於 Buff，不屬於此類別。',
          },
          energized: '超活力',
        },
        punisher: {
          title: {
            name: '特攻',
            desc: '泛指所有和特攻有關的參數。',
          },
          bk: {
            name: 'BK 特攻 (%)',
            desc: '敵人於 Break 狀態中的特攻。注意，BK 後的降防不屬於此類別。',
          },
          others: {
            name: '其他特攻 (%)',
            desc: '其他特攻，例如異常狀態特攻 (護符)、OD 特攻、降攻 / 降防特攻 (龍絆日李弗) 都屬於此類別。',
          },
        },
        dragon: {
          title: {
            name: '龍化',
            desc: '泛指與龍化增傷有關的參數。',
          },
          facility: {
            name: '建築 (%)',
            desc: '目前主要由龍泣碑獲得。可以從主城中的加成頁面中查看。',
          },
          passive: {
            name: '被動 (%)',
            desc: '所有和增加龍化傷害相關效果屬於此類別，例如: 護符、CEX。',
          },
        },
        other: {
          title: {
            name: '其它',
            desc: '泛指所有未歸類的增傷手段，例如屬性增傷。',
          },
          elemBonus: {
            name: '屬性增傷 (%)',
            desc: '其它屬性增傷。皮亞尼、波賽頓．勇的屬性增傷屬於此類別。',
          },
          hp: {
            name: 'HP (%)',
            desc: '當前血量。',
          },
        },
        target: {
          title: {
            name: '目標相關',
            desc: '泛指所有和目標相關的參數。',
          },
          element: {
            name: '屬性',
            desc: '目標的屬性。',
          },
          affliction: {
            name: '異常狀態',
            desc: '目標當前擁有的異常狀態。',
          },
          state: {
            title: {
              name: '目標狀態',
              desc: '目標當前的狀態。',
            },
            none: '無',
            od: 'OD',
            bk: 'BK',
          },
          def: {
            base: {
              name: '基礎防禦',
              desc: '目標基礎防禦。通常為 10；光牙為 15 (2020/12/20)。',
            },
            down: {
              name: '降防 (%)',
              desc: '對目標有效的降防。任務中，Boss 血條上方可以查看。',
            },
            bk: {
              name: 'BK 降防率',
              desc: 'BK 時，目標的防禦變動係數。通常為 0.6；暗牙、絕牙為 0.8 (BSK 1.25)。',
            },
          },
        },
        filter: {
          title: {
            name: '條件篩選',
            desc: '如果此區塊中有任何條件被勾選，則符合任一勾選條件的技能條目將會被列入，否則略過。',
          },
          element: {
            name: '屬性',
            desc: '如果複選屬性，例如: 火、風，則所有火屬性角色或風屬性角色的技能條目將會被列入，否則略過。',
          },
          affliction: {
            name: '異常狀態',
            desc: '如果複選異常狀態，例如: 毒、火燒，則所有會上毒或火燒的條目將會被列入，否則略過。' +
              '注意，這邊的條件篩選指的是技能本身所帶的異常狀態，並非異常特攻。',
          },
          unitType: {
            name: '種類',
            desc: '技能來源。沒有選擇任何選項的話，所有技能來源都會顯示。',
          },
          other: {
            name: '其他',
            desc: '其他篩選條件。如果有勾選限定共享技，則篩選、計算時，只會考慮、顯示共享技能。',
          },
          ssCostMax: {
            name: 'SS Cost (上限)',
            desc: '輸入為 0 時，不使用此條件。否則，顯示 SS Cost 等於或小於輸入值的技能。',
          },
          only: {
            dispel: '限定可驅散',
            shared: '限定共享技',
          },
        },
      },
      display: {
        title: '顯示資訊',
        desc: '選擇想要在結果中看到的資訊。',
        options: {
          actualDamage: '實際傷害',
          damageInfo: '傷害資訊',
          damageDistribution: '傷害分布',
          affliction: '異常狀態',
          spInfo: 'SP 效率/資訊',
          animationInfo: '動畫資訊',
        },
      },
      entry: {
        notCancelable: '此技能無法取消。',
        cancelable: '此技能可於 {{cancelTime}} 秒後取消。',
        stackable: '可堆疊',
        unstackable: '不可疊',
        affliction: '{{affliction}} @ {{afflictionTime}} 秒 ({{afflictionProbabilityPct}}% / {{afflictionDuration}} 秒)',
        buffCount: 'Buff 數增傷',
        buffCountDescCapped: '每一 Buff 最多 +{{each}}% 總倍率；上限 {{limit}}%',
        buffCountDescUncapped: '每一 Buff 最多 +{{each}}% 總倍率；無上限',
        buffZone: 'Buff 區域數增傷',
        buffZoneDesc: '每 1 自建區域數倍率 +{{selfBoost}}% / 每 1 友建區域數倍率 +{{allyBoost}}%',
        dispel: '消 Buff',
        dispelDesc: '於 {{dispelTiming}} 秒',
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
        dragon: '龍化傷害 - {{dragonVal}}',
        dragonData: '建築 +{{facilityPct}}% / 被動 +{{passivePct}}%',
        target: '目標狀態',
        targetData: {
          element: '屬性: ',
          afflictions: '異常: ',
          state: '狀態: {{state}}',
          def: '基礎防禦 {{def}} / 降防 -{{defDownPct}}% / BK 降防率 {{defBkRate}}',
        },
        other: '其它',
        otherData: '屬性增傷 +{{otherElemBonusPct}}% / HP {{otherCurrentHpPct}}%',
      },
      collapse: '摺疊/展開',
      error: {
        noInfoToDisplay: '請選擇至少一項顯示資訊。',
        noResult: '無可用結果。',
        presetMustLogin: '請先登入再使用預設參數功能。',
      },
      animation: {
        earliest: '最早於 {{time}} 秒',
        earliestUnavailable: '無資料',
        hitTiming: '攻擊時間',
        hitTimingHeader: '攻擊時間 (秒)',
        cancelInfo: '取消資訊',
        cancelHeader: {
          action: '行動',
          time: '開放時間 (秒)',
          preConditions: '其他條件',
        },
      },
      sort: {
        text: '排序: {{sortBy}}',
        mods: '倍率',
        damage: '實際傷害',
        sp: 'SP',
        ssp: 'SSP',
      },
      spInfo: {
        efficiencyIndexes: '效率指標',
        efficiency: {
          modPctPer1KSp: '% / 1K SP',
          modPctPer1KSsp: '% / 1K SSP',
          secPer1KSp: '異常效期 (秒) / 1K SP',
          secPer1KSsp: '異常效期 (秒) / 1K SSP',
        },
        sp: 'SP',
        spGradualFill: '{{secs}} 秒 ({{sp}})',
        spPctPerSec: '每秒回復 SP %',
        ssp: 'SSP',
        ssCost: 'SS Cost',
      },
      info: {
        affliction: '部分異常狀態的時效為浮動值 (冰凍、暈眩較為常見)。以下計算中所使用的秒數為最大值。',
        animation: '動畫資訊和實際可能有所落差。對應角色評測中有實際技能動畫。',
        preset: '點選分享按鈕以生成參數網址。',
        presetExpiry: '網址將於最後使用日期起 30 日後刪除。',
      },
    },
    tools: {
      titleSelf: '遊戲工具',
      rotation: '輪轉計算',
      enmity: '背水倍率',
    },
    unitInfo: {
      header: {
        combo: {
          index: '#',
          mods: '倍率',
          hitCount: '攻擊次數',
          sp: 'SP',
          utp: 'UTP',
          odRate: 'OD 倍率',
          crisisMods: '壓血倍率',
          nextComboSec: '下一 Combo 時間 (秒)',
          spPerSec: 'SP / 秒',
        },
      },
      title: {
        passive: '被動技能',
        coAbility: {
          official: 'EX / CEX (官方說明)',
          parsed: 'EX / CEX (自動解析)',
          global: 'EX',
          chained: 'CEX',
        },
        normalAttack: '普攻輪轉',
        skills: {
          all: '技能',
          official: '官方說明',
          parsed: {
            atk: '攻擊技能',
          },
        },
      },
      info: {
        passive: '以下內容為官方說明。閱讀對應[角色評測]({{analysis}})以降低理解難度並了解更多細節。',
        coAbility: '以下內容為官方說明。歡迎使用 [EX/CEX 查詢]({{exLookup}}) 功能。' +
          '受程式設計影響，部分文字顯示可能會和遊戲內實際內容不同。\n\n\n' +
          'EX 不限屬性皆可套用，效果不可堆疊；CEX 通常需要對應屬性，效果可以堆疊。',
        skill: {
          official: '以下內容為官方說明。閱讀對應[角色評測]({{analysis}})以降低理解難度並了解更多細節。',
          parsed: '以下內容為自動解析結果，內容可能有誤。歡迎使用[攻擊技能搜尋]({{atkSearch}})功能。',
        },
      },
      links: {
        analysis: '評測',
        tier: '評級',
        info: '資訊',
        story: '故事',
      },
      text: {
        total: '(總計)',
        relatedLinks: '相關連結',
        iconOnly: '只顯示圖片',
      },
      tips: {
        clickNameForLinks: '點擊上方角色名稱以查看相關連結。',
      },
    },
    unitTier: {
      tier: {
        title: '評級',
        ranking: '評級',
        isCompDependent: '依賴組合',
        notRanked: '未評級',
        edit: '編輯評級',
      },
      tips: {
        main: '以下評價僅供參考，強烈建議閱讀該角色評測以了解該角色的實際強度、用法及其他詳細資訊！',
        notRanked: '此角色尚無評級。',
        compIcon: '需要搭配特定隊友以達到對應評級',
      },
      points: {
        edit: '編輯要點內容',
        title: '要點',
        type: {
          title: '種類',
          strength: '強項',
          weakness: '弱項',
          trait: '特點',
        },
        description: '敘述',
        tipsOnClick: '點擊 "i" 按鈕可以瀏覽該要點的相關資訊，例如同時擁有該要點的角色清單...等。',
        info: {
          linkedUnits: '具有此要點的角色 / 龍族',
          error: {
            noLinkedUnits: '沒有角色 / 龍族具有此要點。',
          },
        },
      },
      dimension: {
        conSolo: '虛無 (單人)',
        conCoop: '虛無 (共鬥)',
        conAi: '虛無 (AI)',
        normalSolo: '一般 (單人)',
        normalCoop: '一般 (共鬥)',
        normalAi: '一般 (AI)',
        sharedSkill: '共享技能',
      },
      display: {
        conSolo: '虛無 (單人)',
        conCoop: '虛無 (共鬥)',
        conAi: '虛無 (AI)',
        normalSolo: '一般 (單人)',
        normalCoop: '一般 (共鬥)',
        normalAi: '一般 (AI)',
        sharedSkill: '共享',
        all: '全部',
      },
      sort: {
        unitId: '物件 ID',
        avgRanking: '平均評級',
        lastUpdated: '最後更新時間',
      },
      alert: {
        refRemoval: '若被移除的要點條目有任何角色使用中，則該要點條目的參照也會被移除。',
        noUnitInRank: '無相關角色 / 龍族屬於此評級。',
      },
    },
    nameRef: {
      manage: '名稱設定',
      unitId: '物件 ID',
      actualName: '實際名稱',
      desiredName: '自訂名稱',
      error: {
        invalidUnitId: '物件 ID 不存在',
      },
      status: {
        updated: '更新成功！',
        error: '更新失敗: {{error}}',
      },
    },
    calc: {
      enmity: {
        mod: {
          enmity: {
            original: {
              title: '背水倍率',
              description: '所有裝備加總起來的背水倍率。',
            },
            effective: {
              title: '有效背水倍率',
              description: '根據當前 HP %，實際有效的背水倍率。',
            },
          },
          skill: {
            original: {
              title: '技能倍率',
              description: '原始技能倍率。',
            },
            effective: {
              title: '有效技能倍率',
              description: '套用有效背水倍率後，實際的技能倍率。',
            },
          },
        },
        hp: {
          currentPct: {
            title: 'HP %',
            description: '目前的 HP %。',
          },
          val: {
            current: {
              title: '當前 HP',
              description: '目前的實數 HP。',
            },
            max: {
              title: '最大 HP',
              description: 'HP 上限值。',
            },
          },
        },
        title: {
          mod: '倍率',
          hp: 'HP',
        },
      },
    },
    datamine: {
      catalog: {
        timestamp: '時間',
        version: '版本號',
        action: '動作',
      },
    },
  },
  userControl: {
    noUid: '無使用者 ID',
    noUidDetails: '找不到使用者 ID。請嘗試重新登入。',
    login: '登入',
    logout: '登出',
    loading: '讀取中...',
  },
  lang: {
    inUse: '目前使用中',
  },
  message: {
    donation: {
      url: '捐款網址',
      info: '使用 Ko-Fi 或是 Paypal 一次性捐款者，只要捐款超過 $1，一樣可以享有無廣告瀏覽。' +
        '有效期為無廣告開始日起一個月內。\n\n' +
        '捐款後，請使用捐款時所使用的 Email 信箱登入網站，以利開啟無廣告服務。',
    },
    warning: {
      adminOnly: '網站管理員才有此頁面的使用權限。',
      truncated: '因條目過多，只顯示部分條目 (顯示 {{displayed}} 條 / 共有 {{returned}} 條)。' +
        '如果要顯示第 {{displayed}} 條後的結果，請縮小搜尋範圍。',
    },
    info: {
      constructing: '網頁/功能建置中。建置完畢後公布。\n\n' +
        '### Email 通知系統完成前\n\n' +
        '會在各社交平台上 (例如: 巴哈、FB 社團、LINE...等) 公布。\n\n' +
        '### Email 通知系統完成後\n\n' +
        '有登入過的使用者，或是有登記要收到最新功能通知的使用者會收到關於新功能 / 頁面的 Email。',
      welcome: '歡迎來到由 OM 製作的龍絆攻略網！大部分的功能、網頁都還在建造中，不便之處請見諒。\n\n' +
        '目前 **高難攻略、物件評測** 已完成，歡迎瀏覽。\n\n' +
        '點選建置中的頁面可以查看相關說明。',
      videoTips: '如果有大陸的朋友無法觀看視頻的話，歡迎到 [我的 B 站](https://space.bilibili.com/1052053443) 查找對應視頻。',
    },
    error: {
      auth: {
        noProvider: '無可用登入服務。',
      },
    },
  },
  misc: {
    omMember: 'OM 同盟成員',
    omGroup: 'OM 群組成員',
    openImage: '點擊以開啟圖片',
    search: '搜尋',
    searchKeyword: '關鍵字',
    noResult: '查無結果。請修改條件後重新搜尋。',
    showMore: '顯示更多',
    showAll: '顯示全部',
    update: '更新',
    sortBy: '排序依據 {{order}}',
    timestamp: {
      lastModified: '最後修改於',
      lastUpdated: '最後更新於',
    },
    unitType: {
      [UnitType.CHARACTER]: '角色',
      [UnitType.DRAGON]: '龍族',
    },
    collapse: '收摺/展開',
    collapseAll: '全部收摺/展開',
  },
  meta: {
    inUse: {
      about: {
        title: '關於',
        description: '關於本網站的介紹。',
      },
      home: {
        title: '首頁',
        description: '歡迎來到 OM 龍絆攻略網！',
      },
      site: {
        title: 'OM 龍絆攻略站',
        description: '由 Oasis of the Maniacs 共同製作的失落龍絆攻略網。',
      },
      thanks: {
        title: '特別感謝',
        description: '各方面協助本網站的成員清單。',
      },
      post: {
        analysis: {
          newChara: {
            title: '新角色評測',
            description: '角色評測新增頁面。',
          },
          newDragon: {
            title: '新龍族評測',
            description: '龍族評測新增頁面。',
          },
          edit: {
            title: '編輯評測 - {{name}}',
            description: '{{name}}評測的編輯頁面。',
          },
          post: {
            title: '【評測】{{name}}',
            description: '{{summary}}',
          },
        },
        quest: {
          edit: {
            title: '編輯攻略 - {{title}}',
            description: '攻略: {{title}} 的編輯頁面。',
          },
          list: {
            title: '副本攻略目錄',
            description: '各龍絆副本攻略目錄。',
          },
          new: {
            title: '新增副本攻略',
            description: '副本攻略新增頁面。',
          },
          post: {
            title: '【攻略】{{title}}',
            description: '詳情請進入頁面查看。',
          },
        },
        misc: {
          edit: {
            title: '編輯貼文 - {{title}}',
            description: '貼文: {{title}} 的編輯頁面。',
          },
          list: {
            title: '其他貼文目錄',
            description: '其他龍絆相關貼文的目錄。',
          },
          new: {
            title: '新增其他文章',
            description: '其他文章的新增頁面。',
          },
          post: {
            title: '【其他】{{title}}',
            description: '詳情請進入頁面查看。',
          },
        },
      },
      tier: {
        lookup: {
          title: '角色/龍族評級',
          description: '各角色、龍族在不同環境下的評級及其相關原因。',
        },
        edit: {
          title: '編輯物件評級',
          description: '編輯各角色、龍族評級及其相關資訊的頁面。',
        },
        points: {
          index: {
            title: '要點索引',
            description: '角色、龍族要點的索引。',
          },
          usage: {
            title: '要點【{{title}}】',
            description: '顯示要點【{{title}}】的相關資訊，例如具有此要點的角色、龍族...等。',
          },
          edit: {
            title: '要點編輯',
            description: '編輯要點內容的頁面。',
          },
        },
        unit: {
          title: '【評級 / 要點】{{unitName}}',
          description: '{{unitName}} 的評級和要點頁面。',
        },
      },
      gameData: {
        info: {
          title: '角色/龍族索引',
          description: '各角色、龍族的評測、資訊的索引頁面。',
        },
        ex: {
          title: 'EX / CEX 搜尋',
          description: 'EX / CEX 搜尋頁面。',
        },
        skillAtk: {
          title: '攻擊技能搜尋',
          description: '各攻擊技能資訊搜尋頁面。',
        },
        datamine: {
          index: {
            title: '解包資訊一覽',
            description: '遊戲資料解包資訊一覽頁面。',
          },
          detail: {
            title: '解包資訊 - {{versionCode}}',
            description: '遊戲資料版本號 {{versionCode}} 的解包資訊頁面。',
          },
        },
      },
      auth: {
        signIn: {
          title: '登入',
          description: '登入網站以開啟更多功能。',
        },
      },
      unit: {
        info: {
          title: '{{unitName}}',
          description: '{{unitName}} 的相關資訊。',
        },
        name: {
          title: '物件名稱設定',
          description: '設定物件名稱的頁面。',
        },
      },
      calc: {
        enmity: {
          title: '背水倍率計算機',
          description: '計算背水倍率在特定 HP，或是要達到特定背水倍率所需要的 HP 的工具。',
        },
      },
      story: {
        unit: {
          title: '【角色故事】{{unitName}}',
          description: '{{unitName}} 的角色故事全集。',
        },
      },
    },
    error: {
      401: {
        title: '權限不足',
        description: '權限不足，請檢查是否已登入。',
      },
      404: {
        title: '頁面不存在',
        description: '此頁面不存在。',
      },
    },
    temp: {
      constructing: {
        title: '建置中',
        description: '網頁建置中。',
      },
    },
    suffix: ' | 龍絆攻略站 by OM',
  },
  nav: {
    gameData: {
      self: '遊戲資訊',
      passive: '被動技能',
      ex: 'EX / CEX',
      active: '主動技能',
      skillAtk: '攻擊技能',
      skillSup: '支援技能',
      others: '其他',
      story: '故事',
      datamine: '解包',
    },
    unitInfo: '角色/龍族索引',
    unitTier: '評級',
  },
  posts: {
    analysis: {
      forceStrike: '特殊蓄力',
      normalAttack: '普攻模組',
      notesDragon: '註記',
      unitName: '物件名稱',
      unitType: '物件種類',
      passive: '被動技能',
      skills: '技能資訊',
      suitable: '適配角色',
      summary: '懶人包',
      summonResult: '個人抽抽結果',
      summonExplanation: {
        title: '關於這個區塊',
        description: '有些人可能會好奇為何這個部分會出現在評測中。' +
          '一剛開始我在寫評測的時候，我想讓我的觀眾知道幾抽就中只是純粹好運，需要幾十、幾百，甚至天井才有是很正常的事情。' +
          '我從來沒有想過最後我會這麼認真寫評測，而且我也一樣想讓我們觀眾們知道前面提到關於抽卡的事情，所以我決定把這個習慣保留下來。',
      },
      tipsBuilds: '要點 & 建議配置',
      ultimate: '大招',
      videos: '相關影片',
      error: {
        noPostId: '文章 ID 未指定。',
        unknownType: '無法解析貼文種類 - {{analysisType}}。',
        unavailable: '無相關評測',
      },
      skill: {
        name: '技能名稱',
        info: '技能資訊',
        rotations: '技能輪轉',
        tips: '技能要點',
      },
      sort: {
        unitId: '角色 ID',
        published: '發布時間',
        lastModified: '修改時間',
        viewCount: '瀏覽次數',
      },
    },
    info: {
      titleSelf: '貼文資訊',
      id: 'ID',
      published: '發布於',
      title: '標題',
      viewCount: '瀏覽次數',
      viewCountComplete: '瀏覽 {{count}} 次',
    },
    manage: {
      add: '新增貼文',
      addChara: '新增貼文 (角色)',
      addDragon: '新增貼文 (龍族)',
      addNote: '若有指定 ID，則代表欲新增貼文為多國語言版本。網頁將會檢查該 ID 和語言是否可用。還沒有對應貼文的 ID 無法使用。',
      edit: '編輯貼文',
      fetchListFailed: '貼文清單獲取失敗。({{error}})',
      fetchPostFailed: '貼文獲取失敗。({{error}})',
      md: 'Markdown',
      editNote: '編輯註記',
      postNotExists: '貼文不存在。',
      preview: '預覽',
      publish: '發布貼文',
    },
    message: {
      altLang: '本貼文沒有語言為 {{langUi}} 的版本。因此，以下顯示語言為 {{langPost}} 的版本替代。',
      otherLang: '本貼文有其他語言的版本。',
      published: '貼文發布成功。',
    },
    misc: {
      titleSelf: '其他文章',
      section: {
        title: '標題',
        content: '內容',
      },
    },
    quest: {
      titleSelf: '高難攻略',
      addendum: '附記',
      builds: '配置',
      character: '角色',
      general: '通用注意事項',
      positional: '角色/職業別攻略',
      rotations: '套路 / 手順',
      tips: '要點',
      title: '標題',
      video: '影片',
    },
  },
  enum: {
    unitType: {
      [UnitType.CHARACTER]: '角色',
      [UnitType.DRAGON]: '龍族',
    },
  },
};
