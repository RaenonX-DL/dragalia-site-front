import {ObjectId} from 'mongodb';

import {ApiResponseCode} from '../../../api-def/api';
import {GoogleAnalytics} from '../ga';
import {ApiRequestSender} from './requestSender';


describe('API request sender', () => {
  let fnGaEvent: jest.SpyInstance;

  beforeEach(() => {
    jest.spyOn(ApiRequestSender, 'sendRequest').mockResolvedValue({
      code: ApiResponseCode.SUCCESS,
      success: true,
    }); // Mock to prevent actually sending a request
    fnGaEvent = jest.spyOn(GoogleAnalytics, 'subscriptionUpdate');
  });

  it('sends a GA event on user adding a subscription', async () => {
    await ApiRequestSender.addSubscription(
      new ObjectId().toHexString(),
      {type: 'const', name: 'ALL_QUEST'},
    );

    expect(fnGaEvent).toHaveBeenCalledTimes(1);
    expect(fnGaEvent).toHaveBeenLastCalledWith('add', {type: 'const', name: 'ALL_QUEST'});
  });

  it('sends a GA event on user removing a subscription', async () => {
    await ApiRequestSender.removeSubscription(
      new ObjectId().toHexString(),
      {type: 'const', name: 'ALL_QUEST'},
    );

    expect(fnGaEvent).toHaveBeenCalledTimes(1);
    expect(fnGaEvent).toHaveBeenLastCalledWith('remove', {type: 'const', name: 'ALL_QUEST'});
  });
});
