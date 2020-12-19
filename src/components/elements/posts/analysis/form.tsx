import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {getGoogleUid} from '../../googleSignin';
import {MarkdownInput} from '../../markdown/input';
import {ExpressModal} from '../../modalExpress';
import {Prompt} from '../../prompt';
import {AnalysisSkillInput} from './skill';
import {
  ApiRequestSender,
  CharacterAnalysisPost,
  CharacterSkill,
  DragonAnalysisPost,
  PostUpdateSuccessResponse,
} from '../../../../constants/api';
import {SUPPORTED_LANG, SUPPORTED_LANG_NAME} from '../../../../constants/lang';
import Path from '../../../../constants/path';


export type ModalState = {
  show: boolean,
  title: string,
  message: string,
}


// region Analysis form base

type AnalysisPostFormBaseStates = {
  postId: string,
  setPostId: (newVal: string) => void,
  langCode: string,
  setLangCode: (newVal: string) => void,
  name: string,
  setName: (newVal: string) => void,
  summary: string,
  setSummary: (newVal: string) => void,
  summonResult: string,
  setSummonResult: (newVal: string) => void,
  passives: string,
  setPassives: (newVal: string) => void,
  normalAttacks: string,
  setNormalAttacks: (newVal: string) => void,
  videos: string,
  setVideos: (newVal: string) => void,
  story: string,
  setStory: (newVal: string) => void,
  keywords: string,
  setKeywords: (newVal: string) => void,
  modifyNote: string,
  setModifyNote: (newVal: string) => void,
  availability: boolean,
  setAvailability: (newVal: boolean) => void,
}


type AnalysisPostFormBaseProps = {
  states: AnalysisPostFormBaseStates,
  hasPost: boolean,
  handleFormSubmit: (e, setModalFailed: (props: ModalState) => void) => void
}


