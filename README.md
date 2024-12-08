<div align="center">

[![SVG Music Logos](./docs/logo.svg)][project]

<!-- replace start -->

![Total Artists](https://img.shields.io/badge/artists-192-blue.svg?style=flat-square)
![Total Logos](https://img.shields.io/badge/logos-343-blue.svg?style=flat-square)
![Total Origins](https://img.shields.io/badge/origins-20-blue.svg?style=flat-square)
![Total Genres](https://img.shields.io/badge/genres-59-blue.svg?style=flat-square)

<!-- replace end -->

🎧 Music-related logos and symbols collection in SVG.

++++++++++++++++++

Listen on

[![YouTube Music](https://img.shields.io/badge/youtube%20music-playlist-555?style=flat-square\&logo=youtube-music\&labelColor=FF0000)][youtube-music-playlist]
[![Spotify](https://img.shields.io/badge/spotify-playlist-555?style=flat-square\&logo=spotify\&labelColor=1DB954\&logoColor=fff)][spotify-playlist]

</div>

## Project 💻

<https://tiagoporto.github.io/svg-music-logos>

## Motivation 🔥

I play electric guitar, and music has been part of my life since I was a teenager. Then, I graduated in Graphic Design, and after that, I moved into front-end development.

To further develop my skills and stay up-to-date with the latest technologies, I’ve made it a point to explore new tools and innovations outside of my daily routine. By combining my passions, this was the outcome.

## Status ✅

![Pagespeed insights](./docs/pagespeed.svg)

[![Website](https://img.shields.io/website/https/tiagoporto.github.io/svg-music-logos.svg?down_color=lightgrey\&down_message=offline\&style=flat-square\&up_message=online)][project]
[![W3C Validation](https://img.shields.io/w3c-validation/html.svg?style=flat-square\&targetUrl=https://tiagoporto.github.io/svg-music-logos)][w3c]
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/tiagoporto/svg-music-logos/checks.yml?label=checks\&style=flat-square)][cchecks-workflow]
[![Artists links](https://img.shields.io/github/actions/workflow/status/tiagoporto/svg-music-logos/dead-link.yml?branch=main\&style=flat-square\&label=artists%20links)][dead-links-workflow]

## Stack 🧰

![nuxt.js](https://img.shields.io/badge/nuxt.js-%2300DC82?style=for-the-badge\&logo=nuxt.js\&logoColor=white)
![vue.js](https://img.shields.io/badge/vue.js-%234FC08D?style=for-the-badge\&logo=vue.js\&logoColor=white)
![javascript](https://img.shields.io/badge/javascript-%23333?style=for-the-badge\&logo=javascript)
![typescript](https://img.shields.io/badge/typescript-%23007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)
![sass](https://img.shields.io/badge/sass-%23CC6699?style=for-the-badge\&logo=sass\&logoColor=white)
![SVG](https://img.shields.io/badge/svg-%23462b01?style=for-the-badge\&logo=svg)
![Node](https://img.shields.io/badge/Nodejs-%23339933.svg?style=for-the-badge\&logo=node.js\&logoColor=white)
![gulp](https://img.shields.io/badge/gulp-%23CF4647?style=for-the-badge\&logo=gulp\&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge\&logo=visual-studio-code\&logoColor=white)
![EditorConfig](https://img.shields.io/badge/EditorConfig-%23E0EFEF.svg?style=for-the-badge\&logo=editorconfig\&logoColor=black)
![Prettier](https://img.shields.io/badge/Prettier-1A2B34.svg?style=for-the-badge\&logo=prettier)
![Commitlint](https://img.shields.io/badge/Commitlint-%23000.svg?style=for-the-badge\&logo=commitlint\&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-%23161618.svg?style=for-the-badge)
![Lint Staged](https://img.shields.io/badge/Lint%20Staged-%23FFF.svg?style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-%234B32C3.svg?style=for-the-badge\&logo=eslint\&logoColor=white)
![Stylelint](https://img.shields.io/badge/Stylelint-%231B3A4B.svg?style=for-the-badge\&logo=stylelint\&logoColor=white)
![Remark](https://img.shields.io/badge/Remark-%230A0E0F.svg?style=for-the-badge\&logo=remark\&logoColor=d80303)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge\&logo=githubactions\&logoColor=white)
![vercel](https://img.shields.io/badge/vercel-%23000000?style=for-the-badge\&logo=vercel\&logoColor=white)

<!-- ![PostCSS](https://img.shields.io/badge/PostCSS-%23DD3A0A.svg?style=for-the-badge&logo=postcss&logoColor=white)
![Browserslist](https://img.shields.io/badge/Browserslist-%23FED538.svg?style=for-the-badge&color=%231D1D1D)
 -->

## Folder structure 📂

```text
.
├── docs //documentation
├── public // public assets
├── src
│   ├── components // Shared components
│   ├── layout // base layout component
│   ├── logos
│   │   └── [artist folder]
│   │       ├── Styles files
│   │       ├── JSON files
│   │       └── SVG files
│   ├── pages // Nuxt routes
│   └── server
│       ├── api // Nuxt endpoints
│       └── db // Nuxt database and schema
├── // config files
├── package.json
└── README.md
```

## Architecture 🏗

### APIs

APIs are provided by [Nuxt](https://nuxt.com/docs/getting-started/server).

Endpoints are defined in `server/api` directory.

#### GET /api/artists

**Response:**

```json
{
  "artists": [
    {
      "id": "number",
      "name": "string",
      "nameTemplate": "string",  // optional
      "origins": ["string"],
      "genres": ["string"] | null,
      "link": "string",
      "logos": [
        {
          "title": "string",
          "svg": "string",
          "inverse": "boolean", // optional
        }
      ],
    }
  ],
  "count": "number",
}
```

#### GET /api/artists/{id}

**Response:**

```json
{
  "artist": {
    "id": "number",
    "name": "string",
    "nameTemplate": "string",  // optional
    "origins": ["string"],
    "genres": ["string"] | null,
    "link": "string",
    "logos": [
      {
        "title": "string",
        "svg": "string",
        "inverse": "boolean", // optional
      }
    ],
  }
}
```

#### GET /api/logos

**Response:**

```json
{
  "logos": [
    {
      "id": "number",
      "name": "string",
      "nameTemplate": "string",  // optional
      "origins": ["string"],
      "genres": ["string"] | null,
      "link": "string",
      "logo": {
          "title": "string",
          "svg": "string",
          "inverse": "boolean", // optional
      }
    }
  ],
  "count": "number",
}
```

#### GET /api/genres

**Response:**

```json
{
  "genres": ["string"],
  "count": "number",
}

```

#### GET /api/origins

**Response:**

```json
{
  "origins": ["string"],
  "count": "number",
}
```

## Development 🛠

### Pre-requirements

- [git](https://git-scm.com)
- [nvm](https://github.com/nvm-sh/nvm)

### Install node

```bash
nvm install
```

### Install dependencies and run prepare scripts

```bash
npm install
```

### Running dev server

```bash
npm run dev
```

### Adding new logos

\[TODO]

## 🤝 Contributing

Haven’t found the logo you were looking for?

[Check how to contribute](docs/CONTRIBUTING.md).

## 🤜🤛 Donating

This project is developed on my free time, any donation is welcome.

[![GITHUB Sponsor](https://img.shields.io/badge/-github-black?logo=github)][gh-sponsor]
[![Paypal donate](https://img.shields.io/badge/-PayPal-blue?logo=paypal)][paypal-sponsor]
![Bitcoin donate](https://img.shields.io/badge/bitcoin-14iqQcwYPLBceRURHuFosGTDXxMmt3cLDp-yellow.svg?logo=bitcoin)

## License 📄

SVG Music Logos © 2016 by Tiago Porto is licensed under [CC BY-NC 4.0](LICENSE).

![audio wave](https://media.giphy.com/media/aw6CWyyLQ8WyRuktxR/source.gif)

<!-- Links -->

[project]: https://tiagoporto.github.io/svg-music-logos

[youtube-music-playlist]: https://music.youtube.com/playlist?list=PLKtV93YW2_X-Iu_iNpyMG03bWx8YTTAx6&feature=share

[spotify-playlist]: https://open.spotify.com/playlist/20XHrsLWAJkgBBagZiURM5

[w3c]: https://validator.nu/?doc=https%3A%2F%2Ftiagoporto.github.io%2Fsvg-music-logos

[cchecks-workflow]: https://github.com/tiagoporto/svg-music-logos/actions/workflows/checks.yml

[dead-links-workflow]: https://github.com/tiagoporto/svg-music-logos/actions/workflows/dead-link.yml

[gh-sponsor]: https://github.com/sponsors/tiagoporto

[paypal-sponsor]: https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=YTDUQ8RZ2G4Q8&lc=US&item_name=tiagoporto&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
