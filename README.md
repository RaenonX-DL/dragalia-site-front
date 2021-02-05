# dragalia-site-front

[![Front-deployment]][Front-site]
[![Front-site-status]][Front-site]
[![Front-ci]][Front-ci-link]
[![Front-cq-badge]][Front-cq-link]
[![Front-lgtm-alert-badge]][Front-lgtm-alert-link]
[![Front-lgtm-quality-badge]][Front-lgtm-quality-link]
[![Front-time-badge]][Front-time-link]

Frontend of [Dragalia Lost info website by OM][DL-site].

[Front-deployment]: https://pyheroku-badge.herokuapp.com/?app=dragalia-site-front&style=flat-square
[Front-site]: https://dl.raenonx.cc
[Front-site-status]: https://img.shields.io/website?down_message=offline&up_message=online&url=https%3A%2F%2Fdl.raenonx.cc
[Front-cq-link]: https://www.codacy.com/gh/RaenonX-DL/dragalia-site-front/dashboard
[Front-cq-badge]: https://app.codacy.com/project/badge/Grade/83fa9f649f2e4001b848fc978642ea68
[Front-ci]: https://github.com/RaenonX-DL/dragalia-site-front/workflows/Node%20CI/badge.svg
[Front-ci-link]: https://github.com/RaenonX-DL/dragalia-site-front/actions?query=workflow%3A%22Node+CI%22
[Front-time-link]: https://wakatime.com/badge/github/RaenonX-DL/dragalia-site-front
[Front-time-badge]: https://wakatime.com/badge/github/RaenonX-DL/dragalia-site-front.svg
[Front-lgtm-alert-badge]: https://img.shields.io/lgtm/alerts/g/RaenonX-DL/dragalia-site-front.svg?logo=lgtm&logoWidth=18
[Front-lgtm-alert-link]: https://lgtm.com/projects/g/RaenonX-DL/dragalia-site-front/alerts/
[Front-lgtm-quality-badge]: https://img.shields.io/lgtm/grade/javascript/g/RaenonX-DL/dragalia-site-front.svg?logo=lgtm&logoWidth=18
[Front-lgtm-quality-link]: https://lgtm.com/projects/g/RaenonX-DL/dragalia-site-front/context:javascript

## Environment Variables

Name | Required/Optional | Description
:---: | :---: | :---:
REACT_APP_API_ROOT | Required | Root URL of the backend. This should **not** end with a slash (`/`).
REACT_APP_RESOURCE_ROOT | Required | Root URL of the exported resources. This should **not** end with a slash (`/`).
REACT_APP_DEPOT_ROOT | Required | Root URL of the data depot. This should **not** end with a slash (`/`).

For the [currently deployed website][DL-site], `REACT_APP_API_ROOT` is `https://dl-back.raenonx.cc`.

- Check https://github.com/RaenonX-DL/dragalia-site-back for the source code.

In general, 

`REACT_APP_RESOURCE_ROOT` is `https://raw.githubusercontent.com/RaenonX-DL/dragalia-site-resources/main`, where stores the parsed data.

- Check https://github.com/RaenonX-DL/dragalia-site-resources for all available resources.

`REACT_APP_DEPOT_ROOT` is `https://raw.githubusercontent.com/RaenonX-DL/dragalia-data-depot/main`, where stores the dumped game assets.

- Check https://github.com/RaenonX-DL/dragalia-data-depot for all available resources.

[DL-site]: https://dl.raenonx.cc
