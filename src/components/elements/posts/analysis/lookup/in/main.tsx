import React, {MouseEvent} from 'react';

import {Button, Col, Form} from 'react-bootstrap';

import {useI18n} from '../../../../../../i18n/hook';
import {ResourceLoader} from '../../../../../../utils/services/resources';
import {ElementEnums, WeaponTypeEnums} from '../../../../../../utils/services/resources/types';
import {EnumChecksBox} from '../../../../common/check/enumChecksBox';
import {useFetchState} from '../../../../common/fetch';
import {AnalysisTypePicker} from './typePicker';
import {InputData} from './types';

type LookupInputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}

export const AnalysisLookupInput = ({onSearchRequested}: LookupInputProps) => {
  const {t} = useI18n();

  const [inputData, setInputData] = React.useState<InputData>({
    keyword: '',
    types: [],
    elements: [],
    weaponTypes: [],
  });

  const {
    fetchStatus: elemEnums,
    fetchFunction: fetchElemEnums,
  } = useFetchState<ElementEnums>(
    {
      elemental: [],
    },
    ResourceLoader.getEnumElements,
    'Failed to fetch the element enums.',
  );
  const {
    fetchStatus: weaponTypeEnums,
    fetchFunction: fetchWeaponTypeEnums,
  } = useFetchState<WeaponTypeEnums>(
    {
      weapon: [],
    },
    ResourceLoader.getEnumWeaponTypes,
    'Failed to fetch the weapon type enums.',
  );

  fetchWeaponTypeEnums();
  fetchElemEnums();

  return (
    <div className="rounded bg-black-32 p-3">
      <AnalysisTypePicker inputData={inputData} setInputData={setInputData}/>
      <EnumChecksBox
        options={elemEnums.data.elemental}
        inputData={inputData}
        inputKey="elements"
        setInputData={setInputData}
      />
      <EnumChecksBox
        options={weaponTypeEnums.data.weapon}
        inputData={inputData}
        inputKey="weaponTypes"
        setInputData={setInputData}
      />
      <Form.Row>
        <Col>
          <Form.Control
            placeholder={t((t) => t.misc.searchKeyword)}
            value={inputData.keyword}
            onChange={(e) => setInputData({
              ...inputData,
              keyword: e.target.value,
            })}
          />
        </Col>
        <Col xs="auto" className="text-right">
          <Button
            variant="outline-info"
            onClick={onSearchRequested(inputData)}
          >
            {t((t) => t.misc.search)}
          </Button>
        </Col>
      </Form.Row>
    </div>
  );
};
