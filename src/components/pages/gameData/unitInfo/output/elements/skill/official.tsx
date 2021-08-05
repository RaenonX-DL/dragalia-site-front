import React from 'react';

import {DepotPaths, OfficialSkillInfo} from '../../../../../../../api-def/resources';
import {useI18n} from '../../../../../../../i18n/hook';
import {Image} from '../../../../../../elements/common/image';
import {InfoBlock} from '../info';
import {SectionSubTitle} from '../title';


type SkillOfficialInfoProps = {
  info: OfficialSkillInfo,
}

export const SkillOfficialInfo = ({info}: SkillOfficialInfoProps) => {
  const {lang} = useI18n();

  return (
    <InfoBlock>
      <SectionSubTitle>
        <Image
          src={DepotPaths.getSkillIconURL(info.iconPath)}
          text={info.name[lang]}
          style={{height: '1.6rem'}}
        />&nbsp;
        {info.name[lang]}
      </SectionSubTitle>
      <hr/>
      {info.description[lang]}
    </InfoBlock>
  );
};
