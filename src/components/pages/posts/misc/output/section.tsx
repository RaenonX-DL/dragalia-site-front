import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {MiscPostSection} from '../../../../../api-def/api/post/misc/elements';
import {useI18n} from '../../../../../i18n/hook';
import {Markdown} from '../../../../elements/markdown/main';


type Props = {
  sections: Array<MiscPostSection>
}

export const MiscSectionOutput = ({sections}: Props) => {
  const {t} = useI18n();

  return (
    <>
      {
        sections.map((section) => (
          <div key={section.title} className="p-3 bg-black-32 rounded mb-3">
            <Accordion>
              <Row>
                <Col>
                  <h4 className="mb-3">{section.title}</h4>
                </Col>
                <Col className="d-flex flex-row-reverse">
                  <Accordion.Toggle as={Button} variant="outline-success" eventKey={section.title}>
                    {t((t) => t.posts.manage.collapse)}
                  </Accordion.Toggle>
                </Col>
              </Row>
              <Accordion.Collapse eventKey={section.title} className="mt-3">
                <Markdown>{section.content}</Markdown>
              </Accordion.Collapse>
            </Accordion>
          </div>
        ))
      }
    </>
  );
};
