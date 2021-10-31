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

function FavouriteScreen() {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };


    useEffect(() => {
        let items = Array.apply(null, Array(5)).map((v, i) => {
            return {
                id: i,
                src: `https://picsum.photos/id/${i + 250}/400/400`
            };
        });
        setDataSource(items);
    }, []);
    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                backgroundColor={"transparent"}
                translucent={true}
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <ScrollView>
                <View style={styles.searchBar}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            // onChangeText={onChangeNumber}
                            // value={number}
                            placeholder="Search favourite"
                        />

                        <MdIcons name={"search"} color={'#a1a1a1'} size={25} />
                    </View>
                    <MdIcons style={styles.searchButton} name={"filter-list"} size={25} />
                </View>


                {
                    dataSource.map((item, index) => {
                        return <View
                            key={item.id}
                            style={styles.container}>
                            <Image
                                style={styles.imageThumbnail}
                                source={{ uri: item.src, }}
                            />
                            <View
                                style={styles.blur}
                            >
                                <View style={styles.card}>
                                    <View style={styles.cardAvatar}>
                                        <MdIcons name={"music-note"} size={28} />
                                    </View>
                                    <View style={styles.cardDetails}>
                                        <Text style={styles.artistName}>Artist Name</Text>
                                        <Text style={styles.albumName}>Album Name</Text>
                                    </View>
                                    <Text style={styles.price}>$ 13</Text>
                                </View>
                            </View>
                        </View>
                    })
                }

            </ScrollView>
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