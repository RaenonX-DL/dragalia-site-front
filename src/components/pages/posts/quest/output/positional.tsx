import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PositionalInfo} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {Markdown} from '../../../../elements/markdown/main';


type Props = {
  info: Array<PositionalInfo>
}

export const QuestPositionOutput = ({info}: Props) => {
  const {t} = useI18n();

  return (
    <>
      {
        info.map((info) => (
          <div key={info.position} className="p-3 bg-black-32 rounded mb-3">
            <Accordion>
              <Row>
                <Col>
                  <h4 className="mb-3">{info.position}</h4>
                </Col>
                <Col className="d-flex flex-row-reverse">
                  <Accordion.Toggle as={Button} variant="outline-success" eventKey={info.position}>
                    {t((t) => t.posts.manage.collapse)}
                  </Accordion.Toggle>
                </Col>
              </Row>
              <Accordion.Collapse eventKey={info.position} className="mt-3">
                <Row key={info.position}>
                  <Col lg={6}>
                    <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.builds)}</h5>
                    <Markdown>{info.builds}</Markdown>
                  </Col>
                  <Col lg={6}>
                    <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.rotations)}</h5>
                    <Markdown>{info.rotations}</Markdown>

                    <h5 className="text-center pb-2 border-bottom">{t((t) => t.posts.quest.tips)}</h5>
                    <Markdown>{info.tips}</Markdown>
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
