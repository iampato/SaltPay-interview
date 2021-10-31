import { TopAlbumsModel } from "../models/top_albums_model";

export interface AlbumsState {
    albums: TopAlbumsModel | null,
    loading: string,
    error: string | null,
}

const initialState: AlbumsState = {
    albums: null,
    loading: 'idle',
    error: null,
}

type action = { type: "FETCH_ALBUMS_INIT" } | { type: "FETCH_ALBUMS_SUCCESS", payload: any } | { type: "FETCH_ALBUMS_ERROR", payload: any };


const AlbumsReducer = (state: AlbumsState = initialState, action: action) => {
    switch (action.type) {
        case "FETCH_ALBUMS_INIT": {
            return {
                ...state,
                loading: 'loading',
            }
        }
        case "FETCH_ALBUMS_SUCCESS": {
            return {
                ...state,
                loading: 'idle',
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
export default AlbumsReducer;