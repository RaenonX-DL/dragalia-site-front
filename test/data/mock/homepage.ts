import {PostType, SupportedLanguages, HomepageData} from '../../../src/api-def/api';


export const mockData: HomepageData = {
  posts: {
    [PostType.ANALYSIS]: [
      {
        title: 'A1', type: PostType.ANALYSIS, pid: 1,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 10000,
          modifiedEpoch: 1640923804,
          publishedEpoch: 1610923804,
          userSubscribed: true,
        },
      },
      {
        title: 'A3', type: PostType.ANALYSIS, pid: 3,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 5000,
          modifiedEpoch: 1635923804,
          publishedEpoch: 1605923804,
          userSubscribed: true,
        },
      },
      {
        title: 'A2', type: PostType.ANALYSIS, pid: 2,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1620923804,
          publishedEpoch: 1590923804,
          userSubscribed: false,
        },
      },
      {
        title: 'A4', type: PostType.ANALYSIS, pid: 4,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1590923804,
          publishedEpoch: 1590923804,
          userSubscribed: true,
        },
      },
      {
        title: 'A5', type: PostType.ANALYSIS, pid: 5,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1585923804,
          publishedEpoch: 1565923804,
          userSubscribed: true,
        },
      },
    ],
    [PostType.QUEST]: [
      {
        title: 'Q1', type: PostType.QUEST, pid: 1,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 10000,
          modifiedEpoch: 1640923804,
          publishedEpoch: 1610923804,
          userSubscribed: false,
        },
      },
      {
        title: 'Q3', type: PostType.QUEST, pid: 3,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 5000,
          modifiedEpoch: 1635923804,
          publishedEpoch: 1605923804,
          userSubscribed: false,
        },
      },
      {
        title: 'Q2', type: PostType.QUEST, pid: 2,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1620923804,
          publishedEpoch: 1590923804,
          userSubscribed: false,
        },
      },
      {
        title: 'Q4', type: PostType.QUEST, pid: 4,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1590923804,
          publishedEpoch: 1590923804,
          userSubscribed: true,
        },
      },
      {
        title: 'Q5', type: PostType.QUEST, pid: 5,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1585923804,
          publishedEpoch: 1565923804,
          userSubscribed: true,
        },
      },
    ],
    [PostType.MISC]: [
      {
        title: 'M1', type: PostType.MISC, pid: 1,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 10000,
          modifiedEpoch: 1640923804,
          publishedEpoch: 1610923804,
          userSubscribed: true,
        },
      },
      {
        title: 'M3', type: PostType.MISC, pid: 3,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 5000,
          modifiedEpoch: 1635923804,
          publishedEpoch: 1605923804,
          userSubscribed: false,
        },
      },
      {
        title: 'M2', type: PostType.MISC, pid: 2,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1620923804,
          publishedEpoch: 1590923804,
          userSubscribed: true,
        },
      },
      {
        title: 'M4', type: PostType.MISC, pid: 4,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1590923804,
          publishedEpoch: 1590923804,
          userSubscribed: true,
        },
      },
      {
        title: 'M5', type: PostType.MISC, pid: 5,
        info: {
          lang: SupportedLanguages.CHT,
          viewCount: 2000,
          modifiedEpoch: 1585923804,
          publishedEpoch: 1565923804,
          userSubscribed: true,
        },
      },
    ],
  },
  stats: {
    user: {
      perCountry: {
        D1: {
          total: 210000,
          countries: [
            {country: 'Taiwan', user: 70000},
            {country: 'United States', user: 70000},
            {country: 'Hong Kong', user: 70000},
          ],
        },
        D7: {
          total: 21000,
          countries: [
            {country: 'Taiwan', user: 7000},
            {country: 'United States', user: 7000},
            {country: 'Hong Kong', user: 7000},
          ],
        },
        D30: {
          total: 2100,
          countries: [
            {country: 'Taiwan', user: 700},
            {country: 'United States', user: 700},
            {country: 'Hong Kong', user: 700},
          ],
        },
      },
      perLang: {
        data: [
          {user: {'English': 666, 'Chinese': 777}, date: '20211231'},
          {user: {'English': 666, 'Chinese': 777}, date: '20220101'},
          {user: {'English': 555, 'Chinese': 444}, date: '20220102'},
          {user: {'English': 555, 'Chinese': 444}, date: '20220103'},
          {user: {'English': 555, 'Chinese': 777}, date: '20220104'},
          {user: {'English': 555, 'Chinese': 777}, date: '20220105'},
        ],
        toppedLang: ['English', 'Chinese'],
      },
      active: {
        data: [
          {date: '20220110', D28: 28000, D7: 7000, D1: 1000},
          {date: '20220111', D28: 28001, D7: 7001, D1: 1001},
        ],
      },
    },
    lastFetchedEpoch: 1641442985000,
  },
};