const AnalysisPostFormBase = (props: React.PropsWithChildren<AnalysisPostFormBaseProps>) => {
  const {states, handleFormSubmit, hasPost, children} = props;

  const {t} = useTranslation();

  // region States and event handlers
  const onPostIdChanged = (e) => {
    states.setPostId(e.target.value);
    checkAvailability(e.target.value, states.langCode);
  };

  const onLangCodeChanged = (e) => {
    states.setLangCode(e.target.value);
    checkAvailability(states.postId, e.target.value);
  };

  const onNameChanged = (e) => states.setName(e.target.value);

  const onSummaryChanged = (e) => states.setSummary(e.target.value);

  const onSummonResultChanged = (e) => states.setSummonResult(e.target.value);

  const onPassivesChanged = (e) => states.setPassives(e.target.value);

  const onNormalAttacksChanged = (e) => states.setNormalAttacks(e.target.value);

  const onVideosChanged = (e) => states.setVideos(e.target.value);

  const onStoryChanged = (e) => states.setStory(e.target.value);

  const onKeywordsChanged = (e) => states.setKeywords(e.target.value);

  const onModifyNoteChanged = (e) => states.setModifyNote(e.target.value);

  const checkAvailability = (postId, langCode) => {
    // Passing 2 arguments instead of using the variables for all is because that setting the state is an async action
    ApiRequestSender.analysisPostIdCheck(getGoogleUid() || '', parseInt(postId) || null, langCode)
      .then((data) => states.setAvailability(data.available))
      .catch(() => states.setAvailability(false));
  };
  // endregion

  // region Sections
  const sectionHeader = (
    <Row>
      <Col className="m-3 p-3 rounded bg-black-32">{t('posts.manage.add_note')}</Col>
    </Row>
  );
  const sectionTitle = (
    <Row>
      <Col lg={2}>
        <Form.Control
          className="mb-2" type="number" placeholder={t('posts.info.id')}
          isValid={states.availability} isInvalid={!states.availability}
          onChange={onPostIdChanged} value={states.postId} disabled={hasPost}
        />
      </Col>
      <Col lg={7}>
        <Form.Control
          className="mb-2" type="text" placeholder={t('posts.analysis.unit_name')}
          onChange={onNameChanged} value={states.name} required
        />
      </Col>
      <Col lg={3}>
        <Form.Control
          as="select" defaultValue={states.langCode} disabled={hasPost}
          onChange={onLangCodeChanged}>
          {
            SUPPORTED_LANG.map((lang) => {
              return (<option key={lang} value={lang}>{SUPPORTED_LANG_NAME.get(lang)}</option>);
            })
          }
        </Form.Control>
      </Col>
    </Row>
  );
  const sectionGeneralTop = (
    <>
      <Row>
        <Col>
          <h5>{t('posts.analysis.summary')}</h5>
          <MarkdownInput onChanged={onSummaryChanged} rows={5} value={states.summary}/>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.summon_result')}</h5>
          <MarkdownInput onChanged={onSummonResultChanged} rows={5} value={states.summonResult}/>
        </Col>
      </Row>
      <hr/>
      <Row className="mb-3">
        <Col>
          <h5>{t('posts.analysis.passive')}</h5>
          <MarkdownInput onChanged={onPassivesChanged} rows={5} value={states.passives}/>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h5>{t('posts.analysis.normal_attack')}</h5>
          <MarkdownInput onChanged={onNormalAttacksChanged} rows={5} value={states.normalAttacks}/>
        </Col>
      </Row>
    </>
  );
  const sectionGeneralBottom = (
    <>
      <Row>
        <Col>
          <h5>{t('posts.analysis.videos')}</h5>
          <MarkdownInput onChanged={onVideosChanged} rows={5} value={states.videos}/>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.story')}</h5>
          <MarkdownInput onChanged={onStoryChanged} rows={5} value={states.story}/>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.keywords')}</h5>
          <MarkdownInput onChanged={onKeywordsChanged} rows={5} value={states.keywords}/>
        </Col>
      </Row>
    </>
  );
  const sectionModifyNote = (
    <>
      <h5>{t('posts.manage.modify_note')}</h5>
      <Row>
        <Col><MarkdownInput onChanged={onModifyNoteChanged} rows={5}/></Col>
      </Row>
    </>
  );
  const sectionControl = (
    <Row className="mb-6">
      <Col>
        <Button type="submit" className="float-right" disabled={!states.availability}>
          {hasPost ? t('posts.manage.edit') : t('posts.manage.publish')}
        </Button>
      </Col>
    </Row>
  );
  // endregion

  // region Modals
  const [modalSubmissionFailedState, setModalSubmissionFailedState] = React.useState<ModalState>(
    {show: false, title: '', message: ''},
  );

  const modalSubmissionFailed = (
    <ExpressModal
      title={modalSubmissionFailedState.title} message={modalSubmissionFailedState.message}
      show={modalSubmissionFailedState.show}
      fnHideModal={() => setModalSubmissionFailedState({show: false, title: '', message: ''})}
    />);
  // endregion

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (getGoogleUid() === null) {
      setModalSubmissionFailedState({
        show: true,
        title: t('google_signin.no_uid'),
        message: t('google_signin.no_uid_details'),
      });
      return;
    }

    handleFormSubmit(e, setModalSubmissionFailedState);
  };

  return (
    <>
      {modalSubmissionFailed}
      <form onSubmit={onFormSubmit}>
        {sectionHeader}
        {sectionTitle}
        <hr/>
        {sectionGeneralTop}
        {children}
        {sectionGeneralBottom}
        {
          hasPost &&
          <>
            <hr/>
            {sectionModifyNote}
          </>
        }
        <hr/>
        {sectionControl}
      </form>
    </>
  );
};

// endregion


// region Partial analysis form (character)

type AnalysisPostPartialFormCharaStates = {
  forceStrikes: string,
  setForceStrikes: (newVal: string) => void,
  skills: Array<CharacterSkill>,
  setSkills: (newVal: Array<CharacterSkill>) => void,
  generateSkillNew: () => CharacterSkill,
  tipsBuilds: string,
  setTipsBuilds: (newVal: string) => void,
}


type AnalysisPostPartialFormCharaProps = {
  states: AnalysisPostPartialFormCharaStates,
}


