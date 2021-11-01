import { Dispatch } from "react";
import { AlbumsRespository } from "../../repository/albums_repository";
import axios from "axios";
import { Convert } from "../../models/top_albums_model";

export namespace AlbumsThunk {
    const instance = axios.create({
        baseURL: "https://itunes.apple.com/us/rss",
        timeout: 30000,
    });
    export const getAlbums = () => {
        const endPoint = "/topalbums/limit=100/json";
        return async (dispatch: Dispatch<any>, getState: any) => {
            dispatch({ type: "FETCH_ALBUMS_INIT" });

            return instance
                .get(endPoint)
                .then((response) => {
                    if (response.status == 200) {
                        let albums = Convert.toTopAlbumsModel(response.data);
                        setTimeout(() => {
                            dispatch({
                                type: "FETCH_ALBUMS_SUCCESS",
                                payload: albums,
                            });
                        }, 1500)
                    } else {
                        dispatch({
                            type: "FETCH_ALBUMS_FAILURE",
                            payload: "An error occured",
                        });
                    }
                }).catch((error) => {
                    dispatch({
                        type: "FETCH_ALBUMS_FAILURE",
                        payload: error,
                    });
                });
        };
    };

    // export const getAlbums = () => async (dispatch: Dispatch<any>) => {
    //     try {

    //         dispatch({ type: "FETCH_ALBUMS_INIT" });
    //         const [albums, error] = await AlbumsRespository.getTopAlbums();
    //         setTimeout(() => {
    //             if (albums !== null) {
    //                 dispatch({ type: "FETCH_ALBUMS_SUCCESS", payload: albums });
    //             } else {
    //                 dispatch({ type: "FETCH_ALBUMS_FAILURE", payload: error });
    //             }
    //         }, 1500)

    //     } catch (error) {
    //         console.log(error);
    //         dispatch({ type: "FETCH_ALBUMS_FAILURE", payload: "An error occurred" });
    //     }
    // }
}
export default AlbumsThunk;

