import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import React, { useState, useEffect } from 'react';



export default function App() {
  // const [hasPermission, setHasPermission] = useState<string | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    console.log("pressed button");
    if (cameraRef) {
      const photo = await (cameraRef as Camera).takePictureAsync();
      console.log(photo); // You can use the photo object as needed
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera, please review permissions</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(ref: Camera | null) => setCameraRef((prevRef) => ref)}
      />
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text style={styles.text}></Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={takePicture}>
        < View style={styles.outerCircle}>
            {/* <View style={styles.innerCircle}> */}
              {/* <Text style={styles.text}>Take Photo</Text> */}
            {/* </View> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  // button: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 40, // Half of the width and height to make it circular
  //   backgroundColor: 'blue', // Change the color as needed
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  outerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50, // Half of the width and height to make it circular
    borderWidth: 10, // Border width
    borderColor: 'white', // Change the color as needed
    backgroundColor: 'rgba(255,255,255,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // innerCircle: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 40, // Half of the width and height to make it circular
  //   backgroundColor: 'rgba(255, 255, 255, 0.8)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // text: {
  //   color: 'white',
  // },
});

