import { TopAlbumsModel } from "../../models/top_albums_model";

export interface FavouriteState {
    favourite: TopAlbumsModel | null,
    loading: string,
    error: string | null,
}

const initialState: FavouriteState = {
    favourite: null,
    loading: 'idle',
    error: null,
}

type action = { type: "FETCH_ALBUMS" } | { type: "FETCH_ALBUMS_LOADED", payload: any } | { type: "FETCH_ALBUMS_ERROR", payload: any };


const FavouriteReducer = (state: FavouriteState = initialState, action: action) => {
    switch (action.type) {
        case "FETCH_ALBUMS": {
            return {
                ...state,
                loading: 'loading',
            }
        }
        case "FETCH_ALBUMS_LOADED": {
            return {
                ...state,
                loading: 'idle',
                favourite: action.payload,
                error: null,
            }
        }
        case "FETCH_ALBUMS_ERROR": {
            return {
                ...state,
                loading: 'idle',
                error: action.payload,
            }
        }
        default:
            return state;
    }
}
export default FavouriteReducer;