
import React, { ChangeEvent, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableHighlight } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
} from 'react-native';


import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import HomeCard from "../components/home_card";
import MdIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { AlbumsState } from "../redux/albums/album_reducer";
import LoadingScreen from "../components/loading_screen";
import ErrorScreen from "../components/error_screen";
import AlbumsThunk from "../redux/albums/albums_thunk";

interface PropsType {
    navigation: any
}

const HomeScreen: React.FC<{ props: PropsType }> = ({ props }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    // local state
    const [search, setSearch] = useState("");

    // redux state
    const albumState = useSelector((state: any) => state);
    const albums = albumState.albums.albums;
    const loading = albumState.albums.loading;
    const error = albumState.albums.error;
    // create dispatch instance
    const dispatch = useDispatch()

    useEffect(() => {
        // on init of the element
        // fetch top albums
        dispatch(AlbumsThunk.getAlbums());
    }, []);

    // console.log(albumState);
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
                                                dispatch(AlbumsThunk.searchAlbums(search));
                                            }
                                        }
                                        returnKeyType={'done'}
                                        // value={number}
                                        placeholder="Search Album"
                                    />

                                    <MdIcons name={"search"} color={'#a1a1a1'} size={25} />

                                </View>
                                <TouchableHighlight
                                    onPress={(e) => {
                                        e.preventDefault();
                                        dispatch(AlbumsThunk.getAlbums());
                                    }}>
                                    <MdIcons style={styles.searchButton} name={"close"} size={25} />
                                </TouchableHighlight>
                            </View>
                        }
                        ListEmptyComponent={() => {
                            return (
                                <ErrorScreen
                                    title={"Search albums"}
                                    message={"No Albums Found"}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return <HomeCard
                                props={{
                                    entry: item,
                                    navigation: props.navigation,
                                }}
                            />
                        }}
                    />
                    : <ErrorScreen
                        title={"ErrorScreen"}
                        message={error}
                    />

            }



        </SafeAreaView>
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
    searchButton: {
        marginLeft: 3,
        marginRight: 15,
    }
});


export default HomeScreen;
