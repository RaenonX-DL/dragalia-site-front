import * as fs from 'fs';

import {NextFunction, Request, Response} from 'express';
import fetch from 'node-fetch';
import Cookies from 'universal-cookie';

import {UserShowAdsResponse} from '../../src/api-def/api';
import {CookiesKeys} from '../../src/const/cookies';
import {ADS_CLIENT, API_PAGE_META} from '../const';
import {PATH_INDEX_HTML} from '../paths';


type PageMetaResponse = UserShowAdsResponse;


const replaceHtmlContent = (html: string, pageMetaResponse: PageMetaResponse): string => {
  if (pageMetaResponse.showAds) {
    html = html.replace(/__AD_CLIENT__/gim, ADS_CLIENT);
  }

  return html;
};


export const handleRoot = (req: Request, res: Response, next: NextFunction) => {
  // Check if the request URL ends with `html`, if so, blocks the access
  if (req.url.endsWith('html')) {
    res.status(403).end('403 Forbidden');
    return;
  }
  // Return page asset files
  if (req.url.match(/.*(css|js|cjs|txt|ico|png|json)/)) {
    next();
    return;
  }

  fs.readFile(PATH_INDEX_HTML, 'utf8', async (err, data) => {
    if (err) {
      throw err;
    }

    const payload = {
      googleUid: new Cookies(req.headers.cookie).get(CookiesKeys.GOOGLE_UID) || '',
    };

    await fetch(`${API_PAGE_META}?${new URLSearchParams(payload).toString()}`)
      .then((showAdsResponse) => showAdsResponse.json() as unknown as PageMetaResponse)
      .then((showAdsResponse) => {
        data = replaceHtmlContent(data, showAdsResponse);

        res.send(data);
      })
      .catch((err) => console.log(err));
  });
};