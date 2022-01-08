import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DimensionKey, TierNote} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {RowNoGutter} from '../../../elements/common/grid/row';
import {Markdown} from '../../../elements/markdown/main';
import {rankingColor} from '../const';
import {IconCompDependent} from '../icons';
import styles from './main.module.css';


type Props = {
  dimension: DimensionKey,
  note: TierNote | undefined,
};

export const UnitTierNoteDimension = ({dimension, note}: Props) => {
  const {t} = useI18n();

  return (
    <div className="section mb-2">
      <Row>
        <Col>
          <h6>{t((t) => t.game.unitTier.dimension[dimension])}</h6>
        </Col>
      </Row>
      <RowNoGutter>
        {
          note ?
            <>
              <Col md={2} className="text-center align-self-center">
                <span className={styles.ranking} style={{color: rankingColor[note.ranking]}}>{note.ranking}</span>
                {note.isCompDependent && <>&nbsp;<IconCompDependent/></>}
              </Col>
              <Col md={10}>
                <Markdown>{note.note}</Markdown>
              </Col>
            </> :
            <Col className="h1 text-center">
              -
            </Col>
        }
      </RowNoGutter>
    </div>
  );
};
