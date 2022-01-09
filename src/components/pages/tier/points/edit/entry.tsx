import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {KeyPointEntryUpdate, KeyPointType, KeyPointTypeEnum} from '../../../../../api-def/api';
import {useI18n} from '../../../../../i18n/hook';
import {RowNoGutter} from '../../../../elements/common/grid/row';
import {ArrayFormOnChangeHandler} from '../../../../elements/form/array/type';
import {FloatingInput} from '../../../../elements/form/control/floating/input';
import {FloatingSelect} from '../../../../elements/form/control/floating/select';
import {PointTypeIcon} from '../../icons';
import styles from '../../main.module.css';


type Props = {
  entry: KeyPointEntryUpdate,
  onChanged: ArrayFormOnChangeHandler<KeyPointEntryUpdate>,
  isDescriptionInvalid: boolean,
};

export const KeyPointEntry = ({entry, onChanged, isDescriptionInvalid}: Props) => {
  const {t} = useI18n();

  return (
    <div className="section">
      <Row className="p-2 g-3">
        <Col lg={3}>
          <RowNoGutter>
            <Col xs="auto" className={styles['point-icon']}>
              {PointTypeIcon[entry.type]}
            </Col>
            <Col>
              <FloatingSelect
                label={t((t) => t.game.unitTier.points.type.title)}
                defaultValue={entry.type}
                onChange={(e) => onChanged('type')(e.target.value as KeyPointType)}
              >
                {Object.keys(KeyPointTypeEnum).map((type) => (
                  <option key={type} value={type}>
                    {t((t) => t.game.unitTier.points.type[type as KeyPointType])}
                  </option>
                ))}
              </FloatingSelect>
            </Col>
          </RowNoGutter>
        </Col>
        <Col lg={9}>
          <FloatingInput
            label={t((t) => t.game.unitTier.points.description)}
            value={entry.description}
            isInvalid={isDescriptionInvalid || !entry.description}
            onChange={(e) => onChanged('description')(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};
