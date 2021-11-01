import thunk from "redux-thunk";
import AlbumsThunk from "../../src/redux/albums/albums_thunk";
import expect from "expect";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import { AlbumsState } from "../../src/redux/albums/album_reducer";
import { Entry } from "../../src/models/top_albums_model";
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// intial state
const initialState: AlbumsState = {
    albums: null,
    loading: 'idle',
    error: null,
}
// dummy static state
const albumsList: Entry[] = [
    {
        id: "id",
        name: "Blessings",
        image: "https://lipsum.photo/id/1/300/400",
        itemCount: "5",
        price: "$ 50",
        rights: "@copyright 2020 Ogopa Studios",
        title: "Blessings - Patrick",
        link: "https://google.com",
        artist: "Patrick",
        releaseDate: "25th October 2020",
    },
    {
        id: "id",
        name: "God's timing",
        image: "https://lipsum.photo/id/4/300/400",
        itemCount: "10",
        price: "$ 20",
        rights: "@copyright 2021 Ogopa Studios",
        title: "God's timing - Drake",
        link: "https://facebook.com",
        artist: "Drake",
        releaseDate: "4th August 2021",
    },
];

describe("Albums Thunk", () => {
    let store: any;
    // this ran before the test
    beforeEach(() => {
        moxios.install();
        store = mockStore(initialState);
    });
    // run after each test
    // so that the next test does not interfere with the previous test
    // in terms of state
    afterEach(() => {
        moxios.uninstall();
    });
    // testing valid response
    it("should return an action of type ALBUMS_LOADING", done => {
        // mock our http call
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [
                    {
                        id: "id",
                        name: "Blessings",
                        image: "https://lipsum.photo/id/1/300/400",
                        itemCount: "5",
                        price: "$ 50",
                        rights: "@copyright 2020 Ogopa Studios",
                        title: "Blessings - Patrick",
                        link: "https://google.com",
                        artist: "Patrick",
                        releaseDate: "25th October 2020",
                    },
                    {
                        id: "id",
                        name: "God's timing",
                        image: "https://lipsum.photo/id/4/300/400",
                        itemCount: "10",
                        price: "$ 20",
                        rights: "@copyright 2021 Ogopa Studios",
                        title: "God's timing - Drake",
                        link: "https://facebook.com",
                        artist: "Drake",
                        releaseDate: "4th August 2021",
                    },
                ]
            });
        });
        // expected actions is an array of actions
        // first will be loading
        // then sucess with the static predefined albums list
        const expectedActions = [{
            type: "FETCH_ALBUMS_INIT",
        },
        {
            type: "FETCH_ALBUMS_SUCCESS",
            payload: albumsList,
        }];

        // eventual call our store and dispath
        return store.dispatch(AlbumsThunk.getAlbums()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);
            done();
        });
    });

    // testing empty response
    it("Returns empty list action when no albums found", done => {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: []
            });
        });

        const expectedActions = [{
            type: "FETCH_ALBUMS_INIT",
        },
        {
            type: "FETCH_ALBUMS_SUCCESS",
            payload: [],
        }];

        return store.dispatch(AlbumsThunk.getAlbums()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);
            done();
        });
    });

    // test an error
    it("Returns error action when api returns status code != 200", done => {
        moxios.wait(function () {
            let request = moxios.requests.mostRecent();
            request.respondWith({
                status: 202,
                response: {
                    message: "Internal server error"
                }
            });
        });

        const expectedActions = [{
            type: "FETCH_ALBUMS_INIT",
        },
        {
            type: "FETCH_ALBUMS_FAILURE",
            payload: "An error occured",
        }];

        return store.dispatch(AlbumsThunk.getAlbums()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);
            done();
        });
    });

});