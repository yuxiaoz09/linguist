# Little Linguist

A speech development application for children to learn letters, words, and improve their communication skills through interactive activities.

This is a Vite+React app that can be deployed on Vercel or any modern hosting platform.

## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```

## Deploying to Vercel

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

Alternatively, connect your GitHub repository to Vercel for automatic deployments.

## Features

- Interactive letter learning activities
- Speech synthesis for pronunciation help
- Progress tracking for multiple children
- Child-friendly interface with engaging activities

## Development Notes

The app currently uses mock data for development. To connect to a real backend:

1. Replace the mock implementations in `src/api/` with actual API calls
2. Update authentication logic in `src/api/entities.js`
3. Configure your backend URLs and authentication tokens