import React from 'react';

import {MiscPostPublishPayload} from '../../../../../api-def/api';
import {AppReactContext} from '../../../../../context/app/main';
import {useI18n} from '../../../../../i18n/hook';
import {backupDispatchers} from '../../../../../state/backup/dispatchers';
import {useBackupSelector} from '../../../../../state/backup/selector';
import {useDispatch} from '../../../../../state/store';
import {overrideObject} from '../../../../../utils/override';
import {ApiRequestSender} from '../../../../../utils/services/api/requestSender';
import {PostFormState} from '../../../../elements/posts/form/types';
import {MiscPostForm} from './main';
import {generatePayload} from './utils';


export const MiscNew = () => {
  const {lang} = useI18n();
  const context = React.useContext(AppReactContext);
  const dispatch = useDispatch();

  const {misc} = useBackupSelector();

  const [formState, setFormState] = React.useState<PostFormState<MiscPostPublishPayload>>({
    payload: overrideObject(generatePayload(lang, context?.session?.user.id.toString()), misc),
    isIdAvailable: true,
    isPreloaded: false,
  });

  return (
    <MiscPostForm
      formState={formState}
      setFormState={setFormState}
      fnSendRequest={ApiRequestSender.miscPublish}
      onSubmitSuccess={() => dispatch(backupDispatchers.clearMisc())}
      onUpdated={(payload) => {
        const {uid, ...rest} = payload;
        dispatch(backupDispatchers.backupMisc(rest));
      }}
    />
  );
};
