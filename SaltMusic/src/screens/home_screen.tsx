
import React, { useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import {
    SafeAreaView,
    StatusBar,
    useColorScheme,
} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import HomeCard from "../components/home_card";
import MdIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { AlbumsState } from "../redux/album_reducer";
import AlbumsThunk from "../redux/albums_thunk";
import LoadingScreen from "../components/loading_screen";
import ErrorScreen from "../components/error_screen";

interface PropsType {
    navigation: any
}

const HomeScreen: React.FC<{ props: PropsType }> = ({ props }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // redux state
    const albums = useSelector<AlbumsState, AlbumsState["albums"]>((state) => state.albums);
    const loading = useSelector<AlbumsState, AlbumsState["loading"]>((state) => state.loading);
    const error = useSelector<AlbumsState, AlbumsState["error"]>((state) => state.error);
    // create dispatch instance
    const dispatch = useDispatch()

    useEffect(() => {
        // on init of the element
        // fetch top albums
        setTimeout(() => {
            dispatch(AlbumsThunk.getAlbums());
        }, 2000)

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
                    : <ScrollView>
                        <View style={styles.searchBar}>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    // onChangeText={onChangeNumber}
                                    // value={number}
                                    placeholder="Search Musician"
                                />

                                <MdIcons name={"search"} color={'#a1a1a1'} size={25} />
                            </View>
                            <MdIcons style={styles.searchButton} name={"filter-list"} size={25} />
                        </View>

                        {
                            list.map((item, index) => {
                                return <HomeCard
                                    key={index}
                                    props={{
                                        index: item,
                                        navigation: props.navigation,
                                    }}
                                />
                            })
                        }

                    </ScrollView> : <ErrorScreen
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