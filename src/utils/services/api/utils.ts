import urlJoin from 'url-join';

import {CharacterSkill, PositionalInfo} from '../../../api-def/api';


const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;

if (!API_ROOT) {
  throw new Error(
    `Define NEXT_PUBLIC_API_ROOT as the root of the website API. ` +
    `An example of this is https://dl.raenonx.cc.`,
  );
}

export const generateNewCharaSkill = (name?: string): CharacterSkill => ({
  name: name || '',
  info: '',
  rotations: '',
  tips: '',
});

export const generateNewPositionInfo = (): PositionalInfo => ({
  position: '',
  builds: '',
  rotations: '',
  tips: '',
});

export const getFullApiUrl = (endpoint: string): string => {
  return urlJoin(API_ROOT, endpoint);
};
