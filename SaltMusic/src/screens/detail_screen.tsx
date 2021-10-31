import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

interface DetailsProps {
  index: number,
}

let DetailScreen: React.FC<any> = (navigationProps) => {
  let props: DetailsProps = navigationProps.route.params;

  return (
    <View style={styles.body}>
      <SharedElement
        style={styles.image}
        id={props.index?.toString() ?? ""}
      >
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: 'https://picsum.photos/id/250/400/400',
          }}
        />
      </SharedElement>
      <View style={styles.container}>
        <Text style={styles.title}>
          Album Name
        </Text>
        <Text style={styles.album}>
          Artist Name
        </Text>
      </View>

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
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
  },
  title: {},
  album: {},
});
export default DetailScreen;