# SaltMusic

A react native mobile application that shows popular music from iTunes API for the Middle Software Engineer Role

### Objective

SaltPay is branching into the music business and needs a new React Native app.
In a fictional world, SaltPay is branching into the music business and we need a new app. This React Native app needs to display the top 100 songs based on the iTunes API.


### Tasks

- Show top 100 albums based on the json feed here: `https://itunes.apple.com/us/rss/topalbums/limit=100/json`
- Build out the project to the wireframe inside the /Designs folder
- A clean modern look
- A good user experience
- Add interaction to the App: open a details page when clicking an album; go to the Album link
- Allow the top 100 to be searchable

## Result
I added some screenshots in the `screenshots` folder, in the root directory of the project. Added some GIFs to also show end to end test on the app

Light | Dark | GIF
--- | --- | ---
<img src="https://github.com/jumaallan/apollo-agriculture/blob/master/screenshots/weather_light.png" width="280"/> | <img src="https://github.com/jumaallan/apollo-agriculture/blob/master/screenshots/weather_dark.png" width="280"/> | <img src="https://github.com/jumaallan/apollo-agriculture/blob/master/screenshots/weather.gif" width="280"/>

## Technologies used
* Technologies used
    * [Typescript](https://www.typescriptlang.org//) For type safe incontractly to using Javasript
    * [React-Native](https://reactnative.dev) Learn once, write anywhere

* Networking
    * [Axios](https://axios.com) as my http client to interact with the iTunes API
    
* State-management
    * [React-Redux](https://react-redux.js.org) - The library lets your React components read data from a Redux store, and dispatch actions to the store to update state.
    * [Redux-thunk]() - for async redux actions

* UI
    * [Lottie](https://www.npmjs.com/package/react-lottie) - for loader animations 
    * [react-navigation-shared-element](https://github.com/IjzerenHein/react-navigation-shared-element) - for beautiful navigation transitions

* Test
    * [jtest](https://jestjs.io/docs/tutorial-react)
    * [Redux mock store](https://github.com/reduxjs/redux-mock-store) - A mock store for testing Redux async action creators and middleware.

