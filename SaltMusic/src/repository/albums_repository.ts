import { Convert, TopAlbumsModel } from "../models/top_albums_model";
import axios from "axios";
import { getAlbums } from "../models/albums_realm";

const instance = axios.create({
    baseURL: "https://itunes.apple.com/us/rss",
    timeout: 30000,
});

export namespace AlbumsRespository {

    export async function getTopAlbums(): Promise<[TopAlbumsModel | null, string | null]> {
        const endPoint = "/topalbums/limit=100/json";
        try {
            let response = await instance.get(endPoint);

            if (response?.status === 200) {
                let albums = Convert.toTopAlbumsModel(response.data);
                // console.log(albums);
                return [albums, null];
            } else {
                return [null, "An error occurred"];
            }
        }
        catch (e) {
            return [null, (e as Error).message]
        }
    }

    export async function getRealmAlbums(): Promise<[TopAlbumsModel | null, string | null]> {

        try {
            let response = await getAlbums();
            // console.log("Realdata: ", response);
            if (response !== null) {
                let albumsString: string = JSON.stringify(response.toJSON());
                // console.log(albumsString);
                let albums = Convert.toTopAlbumsModel2(albumsString);

                return [albums, null];
            } else {
                return [null, "An error occurred"];
            }
        }
        catch (e) {
            return [null, (e as Error).message]
        }
    }

}