import { combineReducers } from "redux";
import AlbumsReducer from "./albums/album_reducer";
import FavouriteReducer from "./favourite/favourite_reducer";

let reducers = combineReducers({
    favourite: FavouriteReducer,
    albums: AlbumsReducer,
});
export default reducers;