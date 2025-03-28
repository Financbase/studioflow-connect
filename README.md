# Tab Manager Extension

A Chrome extension for safely managing tab operations and iframe interactions with proper error handling.

## Features

- View and manage tabs in your Chrome browser
- Interact with iframes in active tabs
- Robust error handling
- TypeScript-based for type safety
- Consistent Promise-based messaging
- Unit tested

## Project Structure

```
tab-manager-extension/
├── dist/                  # Compiled extension files
├── src/                   # Source code
│   ├── types/             # TypeScript type definitions
│   │   └── chrome.d.ts    # Type definitions for Chrome APIs
│   ├── utils/             # Utility functions
│   │   ├── dom.ts         # DOM manipulation utilities
│   │   └── messaging.ts   # Communication utilities
│   ├── __tests__/         # Test files
│   │   ├── dom.test.ts    # Tests for DOM utilities
│   │   └── messaging.test.ts # Tests for messaging utilities
│   ├── background.ts      # Background script
│   ├── content-script.ts  # Content script injected into pages
│   ├── popup.ts           # Popup script
│   ├── popup.html         # Popup HTML
│   └── manifest.json      # Extension manifest
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Webpack configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Start development mode:

```bash
npm run dev
```

This will compile the TypeScript files and watch for changes.

## Building for Production

```bash
npm run build
```

The extension will be compiled to the `dist` directory.

## Loading the Extension in Chrome

1. Build the extension
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `dist` directory

## Testing

Run unit tests:

```bash
npm test
```

## Linting

Check code style:

```bash
npm run lint
```

Fix code style issues:

```bash
npm run format
```

## Type Checking

Verify TypeScript:

```bash
npm run type-check
```

## Complete Validation

Run all checks at once:

```bash
npm run validate
```

## Design Patterns

This extension uses consistent Promise-based messaging between components:

- **Background Script**: Manages extension state and coordinates operations between tabs
- **Content Script**: Interacts with web page DOM to find iframes
- **Popup**: Provides UI for tab and iframe management

Communication between these components uses standardized message passing with proper error handling.

## License

MIT

# Welcome to your Lovable project

## Project info

**URL**: [https://lovable.dev/projects/65fabfb4-88c8-44c8-bcd8-941a55f22b2b](https://lovable.dev/projects/65fabfb4-88c8-44c8-bcd8-941a55f22b2b)

## How can I edit this code?

There are several ways of editing your application.

### Use Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/65fabfb4-88c8-44c8-bcd8-941a55f22b2b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### Use your preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Edit a file directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/65fabfb4-88c8-44c8-bcd8-941a55f22b2b) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## StudioFlow - Audio Production Management Platform

### Project Overview

StudioFlow is a comprehensive SaaS platform designed specifically for audio production professionals, studios, and creators. It serves as an all-in-one management system that bridges the gaps between different audio tools, operating systems, and workflows - solving the common fragmentation issues in audio production environments.

### Technical Architecture

#### Frontend Framework

- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with a custom design system
- **Component Library**: Shadcn UI (built on Radix UI primitives)
- **State Management**: Combination of React Context API and custom hooks
- **Routing**: React Router v6 with protected routes for authenticated content

#### Backend Integration

- **Database**: Supabase PostgreSQL for structured data
- **Authentication**: Supabase Auth with email/password and social providers
- **Storage**: Supabase Storage for audio file management
- **Real-time**: Supabase Realtime for live updates and collaboration
- **Edge Functions**: Supabase Edge Functions for serverless operations

### Getting Started

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm install

# Step 4: Set up environment variables
# Create a .env file with the following variables:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Step 5: Start the development server
npm run dev
```

### Project Structure

```txt
src/
├── components/     # UI components organized by feature
│   ├── ui/         # Shadcn UI components
│   ├── audio/      # Audio processing components
│   ├── zen/        # Zen mode components
│   └── dashboard/  # Dashboard components
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── integrations/   # Third-party service integrations
├── lib/            # Utility functions and helpers
├── pages/          # Page components
├── styles/         # Global styles and CSS
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

### Key Features

- Dashboard system with customizable widgets
- Audio processing with waveform visualization
- Zen Mode for distraction-free work
- Cross-platform connectivity with StudioFlow Connect
- Real-time collaboration tools
