import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';

import {getGoogleUid} from './googleSignin';
import {MarkdownInput} from './markdownInput';
import {ExpressModal} from './modalExpress';
import {QuestPositionForm} from './questPositionForm';
import {ApiRequestSender} from '../../constants/api';
import {SUPPORTED_LANG, SUPPORTED_LANG_NAME} from '../../constants/lang';
import Path from '../../constants/path';


// FIXME: "attach" the post of different language to use the same seq id
//  - Add with same seq ID but different lang? May need to be able to display duplicated - ID occupied


export type PositionalInfo = {
  position: string,
  builds: string,
  rotations: string,
  tips: string,
}


export type ModalState = {
  show: boolean,
  title: string,
  message: string,
}


export const QuestNewPostForm = () => {
  const {i18n, t} = useTranslation();

  const newInitData = () => {
    return {position: '', builds: '', rotations: '', tips: ''};
  };

  const [title, setTitle] = React.useState('');
  const onTitleChanged = (e) => setTitle(e.target.value);

  const [langCode, setLangCode] = React.useState(i18n.language);
  const onLangCodeChanged = (e) => setLangCode(e.target.value);

  const [generalInfo, setGeneralInfo] = React.useState('');
  const onGeneralInfoChanged = (e) => setGeneralInfo(e.target.value);

  const [video, setVideo] = React.useState('');
  const onVideoChanged = (e) => setVideo(e.target.value);

  const [addendum, setAddendum] = React.useState('');
  const onAddendumChanged = (e) => setAddendum(e.target.value);

  const [positionInfo, setPositionInfo] = React.useState([newInitData()]);
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

  const sectionTitle = (
    <Row>
      <Col lg={9}>
        <Form.Control
          className="mb-2" type="text" placeholder={t('posts.quest.title')}
          onChange={onTitleChanged} required
        />
      </Col>
      <Col lg={3}>
        <Form.Control as="select" defaultValue={SUPPORTED_LANG_NAME.get(i18n.language)} onChange={onLangCodeChanged}>
          {
            SUPPORTED_LANG.map((lang) => {
              return (<option key={lang}>{SUPPORTED_LANG_NAME.get(lang)}</option>);
            })
          }
        </Form.Control>
      </Col>
    </Row>
  );
  const sectionGeneralInfo = (
    <>
      <Row>
        <Col className="pr-2">
          <h5>{t('posts.quest.general')}</h5>
          <MarkdownInput onChanged={onGeneralInfoChanged} rows={5}/>
        </Col>
        <Col className="pl-2">
          <h5>{t('posts.quest.video')}</h5>
          <MarkdownInput onChanged={onVideoChanged} rows={5}/>
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
            />
          </div>
        ))
      }
    </>
  );
  const sectionAddendum = (
    <>
      <h5>{t('posts.quest.addendum')}</h5>
      <Row>
        <Col><MarkdownInput onChanged={onAddendumChanged} rows={5}/></Col>
      </Row>
    </>
  );
  const sectionControl = (
    <Row className="mb-6">
      <Col>
        <Button type="submit">{t('posts.manage.publish')}</Button>
      </Col>
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
  );

  const [modalSubmissionFailedState, setModalSubmissionFailedState] = React.useState<ModalState>(
    {show: false, title: '', message: ''},
  );

  const modalSubmissionFailed = (
    <ExpressModal
      title={modalSubmissionFailedState.title} message={modalSubmissionFailedState.message}
      show={modalSubmissionFailedState.show}
      fnHideModal={() => setModalSubmissionFailedState({show: false, title: '', message: ''})}
    />);

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

    ApiRequestSender.questPostPublish(
      getGoogleUid() || '', title, langCode, generalInfo, video, positionInfo, addendum)
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
    return <Redirect to={Path.getQuest(redirToPostPage)}/>;
  }

  return (
    <>
      {modalSubmissionFailed}
      <form onSubmit={onFormSubmit}>
        {sectionTitle}
        <hr/>
        {sectionGeneralInfo}
        <hr/>
        {sectionPositional}
        <hr/>
        {sectionAddendum}
        <hr/>
        {sectionControl}
      </form>
    </>
  );
};
