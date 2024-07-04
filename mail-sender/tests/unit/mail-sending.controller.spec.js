import { expect, describe, it, afterEach } from '@jest/globals';

import sinon from 'sinon';
import { messageHandler } from '../../src/controllers/mail-sending.controller.js';
import { HTTP_STATUS_SUCCESS_ACCEPTED } from '../../src/constants/http-status.constants.js';
import * as ConfigUtil from '../../src/utils/config.utils.js';

describe('mail-sending.controller.spec', () => {
  afterEach(() => {
    sinon.restore();
  });

  it(`should return 202 HTTP status when message data is missing in incoming event message.`, async () => {
    const dummyConfig = {
      clientId: 'NOXsY5G0w68xko7nwtZ3x7UK',
      clientSecret: 'hQ1B3R7usEaojC8tGYwt3y4n-wWmcVcY',
      projectKey: 'ayata-commerce-accelerator',
      scope: 'manage_project:ayata-commerce-accelerator manage_api_clients:ayata-commerce-accelerator view_api_clients:ayata-commerce-accelerator',
      region: 'europe-west1',
    };

    sinon.stub(ConfigUtil, 'default').callsFake(() => {
      return dummyConfig;
    });
    const mockRequest = {
      method: 'POST',
      url: '/',
      body: {
        message: {},
      },
    };
    const mockResponse = {
      status: () => {
        return {
          send: () => {},
        };
      },
    };
    const responseStatusSpy = sinon.spy(mockResponse, 'status');

    await messageHandler(mockRequest, mockResponse);
    expect(responseStatusSpy.firstCall.firstArg).toEqual(
      HTTP_STATUS_SUCCESS_ACCEPTED
    );
  });
});
