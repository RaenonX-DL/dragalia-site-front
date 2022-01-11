import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DimensionKey, Ranking, RankingScore} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {overrideObject} from '../../../../utils/override';
import {DeepPartial} from '../../../../utils/types';
import {InputPanel} from '../../../elements/input/panel/main';
import {InputPanelCommonProps} from '../../../elements/input/panel/types';
import {MarkdownInput} from '../../../elements/markdown/input';
import {TierNoteEdit} from '../types';


const rankingNA = '-';

type Props = InputPanelCommonProps<TierNoteEdit | undefined> & {
  dimension: DimensionKey,
};

export const TierNoteDimensionEntry = ({inputData, setInputData, dimension}: Props) => {
  const {t} = useI18n();
  const rankingOptions = [{text: rankingNA}]
    .concat(...Object.keys(RankingScore).map((ranking) => ({text: ranking})));
  const defaultOption = rankingOptions[0];

  const disabled = !inputData || inputData.toDelete;

  const overrideInputData = (
    original: Props['inputData'], override: DeepPartial<Props['inputData']>,
  ): Props['inputData'] => {
    // Generates new tier note if not exist before (`inputData` is `undefined`)
    if (!original) {
      return overrideObject(
        {
          ranking: 'S',
          note: '',
          isCompDependent: false,
        },
        override,
      );
    }

    return overrideObject(original, override);
  };

  return (
    <Row className="g-0 g-lg-3">
      <Col lg={4}>
        <h5>{t((t) => t.game.unitTier.dimension[dimension])}</h5>
        <InputPanel
          inputData={inputData}
          setInputData={setInputData}
          inputEntries={[
            {
              type: 'select',
              title: t((t) => t.game.unitTier.tier.title),
              defaultEntry: (
                inputData ?
                  rankingOptions.find((option) => option.text === inputData.ranking) || defaultOption :
                  defaultOption
              ),
              getUpdatedInputData: (ranking) => (
                overrideInputData(inputData, {ranking: ranking as Ranking, toDelete: ranking === rankingNA})
              ),
              values: rankingOptions,
              getValue: (ranking) => ranking.text,
            },
            {
              type: 'individualCheckGroup',
              checkboxes: [{
                text: t((t) => t.game.unitTier.tier.isCompDependent),
                getValue: (data) => data?.isCompDependent || false,
                getUpdatedInputData: (isCompDependent) => overrideInputData(inputData, {isCompDependent}),
                disabled,
                block: true,
              }],
            },
          ]}
        />
      </Col>
      <Col lg={8}>
        <MarkdownInput
          label={t((t) => t.game.unitTier.dimension[dimension])}
          rows={3}
          onChanged={(e) => setInputData(overrideObject(inputData, {note: e.target.value}))}
          value={inputData?.note || ''}
          disabled={disabled}
          required={!disabled}
        />
      </Col>
    </Row>
  );
};
