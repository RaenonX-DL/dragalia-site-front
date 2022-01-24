import React from 'react';

import {useSession} from 'next-auth/react';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {useDispatch} from 'react-redux';

import {useI18n} from '../../../../../i18n/hook';
import {layoutDispatchers} from '../../../../../state/layout/dispatchers';
import {useLayoutSelector} from '../../../../../state/layout/selector';
import {LayoutDispatcherName, LayoutWidthType, LayoutWidthTypeObj} from '../../../../../state/layout/types';
import {FloatingInput} from '../../../../elements/form/control/floating/input';
import {useLayout} from '../../../../hooks/layout/main';


export const UserSettingsGeneral = () => {
  const {t} = useI18n();
  const dispatch = useDispatch();
  const {width} = useLayoutSelector();
  const {isLandscape} = useLayout();
  const {data} = useSession();

  if (!data) {
    return <></>;
  }

  return (
    <>
      <FloatingInput
        label={t((t) => t.userControl.general.email)}
        value={data?.user.email || '(N/A)'}
        disabled
        className="mb-2"
      />
      {
        data?.user.isAdmin &&
        <Alert variant="info" className="mb-2">
          {t((t) => t.userControl.general.isAdmin)}
        </Alert>
      }
      {
        data?.user.adsFreeExpiry ?
          <Alert variant="success" className="mb-2">
            {t((t) => t.userControl.general.adsFreeInEffect)}
          </Alert> :
          <Alert variant="danger" className="mb-2">
            {t((t) => t.userControl.general.adsFreeNotEffective)}
          </Alert>
      }
      <h5>{t((t) => t.userControl.layout.config)}</h5>
      {
        isLandscape ?
          <>
            <ButtonGroup className="mb-2 w-100">
              {(Object.keys(LayoutWidthTypeObj) as LayoutWidthType[]).map((widthType, idx) => {
                const isActive = widthType === width;

                return (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={isActive ? 'primary' : 'outline-light'}
                    name="radio"
                    value={widthType}
                    checked={isActive}
                    onChange={({currentTarget: target}) => (
                      dispatch(layoutDispatchers[LayoutDispatcherName.CHANGE_WIDTH](target.value as LayoutWidthType))
                    )}
                    disabled={!isLandscape}
                  >
                    {t((t) => t.userControl.layout.width[widthType])}
                  </ToggleButton>
                );
              })}
            </ButtonGroup>
            <Alert variant="info" className="mb-2">
              {t((t) => t.userControl.layout.notUploaded)}
            </Alert>
          </> :
          <Alert variant="danger">
            {t((t) => t.userControl.layout.disabledInPortrait)}
          </Alert>
      }
    </>
  );
};
