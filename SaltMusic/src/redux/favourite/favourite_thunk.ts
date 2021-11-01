import { Dispatch } from "react";
import { getAlbums } from "../../models/albums_realm";
import { Convert, Entry } from "../../models/top_albums_model";

export namespace FavouriteThunk {


    export const getFavouriteAlbums = () => async (dispatch: Dispatch<any>) => {
        try {
            dispatch({ type: "FETCH_ALBUMS" });

            const response = await getAlbums();
            setTimeout(() => {
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
                    dispatch({ type: "FETCH_ALBUMS_LOADED", payload: albums });
                } else {
                    dispatch({ type: "FETCH_ALBUMS_ERROR", payload: "An error occured" });
                }
            }, 1500)

        } catch (error) {
            console.log(error);
            dispatch({ type: "FETCH_ALBUMS_ERROR", payload: "An error occurred" });
        }
    }

    export const searchAlbums = (terms: string) => {
        return async (dispatch: Dispatch<any>, getState: any) => {
            let data: Entry[] = getState().albums.albums["entry"];
            let newData = search(data, terms);
            // console.log(newData);
            setTimeout(() => {
                dispatch({
                    type: "FETCH_ALBUMS_LOADED",
                    payload: { "entry": newData },
                });

            }, 100)

        };
    };
    function search(list: Entry[], terms: string): Entry[] {
        return list.filter((element) => {
            if (element.name != null && element.name.toLowerCase() === terms.toLowerCase()) {
                return true;
            } else {
                return false;
            }
        });
    }
    // export const getFavouriteAlbums = () => async (dispatch: Dispatch<any>) => {

    //     console.log("getFavouriteAlbums");
    //     return async (dispatch: Dispatch<any>, getState: any) => {
    //         dispatch({ type: "FETCH_ALBUMS" });

    //         return getAlbums()
    //             .then((response) => {
    //                 console.log(response);
    //                 if (response !== null) {
    //                     let albumsString: string = JSON.stringify(response.toJSON());
    //                     // console.log(albumsString);
    //                     let albums = Convert.toTopAlbumsModel2(albumsString);
    //                     setTimeout(() => {
    //                         dispatch({
    //                             type: "FETCH_ALBUMS_LOADED",
    //                             payload: albums,
    //                         });
    //                     }, 1500)
    //                 } else {
    //                     dispatch({
    //                         type: "FETCH_ALBUMS_ERROR",
    //                         payload: "An error occurred"
    //                     });
    //                 }
    //             }).catch((error) => {
    //                 dispatch({
    //                     type: "FETCH_ALBUMS_ERROR",
    //                     payload: error,
    //                 });
    //             });
    //     };

    // }

}
export default FavouriteThunk;
