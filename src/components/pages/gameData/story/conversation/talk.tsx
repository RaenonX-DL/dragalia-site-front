import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DepotPaths, StoryTalk as StoryTalkData} from '../../../../../api-def/resources';
import {Image} from '../../../../elements/common/image';
import styles from '../main.module.css';
import {StoryConversationProps} from './types';


type Props = StoryConversationProps<StoryTalkData>

export const StoryTalk = ({conversation}: Props) => {
  if (conversation.isSys) {
    return (
      <Row noGutters className={`mb-2 ${styles.sysMessage}`}>
        <Col>
          {conversation.content}
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row noGutters className="mb-1">
        <Col>
          <small>
            {conversation.speakerName}
          </small>
        </Col>
      </Row>
      <Row noGutters className="mb-2">
        <Col xs="auto" className={styles.speakerIcon}>
          {
            conversation.speakerIcon ?
              <Image
                src={DepotPaths.getStorySpeakerIconURL(conversation.speakerIcon)}
                text=""
                className={styles.speakerIcon}
              /> :
              <></>
          }
        </Col>
        <Col>
          {conversation.content}
        </Col>
      </Row>
    </>
  );
};
