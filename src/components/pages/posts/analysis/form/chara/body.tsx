import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {CharaAnalysisPayload, CharacterSkill} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {generateNewCharaSkill} from '../../../../../../utils/services/api/utils';
import {ArrayForm} from '../../../../../elements/form/array/main';
import {MarkdownInput} from '../../../../../elements/markdown/input';
import {PostFormDataProps, PostFormState} from '../../../../../elements/posts/form/types';
import {AnalysisSkillInput} from './skill';


type CharaAnalysisFormProps<P extends CharaAnalysisPayload> = PostFormDataProps<P> & {
  setState: (newState: PostFormState<P>) => void,
};

export const CharaAnalysisForm = <P extends CharaAnalysisPayload>({
  formState,
  setPayload,
  setState,
}: CharaAnalysisFormProps<P>) => {
  const {t} = useI18n();

  const {payload} = formState;

  const setSkills = (skills: Array<CharacterSkill>) => {
    setState({
      ...formState,
      payload: {
        ...payload,
        skills,
      },
    });
  };

  return (
    <>
      <Row>
        <Col>
          <MarkdownInput
            label={t((t) => t.posts.analysis.forceStrike)}
            onChanged={(e) => setPayload('forceStrikes', e.target.value)}
            rows={5}
            value={payload.forceStrikes}
          />
        </Col>
      </Row>
      <hr/>
      <ArrayForm
        payload={payload}
        minLength={2}
        getArray={(payload) => payload.skills}
        setArray={setSkills}
        getUpdatedElement={(element, key, value) => ({...element, [key]: value})}
        generateNewElement={generateNewCharaSkill}
        renderEntries={(skill, onChange) => (
          <AnalysisSkillInput
            name={skill.name}
            info={skill.info}
            rotations={skill.rotations}
            tips={skill.tips}
            onNameChanged={onChange('name')}
            onInfoChanged={onChange('info')}
            onRotationsChanged={onChange('rotations')}
            onTipsChanged={onChange('tips')}
            required={['info']}
          />
        )}
      />
      <hr/>
      <Row>
        <Col>
          <MarkdownInput
            label={t((t) => t.posts.analysis.tipsBuilds)}
            onChanged={(e) => setPayload('tipsBuilds', e.target.value)}
            rows={10}
            value={payload.tipsBuilds}
            required
          />
        </Col>
      </Row>
      <div className="mb-3"/>
    </>
  );
};
