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
    <Row noGutters className="section p-3 mb-2">
      <Col lg={4} className="pr-lg-3 mb-lg-n3">
        {t((t) => t.game.unitTier.dimension[dimension])}
        <hr className="my-2"/>
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
              type: 'inputCheckGroup',
              checkboxes: [{
                text: t((t) => t.game.unitTier.tier.isCompDependent),
                getValue: (data) => data?.isCompDependent || false,
                getUpdatedInputData: (isCompDependent) => overrideInputData(inputData, {isCompDependent}),
                disabled,
              }],
            },
          ]}
        />
      </Col>
      <Col lg={8}>
        <MarkdownInput
          rows={3}
          onChanged={(e) => setInputData(overrideObject(inputData, {note: e.target.value}))}
          value={inputData?.note || ''}
          disabled={disabled} required={!disabled}
        />
      </Col>
    </Row>
  );
};
