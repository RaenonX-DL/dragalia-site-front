import React from 'react';
import {useTranslation} from 'react-i18next';
import {Accordion, Button, Col, Row} from 'react-bootstrap';

import {Markdown} from '../../markdown/main';
import {PageAnchor} from '../pageAnchor';
import {PositionalInfo} from '../../../../constants/api';


type OutputProps = {
  info: Array<PositionalInfo>
}


export const QuestPositionOutput = ({info}: OutputProps) => {
  const {t} = useTranslation();

  return (
    <>
      {
        info.map((info, idx) => (
          <div key={info.position} className="p-3 bg-black-32 rounded mb-3">
            <Accordion>
              <Row>
                <Col>
                  <PageAnchor name={`pos-${idx}`} type="h4" text={info.position}/>
                </Col>
                <Col className="d-flex flex-row-reverse">
                  <Accordion.Toggle as={Button} variant="outline-success" eventKey={info.position}>
                    {t('posts.manage.collapse')}
                  </Accordion.Toggle>
                </Col>
              </Row>
              <Accordion.Collapse eventKey={info.position} className="mt-3">
                <Row key={info.position || 'N/A'}>
                  <Col lg={6}>
                    <h5 className="text-center pb-2 border-bottom">{t('posts.quest.builds')}</h5>
                    <Markdown>{info.builds || 'N/A'}</Markdown>
                  </Col>
                  <Col lg={6}>
                    <h5 className="text-center pb-2 border-bottom">{t('posts.quest.rotations')}</h5>
                    <Markdown>{info.rotations || 'N/A'}</Markdown>

                    <h5 className="text-center pb-2 border-bottom">{t('posts.quest.tips')}</h5>
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
