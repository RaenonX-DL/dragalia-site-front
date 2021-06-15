import React, {MouseEvent} from 'react';

import {Button, Col, Form} from 'react-bootstrap';

import {ElementEnums, WeaponTypeEnums} from '../../../../../../api-def/resources';
import {GeneralPath} from '../../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {ResourceLoader} from '../../../../../../utils/services/resources';
import {EnumChecksBox} from '../../../../common/check/enumChecksBox';
import {useFetchState} from '../../../../common/fetch';
import {PostManageBar} from '../../../manageBar';
import {AnalysisTypePicker} from './typePicker';
import {InputData} from './types';


type LookupInputProps = {
  onSearchRequested: (inputData: InputData) => (event: MouseEvent<HTMLButtonElement>) => void,
}

export const AnalysisLookupInput = ({onSearchRequested}: LookupInputProps) => {
  const {t} = useI18n();
  const context = React.useContext(AppReactContext);

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
    <>
      <div className="rounded bg-black-32 p-3 mb-2">
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
      {
        context?.session?.user.isAdmin &&
        <div className="mb-2">
          <PostManageBar
            newButtons={[
              {
                url: GeneralPath.ANALYSIS_NEW_CHARA,
                title: t((t) => t.posts.manage.addChara),
              },
              {
                url: GeneralPath.ANALYSIS_NEW_DRAGON,
                title: t((t) => t.posts.manage.addDragon),
              },
            ]}
          />
        </div>
      }
    </>
  );
};
