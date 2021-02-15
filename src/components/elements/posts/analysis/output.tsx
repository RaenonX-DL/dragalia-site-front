import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Alert, Col, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {SUPPORTED_LANG_NAME} from '../../../../constants/lang';
import Path from '../../../../constants/path';
import {
  AnalysisPostType,
  ApiRequestSender,
  CharacterAnalysisPost,
  DragonAnalysisPost,
} from '../../../../utils/services/api';

import {
  AnalysisPostFetchStatus,
  AnalysisSkillOutput,
  FetchPost,
  getGoogleUid,
  Markdown,
  PageAnchor,
  PostFetchStatus,
  PostInfo,
  PostManageBar,
  scrollToAnchor,
} from '../../../elements';
import {AdsInPost} from '../../ads';


type AnalysisPostOutputProps = {
  fnSetTitle: (newTitle: string) => void,
}


export const AnalysisPostOutput = ({fnSetTitle}: AnalysisPostOutputProps) => {
  const {t, i18n} = useTranslation();

  const {pid} = useParams();

  const [status, setStatus] = React.useState<AnalysisPostFetchStatus>(
    {
      fetched: false,
      fetchFailed: false,
      post: null,
      failContent: '',
    },
  );

  useEffect(() => {
    // Only scroll to anchor if the post fetch succeed
    if (status.fetched && status.post) {
      scrollToAnchor();
    }
  });

  fnSetTitle(`#A${pid} ${status.post ? status.post.name : t('pages.name.analysis_post')}`);

  if (status.fetched && !status.fetchFailed && status.post) {
    // Fetched and post available

    // region Alerts

    const alertIsAltLang = (
      <Alert variant="warning" className="mt-3">
        {
          t(
            'posts.message.alt_lang',
            {
              langUi: SUPPORTED_LANG_NAME.get(i18n.language),
              langPost: SUPPORTED_LANG_NAME.get(status.post.lang),
            },
          )
        }
      </Alert>
    );

    const alertOtherLangAvailable = (
      <Alert variant="info" className="mt-3">
        {t('posts.message.other_lang')}
        <br/>
        {
          status.post.otherLangs.map((langCode) => (
            <li key={langCode}>
              <Alert.Link href={Path.getAnalysis((status.post as CharacterAnalysisPost).seqId) + `?lang=${langCode}`}>
                {SUPPORTED_LANG_NAME.get(langCode)}
              </Alert.Link>
            </li>
          ))
        }
      </Alert>);

    // endregion

    // region Sections

    const sectionGeneralTop = (
      <>
        <PageAnchor name="summary" type="h3" text={t('posts.analysis.summary')} className="mb-3"/>
        <div className="rounded bg-black-32 p-3">
          <Markdown>{status.post.summary || 'N/A'}</Markdown>
        </div>

        {status.post.showAds && <AdsInPost/>}

        {
          status.post.summonResult &&
          <>
            <hr/>
            <PageAnchor name="summon" type="h3" text={t('posts.analysis.summon_result')} className="mb-3"/>
            <div className="rounded bg-black-32 p-3">
              <Markdown>{status.post.summonResult || 'N/A'}</Markdown>
            </div>
          </>
        }

        <hr/>
        <PageAnchor name="passive" type="h3" text={t('posts.analysis.passive')} className="mb-3"/>
        <div className="rounded bg-black-32 p-3 mb-3">
          <Markdown>{status.post.passives || 'N/A'}</Markdown>
        </div>

        {
          status.post.normalAttacks &&
          <>
            <PageAnchor
              name="normal-attack" type="h3"
              text={t('posts.analysis.normal_attack')} className="mb-3"/>
            <div className="rounded bg-black-32 p-3 mb-3">
              <Markdown>{status.post.normalAttacks || 'N/A'}</Markdown>
            </div>
          </>
        }
      </>
    );

    let sectionSpecific = <></>;

    if (status.post.type === AnalysisPostType.CHARACTER) {
      sectionSpecific = <AnalysisPostPartialOutputChara post={status.post as CharacterAnalysisPost}/>;
    } else if (status.post.type === AnalysisPostType.DRAGON) {
      sectionSpecific = <AnalysisPostPartialOutputDragon post={status.post as DragonAnalysisPost}/>;
    } else {
      setStatus({
        ...status,
        fetched: true,
        fetchFailed: true,
        failContent: t('posts.analysis.error.unknown_type'),
      });
    }

    const sectionGeneralBottom = (
      <>
        {
          status.post.videos &&
          <>
            <hr/>
            <Row>
              <Col>
                <PageAnchor name="videos" type="h4" text={t('posts.analysis.videos')} className="mb-3"/>
                <Markdown>{status.post.videos}</Markdown>
              </Col>
            </Row>
          </>
        }

        {
          status.post.story &&
          <>
            <hr/>
            <Row>
              <Col>
                <PageAnchor name="story" type="h4" text={t('posts.analysis.story')} className="mb-3"/>
                <Markdown>{status.post.story}</Markdown>
              </Col>
            </Row>
          </>
        }

        {
          status.post.keywords &&
          <>
            <hr/>
            <Row>
              <Col>
                <PageAnchor name="keywords" type="h4" text={t('posts.analysis.keywords')} className="mb-3"/>
                <Markdown>{status.post.keywords}</Markdown>
              </Col>
            </Row>
          </>
        }
      </>
    );

    // endregion

    return (
      <>
        {
          status.post.isAdmin &&
          <PostManageBar
            newPostUrl={Path.ANALYSIS_NEW_CHARA}
            newPostTitle={t('posts.manage.add_chara')}
            newPostUrl2={Path.ANALYSIS_NEW_DRAGON}
            newPostTitle2={t('posts.manage.add_dragon')}
            editPostUrl={Path.getAnalysisEdit(status.post.seqId)}/>
        }
        {status.post.isAltLang && alertIsAltLang}
        {status.post.otherLangs.length > 0 && alertOtherLangAvailable}

        {sectionGeneralTop}
        {status.post.showAds && <AdsInPost/>}
        {sectionSpecific}
        {sectionGeneralBottom}
        {status.post.showAds && <AdsInPost/>}

        <hr/>

        <PostInfo post={status.post}/>
      </>
    );
  } else {
    const fnSendFetchRequest = () =>
      ApiRequestSender.analysisPostGet(getGoogleUid() || '', pid.toString(), i18n.language, true);

    return (
      <FetchPost
        status={status}
        fnSetStatus={setStatus as Dispatch<SetStateAction<PostFetchStatus>>} fnSendFetchRequest={fnSendFetchRequest}/>
    );
  }
};


