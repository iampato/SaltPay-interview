import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AlbumsReducer from "./album_reducer";

const store = createStore(AlbumsReducer, applyMiddleware(thunk));

export default store;