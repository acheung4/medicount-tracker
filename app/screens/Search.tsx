import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { useState } from 'react';

export default function Search() {

    const [data, setData] = useState({
        name: "",
        dosage: "",
        quantity: "",
        signature: "",
        prescriber: ""
    });

    const handleChange = (value: any, name: string) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const addMedication = async () => {
        try {
            const formattedData = {
                name: data.name,
                dosage: Number(data.dosage),
                quantity: Number(data.quantity),
                signature: data.signature,
                prescriber: data.prescriber
            };

            await addDoc(collection(FIREBASE_DB, "users", String(FIREBASE_AUTH.currentUser?.uid), "medications"), formattedData);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.form}>
                <Text>Drug Name</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "name")} value={data.name} placeholder="Drug Name" />

                <Text>Dosage</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "dosage")} keyboardType="numeric" value={data.dosage} placeholder="0" />

                <Text>Quantity</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "quantity")} keyboardType="numeric" value={data.quantity} placeholder="0" />

                <Text>Signature</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "signature")} value={data.signature} placeholder="Signature" />

                <Text>Prescriber</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "prescriber")} value={data.prescriber} placeholder="Prescriber Name" />

                <Button onPress={() => addMedication()} title="Add Medication" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        marginVertical: 10,
        marginHorizontal: 4,
    },
    input: {
        marginVertical: 10,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff'
    }
});