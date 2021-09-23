import {UnitType} from '../../../api-def/api/other/unit';
import {TranslationStruct} from '../definition';

export const translation: TranslationStruct = {
  autoComplete: {
    selected: '選択済み',
    inputPlaceholder: '検索キーワードを入力する',
    noMatchingOptions: '一致する結果が見つかりません。',
    noneSelected: '選択していない。',
  },
  donation: {
    tierS1: 'Tier S-1',
    tierS2: 'Tier S-2',
    tierSSS: 'Tier SSS',
  },
  game: {
    data: {
      titleSelf: 'ゲーム情報',
      titleActive: 'スキル',
      titleEx: 'EXアビ / リンクEXアビ',
      titleOthers: '他の情報',
      titlePassive: 'アビリティ',
      titleSkillAtk: '攻擊スキル',
      titleSkillSup: 'サポートスキル',
      titleStory: 'ストーリー',
    },
    ex: {
      name: {
        filterElement: '属性',
        filterExBuffParam: 'EXアビリティ',
        filterChainedExBuffParam: 'リンクEXアビリティ',
        exAbility: 'EXアビ効果',
        chainedExAbility: 'リンクEXアビ効果',
      },
      desc: {
        filterElement: '属性を選択して、キャラが検索できます。火、風，などと複数属性も選択可能です。' +
          '属性１つも選択していない場合、全属性が表示されます。',
        filterExBuffParam: 'EXアビを選択して、キャラが検索できます。複数を選択した場合、いずれかに合致するキャラが表示されます。何も選択していない場合、全てのキャラが表示されます。',
        filterChainedExBuffParam: 'リンクEXアビを選択して、キャラ検索できます。複数選択した場合、いずれかに合致するキャラが表示されます。何も選択していない場合、全てのキャラが表示されます。',
        exAbility: 'EXアビの効果はパーティ内全員にかかります。またキャラ同士の属性が異なっても効果が得られます。しかし同種のEXアビが重複した場合は最も高い効果のみが有効になります。',
        chainedExAbility: 'リンクEXアビの効果はパーティ内全員にかかります。EXアビと異なるのが、基本的に同じ属性同士のみに有効する' +
          '同種のリンクEXアビが重複して、効果が加算されます。',
      },
      badge: {
        infoCooldown: 'クールタイム {{cooldownSec}} 秒',
        infoDurationCount: '使用可能 {{durationCount}} 回',
        infoDurationSec: '効果時間 {{durationSec}} 秒',
        infoMaxOccurrences: '最大 {{maxOccurrences}} 回',
        infoMaxStackCount: '最大 {{maxStackCount}} 個',
        infoProbabilityPct: '{{probabilityPct}}% 確率',
        infoTargetAction: '対象アクション: {{targetAction}}',
      },
    },
    skillAtk: {
      input: {
        atk: {
          title: {
            name: '攻擊',
            desc: '攻撃力に関するパラメータ全般。',
          },
          inGame: {
            name: 'ゲーム内表示',
            desc: '通称、攻ステ値。この値はキャラ詳細画面を開いた時の値で、武器、ドラゴン、護符、ボーナス他を含む値です。' +
              '※将来的には、キャラ、武器、などを選択したら自動計算させる予定です。',
          },
          conditional: {
            name: '条件付き攻UP (%)',
            desc: '例：疾風怒濤、HP70%以上で、等。',
          },
          buff: {
            name: 'バフ (%)',
            desc: 'クエスト中、画面下に表示される攻撃バフアイコン。バフによるUP上限は200%。',
          },
        },
        buff: {
          boost: {
            name: 'バフ',
            desc: 'バフの個数だけ【ブースト】がかかってダメージが増えるスキルがある。その計算用。',
          },
          count: {
            name: 'バフ個数',
            desc: 'キャラにかかっているバフ個数。※ただし、ヒラメキ、やる気はレベルに関係なくバフ1個扱い。',
          },
          zone: {
            self: {
              name: 'バフフィールドの数 (自身が作成)',
              desc: '自身で作ったバフフィールドの数。',
            },
            ally: {
              name: 'バフフィールドの数 (味方が作成)',
              desc: '味方が作ったバフフィールドの数。',
            },
          },
        },
        ex: {
          title: 'EXアビ',
          description: 'サブキャラによるEXアビはパッシブ扱い。' +
            '※例外的なEXアビ（例：属性ダメ、攻防ダウン特効、クリティカルダメ、など）は直接各項目に入力してください。',
          blade: '刀',
          wand: 'ロッド',
        },
        crt: {
          title: {
            name: 'クリティカル',
            desc: 'クリティカルに関するパラメータ全般。',
          },
          rate: {
            name: 'クリティカル率 (%)',
            desc: 'クリティカル率。なお斧キャラは基礎値4%、他武器種は基礎値2%を持ちます。' +
              '※超ヒラメキを有効にしている場合、クリティカル率100%に置き換えて計算します。',
          },
          damage: {
            name: 'クリティカルダメージ (%)',
            desc: 'クリティカルダメージ率。基礎値170%を持ちますが既に含めて計算しています。バフによるUP上限は400%。',
          },
          inspired: '超ヒラメキ',
        },
        skill: {
          title: {
            name: 'スキルダメージ',
            desc: 'スキルダメージに関するパラメータ全般。',
          },
          buff: {
            name: 'バフ (%)',
            desc: 'クエスト中、画面下に表示されるクリティカルダメバフアイコン。バフによるUP上限は200%。' +
              '※闇竜ケットシーによるバフ+180%はここに入ります。',
          },
          passive: {
            name: 'パッシブのスキルダメ合計 (%)',
            desc: 'ドラゴンや護符による効果はここに入ります。' +
              '※闇竜ケットシーによる効果はパッシブ扱いではなくバフ扱いなので、ここには入りません。',
          },
          energized: '超やる気',
        },
        punisher: {
          title: {
            name: '特効',
            desc: '特効に関するパラメータ全般。',
          },
          bk: {
            name: 'ブレイク 特効 (%)',
            desc: 'ブレイク特効は、その他特効と乗算関係にある。',
          },
          others: {
            name: 'その他 特効 (%)',
            desc: 'その他特効。(例：状態異常特効、OD特効、攻防ダウン特効、など)',
          },
        },
        dragon: {
          title: {
            name: '竜化',
            desc: '竜化ダメージアップに関する全て。',
          },
          facility: {
            name: '建築 (%)',
            desc: '竜哭碑獲得量。聖城の城詳細で強化値が見える。',
          },
          passive: {
            name: 'パッシブ (%)',
            desc: '竜化ダメージアップ効果の全て、例: 護符、リンクEX。',
          },
        },
        other: {
          title: {
            name: 'その他',
            desc: 'その他、未分類のパラメータ全般。',
          },
          elemBonus: {
            name: '属性ダメージ (%)',
            desc: '属性ダメ。(例：光ピアニー、ブレイヴ系ドラゴン．など)',
          },
          hp: {
            name: 'HP (%)',
            desc: '現在HP',
          },
        },
        target: {
          title: {
            name: '攻撃ターゲット関係',
            desc: '攻撃ターゲットの状態に関するパラメータ全般。',
          },
          element: {
            name: '属性',
            desc: '攻撃ターゲットの属性。',
          },
          affliction: {
            name: '状態異常',
            desc: '攻撃ターゲットに付与されている状態異常。',
          },
          state: {
            title: {
              name: '攻撃ターゲットのモードゲージ状態',
              desc: '攻撃ターゲットのモードゲージの状態。(通常orオーバードライブ状態orブレイク状態)',
            },
            none: '通常',
            od: 'OD',
            bk: 'BK',
          },
          def: {
            base: {
              name: '基礎防御力',
              desc: '攻撃ターゲットの基礎防御力。通常は 10。※光アギトカイエンは 15 (2020/12/20)。',
            },
            down: {
              name: '防御ダウン (%)',
              desc: '付与した防御ダウンデバフ。(クエスト中、ボスHPバーの上に表示されるデバフアイコンのこと)',
            },
            bk: {
              name: 'BK 防御ダウン率',
              desc: '攻撃ターゲットのBK時の防御ダウン率。通常は 0.6。※闇アギトタルタロスや火アギトルヴ絕級は 0.8。(またバーサク状態では 1.25)。',
            },
          },
        },
        filter: {
          title: {
            name: 'フィルタ',
            desc: '条件を選択して、スキルが検索できます。複数選択した場合、いずれかに合致するスキルが表示されます。' +
              '何も選択していない場合、全てのスキルが表示されます。',
          },
          element: {
            name: '属性',
            desc: '例；火、風を選択するとその２属性いずれかのキャラスキルだけが表示されます。',
          },
          affliction: {
            name: '状態異常',
            desc: '例；火傷、毒を選択するといずれかを付与できるキャラスキルだけが表示されます。' +
              '※状態異常付与できるスキルを検索する機能です。(状態異常特効を持つスキルではありません。)',
          },
          unitType: {
            name: '種類',
            desc: '選択してない場合、全てのスキルの元が表示されます',
          },
          other: {
            name: 'その他',
            desc: 'その他フィルタリング条件。シェアスキルのみ検索可能です。',
          },
          ssCostMax: {
            name: 'SS Cost (上限)',
            desc: '数値は 0 の時、この条件は無効になる。SS上限を入力した時、数値以内のスキルが表示されます。',
          },
          only: {
            dispel: 'バフ解除のみ表示',
            shared: 'シェアスキルのみ表示',
          },
        },

      },
      display: {
        title: '情報',
        desc: '結果から現す情報を選択する。',
        options: {
          actualDamage: '実際のダメージ',
          damageInfo: 'ダメージ情報',
          damageDistribution: 'ダメージ割合',
          affliction: '状態異常',
          spInfo: 'SP 效率/情報',
          animationInfo: 'アニメーション情報',
        },
      },
      entry: {
        notCancelable: 'モーションキャンセル不可',
        cancelable: 'モーション発動 {{cancelTime}} 秒後キャンセル可能',
        stackable: '重複可能',
        unstackable: '重複不可',
        affliction: '{{affliction}} @ {{afflictionTime}} 秒 ({{afflictionProbabilityPct}}% / {{afflictionDuration}} 秒)',
        buffCount: 'バフ個数が多いほどダメUP',
        buffCountDescCapped: 'バフ1個の総計倍率の最大値 +{{each}}% ; 上限 {{limit}}%',
        buffCountDescUncapped: 'バフ1個の総計倍率の最大値+{{each}}% ; 上限なし',
        buffZone: 'バフフィールド個数が多いほどダメUP',
        buffZoneDesc: '自身の作ったフィールド上の敵に{{selfBoost}}% 追加ダメ1ヒット / 味方の作ったフィールド上の敵に{{allyBoost}}% 追加ダメ1ヒット',
        dispel: 'バフ解除',
        dispelDesc: '＠ {{dispelTiming}} 秒',
        crisisUp: '残HP少ないほどダメUP',
        crisisUpDesc: '最大ダメ倍率 {{maxRate}} 倍',
        crisisDown: '残HP多いほどダメUP',
        crisisDownDesc: '最低ダメ倍率 {{maxRate}} 倍',
      },
      summary: {
        atk: '攻擊 - {{atkVal}}',
        atkData: '攻ステ値: {{atkInGame}} / パッシブ: +{{atkConditionalPct}}% / バフ: +{{atkBuffPct}}%',
        buff: 'Buff',
        buffData: 'バフ個数: {{buffCount}} / バフフィールド数: {{buffZoneSelf}} (自身) {{buffZoneAlly}} (味方)',
        ex: 'EX',
        exBlade: '刀',
        exWand: 'ロッド',
        exNone: '(通常)',
        crt: 'クリティカル - {{crtVal}}',
        crtInspired: '超ヒラメキ',
        crtRate: 'クリティカル率 {{crtRate}} %',
        crtDamage: 'クリティカルダメ +{{crtDamage}} %',
        skill: 'スキル - {{skillVal}}',
        skillPassive: 'パッシブ +{{skillPassivePct}}%',
        skillBuff: 'バフ +{{skillBuffPct}}%',
        skillEnergized: '超やる気',
        punisher: '特効 - {{punisherVal}}',
        punisherData: 'BK 特効 {{punishersBkPct}}% / その他特効 {{punishersOtherPct}}%',
        dragon: '竜化ダメージ - {{dragonVal}}',
        dragonData: '建築 +{{facilityPct}}% / アビリティ+{{passivePct}}%',
        target: 'ターゲット状態',
        targetData: {
          element: '属性: ',
          afflictions: '状態異常: ',
          state: '状態: {{state}}',
          def: '基礎防御力 {{def}} / 防御ダウン -{{defDownPct}}% / BK 防御ダウン率 {{defBkRate}}',
        },
        other: 'その他',
        otherData: '属性ダメ +{{otherElemBonusPct}}% / HP {{otherCurrentHpPct}}%',
      },
      collapse: '展開 / 折り畳み',
      error: {
        noInfoToDisplay: '表示する情報を1つ以上選択してください。',
        noResult: '一致する結果が見つかりません。',
        presetMustLogin: 'プリセットを使用するため、ログインが必要です',
      },
      animation: {
        earliest: '最速 {{time}} 秒 ',
        earliestUnavailable: '利用不可',
        hitTiming: 'ヒットする時間',
        hitTimingHeader: 'ヒットする時間 (秒)',
        cancelInfo: 'データをキャンセルする',
        cancelHeader: {
          action: '行動',
          time: '時間 (秒)',
          preConditions: '他の条件',
        },
      },
      sort: {
        text: '排序: {{sortBy}}',
        mods: '倍率',
        damage: '実際のダメージ',
        sp: 'SP',
        ssp: 'SSP',
      },
      spInfo: {
        efficiencyIndexes: '效率基準',
        efficiency: {
          modPctPer1KSp: '% / 1K SP',
          modPctPer1KSsp: '% / 1K SSP',
          secPer1KSp: '異常有効期限 (秒) / 1K SP',
          secPer1KSsp: '異常有効期限 (秒) / 1K SSP',
        },
        sp: 'SP',
        spGradualFill: '{{secs}} 秒 ({{sp}})',
        spPctPerSec: 'SP回復量 % / 秒',
        ssp: 'SSP',
        ssCost: 'SS Cost',
      },
      info: {
        affliction: '一部の状態異常の有効時間の振れ幅 (主に凍結、気絶)は計算中に使用した秒数は最大值。',
        animation: 'アニメーションと実際は差があります。キャラの評価に実際のスキルモーションがあります。',
        preset: 'シェアボタンを押すとサイトリンク生産。',
        presetExpiry: 'リンクが生産した日から30日に渡って削除されます。',
      },
    },
    tools: {
      titleSelf: '他のツール',
      rotation: 'ルーティン計算',
    },
    unitInfo: {
      header: {
        combo: {
          index: '#',
          mods: '倍率',
          hitCount: '攻撃回数',
          sp: 'SP',
          utp: 'UTP',
          odRate: 'OD 倍率',
          crisisMods: '背水倍率',
          nextComboSec: '次のコンボ 時間 (秒)',
          spPerSec: 'SP / 秒',
        },
      },
      title: {
        passive: 'アビリティ',
        coAbility: {
          official: 'EX / リンクEX (公式から)',
          parsed: 'EX / リンクEX (自動分析)',
          global: 'EX',
          chained: 'リンクEX',
        },
        normalAttack: '通常殴りのシフト',
        skills: {
          all: 'スキル',
          official: '公式説明',
          parsed: {
            atk: '攻撃スキル',
          },
        },
      },
      info: {
        passive: '下のは公式説明。' +
          '詳しい情報をもらいたいの方は [キャラの評価]({{analysis}}) へご覧ください。',
        coAbility: '下のは公式説明。[EX/リンクEXの検索]({{exLookup}}機能へようこそ。) feature.\n\n' +
          'EXアビリティはいずれか属性にも有効。効果は重複不可。 ' +
          'リンクEXは同じ属性キャラ (通常) には有効。効果は重複可能。',
        skill: {
          official: '下のは公式説明。' +
            '詳しい情報をもらいたいの方は [キャラの評価]({{analysis}}) へご覧ください。',
          parsed: '下のは自動分析の結果。データに一部誤りがあるかもしれません。' +
            '[攻撃スキルの検索]({{atkSearch}})機能へようこそ。',
        },
      },
      links: {
        analysis: '評価',
        info: 'キャラ情報',
        story: 'ストーリー',
      },
      text: {
        total: '(総計)',
        relatedLinks: 'に関するリンク',
      },
    },
    unitTier: {
      tier: {
        title: '評価',
        ranking: 'ランキング',
        isCompDependent: 'チームのサポートが必要。',
        notRanked: '未評価',
      },
      tips: {
        main: '下のランキングはご参考まで、キャラの強さ／手順はキャラの評価ページへご覧ください！',
        compIcon: '固定のサポートキャラが必要。',
      },
      points: {
        edit: '記事を編集する',
        title: 'ポイント',
        type: {
          title: '種類',
          strength: '長所',
          weakness: '短所',
          trait: '特性',
        },
        description: '説明',
        tipsOnClick: ' "i" をクリックすると、重要な情報がご覧になれます。例: ポイントになるアビリティが持っているキャラ。',
        info: {
          linkedUnits: '該当するキャラ／ドラゴン',
          error: {
            noLinkedUnits: '該当するキャラ／ドラゴンなし。',
          },
        },
      },
      dimension: {
        conSolo: {
          name: '虚無 (ソロ)',
          description: '虚無有効のクエスト中(ソロ)、キャラの評価 (例: ディアボロス)。',
        },
        conCoop: {
          name: '虚無 (マルチ)',
          description: '虚無有効のクエスト中(マルチ)、キャラの評価 (例: ディアボロス)。',
        },
        conAi: {
          name: '虚無 (AI)',
          description: '虚無有効のクエスト中(例: ディアボロス)、AIにとしての評価。',
        },
        normalSolo: {
          name: '通常 (ソロ)',
          description: '通常クエスト中(ソロ)、キャラの評価 (例: 真竜、絶級アギト)。',
        },
        normalCoop: {
          name: '通常 (マルチ)',
          description: '通常クエスト中(マルチ)、キャラの評価 (例: 真竜、絶級アギト)。',
        },
        normalAi: {
          name: '通常 (AI)',
          description: '通常クエスト中(例: 真竜、絶級アギト)、AIにとしての評価。',
        },
        sharedSkill: {
          name: 'シェアスキル',
          description: 'シェアスキルの評価。(キャラ限定)',
        },
      },
      display: {
        conSolo: '虚無 (ソロ)',
        conCoop: '虚無 (マルチ)',
        conAi: '虚無 (AI)',
        normalSolo: '通常 (ソロ)',
        normalCoop: '通常 (マルチ)',
        normalAi: '通常 (AI)',
        sharedSkill: 'シェア',
        all: '全部',
      },
      sort: {
        unitId: 'ユニット ID',
        avgRanking: '平均ランキング',
      },
      alert: {
        refRemoval: '特性タグが削除された場合、該当するキャラリストは閲覧不可になります。',
        noUnitInRank: '該当するキャラ／ドラゴンなし。',
      },
    },
    nameRef: {
      manage: '名前設定',
      unitId: 'ユニット ID',
      actualName: '実際の名前',
      desiredName: 'カスタマイズの名前',
      error: {
        invalidUnitId: '無効のユニットID#',
      },
      status: {
        updated: '更新成功！',
        error: '更新失敗: {{error}}',
      },
    },
  },
  userControl: {
    noUid: '該当するアカウントが見当たりません。',
    noUidDetails: '該当するアカウントIDが見当たりません。もう一度ログインし直してください。',
    login: 'ログイン',
    logout: 'ログアウト',
    loading: '読み込み中...',
  },
  lang: {
    inUse: '使用中',
  },
  message: {
    donation: {
      url: '寄付先URL',
      info: 'ご協力いただき、誠にありがとうございます！Ko-Fi、Paypalなど寄付ができます。寄付額が$1を超えた場合、広告なしでご利用は可能です。' +
        '広告なしでご利用はその日から１ヶ月です。\n\n' +
        '広告なしを起動にするためには、寄付に使ったメールアドレスでログインしてください。',
    },
    warning: {
      adminOnly: 'このページにアクセスするには、管理者アカウントでログインする必要があります。',
      truncated: '検索結果が多過ぎるため、一部だけ表示しています。({{displayed}} 表示中 / 全 {{returned}})。' +
        '第{{displayed}}個目以降の検索結果を見たい場合は検索結果が少なくなるよう再検索してください。',
    },
    info: {
      constructing: '工事中です。\n\n' +
        '### 完成したら各SNSの上でお知らせします。(例: 掲示板、Facebook 、LINE…など) ' +
        '\n\n### メール通知機能も作成中ですのでお待ちください。',
      welcome: '同盟「OM」製作のドラガリ攻略サイトへようこそ！工事中の機能やページも多いですが、どうぞよろしくお願いいたします。\n\n' +
        '現在 **高難易度クエスト攻略、キャラドラゴン評価** のページの一部は完成しています、ご覧ください。\n\n' +
        'ページを選択したら說明もついてます。',
      videoTips: '如果有大陸的朋友無法觀看視頻的話，歡迎到 [我的 B 站](https://space.bilibili.com/1052053443) 查找對應視頻。',
    },
    error: {
      auth: {
        noProvider: 'ログインサービスは利用できません。',
      },
    },
  },
  misc: {
    omMember: 'OM 同盟メンバー',
    omGroup: 'OM グループメンバー',
    openImage: 'クリックすると開きます',
    search: '検索',
    searchKeyword: 'キーワード',
    showMore: 'TBA',
    showAll: 'TBA',
    update: '更新',
    sortBy: '並び替え {{order}}',
    timestamp: {
      lastModified: '最後編集は',
      lastUpdated: '最後更新は',
    },
    unitType: {
      [UnitType.CHARACTER]: 'キャラ',
      [UnitType.DRAGON]: 'ドラゴン',
    },
    collapse: 'ズームイン/アウト',
    collapseAll: '全部ズームイン/アウト',
  },
  meta: {
    inUse: {
      about: {
        title: 'サイトについて',
        description: 'サイトについて',
      },
      home: {
        title: 'ホーム',
        description: 'ようこそ ドラガリ攻略 by OM へ！',
      },
      site: {
        title: 'ドラガリ攻略 by OM',
        description: 'Oasis of the Maniacs メンバーによる共同制作サイト',
      },
      thanks: {
        title: '協力感謝',
        description: '協力したメンバーの方々',
      },
      post: {
        analysis: {
          newChara: {
            title: '新キャラの評価',
            description: '新しく追加されたキャラのページ',
          },
          newDragon: {
            title: '新ドラゴンの評価',
            description: '新しく追加されたドラゴンのページ',
          },
          edit: {
            title: '評価の編集 - {{name}}',
            description: '{{name}}を編集するページ。',
          },
          post: {
            title: '【評価】{{name}}',
            description: '{{name}}の評価',
          },
        },
        quest: {
          edit: {
            title: 'クエスト攻略の編集 #Q{{title}}',
            description: 'クエスト攻略 #Q{{pid}}の編集ページ。',
          },
          list: {
            title: 'クエスト攻略カタログ',
            description: 'クエスト攻略のカタログ。',
          },
          new: {
            title: 'クエスト攻略の追加',
            description: '追加されたクエスト攻略',
          },
          post: {
            title: '【攻略】{{title}}',
            description: '詳しい情報は下記のページをご覧ください。',
          },
        },
        misc: {
          edit: {
            title: 'TBA',
            description: 'TBA',
          },
          list: {
            title: 'TBA',
            description: 'TBA',
          },
          new: {
            title: 'TBA',
            description: 'TBA',
          },
          post: {
            title: 'TBA',
            description: 'TBA',
          },
        },
      },
      tier: {
        lookup: {
          title: 'キャラ/ドラゴンのランキング',
          description: 'クエスト中、キャラ／ドラゴンのランキングとその理由。',
        },
        edit: {
          title: 'ユニットランキングの編集',
          description: 'キャラ/ドラゴンのランキングの編集ページ。',
        },
        points: {
          index: {
            title: '特性タグの検索',
            description: 'キャラ／ドラゴンの特性検索',
          },
          usage: {
            title: 'ポイント【{{title}}】',
            description: 'ポイント【{{title}}】に関する情報、例: ポイントのアビリティが持っているキャラ、ドラゴン。',
          },
          edit: {
            title: 'ポイントの編集',
            description: 'ポイントの編集ページ。',
          },
        },
        unit: {
          title: 'TBA',
          description: 'TBA',
        },
      },
      gameData: {
        info: {
          title: 'キャラ/ドラゴン情報カタログ',
          description: '各キャラ、ドラゴンのページ',
        },
        ex: {
          title: 'EX／リンクアビリティ',
          description: 'EX／リンクアビリティの検索',
        },
        skillAtk: {
          title: '攻撃スキル',
          description: '攻撃スキルの検索',
        },
      },
      auth: {
        signIn: {
          title: 'ログイン',
          description: '他の機能を使用するにはログインが必要です。',
        },
      },
      unit: {
        info: {
          title: '{{unitName}}',
          description: ' {{unitName}}に関する情報。',
        },
        name: {
          title: 'ユニット名前設定ページ',
          description: 'ユニット名前を設定する。',
        },
      },
      story: {
        unit: {
          title: '【ユニットストーリー】{{unitName}}',
          description: '全部の{{unitName}}のストーリー。',
        },
      },
    },
    error: {
      401: {
        title: '権限が不足',
        description: '権限が不足ため、ログインの検査してください。',
      },
      404: {
        title: 'ページが存在しません',
        description: 'このページが存在しません。',
      },
    },
    temp: {
      constructing: {
        title: '工事中',
        description: 'このページが工事中',
      },
    },
    suffix: ' | ドラガリ攻略 by OM',
  },
  nav: {
    unitInfo: 'キャラ/ドラゴン情報',
    unitTier: 'ランキング',
  },
  posts: {
    analysis: {
      forceStrike: 'バーストアタック',
      keywords: 'キーワード',
      normalAttack: '通常攻撃',
      notesDragon: '記事',
      unitName: '評価の名前',
      unitType: '評価の対象',
      passive: 'アビリティ',
      skills: 'スキル情報',
      story: 'ストーリー',
      suitable: '相性良いキャラ',
      summary: '結論',
      summonResult: '個人のガチャ結果',
      summonExplanation: {
        title: '個人のガチャ結果について',
        description: 'なぜガチャ結果が【評価】ページに掲載されたのか? 皆様は疑問を持つかも知れません。 ' +
          '分析を書き始めた頃、 ' +
          '自分が皆様に「召喚の結果は純粋な運であること」を伝えてほしかったです。 ' +
          'その時、真面目に分析を書き続けることなんて、思わなかったです。 ' +
          '「出るまで数百連、天井まで引くことが普通だと」皆様に伝えたくて、' +
          '【個人のガチャ結果】は保存されました。',
      },
      tipsBuilds: 'ポイント & おすすめ装備編成',
      ultimate: '必殺技',
      videos: '関する動画',
      error: {
        noPostId: '文章 ID 未指定。',
        noResult: '検索結果あありませんでした。条件を変更して再度検索してください。',
        unknownType: '文の種類が分別できない - {{analysisType}}。',
        unavailable: '無効のページ',
      },
      skill: {
        name: 'スキルの名前',
        info: 'スキルの情報',
        rotations: 'スキルのシフト',
        tips: 'スキルのポイント',
      },
      sort: {
        unitId: 'キャラID',
        published: '発表時間',
        lastModified: '修正時間',
        viewCount: '閲覧回数',
      },
    },
    info: {
      titleSelf: '本ページの情報',
      id: 'ID',
      published: '発表は',
      title: 'お題',
      viewCount: '閲覧回数',
      viewCountComplete: '閲覧 {{count}} 回',
    },
    manage: {
      add: '文を追加する',
      addChara: '文を追加する (キャラ)',
      addDragon: '文を追加する(ドラゴン)',
      addNote: '指定 IDあれば、この文は多国言語版もあります。サイトはその ID と言語検査する。対応できない文のID は使えない。',
      edit: '文を編集',
      fetchListFailed: '文のリスト獲得失敗。({{error}})',
      fetchPostFailed: '文の獲得失敗。({{error}})',
      md: 'Markdown',
      editNote: '記事を編集する',
      postNotExists: '文がありません。',
      preview: 'プレビュー',
      publish: '文を発表する',
    },
    message: {
      altLang: '本ページは言語が {{langUi}} 版がないため、代わりに言語が {{langPost}} 版を表示しています。',
      otherLang: '本ページは他言語版もあります。',
      published: '文を発表しました。',
    },
    misc: {
      titleSelf: '他の文章',
      section: {
        title: 'TBA',
        content: 'TBA',
      },
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
  enum: {
    unitType: {
      [UnitType.CHARACTER]: 'キャラ',
      [UnitType.DRAGON]: 'ドラゴン',
    },
  },
};
