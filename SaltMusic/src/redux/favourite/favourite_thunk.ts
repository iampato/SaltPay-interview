import { Dispatch } from "react";
import { AlbumsRespository } from "../../repository/albums_repository";

export namespace FavouriteThunk {

    export const getFavouriteAlbums = () => async (dispatch: Dispatch<any>) => {
        try {
            dispatch({ type: "FETCH_ALBUMS" });

            const [albums, error] = await AlbumsRespository.getRealmAlbums();
            setTimeout(() => {
                if (albums !== null) {
                    dispatch({ type: "FETCH_ALBUMS_LOADED", payload: albums });
                } else {
                    dispatch({ type: "FETCH_ALBUMS_ERROR", payload: error });
                }
            }, 1500)

        } catch (error) {
            console.log(error);
            dispatch({ type: "FETCH_ALBUMS_ERROR", payload: "An error occurred" });
        }
    }

}
export default FavouriteThunk;