const AnalysisPostPartialFormChara = (props: AnalysisPostPartialFormCharaProps) => {
  const {states} = props;

  const {t} = useTranslation();

  const onForceStrikesChanged = (e) => states.setForceStrikes(e.target.value);

  const onSkillChanged = (elemIdx, key) => (e) => {
    const newSkillData = states.skills.map((skill, skillIdx) => {
      if (elemIdx !== skillIdx) {
        // Keep the data not being changed intact
        return skill;
      }

      // Update the data
      skill[key] = e.target.value;
      return skill;
    });

    states.setSkills(newSkillData);
  };
  const onSkillAdded = () => {
    states.setSkills(states.skills.concat([states.generateSkillNew()]));
  };
  const onSkillRemoved = () => {
    if (states.skills.length > 2) {
      states.setSkills(
        states.skills.filter(
          (skill, skillIdx) => (states.skills.length - 1) !== skillIdx));
    }
  };

  const onTipsBuildsChanged = (e) => states.setTipsBuilds(e.target.value);

  return (
    <>
      <Row>
        <Col>
          <h5>{t('posts.analysis.force_strike')}</h5>
          <MarkdownInput onChanged={onForceStrikesChanged} rows={5} value={states.forceStrikes}/>
        </Col>
      </Row>
      <hr/>

      {
        states.skills.map((skill, skillIdx) => (
          <div key={`skill-info-${skillIdx}`} className="mt-2">
            <AnalysisSkillInput
              name={skill.name}
              info={skill.info}
              rotations={skill.rotations}
              tips={skill.tips}
              onNameChanged={onSkillChanged(skillIdx, 'name')}
              onInfoChanged={onSkillChanged(skillIdx, 'info')}
              onRotationsChanged={onSkillChanged(skillIdx, 'rotations')}
              onTipsChanged={onSkillChanged(skillIdx, 'tips')}
              required={['info']}/>
          </div>
        ))
      }

      <Row className="mt-2">
        <Col>
          <Button
            variant="outline-danger" className="d-inline float-right ml-2" onClick={onSkillRemoved}>
            {t('misc.remove')}
          </Button>
          <Button
            variant="outline-success" className="d-inline float-right" onClick={onSkillAdded}>
            {t('misc.add')}
          </Button>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <h5>{t('posts.analysis.tips_builds')}</h5>
          <MarkdownInput onChanged={onTipsBuildsChanged} rows={5} value={states.tipsBuilds}/>
        </Col>
      </Row>
    </>
  );
};

// endregion


// region Partial analysis form (dragon)

type AnalysisPostPartialFormDragonStates = {
  ultimate: string,
  setUltimate: (newVal: string) => void,
  notes: string,
  setNotes: (newVal: string) => void,
  suitableCharacters: string,
  setSuitableCharacters: (newVal: string) => void,
}


type AnalysisPostPartialFormDragonProps = {
  states: AnalysisPostPartialFormDragonStates,
}


const AnalysisPostPartialFormDragon = (props: AnalysisPostPartialFormDragonProps) => {
  const {states} = props;

  const {t} = useTranslation();

  const onUltimateChanged = (e) => states.setUltimate(e.target.value);
  const onNotesChanged = (e) => states.setNotes(e.target.value);
  const onSuitableCharactersChanged = (e) => states.setSuitableCharacters(e.target.value);

  return (
    <>
      <Row>
        <Col>
          <h5>{t('posts.analysis.ultimate')}</h5>
          <MarkdownInput onChanged={onUltimateChanged} rows={5} value={states.ultimate}/>
        </Col>
      </Row>

      <hr/>

      <Row>
        <Col>
          <h5>{t('posts.analysis.notes_dragon')}</h5>
          <MarkdownInput onChanged={onNotesChanged} rows={5} value={states.notes}/>
        </Col>
      </Row>

      <hr/>

      <Row>
        <Col>
          <h5>{t('posts.analysis.suitable')}</h5>
          <MarkdownInput onChanged={onSuitableCharactersChanged} rows={5} value={states.suitableCharacters}/>
        </Col>
      </Row>
    </>
  );
};

// endregion


// region Character analysis form

type AnalysisPostFormCharaProps = {
  post?: CharacterAnalysisPost | null,
  fnSendRequest: (payload) => Promise<PostUpdateSuccessResponse>
}

