import React from 'react';

import {Route} from 'react-router-dom';

import {makeRoutePath} from '../../../const/path';
import {useI18n} from '../../../i18n/hook';
import {alertDispatchers} from '../../../state/alert/dispatchers';
import {AlertPayloadMaker} from '../../../state/alert/express';
import {useDispatch} from '../../../state/store';
import {CookiesControl} from '../../../utils/cookies';
import {ApiRequestSender} from '../../../utils/services/api/requestSender';
import {FetchStatus, isNotFetched} from '../common/fetch';
import {LoginPrompt} from '../common/googleSignin/loginPrompt';
import {RouteProps} from './types';

const AdminRouteRender = ({children}: React.PropsWithChildren<{}>) => {
  // TEST: Admin route:
  //  - Only user with admin privilege can navigate into a page
  //  - User without admin will have alert displayed instead
  //  - No alert if admin navigate into page

  const {t} = useI18n();
  const dispatch = useDispatch();

  const [isAdmin, setIsAdmin] = React.useState<FetchStatus<boolean>>({
    fetched: false,
    fetching: false,
    data: false,
  });

  const googleUid = CookiesControl.getGoogleUid();

  // Prompt to sign-in if Google UID is not available
  if (!googleUid) {
    return <LoginPrompt/>;
  }

  const checkAdmin = async () => {
    const isAdminResponse = await ApiRequestSender.userIsAdmin(googleUid);

    // Set the admin status
    setIsAdmin({
      ...isAdmin,
      fetched: true,
      data: isAdminResponse.isAdmin,
    });
  };

  React.useEffect(() => {
    checkAdmin().catch((error) => console.error(error));
  }, []);

  // Return `children` if the user is admin
  if (!isNotFetched(isAdmin)) {
    if (isAdmin.data) {
      return <>{children}</>;
    }

    dispatch(alertDispatchers.showAlert(AlertPayloadMaker.adminOnly(t)));
  }

  return <></>;
};

export const AdminRoute = ({path, children}: React.PropsWithChildren<RouteProps>) => {
  return (
    <Route
      exact path={makeRoutePath(path)}
      render={() => <AdminRouteRender>{children}</AdminRouteRender>}
    />
  );
};
