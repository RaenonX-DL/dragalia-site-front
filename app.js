require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Cookies = require('universal-cookie');

const app = express(); // create express app

// FIXME: User auth sending are hard-coded

app.use('/', (req, res, next) => {
  // Check if the request URL ends with `html`, if so, blocks the access
  if (req.url.endsWith('html')) {
    res.status(403).end('403 Forbidden');
    return;
  }
  if (req.url.match(/.*(css|js|cjs|txt|ico|png|json)/)) {
    next();
    return;
  }

  const adsClient = 'ca-pub-1535004092052078';

  fs.readFile(path.join(__dirname, 'build', 'index.html'), 'utf8', async (err, data) => {
    if (err) throw err;

    const apiRoot = process.env.REACT_APP_API_ROOT;

    if (!apiRoot) {
      console.error('Website API root must be defined in environment variables as `REACT_APP_API_ROOT`.');
      process.exit(1);
    }

    const payload = {
      google_uid: new Cookies(req.headers.cookie).get('X_GOOGLE_UID') || '',
    };

    await fetch(`${process.env.REACT_APP_API_ROOT + '/user/show-ads'}?${new URLSearchParams(payload).toString()}`)
      .then((showAdsResponse) => showAdsResponse.json())
      .then((showAdsResponse) => {
        if (showAdsResponse.showAds) {
          data = data.replace(/__AD_CLIENT__/gim, adsClient);
        }

        res.send(data);
      })
      .catch((err) => console.log(err));
  });
});
app.use('/', express.static('build'));

app.listen(process.env.PORT || 3000, () => {
  console.log(`server started on port ${process.env.PORT || 3000}`);
});