// noinspection DuplicatedCode
export const AnalysisPostFormChara = ({post, fnSendRequest}: AnalysisPostFormCharaProps) => {
  const {t, i18n} = useTranslation();

  // region States and event handlers
  const [postId, setPostId] = React.useState(post?.seqId.toString() || '');
  const [langCode, setLangCode] = React.useState(post?.lang || i18n.language);
  const [name, setName] = React.useState(post?.name || '');
  const [summary, setSummary] = React.useState(post?.summary || '');
  const [summonResult, setSummonResult] = React.useState(post?.summonResult || '');
  const [passives, setPassives] = React.useState(post?.passives || '');
  const [normalAttacks, setNormalAttacks] = React.useState(post?.normalAttacks || '');
  const [videos, setVideos] = React.useState(post?.videos || '');
  const [story, setStory] = React.useState(post?.story || '');
  const [keywords, setKeywords] = React.useState(post?.keywords || '');
  const [modifyNote, setModifyNote] = React.useState('');
  const [availability, setAvailability] = React.useState(true);

  const statesBase = {
    postId, setPostId,
    langCode, setLangCode,
    name, setName,
    summary, setSummary,
    summonResult, setSummonResult,
    passives, setPassives,
    normalAttacks, setNormalAttacks,
    videos, setVideos,
    story, setStory,
    keywords, setKeywords,
    modifyNote, setModifyNote,
    availability, setAvailability,
  };

  const generateSkillNew = (name?: string) => ({name: name || '', info: '', rotations: '', tips: ''});

  const [forceStrikes, setForceStrikes] = React.useState(post?.forceStrikes || '');
  const [skills, setSkills] = React.useState<Array<CharacterSkill>>(
    post?.skills ||
    [
      generateSkillNew('S1'),
      generateSkillNew('S2'),
    ],
  );
  const [tipsBuilds, setTipsBuilds] = React.useState(post?.tipsBuilds || '');

  const statesChara = {
    forceStrikes, setForceStrikes,
    skills, setSkills, generateSkillNew,
    tipsBuilds, setTipsBuilds,
  };
  // endregion

  const [redirToPostPage, setRedirToPostPage] = React.useState(-1);

  if (redirToPostPage > 0) {
    return <Redirect to={{pathname: Path.getAnalysis(redirToPostPage), search: `?lang=${langCode}`}}/>;
  }

  const handleFormSubmit = (e, setModalFailed) => {
    let promise;

    if (post) {
      promise = fnSendRequest({
        google_uid: getGoogleUid() || '',
        seq_id: post.seqId,
        lang: langCode,
        name: name,
        summary: summary,
        summon: summonResult,
        passives: passives,
        normal_attacks: normalAttacks,
        force_strikes: forceStrikes,
        skills: skills,
        tips_builds: tipsBuilds,
        videos: videos,
        story: story,
        keywords: keywords,
        modify_note: modifyNote,
      });
    } else {
      promise = fnSendRequest({
        google_uid: getGoogleUid() || '',
        seq_id: postId || undefined,
        lang: langCode,
        name: name,
        summary: summary,
        summon: summonResult,
        passives: passives,
        normal_attacks: normalAttacks,
        force_strikes: forceStrikes,
        skills: skills,
        tips_builds: tipsBuilds,
        videos: videos,
        story: story,
        keywords: keywords,
      });
    }

    promise
      .then((data) => {
        if (data.success) {
          setRedirToPostPage(data.seqId);
        } else {
          setModalFailed({
            show: true,
            title: t('posts.manage.publish_failed'),
            message: data.code.toString(),
          });
        }
      })
      .catch((error) => {
        setModalFailed({
          show: true,
          title: t('posts.manage.publish_failed'),
          message: JSON.stringify(error.toString()),
        });
      });
  };

  return (
    <>
      <Prompt/>
      <AnalysisPostFormBase
        states={statesBase} hasPost={post !== undefined && post !== null} handleFormSubmit={handleFormSubmit}>
        <AnalysisPostPartialFormChara states={statesChara}/>
        <div className="mb-3"/>
      </AnalysisPostFormBase>
    </>
  );
};

