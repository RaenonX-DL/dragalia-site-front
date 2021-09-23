# dragalia-site-front

[![front-time-badge]][front-time-link]

**CI**

Main | Dev
:---: | :---:
[![front-ci-main]][front-ci-main-link] | [![front-ci-dev]][front-ci-dev-link]

**CD**

[![front-cd]][front-cd-link]

**Site Status**

[![front-site-status]][front-site]
[![front-site-response]][front-site]

[![front-site-day]][front-site]
[![front-site-week]][front-site]
[![front-site-month]][front-site]

> These refresh every 5 minutes.

**Code Quality**

[![front-lgtm-alert-badge]][front-lgtm-alert-link]
[![front-lgtm-quality-badge]][front-lgtm-quality-link]
[![front-lgtm-loc-badge]][front-lgtm-alert-link]

Main | Dev
:---: | :---:
[![front-grade-badge-main]][front-cq-link-main] | [![front-grade-badge-dev]][front-cq-link-dev]
[![front-coverage-badge-main]][front-cq-link-main] | [![front-coverage-badge-dev]][front-cq-link-dev]

Frontend of [Dragalia Lost info website by OM][front-site].

## Environment Variables

Name | Required/Optional | Description
:---: | :---: | :---:
`NEXT_PUBLIC_API_ROOT` | Required | Root URL of the backend. This should **not** end with a slash (`/`).
`NEXT_PUBLIC_RESOURCE_ROOT` | Required | Root URL of the exported resources. This should **not** end with a slash (`/`).
`NEXT_PUBLIC_DEPOT_ROOT` | Required | Root URL of the data depot. This should **not** end with a slash (`/`).
`NEXT_PUBLIC_AUDIO_ROOT` | Required | Root URL of the audio depot. This should **not** end with a slash (`/`).

For the [current deployed website][front-site], `NEXT_PUBLIC_API_ROOT` is `https://dl-back.raenonx.cc`.

-   Check https://github.com/RaenonX-DL/dragalia-site-back-2 for the source code.

In general,

`NEXT_PUBLIC_RESOURCE_ROOT` is `https://raw.githubusercontent.com/RaenonX-DL/dragalia-site-resources/main`,
where stores the parsed data.

> Check https://github.com/RaenonX-DL/dragalia-site-resources for all available resources.

`NEXT_PUBLIC_DEPOT_ROOT` is `https://raw.githubusercontent.com/RaenonX-DL/dragalia-data-depot/main`,
where stores the dumped game assets.

> Check https://github.com/RaenonX-DL/dragalia-data-depot for all available resources.

`NEXT_PUBLIC_AUDIO_ROOT` is `https://raw.githubusercontent.com/RaenonX-DL/dragalia-data-audio/main`,
where stores the dumped audio files.

> Check https://github.com/RaenonX-DL/dragalia-data-audio for all available resources.

[front-repo]: https://github.com/RaenonX-DL/dragalia-site-front
[front-site]: https://dl.raenonx.cc
[front-ci-main]: https://dev.azure.com/RaenonX-DL/DL-Site/_apis/build/status/dragalia-site-front%20(Build)?branchName=main
[front-ci-main-link]: https://dev.azure.com/RaenonX-DL/DL-Site/_build/latest?definitionId=1&branchName=main
[front-ci-dev]: https://dev.azure.com/RaenonX-DL/DL-Site/_apis/build/status/dragalia-site-front%20(Build)?branchName=dev
[front-ci-dev-link]: https://dev.azure.com/RaenonX-DL/DL-Site/_build/latest?definitionId=1&branchName=dev
[front-cd]: https://vsrm.dev.azure.com/RaenonX-DL/_apis/public/Release/badge/0159375c-7a21-49a8-88d5-9af78c5f2150/2/2
[front-cd-link]: https://dev.azure.com/RaenonX-DL/DL-Site/_release?definitionId=2
[front-time-badge]: https://wakatime.com/badge/github/RaenonX-DL/dragalia-site-front.svg
[front-time-link]: https://wakatime.com/badge/github/RaenonX-DL/dragalia-site-front
[front-site-status]: https://badgen.net/uptime-robot/status/m787223686-f1d10f084c18dd5d5389f456?cache=300
[front-site-response]: https://badgen.net/uptime-robot/response/m787223686-f1d10f084c18dd5d5389f456?cache=300
[front-site-day]: https://badgen.net/uptime-robot/day/m787223686-f1d10f084c18dd5d5389f456?label=uptime%20in%2024%20hrs&cache=300
[front-site-week]: https://badgen.net/uptime-robot/week/m787223686-f1d10f084c18dd5d5389f456?label=uptime%20in%207%20days&cache=300
[front-site-month]: https://badgen.net/uptime-robot/month/m787223686-f1d10f084c18dd5d5389f456?label=uptime%20in%201%20month&cache=300
[front-lgtm-alert-badge]: https://badgen.net/lgtm/alerts/g/RaenonX-DL/dragalia-site-front/javascript?icon=lgtm
[front-lgtm-alert-link]: https://lgtm.com/projects/g/RaenonX-DL/dragalia-site-front/alerts/
[front-lgtm-quality-badge]: https://badgen.net/lgtm/grade/g/RaenonX-DL/dragalia-site-front/javascript?icon=lgtm
[front-lgtm-quality-link]: https://lgtm.com/projects/g/RaenonX-DL/dragalia-site-front/context:javascript
[front-lgtm-loc-badge]: https://badgen.net/lgtm/lines/g/RaenonX-DL/dragalia-site-front/javascript?icon=lgtm
[front-cq-link-main]: https://www.codacy.com/gh/RaenonX-DL/dragalia-site-front/dashboard?branch=main
[front-cq-link-dev]: https://www.codacy.com/gh/RaenonX-DL/dragalia-site-front/dashboard?branch=dev
[front-grade-badge-main]: https://app.codacy.com/project/badge/Grade/83fa9f649f2e4001b848fc978642ea68?branch=main
[front-grade-badge-dev]: https://app.codacy.com/project/badge/Grade/83fa9f649f2e4001b848fc978642ea68?branch=dev
[front-coverage-badge-main]: https://app.codacy.com/project/badge/Coverage/83fa9f649f2e4001b848fc978642ea68?branch=main
[front-coverage-badge-dev]: https://app.codacy.com/project/badge/Coverage/83fa9f649f2e4001b848fc978642ea68?branch=dev
[front-cypress-badge-main]: https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/wgo7xq/main&logo=cypress
[front-cypress-badge-dev]: https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/wgo7xq/dev&logo=cypress
[front-cypress-link]: https://dashboard.cypress.io/projects/wgo7xq/runs
