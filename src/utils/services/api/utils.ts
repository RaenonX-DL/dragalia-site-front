import {CharacterSkill, PositionalInfo} from '../../../api-def/api';


const ApiRoot = process.env.NEXT_PUBLIC_API_ROOT;

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
  return ApiRoot + endpoint;
};
