import Realm from "realm";

const AlbumsSchema = {
    name: "Album",
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: "string",
        image: "string",
        itemCount: "string",
        price: "string",
        rights: "string",
        title: "string",
        link: "string",
        artist: "string",
        releaseDate: "string",
    },
};
// open a local realm with the 'Cat' schema
const realm = Realm.open({
    schema: [AlbumsSchema],
});

export async function getAlbums() {
    let real = await realm;
    let objects =  real.objects('Album');
    console.log(objects);
    return objects;
}
export async function getAlbum(id: string) {
    let real = await realm;
    return real.objectForPrimaryKey("Album", id);
}
export async function addAlbum(album: any) {
    let real = await realm;
    try {
        real.write(() => {
            real.create("Album", album);
        });
    } catch (e) {
        console.log(e)
    }
}
export async function deleteAlbum(id: string) {
    let real = await realm;
    real.write(() => {
        let album = real.objectForPrimaryKey("Album", id);
        real.delete(album);
    });
}

export default realm;