type AnalysisPostPartialOutputCharaProps = {
  post: CharacterAnalysisPost
}


const AnalysisPostPartialOutputChara = ({post}: AnalysisPostPartialOutputCharaProps) => {
  const {t} = useTranslation();

  return (
    <>
      {
        post.forceStrikes &&
        <>
          <PageAnchor name="fs" type="h3" text={t('posts.analysis.force_strike')} className="mb-3"/>
          <div className="rounded bg-black-32 p-3">
            <Markdown>{post.forceStrikes || 'N/A'}</Markdown>
          </div>
        </>
      }

      <PageAnchor name="skills" type="h3" text={t('posts.analysis.skills')} className="my-3"/>

      {
        post.skills.map((skill, skillIdx) => (
          <div key={`skill-info-${skillIdx}`} className="mt-2">
            <AnalysisSkillOutput
              name={skill.name}
              info={skill.info}
              rotations={skill.rotations}
              tips={skill.tips}/>
          </div>
        ))
      }

      {
        post.tipsBuilds &&
        <>
          <hr/>
          <Row>
            <Col>
              <PageAnchor name="tips-builds" type="h3" text={t('posts.analysis.tips_builds')} className="mb-3"/>
              <Markdown>{post.tipsBuilds}</Markdown>
            </Col>
          </Row>
        </>
      }
    </>
  );
};


type AnalysisPostPartialOutputDragonProps = {
  post: DragonAnalysisPost
}


const AnalysisPostPartialOutputDragon = ({post}: AnalysisPostPartialOutputDragonProps) => {
  const {t} = useTranslation();

  return (
    <>
      {
        post.ultimate &&
        <>
          <h3 className="mb-3">{t('posts.analysis.ultimate')}</h3>
          <div className="rounded bg-black-32 p-3 mb-3">
            <Markdown>{post.ultimate || 'N/A'}</Markdown>
          </div>
        </>
      }

      {
        post.notes &&
        <>
          <h3 className="mb-3">{t('posts.analysis.notes_dragon')}</h3>
          <div className="rounded bg-black-32 p-3 mb-3">
            <Markdown>{post.notes || 'N/A'}</Markdown>
          </div>
        </>
      }

      {
        post.suitableCharacters &&
        <>
          <h3 className="mb-3">{t('posts.analysis.suitable')}</h3>
          <div className="rounded bg-black-32 p-3 mb-3">
            <Markdown>{post.suitableCharacters || 'N/A'}</Markdown>
          </div>
        </>
      }
    </>
  );
};
