
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
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

interface PropsType {
    navigation: any
}

const HomeScreen: React.FC<{ props: PropsType }> = ({ props }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    searchButton: {
        marginLeft: 3,
        marginRight: 15,
    }
});
export default HomeScreen;