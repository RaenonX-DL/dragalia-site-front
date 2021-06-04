# dragalia-site-front

[![front-deployment]][front-site]
[![front-site-status]][front-site]
[![front-ci]][front-ci-link]
[![front-cq-badge]][front-cq-link]
[![front-coverage-badge]][front-cq-link]
[![front-lgtm-alert-badge]][front-lgtm-alert-link]
[![front-lgtm-quality-badge]][front-lgtm-quality-link]
[![front-time-badge]][front-time-link]

Frontend of [Dragalia Lost info website by OM][site].

## Environment Variables

Name | Required/Optional | Description
:---: | :---: | :---:
NEXT_PUBLIC_API_ROOT | Required | Root URL of the backend. This should **not** end with a slash (`/`).
NEXT_PUBLIC_RESOURCE_ROOT | Required | Root URL of the exported resources. This should **not** end with a slash (`/`).
NEXT_PUBLIC_DEPOT_ROOT | Required | Root URL of the data depot. This should **not** end with a slash (`/`).

For the [current deployed website][site], `NEXT_PUBLIC_API_ROOT` is `https://dl-back.raenonx.cc`.

-   Check https://github.com/RaenonX-DL/dragalia-site-back for the source code.

In general, 

`NEXT_PUBLIC_RESOURCE_ROOT` is `https://raw.githubusercontent.com/RaenonX-DL/dragalia-site-resources/main`, 
where stores the parsed data.

-   Check https://github.com/RaenonX-DL/dragalia-site-resources for all available resources.

`NEXT_PUBLIC_DEPOT_ROOT` is `https://raw.githubusercontent.com/RaenonX-DL/dragalia-data-depot/main`, 
where stores the dumped game assets.

-   Check https://github.com/RaenonX-DL/dragalia-data-depot for all available resources.

[site]: https://dl.raenonx.cc

[front-deployment]: https://pyheroku-badge.herokuapp.com/?app=dragalia-site-front&style=flat-square
[front-site]: https://dl.raenonx.cc
[front-site-status]: https://img.shields.io/website?down_message=offline&up_message=online&url=https%3A%2F%2Fdl.raenonx.cc
[front-cq-link]: https://www.codacy.com/gh/RaenonX-DL/dragalia-site-front/dashboard
[front-cq-badge]: https://app.codacy.com/project/badge/Grade/83fa9f649f2e4001b848fc978642ea68
[front-coverage-badge]: https://app.codacy.com/project/badge/Coverage/83fa9f649f2e4001b848fc978642ea68
[front-ci]: https://github.com/RaenonX-DL/dragalia-site-front/workflows/Node%20CI/badge.svg
[front-ci-link]: https://github.com/RaenonX-DL/dragalia-site-front/actions?query=workflow%3A%22Node+CI%22
[front-time-link]: https://wakatime.com/badge/github/RaenonX-DL/dragalia-site-front
[front-time-badge]: https://wakatime.com/badge/github/RaenonX-DL/dragalia-site-front.svg
[front-lgtm-alert-badge]: https://img.shields.io/lgtm/alerts/g/RaenonX-DL/dragalia-site-front.svg?logo=lgtm&logoWidth=18
[front-lgtm-alert-link]: https://lgtm.com/projects/g/RaenonX-DL/dragalia-site-front/alerts/
[front-lgtm-quality-badge]: https://img.shields.io/lgtm/grade/javascript/g/RaenonX-DL/dragalia-site-front.svg?logo=lgtm&logoWidth=18
[front-lgtm-quality-link]: https://lgtm.com/projects/g/RaenonX-DL/dragalia-site-front/context:javascript
