# Insta Share App

Insta Share is a responsive Instagram-style React application. It includes login, protected pages, stories, posts, likes, comments, search, user profiles, a personal profile page, and deployment-ready routing.

The app can use the live CCBP API through a Netlify function, and it also includes a local demo mode so the project works immediately during development.

## Features

- User authentication with JWT stored in browser cookies
- Protected routes for home, profile, and user profile pages
- Responsive header with navigation, search, and logout
- Stories section with modal story preview
- Posts feed with profile links, captions, comments, like action, and share/comment icons
- Search posts by caption or username
- Empty search result screen
- My Profile page with profile stats, stories, and post grid
- User details page for viewing another user's profile
- Loader, failure, retry, and not-found views
- Netlify-ready API proxy and SPA redirects
- Local demo account with mock posts, stories, profiles, search, and likes

## Technologies Used

- React
- Vite
- React Router DOM
- React Icons
- JS Cookie
- JavaScript ES Modules
- CSS3
- Netlify Functions
- CCBP Insta Share API
- Local mock API data for development/demo mode

## Project Structure

```text
insta-share-app/
  netlify/functions/api.js
  public/_redirects
  src/
    components/
      Header/
      Home/
      LoginForm/
      MyProfile/
      PostsList/
      Post/
      PostActions/
      Profile/
      UserDetails/
      UserStories/
      UserStoriesModal/
      ProtectedRoute/
      FailureView/
      LoaderView/
      NotFound/
    styles/main.css
    utils/api.js
    utils/constants.js
    utils/mockApi.js
    App.jsx
    index.jsx
  index.html
  netlify.toml
  package.json
  vite.config.js
```

## Demo Login

Open the login page and choose **Use demo account**, or enter:

- Username: `demo`
- Password: `demo123`

When the demo account is used, the app reads from `src/utils/mockApi.js`. This lets the feed, search, stories, likes, and profile pages work without depending on external credentials.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## API Setup

During local development, `vite.config.js` proxies `/api` requests to:

```text
https://apis.ccbp.in
```

For Netlify deployment, `netlify/functions/api.js` forwards API requests to the same CCBP API. The redirect rule in `netlify.toml` maps:

```text
/api/*
```

to:

```text
/.netlify/functions/api/:splat
```

## Routes

- `/login` - Login page
- `/` - Home feed
- `/my-profile` - Logged-in user's profile
- `/users/:userId` - Selected user's profile
- `/not-found` - Not found page

## Deploy

Push this repository to GitHub, then import it in Netlify.

Netlify settings:

- Build command: `npm run build`
- Publish directory: `dist`

SPA redirects are configured in both `netlify.toml` and `public/_redirects`.

## GitHub Repository

Repository URL:

```text
https://github.com/ThousufAhammed/Insta-Share.git
```
