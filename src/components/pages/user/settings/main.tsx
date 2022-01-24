import React from 'react';

import {useSession} from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';

import {ApiResponseCode, UserConfigGetResponse} from '../../../../api-def/api';
import {useI18n} from '../../../../i18n/hook';
import {overrideObject} from '../../../../utils/override';
import {ApiRequestSender} from '../../../../utils/services/api/requestSender';
import {useUnitInfo} from '../../../../utils/services/resources/unitInfo/hooks';
import {isNotFetched, useFetchStateProcessed} from '../../../elements/common/fetch';
import {RowRegular} from '../../../elements/common/grid/row';
import {Loading} from '../../../elements/common/loading';
import {AjaxForm} from '../../../elements/form/ajax/main';
import {UpdateStatus} from '../../../elements/form/updateStatus';
import {LoginRequiredLayout} from '../../layout/loginRequired';
import {UserSettingsGeneral} from './layout/general';
import {UserSettingsSubscriptions} from './layout/subscriptions/main';
import {SettingsType, SettingsTypeKey, UserConfig} from './type';
import {convertConfigToApi, normalizeConfig} from './utils';


export const UserSettings = () => {
  const {t} = useI18n();
  const {data} = useSession();
  const uid = data?.user.id.toString() || '';

  const [state, setState] = React.useState<{type: SettingsTypeKey, code: ApiResponseCode | null}>({
    type: 'general',
    code: null,
  });
  const {
    fetchStatus: userConfig,
    fetchFunction: fetchUserConfig,
    setFetchStatus: setUserConfig,
  } = useFetchStateProcessed<UserConfig | null, UserConfigGetResponse>(
    null,
    () => ApiRequestSender.getUserConfig(uid),
    'Failed to fetch the user config.',
    (data) => normalizeConfig(data),
  );
  const {getUnitName, isFetched: isUnitInfoFetched} = useUnitInfo();

  const onUpdateCompleted = (code: ApiResponseCode) => {
    setState(overrideObject(state, {code}));
  };

  fetchUserConfig();

  if (isNotFetched(userConfig) || !userConfig.data || !isUnitInfoFetched) {
    return <Loading/>;
  }

  return (
    <LoginRequiredLayout>
      <AjaxForm
        unloadDependencies={[userConfig.data]}
        submitPromise={() => {
          if (!userConfig.data) {
            throw new Error('User config to update is `null`');
          }

          return ApiRequestSender.updateUserConfig(uid, convertConfigToApi(userConfig.data));
        }}
        formControl={{
          variant: 'outline-light',
          submitText: t((t) => t.misc.update),
          renderAtLeft: <UpdateStatus status={state.code}/>,
        }}
        onSuccess={onUpdateCompleted}
        onFailed={onUpdateCompleted}
      >
        <Tab.Container activeKey={state.type}>
          <RowRegular>
            <Col xs={4} lg={3}>
              <div className="d-grid gap-2">
                {Object.keys(SettingsType).map((key, idx) => {
                  const typeKey = key as SettingsTypeKey;

                  return (
                    <Button
                      key={idx}
                      variant="outline-primary"
                      active={state.type === typeKey}
                      onClick={() => setState({...state, type: typeKey})}
                      className="bg-gradient"
                    >
                      {t((t) => t.userControl.settings[typeKey])}
                    </Button>
                  );
                })}
              </div>
            </Col>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="general">
                  <UserSettingsGeneral/>
                </Tab.Pane>
                <Tab.Pane eventKey="subscriptions">
                  <UserSettingsSubscriptions
                    config={userConfig.data}
                    setConfig={(newConfig) => (
                      setUserConfig(overrideObject(userConfig, {data: newConfig}))
                    )}
                    getUnitName={getUnitName}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </RowRegular>
        </Tab.Container>

      </AjaxForm>
    </LoginRequiredLayout>
  );
};
