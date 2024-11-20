import { View, Image, StyleSheet, Button, Text } from "react-native";
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function PillCounter({ navigation }: any) {

  const [image, setImage] = useState<any>(null);
  const [count, setCount] = useState<number | null>(null);

  const captureImage = async () => {

    try {
      await ImagePicker.requestCameraPermissionsAsync();

      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        quality: 1,
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
        quality: 1,
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
      alert("There was an error analyzing the image or the image contained 0 pills");
    }

  }

  const sendCountBack = () => {
    navigation.navigate('AddMedicationForm', { ...navigation, modelCount: count });
  }

  return (
    <View>
      <Button title="Camera" onPress={() => captureImage()} />
      <Button title="Gallery" onPress={() => uploadImage()} />
      {image ? (<Image source={{ uri: image }} style={styles.image} />) :
        <Text>Upload image to get pill count.</Text>
      }

      {count &&
        <View>
          <Text>The model counted {count} pills in the image.</Text>
          <Button title="Accept result?" onPress={() => {sendCountBack()}} />
        </View>
      }
    </View>

  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
});