import React from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import MdIcons from 'react-native-vector-icons/MaterialIcons';
import { Entry } from "../models/top_albums_model";

type FavouriteCardProps = {
    entry: Entry,
    navigation: any,
};

const FavouriteCard: React.FC<{ props: FavouriteCardProps }> = ({ props }) => {
    return (
        <TouchableHighlight
            onPress={(e) => {
                e.preventDefault();
                props.navigation.navigate(
                    'Detail',
                    {
                        props: {
                            entry: props.entry,
                        }
                    },
                );
            }}>
            <View
                style={styles.container}>
                <Image
                    style={styles.imageThumbnail}
                    source={{ uri: props.entry.image, }}
                />
                <View
                    style={styles.blur}
                >
                    <View style={styles.card}>
                        <View style={styles.cardAvatar}>
                            <MdIcons name={"music-note"} size={28} />
                        </View>
                        <View style={styles.cardDetails}>
                            <Text style={styles.artistName}>{props.entry.artist}</Text>
                            <Text style={styles.albumName}>{props.entry.name}</Text>
                        </View>
                        <Text style={styles.price}>{props.entry.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
}
const styles = StyleSheet.create({

    container: {
        display: "flex",
        height: 170,
        overflow: "hidden",
        backgroundColor: '#fff',
        marginBottom: 5,
        marginTop: 5,
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
export default FavouriteCard;