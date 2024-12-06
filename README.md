<p align="right">
👍 ? <a href="https://github.com/tiagoporto/svg-music-logos/stargazers">⭐</a> : <a href="https://github.com/tiagoporto/svg-music-logos/issues">😞</a>
</p>

<div align="center">

[![SVG Music Logos](./docs/logo.svg)](https://tiagoporto.github.io/svg-music-logos/)

<!-- replace start -->

![Total Artists](https://img.shields.io/badge/artists-192-blue.svg?style=flat-square)
![Total Logos](https://img.shields.io/badge/logos-343-blue.svg?style=flat-square)
![Total Origins](https://img.shields.io/badge/origins-20-blue.svg?style=flat-square)
![Total Genres](https://img.shields.io/badge/genres-59-blue.svg?style=flat-square)

<!-- replace end -->

🎧 Music-related logos and symbols collection in SVG.

</div>

Listen on:

[![YouTube Music](https://img.shields.io/badge/youtube%20music-playlist-555?style=flat-square\&logo=youtube-music\&labelColor=FF0000)](https://music.youtube.com/playlist?list=PLKtV93YW2_X-Iu_iNpyMG03bWx8YTTAx6\&feature=share)

<!-- [![Spotify](https://img.shields.io/badge/spotify-playlist-555?style=flat-square\&logo=spotify\&labelColor=1DB954\&logoColor=fff)](##) -->

## Project 💻

<https://tiagoporto.github.io/svg-music-logos>

## Status ✅

[![Website](https://img.shields.io/website/https/tiagoporto.github.io/svg-music-logos.svg?down_color=lightgrey\&down_message=offline\&style=flat-square\&up_message=online)](https://tiagoporto.github.io/svg-music-logos)
[![W3C Validation](https://img.shields.io/w3c-validation/html.svg?style=flat-square\&targetUrl=https://tiagoporto.github.io/svg-music-logos)](https://validator.nu/?doc=https%3A%2F%2Ftiagoporto.github.io%2Fsvg-music-logos)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/tiagoporto/svg-music-logos/ci.yml?label=checks\&style=flat-square)](https://github.com/tiagoporto/svg-music-logos/actions/workflows/ci.yml)
[![Page links](https://img.shields.io/github/actions/workflow/status/tiagoporto/svg-music-logos/dead-link.yml?branch=main\&style=flat-square\&label=page%20links)](https://github.com/tiagoporto/svg-music-logos/actions/workflows/dead-link.yml)

## Stack 🧰

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge\&logo=visual-studio-code\&logoColor=white)
![Node](https://img.shields.io/badge/Nodejs-%23339933.svg?style=for-the-badge\&logo=node.js\&logoColor=white)
![EditorConfig](https://img.shields.io/badge/EditorConfig-%23E0EFEF.svg?style=for-the-badge\&logo=editorconfig\&logoColor=black)
![Prettier](https://img.shields.io/badge/Prettier-1A2B34.svg?style=for-the-badge\&logo=prettier)
![Husky](https://img.shields.io/badge/Husky-%23161618.svg?style=for-the-badge)
![Lint Staged](https://img.shields.io/badge/Lint%20Staged-%23FFF.svg?style=for-the-badge)
![nuxt.js](https://img.shields.io/badge/nuxt.js-%2300c58e?style=for-the-badge\&logo=nuxt.js\&logoColor=white)
![vue.js](https://img.shields.io/badge/vue.js-%234FC08D?style=for-the-badge\&logo=vue.js\&logoColor=white)
![typescript](https://img.shields.io/badge/typescript-%23007ACC?style=for-the-badge\&logo=typescript\&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-%234B32C3.svg?style=for-the-badge\&logo=eslint\&logoColor=white)
![sass](https://img.shields.io/badge/sass-%23CC6699?style=for-the-badge\&logo=sass\&logoColor=white)
![Remark](https://img.shields.io/badge/Remark-%230A0E0F.svg?style=for-the-badge\&logo=remark\&logoColor=d80303)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge\&logo=githubactions\&logoColor=white)
![Stylelint](https://img.shields.io/badge/Stylelint-%231B3A4B.svg?style=for-the-badge\&logo=stylelint\&logoColor=white)

<!-- ![PostCSS](https://img.shields.io/badge/PostCSS-%23DD3A0A.svg?style=for-the-badge&logo=postcss&logoColor=white)
![Browserslist](https://img.shields.io/badge/Browserslist-%23FED538.svg?style=for-the-badge&color=%231D1D1D)
![jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) -->

## Folder structure 📂

```text
.
├── docs //documentation
├── src
│   ├── components // Shared components
│   ├── layout // base layout component
│   ├── pages // Nuxt routes
│   ├── public // public assets
│   │   └── logos
│   │       └── [artist folder]
│   │           ├── Styles files
│   │           ├── JSON files
│   │           └── SVG files
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
          "css": "string", // optional
          "className": "string", // optional
          "inverse": "boolean", // optional
        }
      ],
    }
  ],
  "length": "number",
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
        "css": "string", // optional
        "className": "string", // optional
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
          "css": "string", // optional
          "className": "string", // optional
          "inverse": "boolean", // optional
      }
    }
  ],
  "length": "number",
}
```

#### GET /api/genres

**Response:**

```json
{
  "genres": ["string"],
  "length": "number",
}

```

#### GET /api/origins

**Response:**

```json
{
  "origins": ["string"],
  "length": "number",
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

### Install dependencies

```bash
npm install
```

### Dev server

```bash
npm run dev
```

Happy coding!

## 🤝 Contributing

Haven’t found the logo you were looking for?

[Check how to contribute](docs/CONTRIBUTING.md).

## 🤜🤛 Donating

This project is developed on my free time, any donation is welcome.

[![GITHUB](https://img.shields.io/badge/-github-black?logo=github)](https://github.com/sponsors/tiagoporto)
[![Paypal](https://img.shields.io/badge/-PayPal-blue?logo=paypal)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations\&business=YTDUQ8RZ2G4Q8\&lc=US\&item_name=tiagoporto\&currency_code=USD\&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)
![Donate](https://img.shields.io/badge/bitcoin-14iqQcwYPLBceRURHuFosGTDXxMmt3cLDp-yellow.svg?logo=bitcoin)

## License 📄

SVG Music Logos © 2016 by Tiago Porto is licensed under [CC BY-NC 4.0](LICENSE).

![audio wave](https://media.giphy.com/media/aw6CWyyLQ8WyRuktxR/source.gif)
