import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
    Image,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Text
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import MdIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import FavouriteThunk from "../redux/favourite/favourite_thunk";
import ErrorScreen from "../components/error_screen";
import LoadingScreen from "../components/loading_screen";
import FavouriteCard from "../components/favourite_card";
import realm from "../models/albums_realm";

interface PropsType {
    navigation: any
}
const FavouriteScreen: React.FC<{ props: PropsType }> = ({ props }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    // redux state
    const favouriteState = useSelector((state: any) => state);
    const albums = favouriteState.favourite.favourite;
    const loading = favouriteState.favourite.loading;
    const error = favouriteState.favourite.error;
    // create dispatch instance
    const dispatch = useDispatch()

    const [search, setSearch] = useState("");


    useEffect(() => {
        // on init of the element
        // fetch top albums
        dispatch(FavouriteThunk.getFavouriteAlbums());

        realm.then((value) => {
            value.addListener('change', () => {
                dispatch(FavouriteThunk.getFavouriteAlbums());
            });
        }).catch((e) => console.log(e));
    }, []);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                backgroundColor={"transparent"}
                translucent={true}
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            {
                error == null ? loading === "loading" ?
                    <LoadingScreen />
                    : <FlatList
                        data={albums?.entry}
                        ListHeaderComponent={
                            <View style={styles.searchBar}>
                                <View style={styles.searchContainer}>
                                    <TextInput
                                        style={styles.searchInput}
                                        onChangeText={(e) => {
                                            setSearch(e);
                                        }}
                                        onSubmitEditing={
                                            () => {
                                                dispatch(FavouriteThunk.searchAlbums(search));
                                            }
                                        }
                                        returnKeyType={'done'}
                                        placeholder="Search Musician"
                                    />

                                    <MdIcons name={"search"} color={'#a1a1a1'} size={25} />
                                </View>
                                <MdIcons style={styles.searchButton} name={"filter-list"} size={25} />
                            </View>
                        }
                        ListEmptyComponent={() => {
                            return (
                                <ErrorScreen
                                    title={"No Favourite Albums"}
                                    message={"You dont have any saved albums\n try saving then come back"}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return <FavouriteCard
                                props={{
                                    entry: item,
                                    navigation: props.navigation,
                                }}
                            />
                        }}
                    /> : <ErrorScreen
                        title={"ErrorScreen"}
                        message={error ?? ""}
                    />
            }
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    searchContainer: {
        flex: 1,
        margin: 12,
        paddingLeft: 5,
        paddingRight: 7,
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#a1a1a1',
    },
    searchInput: {
        flex: 1,
        height: 43,
    },
    container: {
        display: "flex",
        height: 170,
        overflow: "hidden",
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: 14,
        marginRight: 14,
        borderRadius: 9,
    },
    imageThumbnail: {
        display: "flex",
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        borderRadius: 9,
        overflow: "hidden",
    },
    blur: {
        height: 58,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        borderRadius: 9,
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    card: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    cardAvatar: {
        backgroundColor: '#fff',
        opacity: 0.85,
        flex: 1,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 9,
        borderBottomLeftRadius: 9,
    },
    cardDetails: {
        flex: 4,
        marginLeft: 10,
        justifyContent: 'center',
        flexDirection: "column",
    },
    artistName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "700"
    },
    albumName: {
        color: '#fff',
        marginTop: 3,
        fontSize: 13,
        fontWeight: "300",
    },
    price: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
    },

    searchButton: {
        marginLeft: 3,
        marginRight: 15,
    },

});
export default FavouriteScreen;