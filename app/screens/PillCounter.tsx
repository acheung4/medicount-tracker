import { View, Image, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function PillCounter({ navigation, route }: any) {

  const [image, setImage] = useState<any>(null);
  const [count, setCount] = useState<number | null>(null);

  const captureImage = async () => {

    try {
      await ImagePicker.requestCameraPermissionsAsync();

      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        quality: 0.95,
        base64: true
      });

      if (!result.canceled) {
        setCount(null);
        setImage(result.assets[0].uri);
        await analyzeImage(result.assets[0].base64);
      }

    } catch (error: any) {
      alert("Error capturing image: " + error.message);
    }
  }

  const uploadImage = async () => {

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.95,
        base64: true
      });

      if (!result.canceled) {
        setCount(null);
        setImage(result.assets[0].uri);
        await analyzeImage(result.assets[0].base64);
      }

    } catch (error: any) {
      alert("Error selecting image: " + error.message);
    }
  }

  const analyzeImage = async (imageBase64: string | null | undefined) => {
    try {

      const { data } = await axios.post('https://detect.roboflow.com/pillcount/3', imageBase64, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          api_key: process.env.ROBOFLOW_API_KEY
        }
      });

      setCount(data.predictions.length);

    } catch (error: any) {
      console.log(error.message);
      //alert("There was an error analyzing the image or the image contained 0 pills");
    }

  }

  const sendCountBack = () => {
    route.params.onGoBack(count);
    navigation.goBack();
  }

  return (
    <View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.control} onPress={() => captureImage()}>
          <Ionicons name="camera-outline" size={32} color='#6a9fa8' />
          <Text style={styles.controlText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.control} onPress={() => uploadImage()}>
          <Ionicons name="image-outline" size={32} color='#6a9fa8' />
          <Text style={styles.controlText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {image ? (<Image source={{ uri: image }} style={styles.image} />) :
          <Text style={{ color: 'white', fontFamily: 'Poppins' }}>Upload image to get pill count.</Text>
        }
      </View>

      {count &&
        <View style={styles.results}>
          <Text style={{ fontFamily: 'Poppins-bold', fontSize: 23 }}>Count: {count}</Text>

          <TouchableOpacity style={styles.button} onPress={() => { sendCountBack() }}>
            <Text style={styles.buttonText}>Accept Result</Text>
          </TouchableOpacity>
        </View>
      }
      
    </View>

  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    margin: 'auto',
    marginTop: 15,
    marginBottom: 25,
    gap: 10
  },
  control: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginHorizontal: 'auto',
    width: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#6a9fa8',
    backgroundColor: 'white',
  },
  controlText: {
    fontFamily: 'Poppins-bold',
    fontSize: 20,
    color: '#6a9fa8',
  },
  imageContainer: {
    width: 355,
    height: 355,
    margin: 'auto',
    marginBottom: 15,
    borderWidth: 5,
    borderColor: '#6a9fa8',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 350,
    height: 350,
  },
  results: {
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginHorizontal: 'auto',
    marginTop: 10,
    width: 175,
    borderRadius: 6,
    backgroundColor: '#fdc4b0',
  },
  buttonText: {
    fontFamily: 'Poppins-bold',
    fontSize: 20,
    color: 'white',
  },
});