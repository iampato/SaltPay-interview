import React from "react";
import LottieView from 'lottie-react-native';
import { View } from "react-native";

let LoadingScreen = () => {
    return (
        <View style={{
            height: "100%",
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',

            // marginTop: 100,
        }}>
            <LottieView
                style={{
                    margin: 50
                }}
                source={require('../assets/lottie/5853-play-music.json')}
                autoPlay
                loop
            />
        </View>

    );
}
export default LoadingScreen;