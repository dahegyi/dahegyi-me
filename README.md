# my cute little portfolio website

![GitHub package.json version](https://img.shields.io/github/package-json/v/dahegyi/dahegyi-me)
[![Deploy to Firebase Hosting](https://github.com/dahegyi/szabadbisztro/actions/workflows/firebase-deploy.yml/badge.svg)](https://github.com/dahegyi/szabadbisztro/actions/workflows/firebase-deploy.yml)
[![License: Unlicense](https://img.shields.io/badge/License-Unlicense-black.svg)](https://en.wikipedia.org/wiki/Unlicense)

Live website available at [dahegyi.me](https://dahegyi.me/)

## Installation & Usage

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Installation

1. Clone the repository: `git clone git@github.com:dahegyi/dahegyi-me.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### Usage

- `npm run dev` - Runs the development server
- `npm run build` - Builds the production version
- `npm run preview` - Serves the production version locally
- `npm run prepare` - Installs the Git hooks (runs automatically on `npm install`)
- `npm run lint` - Runs ESLint and Stylelint
- `npm run lint:fix` - Runs ESLint and Stylelint and fixes the errors

## Deployment

The website is deployed automatically to Firebase Hosting on every push to the `main` branch.

### Deployment without Github Actions:

1. Build the production version: `npm run build`
2. Deploy the `dist` folder to Firebase Hosting: `firebase deploy`

## License

The project is licensed under The Unlicense. See the [LICENSE](LICENSE) file for details.
