import React from 'react';

import _ from 'lodash';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import {subKeysInclude, SubscriptionKey} from '../../../../../../api-def/api';
import {useI18n} from '../../../../../../i18n/hook';
import {removeDuplicates} from '../../../../../../utils/array';
import {RowRegular} from '../../../../../elements/common/grid/row';
import {AutoComplete} from '../../../../../elements/input/autoComplete/main';
import {ConfigLayoutProps} from '../../type';
import {constNameTranslations} from './const';
import {useSubscriptionOptionToText} from './hook';


export const UserSettingsSubscriptions = ({config, setConfig, ...props}: ConfigLayoutProps) => {
  const {t} = useI18n();
  const {keyToText} = useSubscriptionOptionToText(props);
  // Use a state to cache all available keys,
  // so deselecting a subscription key won't make it disappear from the available choices
  const [subscriptionKeysOption] = React.useState(
    [...removeDuplicates([
      ...Object.keys(constNameTranslations).map((name) => ({type: 'const', name}) as SubscriptionKey),
      ...config.subscriptionKeys,
    ], (a, b) => _.isEqual(a, b))]
      .map((key) => ({key, text: keyToText(key)})),
  );

  return (
    <>
      <Alert variant="info">
        {t((t) => t.userControl.subscriptions.tipsToAdd)}
      </Alert>
      <RowRegular className="text-end">
        <Col>
          <Button
            className="mb-3"
            variant="outline-danger"
            onClick={() => setConfig({...config, subscriptionKeys: []})}
          >
            {t((t) => t.userControl.subscriptions.removeAll)}
          </Button>
        </Col>
      </RowRegular>
      <AutoComplete
        options={subscriptionKeysOption}
        getText={(option) => option.text}
        getValue={(option) => option.key}
        minLength={0}
        isOptionSelected={(option) => subKeysInclude(config.subscriptionKeys, option.key)}
        payload={config}
        getArray={(payload) => payload.subscriptionKeys}
        setArray={(subscriptionKeys: SubscriptionKey[]) => setConfig({...config, subscriptionKeys})}
        renderOption={(option) => <>{option.text}</>}
        renderEntries={(key) => <>{keyToText(key)}</>}
        showMoveButton={false}
      />
    </>
  );
};
