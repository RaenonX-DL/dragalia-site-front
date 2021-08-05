import React, {FormEvent} from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {
  ApiResponseCode,
  UnitNameRefManageResponse,
  UnitNameRefEntry as UnitNameRefEntryApi, ApiResponseCodeUtil,
} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {overrideObject} from '../../../../utils/override';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {ArrayDataForm} from '../../../elements/posts/form/array';
import {UnitNameRefEntry} from './entry';
import {NameRefUpdateStatus} from './status';


export type RefsState = {
  refs: UnitNameRefManageResponse['refs'],
  updateStatus: null | ApiResponseCode,
  updating: boolean,
  isInit: boolean,
}

export type RefsManagementProps = {
  refs: UnitNameRefManageResponse['refs'],
  uid: string
}

export const UnitNameRefManagement = ({refs, uid}: RefsManagementProps) => {
  const {t, lang} = useI18n();

  const [refsStatus, setRefsStatus] = React.useState<RefsState>({
    refs,
    updateStatus: null,
    updating: false,
    isInit: true,
  });
  const {unitInfoMap} = useUnitInfo();
  const isValid = refsStatus.refs.every((entry) => !!unitInfoMap.get(entry.unitId) && !!entry.name);
  const isJustUpdated = !!refsStatus.updateStatus && ApiResponseCodeUtil.isSuccess(refsStatus.updateStatus);

  const generateNewElement: () => UnitNameRefEntryApi = () => ({
    unitId: 0,
    name: '',
  });

  const onSubmit = (e: FormEvent) => {
    setRefsStatus(overrideObject(refsStatus, {updating: true}));
    e.preventDefault();

    ApiRequestSender.updateUnitNameRefs(uid, lang, refsStatus.refs)
      .then((response) => {
        setRefsStatus(overrideObject(refsStatus, {updateStatus: response.code, updating: false}));
      })
      .catch((error) => {
        setRefsStatus(overrideObject(
          refsStatus,
          {
            updateStatus: ApiResponseCode.FAILED_INTERNAL_ERROR,
            updating: false,
          },
        ));
        console.error(error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <ArrayDataForm
        payload={refsStatus}
        minLength={0}
        getArray={(data) => data.refs}
        setArray={(refs) => setRefsStatus(overrideObject(refsStatus, {refs, updateStatus: null, isInit: false}))}
        getUpdatedElement={(element, key, newValue) => ({
          ...element,
          [key]: newValue,
        })}
        generateNewElement={generateNewElement}
        renderEntries={(element, onChange) => <UnitNameRefEntry entry={element} onChanged={onChange}/>}
      />
      <hr/>
      <Row className="float-right">
        <Col>
          <NameRefUpdateStatus status={refsStatus.updateStatus}/>
          <Button
            type="submit" variant="outline-light" className="ml-2"
            disabled={!isValid || isJustUpdated || refsStatus.updating || refsStatus.isInit}
          >
            {t((t) => t.misc.update)}
          </Button>
        </Col>
      </Row>
    </form>
  );
};
