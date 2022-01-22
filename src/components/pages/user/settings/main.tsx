import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';

import {useI18n} from '../../../../i18n/hook';
import {RowRegular} from '../../../elements/common/grid/row';
import {LoginRequiredLayout} from '../../layout/loginRequired';
import {UserSettingsGeneral} from './layout/general';
import {SettingsType, SettingsTypeKey} from './type';


export const UserSettings = () => {
  const {t} = useI18n();
  const [currentKey, setCurrentKey] = React.useState<SettingsTypeKey>('general');

  return (
    <LoginRequiredLayout>
      <Tab.Container activeKey={currentKey}>
        <RowRegular>
          <Col xs={3} lg={2}>
            <div className="d-grid gap-2">
              {Object.keys(SettingsType).map((key, idx) => {
                const typeKey = key as SettingsTypeKey;

                return (
                  <Button
                    key={idx}
                    variant="outline-primary"
                    active={currentKey === typeKey}
                    onClick={() => setCurrentKey(typeKey)}
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
                Subscription
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </RowRegular>
      </Tab.Container>
    </LoginRequiredLayout>
  );
};
