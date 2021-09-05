import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../i18n/hook';


type Props<E> = {
  sections: Array<E>,
  getTitle: (section: E) => string,
  renderSection: (section: E) => React.ReactElement,
}

export const CollapsibleSectionedContent = <E, >({sections, getTitle, renderSection}: Props<E>) => {
  const {t} = useI18n();

  return (
    <>
      {sections.map((section) => {
        const title = getTitle(section);

        return (
          <div key={title} className="p-3 bg-black-32 rounded mb-3">
            <Accordion>
              <Row className="align-items-center">
                <Col>
                  <h4 className="mb-0">{title}</h4>
                </Col>
                <Col className="d-flex flex-row-reverse">
                  <Accordion.Toggle as={Button} variant="outline-success" eventKey={title}>
                    {t((t) => t.posts.manage.collapse)}
                  </Accordion.Toggle>
                </Col>
              </Row>
              <Accordion.Collapse eventKey={title} className="mt-3">
                {renderSection(section)}
              </Accordion.Collapse>
            </Accordion>
          </div>
        );
      })}
    </>
  );
};
