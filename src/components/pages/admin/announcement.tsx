import React from 'react';

import {useSession} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../i18n/hook';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {ModalFixedContent} from '../../elements/common/modal/fix';
import {ModalFlexContent} from '../../elements/common/modal/flex';
import {ModalStateFix, ModalStateFlex} from '../../elements/common/modal/types';
import {FloatingInput} from '../../elements/form/control/floating/input';
import {MarkdownInput} from '../../elements/markdown/input';
import {Markdown} from '../../elements/markdown/main';
import {useOnBeforeUnload} from '../../hooks/onBeforeUnload';
import {ProtectedLayout} from '../layout/protected';


export const AdminSendAnnouncement = () => {
  const {t, lang} = useI18n();
  const {data} = useSession();
  const uid = data?.user.id.toString() || '';

  const [content, setContent] = React.useState({
    title: '',
    content: '',
  });
  const [confirmModalState, setConfirmModalState] = React.useState<ModalStateFix>({
    show: false,
    title: t((t) => t.admin.announcement.confirmSend),
  });
  const [sentModalState, setSentModalState] = React.useState<ModalStateFlex>({
    show: false,
    title: '',
    message: '',
  });
  const {clearUnload} = useOnBeforeUnload([content]);

  const sendAnnouncement = () => {
    ApiRequestSender.sendSiteAnnouncement({
      uid,
      lang,
      title: content.title,
      markdown: content.content,
    }).then(({result}) => {
      const {accepted, rejected} = result;

      setConfirmModalState({...confirmModalState, show: false});
      setSentModalState({
        ...sentModalState,
        show: true,
        message: t(
          (t) => t.admin.announcement.emailSent,
          {accepted: accepted.length.toString(), rejected: rejected.length.toString()},
        ),
      });
      clearUnload();
    });
  };

  return (
    <ProtectedLayout>
      <ModalFixedContent state={confirmModalState} setState={setConfirmModalState}>
        <Markdown>
          {content.content}
        </Markdown>
        <hr/>
        <Row className="text-end">
          <Col>
            <Button
              variant="outline-danger"
              onClick={() => setConfirmModalState({...confirmModalState, show: false})}
              className="me-2"
            >
              {t((t) => t.misc.cancel)}
            </Button>
            <Button
              variant="outline-success"
              onClick={sendAnnouncement}
            >
              {t((t) => t.admin.announcement.send)}
            </Button>
          </Col>
        </Row>
      </ModalFixedContent>
      <ModalFlexContent state={sentModalState} setState={setSentModalState}/>
      <Alert variant="info">
        <Markdown overrideStyle={false}>
          {t((t) => t.admin.announcement.tips)}
        </Markdown>
      </Alert>
      <Row className="mb-3">
        <Col>
          <FloatingInput
            label={t((t) => t.admin.announcement.title)}
            onChange={(e) => setContent({...content, title: e.target.value})}
            value={content.title}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MarkdownInput
            label={t((t) => t.admin.announcement.content)}
            onChanged={(e) => setContent({...content, content: e.target.value})}
            rows={7}
            value={content.content}
            required
          />
        </Col>
      </Row>
      <hr/>
      <Row className="text-end">
        <Col>
          <Button
            variant="outline-light"
            onClick={() => setConfirmModalState({...confirmModalState, show: true})}
            disabled={!content.title.length || !content.content.length}
          >
            {t((t) => t.admin.announcement.send)}
          </Button>
        </Col>
      </Row>
    </ProtectedLayout>
  );
};