// endregion

// region Dragon analysis form

type AnalysisPostFormDragonProps = {
  post?: DragonAnalysisPost | null,
  fnSendRequest: (payload) => Promise<PostUpdateSuccessResponse>
}

// noinspection DuplicatedCode
export const AnalysisPostFormDragon = ({post, fnSendRequest}: AnalysisPostFormDragonProps) => {
  const {t, i18n} = useTranslation();

  // region States and event handlers
  const [postId, setPostId] = React.useState(post?.seqId.toString() || '');
  const [langCode, setLangCode] = React.useState(post?.lang || i18n.language);
  const [name, setName] = React.useState(post?.name || '');
  const [summary, setSummary] = React.useState(post?.summary || '');
  const [summonResult, setSummonResult] = React.useState(post?.summonResult || '');
  const [passives, setPassives] = React.useState(post?.passives || '');
  const [normalAttacks, setNormalAttacks] = React.useState(post?.normalAttacks || '');
  const [videos, setVideos] = React.useState(post?.videos || '');
  const [story, setStory] = React.useState(post?.story || '');
  const [keywords, setKeywords] = React.useState(post?.keywords || '');
  const [modifyNote, setModifyNote] = React.useState('');
  const [availability, setAvailability] = React.useState(true);

  const statesBase = {
    postId, setPostId,
    langCode, setLangCode,
    name, setName,
    summary, setSummary,
    summonResult, setSummonResult,
    passives, setPassives,
    normalAttacks, setNormalAttacks,
    videos, setVideos,
    story, setStory,
    keywords, setKeywords,
    modifyNote, setModifyNote,
    availability, setAvailability,
  };

  const [ultimate, setUltimate] = React.useState(post?.ultimate || '');
  const [notes, setNotes] = React.useState(post?.notes || '');
  const [suitableCharacters, setSuitableCharacters] = React.useState(post?.suitableCharacters || '');

  const statesDragon = {
    ultimate, setUltimate,
    notes, setNotes,
    suitableCharacters, setSuitableCharacters,
  };
  // endregion

  const [redirToPostPage, setRedirToPostPage] = React.useState(-1);

  if (redirToPostPage > 0) {
    return <Redirect to={{pathname: Path.getAnalysis(redirToPostPage), search: `?lang=${langCode}`}}/>;
  }

  const handleFormSubmit = (e, setModalFailed) => {
    let promise;

    if (post) {
      promise = fnSendRequest({
        google_uid: getGoogleUid() || '',
        seq_id: post.seqId,
        lang: langCode,
        name: name,
        summary: summary,
        summon: summonResult,
        passives: passives,
        normal_attacks: normalAttacks,
        ultimate: ultimate,
        notes: notes,
        suitable_characters: suitableCharacters,
        videos: videos,
        story: story,
        keywords: keywords,
        modify_note: modifyNote,
      });
    } else {
      promise = fnSendRequest({
        google_uid: getGoogleUid() || '',
        seq_id: postId || undefined,
        lang: langCode,
        name: name,
        summary: summary,
        summon: summonResult,
        passives: passives,
        normal_attacks: normalAttacks,
        ultimate: ultimate,
        notes: notes,
        suitable_characters: suitableCharacters,
        videos: videos,
        story: story,
        keywords: keywords,
      });
    }

    promise
      .then((data) => {
        if (data.success) {
          setRedirToPostPage(data.seqId);
        } else {
          setModalFailed({
            show: true,
            title: t('posts.manage.publish_failed'),
            message: data.code.toString(),
          });
        }
      })
      .catch((error) => {
        setModalFailed({
          show: true,
          title: t('posts.manage.publish_failed'),
          message: JSON.stringify(error.toString()),
        });
      });
  };

  return (
    <>
      <Prompt/>
      <AnalysisPostFormBase
        states={statesBase} hasPost={post !== undefined && post !== null} handleFormSubmit={handleFormSubmit}>
        <AnalysisPostPartialFormDragon states={statesDragon}/>
        <div className="mb-3"/>
      </AnalysisPostFormBase>
    </>
  );
};

// endregion


// Code are duplicative for future design diversion (if any)
