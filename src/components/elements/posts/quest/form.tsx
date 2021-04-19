import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {Redirect} from 'react-router-dom';
import {SUPPORTED_LANG, SUPPORTED_LANG_NAME} from '../../../../constants/lang';
import Path from '../../../../constants/path';
import {
  ApiRequestSender,
  QuestPostEditPayload,
  QuestPostEditSuccessResponse,
  QuestPostGetSuccessResponse,
  QuestPostPublishPayload,
  QuestPostPublishSuccessResponse,
} from '../../../../utils/services/api';
import {ExpressModal} from '../../express';

import {getGoogleUid} from '../../googleSignin';
import {MarkdownInput} from '../../markdown/input';
import {Prompt} from '../../prompt';
import {QuestPositionForm} from './positionForm';


export type ModalState = {
  show: boolean,
  title: string,
  message: string,
}


type QuestPostFormProps = {
  post?: QuestPostGetSuccessResponse | null,
  fnSendRequest: <T extends QuestPostPublishPayload>(payload: T)
    => Promise<QuestPostEditSuccessResponse | QuestPostPublishSuccessResponse>
}


export const QuestPostForm = ({post, fnSendRequest}: QuestPostFormProps) => {
  const {i18n, t} = useTranslation();

  const newInitData = () => {
    return {position: '', builds: '', rotations: '', tips: ''};
  };

  // region States and event handlers
  // FIXME: Combine to single state
  const [postId, setPostId] = React.useState(post?.seqId.toString() || '');
  const onPostIdChanged = (e) => {
    setPostId(e.target.value);
    checkAvailability(e.target.value, langCode);
  };

  const [title, setTitle] = React.useState(post?.title || '');
  const onTitleChanged = (e) => setTitle(e.target.value);

  const [langCode, setLangCode] = React.useState(post?.lang || i18n.language);
  const onLangCodeChanged = (e) => {
    setLangCode(e.target.value);
    checkAvailability(postId, e.target.value);
  };

  const [generalInfo, setGeneralInfo] = React.useState(post?.general || '');
  const onGeneralInfoChanged = (e) => setGeneralInfo(e.target.value);

  const [video, setVideo] = React.useState(post?.video || '');
  const onVideoChanged = (e) => setVideo(e.target.value);

  const [addendum, setAddendum] = React.useState(post?.addendum || '');
  const onAddendumChanged = (e) => setAddendum(e.target.value);

  const [positionInfo, setPositionInfo] = React.useState(post?.info || [newInitData()]);
  const onPositionInfoChanged = (elemIdx, key) => (e) => {
    const newPositionData = positionInfo.map((posInfo, posInfoIdx) => {
      if (elemIdx !== posInfoIdx) {
        // Keep the data not being changed intact
        return posInfo;
      }

      // Update the data
      posInfo[key] = e.target.value;
      return posInfo;
    });

    setPositionInfo(newPositionData);
  };
  const onPositionInfoAdded = () => {
    setPositionInfo(positionInfo.concat([newInitData()]));
  };
  const onPositionInfoRemoved = () => {
    if (positionInfo.length > 1) {
      setPositionInfo(
        positionInfo.filter(
          (posInfo, posInfoIdx) => (positionInfo.length - 1) !== posInfoIdx));
    }
  };

  const [modifyNote, setModifyNote] = React.useState('');
  const onModifyNoteChanged = (e) => setModifyNote(e.target.value);

  const [availability, setAvailability] = React.useState(true);
  const checkAvailability = (postId, langCode) => {
    // Passing 2 arguments instead of using the variables for all is because that setting the state is an async action
    ApiRequestSender.questPostIdCheck(getGoogleUid() || '', parseInt(postId) || null, langCode)
      .then((data) => setAvailability(data.available))
      .catch(() => setAvailability(false));
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
          isValid={availability} isInvalid={!availability}
          onChange={onPostIdChanged} value={postId} disabled={post !== undefined && post !== null}
        />
      </Col>
      <Col lg={7}>
        <Form.Control
          className="mb-2" type="text" placeholder={t('posts.quest.title')}
          onChange={onTitleChanged} value={title} required
        />
      </Col>
      <Col lg={3}>
        <Form.Control
          as="select" defaultValue={langCode} disabled={post !== undefined && post !== null}
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
  const sectionGeneralInfo = (
    <>
      <Row>
        <Col className="pr-2" lg={6}>
          <h5>{t('posts.quest.general')}</h5>
          <MarkdownInput onChanged={onGeneralInfoChanged} rows={5} value={generalInfo}/>
        </Col>
        <Col className="pl-2" lg={6}>
          <h5>{t('posts.quest.video')}</h5>
          <MarkdownInput onChanged={onVideoChanged} rows={5} value={video}/>
        </Col>
      </Row>
    </>
  );
  const sectionPositional = (
    <>
      <h5>{t('posts.quest.positional')}</h5>

      {
        positionInfo.map((posInfo, posIdx) => (
          <div key={`pos-info-${posIdx}`} className="mt-2">
            <QuestPositionForm
              onPositionNameChanged={onPositionInfoChanged(posIdx, 'position')}
              onBuildsChanged={onPositionInfoChanged(posIdx, 'builds')}
              onRotationsChanged={onPositionInfoChanged(posIdx, 'rotations')}
              onTipsChanged={onPositionInfoChanged(posIdx, 'tips')}
              required={['all']}
              positionName={posInfo.position} builds={posInfo.builds} rotations={posInfo.rotations} tips={posInfo.tips}
            />
          </div>
        ))
      }

      <Row className="mt-2">
        <Col>
          <Button
            variant="outline-danger" className="d-inline float-right ml-2" onClick={onPositionInfoRemoved}>
            {t('misc.remove')}
          </Button>
          <Button
            variant="outline-success" className="d-inline float-right" onClick={onPositionInfoAdded}>
            {t('misc.add')}
          </Button>
        </Col>
      </Row>
    </>
  );
  const sectionAddendum = (
    <>
      <h5>{t('posts.quest.addendum')}</h5>
      <Row>
        <Col><MarkdownInput onChanged={onAddendumChanged} rows={5} value={addendum}/></Col>
      </Row>
    </>
  );
  const sectionModifyNote = (
    <>
      <h5>{t('posts.manage.modify_note')}</h5>
      <Row>
        <Col><MarkdownInput onChanged={onModifyNoteChanged} rows={3}/></Col>
      </Row>
    </>
  );
  const sectionControl = (
    <Row className="mb-6">
      <Col>
        <Button type="submit" className="float-right" disabled={!availability}>
          {post ? t('posts.manage.edit') : t('posts.manage.publish')}
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

  const [redirToPostPage, setRedirToPostPage] = React.useState(-1);

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

    let promise;

    if (post) {
      promise = fnSendRequest<QuestPostEditPayload>({
        google_uid: getGoogleUid() || '',
        seq_id: post.seqId,
        title: title,
        lang: langCode,
        general: generalInfo,
        video: video,
        positional: positionInfo,
        addendum: addendum,
        modify_note: modifyNote,
      });
    } else {
      promise = fnSendRequest<QuestPostPublishPayload>({
        google_uid: getGoogleUid() || '',
        seq_id: postId || undefined,
        title: title,
        lang: langCode,
        general: generalInfo,
        video: video,
        positional: positionInfo,
        addendum: addendum,
      });
    }

    promise
      .then((data) => {
        if (data.success) {
          setRedirToPostPage(data.seqId);
        } else {
          setModalSubmissionFailedState({
            show: true,
            title: t('posts.manage.publish_failed'),
            message: data.code.toString(),
          });
        }
      })
      .catch((error) => {
        setModalSubmissionFailedState({
          show: true,
          title: t('posts.manage.publish_failed'),
          message: JSON.stringify(error.toString()),
        });
      });
  };

  if (redirToPostPage > 0) {
    return <Redirect to={{pathname: Path.getQuest(redirToPostPage), search: `?lang=${langCode}`}}/>;
  }

  return (
    <>
      <Prompt/>
      {modalSubmissionFailed}
      <form onSubmit={onFormSubmit}>
        {sectionHeader}
        {sectionTitle}
        <hr/>
        {sectionGeneralInfo}
        <hr/>
        {sectionPositional}
        <hr/>
        {sectionAddendum}
        {
          post &&
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
