import { View, StyleSheet, Image, Text, TouchableHighlight } from "react-native";
import React from "react";
import MdIcons from 'react-native-vector-icons/MaterialIcons';
import { SharedElement } from "react-navigation-shared-element";
import { Entry } from "../models/top_albums_model";

type HomeCardProps = {
    entry: Entry,
    navigation: any,
};

const HomeCard: React.FC<{ props: HomeCardProps }> = ({ props }) => {

    return (
        <TouchableHighlight
            onPress={(e) => {
                e.preventDefault();
                props.navigation.navigate(
                    'Detail',
                    {
                        props: {
                            index: props.entry.artist,
                        }
                    },
                );
            }}>
            <View style={[styles.container, {
                flexDirection: "row",
                height: 110,
            }]}>
                <SharedElement
                    style={styles.musicAvatar}
                    id={props.entry.image}
                >
                    <Image
                        style={styles.musicAvatar}
                        source={{
                            uri: props.entry.image,
                        }}
                    />
                </SharedElement>
                <View style={styles.musicDetails}>
                    <View style={styles.details}>
                        <Text style={styles.artistName}>{props.entry.artist}</Text>
                        <Text style={styles.albumName}>{props.entry.name}</Text>
                        <Text style={styles.price}>{props.entry.price}</Text>
                    </View>
                    <MdIcons style={styles.icon} name={"chevron-right"} size={35} />
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15, marginRight: 15,
        marginBottom: 7,
        marginTop: 7,
        // padding: 10,
        borderRadius: 8,
        backgroundColor: "white",
        overflow: "hidden",
    },
    musicAvatar: {
        flex: 2,
        backgroundColor: "black",
        width: "100%",
        marginRight: 10,
    },
    musicDetails: {
        flex: 4,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    details: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom: 10,
    },
    artistName: {
        fontSize: 16,
        fontWeight: "700"
    },
    albumName: {
        marginTop: 4,
        marginBottom: 4,
    },
    price: {
        fontSize: 13,
        fontWeight: "300",
    },
    icon: {
        marginRight: 5,
        color: '#a1a1a1',
    }
});
export default HomeCard;