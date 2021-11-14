import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight, Linking } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { Entry } from "../models/top_albums_model";
import MdIcons from 'react-native-vector-icons/MaterialIcons';
import type { SharedElementsComponentConfig } from "react-navigation-shared-element";
import AppTheme from "../constants/theme";
import LottieView from 'lottie-react-native';
import { addAlbum, deleteAlbum } from "../models/albums_realm";
const loveAnimation = require("../assets/lottie/heart-burst.json")
const deleteAnimation = require("../assets/lottie/button-delete.json")

interface DetailsProps {
  entry: Entry,
  type: number,
}
// 0 -> home screen
// 1 -> detail screen

const IMAGE_HEIGHT = 400;
let DetailScreen = (navigationProps: any) => {
  let props: DetailsProps = navigationProps.route.params["props"];

  const [viewLoaders, setviewLoaders] = useState(false);

  return (
    <View style={styles.body}>
      <SharedElement
        style={styles.image}
        id={`item.${props.entry.image}`}
      >
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: props.entry.image,
          }}
        />
      </SharedElement>
      <View style={{
        flex: 1,
        flexDirection: "column",
        paddingTop: 70,
        paddingLeft: 20,
      }}>
        <View style={styles.container}>
          <View style={styles.title}>
            <MdIcons style={{ marginRight: 10 }} name={"music-note"} size={22} />
            <Text style={AppTheme.FONTS.h3}> Album Name</Text>
          </View>
          <Text style={styles.album}>
            {props.entry.name}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.title}>
            <MdIcons style={{ marginRight: 10 }} name={"person"} size={22} />
            <Text style={AppTheme.FONTS.h3}> Artist Name</Text>
          </View>
          <Text style={styles.album}>
            {props.entry.artist}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.title}>
            <MdIcons style={{ marginRight: 15 }} name={"album"} size={22} />
            <Text style={AppTheme.FONTS.h3}>No of songs</Text>
          </View>
          <Text style={styles.album}>
            {props.entry.itemCount}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.title}>
            <MdIcons style={{ marginRight: 10 }} name={"calendar-today"} size={22} />
            <Text style={AppTheme.FONTS.h3}> Release on</Text>
          </View>
          <Text style={styles.album}>
            {props.entry.releaseDate}
          </Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableHighlight
          onPress={(e) => {
            e.preventDefault();
            setviewLoaders(true);

            if (props.type === 0) {
              addAlbum(props.entry);
            } else {
              deleteAlbum(props.entry.id);
            }
            setTimeout(() => {
              setviewLoaders(false);

            }, props.type == 0 ? 1600 : 3200);
          }}>
          <View style={styles.bottomLove}>
            <MdIcons style={{
              alignSelf: 'center'
            }}
              name={`${props.type == 0 ? "favorite" : "delete"}`} size={30} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={(e) => {
            e.preventDefault();
            Linking.openURL(props.entry.link);
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>iTunes Link</Text>
          </View>
        </TouchableHighlight>
      </View>

      <Image
        style={styles.avatar}
        resizeMode="cover"
        source={{
          uri: props.entry.image,
        }}
      />
      {
        viewLoaders ?
          <LottieView
            style={props.type == 0 ? {
              position: 'absolute',
              bottom: -200,
              left: -150,
            } : {}}
            source={props.type == 0 ? loveAnimation : deleteAnimation}
            autoPlay
            loop
          />
          : null
      }


    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    // flex: 1,
    marginBottom: 15,
  },
  image: {
    height: IMAGE_HEIGHT,
    width: '100%',
    opacity: 0.8,
    backgroundColor: '#000',
  },
  avatar: {
    position: 'absolute',
    bottom: IMAGE_HEIGHT - 35,
    height: 90,
    left: 20,
    borderRadius: 50,
    width: 90,
  },
  title: {
    // flex: 1,
    flexDirection: 'row',
  },
  album: {
    marginLeft: 35,
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    left: 20,
    flexDirection: 'row',
  },
  bottomLove: {
    backgroundColor: AppTheme.COLORS.white,
    height: 50,
    width: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    width: "100%",
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: AppTheme.COLORS.black,
  },
  buttonText: {
    color: AppTheme.COLORS.white,
    alignSelf: 'center',
  },
});



export const getDetailSharedElements: SharedElementsComponentConfig = (
  route,
  otherRoute,
  showing
) => {
  const item = route.params.props;
  return [
    { id: `item.${item.image}` },
  ];
};
export default DetailScreen;