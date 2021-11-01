import thunk from "redux-thunk";
import FavouriteThunk from "../../src/redux/favourite/favourite_thunk";
import expect from "expect";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import { Entry } from "../../src/models/top_albums_model";
import { FavouriteState } from "../../src/redux/favourite/favourite_reducer";
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
import { getAlbums } from "../../src/models/albums_realm";

// initial state
const initialState: FavouriteState = {
    favourite: null,
    loading: 'idle',
    error: null,
}
// dummy static state
const favouriteList: Entry[] = [
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


describe("Favourite Thunk", () => {
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
    // initial test empty list
    it("should return an action of type FETCH_ALBUMS", done => {
        // mock our realm call for all objects
        const getAlbumsMock = jest.fn(() => []);

        // expected actions is an array of actions
        // first will be loading
        // then sucess with the static predefined albums list
        const expectedActions = [{
            type: "FETCH_ALBUMS_INIT",
        },
        {
            type: "FETCH_ALBUMS_SUCCESS",
            payload: [],
        }];

        // eventual call our store and dispath
        return store.dispatch(getAlbumsMock()).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);
            done();
        });
    });

    // testing response with data
    it("Returns empty list action when no albums found", done => {
        const getAlbumsMock = jest.fn(() => favouriteList);

        const expectedActions = [{
            type: "FETCH_ALBUMS_INIT",
        },
        {
            type: "FETCH_ALBUMS_SUCCESS",
            payload: favouriteList,
        }];

        return store.dispatch(getAlbumsMock).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);
            done();
        });
    });


    // test an error
    it("Returns error action when api returns status code != 200", done => {
        const getAlbumsMock = jest.fn(() => "error");

        const expectedActions = [{
            type: "FETCH_ALBUMS_INIT",
        },
        {
            type: "FETCH_ALBUMS_FAILURE",
            payload: "An error occured",
        }];

        return store.dispatch(getAlbumsMock).then(() => {
            const actualAction = store.getActions();
            expect(actualAction).toEqual(expectedActions);
            done();
        });
    });

});