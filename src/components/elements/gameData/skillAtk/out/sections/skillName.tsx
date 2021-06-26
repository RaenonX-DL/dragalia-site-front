import React from 'react';

import {SkillIdentifierInfo} from '../../../../../../api-def/resources';
import {PostPath} from '../../../../../../const/path/definitions';
import {useI18n} from '../../../../../../i18n/hook';
import {makePostPath} from '../../../../../../utils/path/make';
import {NextLink} from '../../../../common/link';
import {SectionProps} from '../props';


type SectionSkillNameProps = SectionProps & {
  skillIdentifierInfo: SkillIdentifierInfo,
}

export const SectionSkillName = ({atkSkillEntry, skillIdentifierInfo}: SectionSkillNameProps) => {
  const {lang} = useI18n();

  return (
    <>
      <div className="h5 mb-1">
        <NextLink href={makePostPath(PostPath.ANALYSIS, {pid: atkSkillEntry.chara.id, lang})}>
          {atkSkillEntry.chara.name[lang]}
        </NextLink>
      </div>
      <div className="text-white-50">
        {
          atkSkillEntry.skill.identifiers
            .map((identifier) => skillIdentifierInfo[identifier].trans[lang])
            .join(' / ')
        }
      </div>
    </>
  );
};
