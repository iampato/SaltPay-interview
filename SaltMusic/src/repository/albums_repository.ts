import { Convert, TopAlbumsModel } from "../models/top_albums_model";
import axios from "axios";

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

}