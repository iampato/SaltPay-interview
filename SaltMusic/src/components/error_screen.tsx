import React from "react";
import LottieView from 'lottie-react-native';
import { Text, View } from "react-native";
import AppTheme from "../constants/theme";

const ErrorScreen: React.FC<{ message: string, title: string }> = ({ message, title }) => {
    return <View style={{
        // flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Text
            style={AppTheme.FONTS.h2}
        >{title}</Text>
        <LottieView
            style={{
                height: 300,
            }}
            source={require('../assets/lottie/38064-error-cone.json')}
            autoPlay
            loop={false}
        />
        <Text style={{
            fontFamily: "Roboto-Regular",
            fontSize: AppTheme.SIZES.body4,
            lineHeight: 22,
            textAlign: "center"
        }}>{message}</Text>
    </View>
}

export default ErrorScreen;