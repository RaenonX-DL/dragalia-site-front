import React, {FormEvent} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';

import {GeneralPath} from '../../../../../../const/path/definitions';
import {AppReactContext} from '../../../../../../context/app/main';
import {useI18n} from '../../../../../../i18n/hook';
import {EnumCheckboxGroup} from '../../../../../elements/common/check/enum/checkbox';
import {PostManageBar} from '../../../../../elements/posts/manageBar';
import {useUnitProps} from '../../../../../hooks/unitProps';
import {orderName} from './sort/lookup';
import {UnitTypePicker} from './typePicker';
import {InputData, SortOrder} from './types';
import {generateInputData} from './utils';


type LookupInputProps = {
  onSearchRequested: (inputData: InputData) => (event: FormEvent<HTMLFormElement>) => void,
}

export const UnitInfoLookupInput = ({onSearchRequested}: LookupInputProps) => {
  const {t} = useI18n();
  const context = React.useContext(AppReactContext);

  const [inputData, setInputData] = React.useState<InputData>(generateInputData());
  const {elemEnums, weaponEnums} = useUnitProps();

  const sortTitle = t(
    (t) => t.posts.analysis.sort.title,
    {order: t(orderName[inputData.sortBy])},
  );

  return (
    <>
      <div className="rounded bg-black-32 p-3 mb-2">
        <UnitTypePicker inputData={inputData} setInputData={setInputData}/>
        <EnumCheckboxGroup
          options={elemEnums.elemental}
          inputData={inputData}
          setInputData={setInputData}
          getValue={(inputData) => inputData.elements}
          getUpdatedInputData={(newValue) => ({...inputData, elements: newValue})}
        />
        <EnumCheckboxGroup
          options={weaponEnums.weapon}
          inputData={inputData}
          setInputData={setInputData}
          getValue={(inputData) => inputData.weaponTypes}
          getUpdatedInputData={(newValue) => ({...inputData, weaponTypes: newValue})}
        />
        <Form onSubmit={(e) => {
          e.preventDefault();
          onSearchRequested(inputData)(e);
        }}>
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
            <Col xs="auto">
              <DropdownButton title={sortTitle} variant="outline-light">
                {Object.entries(orderName).map(([sortBy, getNameFunc], idx) => (
                  <Dropdown.Item
                    key={idx} onClick={() => setInputData({...inputData, sortBy: sortBy as SortOrder})}
                  >
                    {t(getNameFunc)}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col xs="auto" className="text-right">
              <Button
                variant="outline-info"
                type="submit"
              >
                {t((t) => t.misc.search)}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
      {
        context?.session?.user.isAdmin &&
        <PostManageBar
          newButtons={[
            {
              url: GeneralPath.ANALYSIS_NEW_CHARA,
              text: t((t) => t.posts.manage.addChara),
            },
            {
              url: GeneralPath.ANALYSIS_NEW_DRAGON,
              text: t((t) => t.posts.manage.addDragon),
            },
          ]}
          bottomMarginClass="mb-2"
        />
      }
    </>
  );
};
