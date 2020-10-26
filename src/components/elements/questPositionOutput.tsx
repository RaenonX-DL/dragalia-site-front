import React from 'react';
import {Accordion, Button, Col, Row} from 'react-bootstrap';

import {PositionalInfo} from './questPositionForm';
import {Markdown} from './markdown';
import {useTranslation} from 'react-i18next';

type OutputProps = {
  info: Array<PositionalInfo>
}


export const QuestPositionOutput = ({info}: OutputProps) => {
  const {t} = useTranslation();

  return (
    <>
      {
        info.map((info) => (
          <div key={info.position} className="p-3 bg-black-32 rounded mb-3">
            <Accordion>
              <Row>
                <Col>
                  <h4>{info.position}</h4>
                </Col>
                <Col className="d-flex flex-row-reverse">
                  <Accordion.Toggle as={Button} variant="outline-success" eventKey={info.position}>
                    {t('posts.manage.collapse')}
                  </Accordion.Toggle>
                </Col>
              </Row>
              <hr/>
              <Accordion.Collapse eventKey={info.position}>
                <Row key={info.position || 'N/A'}>
                  <Col lg={6}>
                    <h5>{t('posts.quest.builds')}</h5>
                    <Markdown>{info.builds || 'N/A'}</Markdown>
                    <hr className="d-lg-none"/>
                  </Col>
                  <Col lg={6}>
                    <h5>{t('posts.quest.rotations')}</h5>
                    <Markdown>{info.rotations || 'N/A'}</Markdown>

                    <hr/>

                    <h5>{t('posts.quest.tips')}</h5>
                    <Markdown>{info.tips || 'N/A'}</Markdown>
                  </Col>
                </Row>
              </Accordion.Collapse>
            </Accordion>
          </div>
        ))
      }
    </>
  );
};
