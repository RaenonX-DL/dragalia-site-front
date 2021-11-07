import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Row from 'react-bootstrap/Row';

import {useI18n} from '../../../../i18n/hook';
import {IconCollapse} from '../../common/icons';
import styles from './section.module.css';


type Props<E> = {
  sections: Array<E>,
  getTitle: (section: E) => string,
  renderSection: (section: E) => React.ReactElement,
};

export const CollapsibleSectionedContent = <E, >({sections, getTitle, renderSection}: Props<E>) => {
  const {t} = useI18n();

  const [open, setOpen] = React.useState(Object.fromEntries(sections.map((section) => [getTitle(section), false])));
  const [allOpen, setAllOpen] = React.useState(false);

  const onClickAllOpen = () => {
    const newAllOpen = !allOpen;

    setAllOpen(newAllOpen);
    setOpen(Object.fromEntries(sections.map((section) => [getTitle(section), newAllOpen])));
  };

  return (
    <>
      <Row className="mb-2">
        <Col>
          <Button variant="outline-warning" onClick={onClickAllOpen} className="float-right">
            {t((t) => t.misc.collapseAll)}
          </Button>
        </Col>
      </Row>
      {sections.map((section) => {
        const title = getTitle(section);

        return (
          <React.Fragment key={title}>
            <Row className={styles.sectionTitle}>
              <Col onClick={() => setOpen({...open, [title]: !open[title]})}>
                <h5 className="mb-0"><IconCollapse/>&nbsp;{title}</h5>
              </Col>
            </Row>
            <Collapse in={open[title]} className="mb-2">
              {/* Needs a ref-able element for showing/hiding the element */}
              <div>
                {renderSection(section)}
              </div>
            </Collapse>
          </React.Fragment>
        );
      })}
    </>
  );
};
