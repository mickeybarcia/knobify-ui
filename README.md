# knobify 
## formulate the perfect playlist
https://knobify-ui.herokuapp.com/ (note using free tier so will take a second for UI and first backend request to load)
(I will also need to add your Spotify email in the Spotify Developer portal so that you can use this app)

Login with your spotify account and choose the artists, songs, settings and filters you want to make a playlist. Select a song and the playlist will play in your spotify player.

<img src="./screenshots/pic1.png">
<img src="./screenshots/pic2.png">

## auth flow
(see https://github.com/mickeybarcia/knobify-api)
- click login and hit login backend endpoint which
    - saves a random "state" variable in a cookie
    - redirects you to the Spotify authorize page where you accept the auth scopes for access to your library, listening history, player, etc
- you're redirected to redirect backend endpoint where
    - the state cookie is compared to the state param in the redirect url
    - the Spotify access and refresh tokens are saved in the Redis cache to be used when the backend hits the Spotify API
    - the knobify refresh token is saved in a cookie
    - you are redirected to the main UI page
- you do something on the frontend that hits the backend without an access token which
    - yields a forbidden error that is caught
    - triggers a call to the refresh token endpoint
    - returns an access token to use for future requests to the backend (until it expires)


## tools used
- NestJS
- React
- Spotify Web API
- Redis
- Heroku

## ...
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
