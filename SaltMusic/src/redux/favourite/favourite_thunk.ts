import { Dispatch } from "react";
import { getAlbums } from "../../models/albums_realm";
import { Convert } from "../../models/top_albums_model";

export namespace FavouriteThunk {

    export const getFavouriteAlbums = () => async (dispatch: Dispatch<any>) => {

        return async (dispatch: Dispatch<any>, getState: any) => {
            dispatch({ type: "FETCH_ALBUMS" });

            return getAlbums()
                .then((response) => {
                    if (response !== null) {
                        let albumsString: string = JSON.stringify(response.toJSON());
                        // console.log(albumsString);
                        let albums = Convert.toTopAlbumsModel2(albumsString);
                        setTimeout(() => {
                            dispatch({
                                type: "FETCH_ALBUMS_LOADED",
                                payload: albums,
                            });
                        }, 1500)
                    } else {
                        dispatch({
                            type: "FETCH_ALBUMS_ERROR",
                            payload: "An error occurred"
                        });
                    }
                }).catch((error) => {
                    dispatch({
                        type: "FETCH_ALBUMS_ERROR",
                        payload: error,
                    });
                });
        };

    }

}
export default FavouriteThunk;
