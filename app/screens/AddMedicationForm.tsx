import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { useState } from 'react';

export default function AddMedicationForm({ route, navigation }: any ) {

    const { name, strength } = route.params;

    const [data, setData] = useState({
        name: name,
        strength: strength,
        quantity: "",
        signature: "",
        prescriber: ""
    });

    const handleChange = (value: any, name: string) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(route.params);
    }

    const addMedication = async () => {
        try {
            const formattedData = {
                name: data.name,
                strength: data.strength,
                quantity: Number(data.quantity),
                signature: data.signature,
                prescriber: data.prescriber
            };

            console.log(formattedData);
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
                <TextInput style={styles.inputDisabled} editable={false} value={data.name} placeholder="Drug Name" />

                <Text>Strength</Text>
                <TextInput style={styles.inputDisabled} editable={false} value={data.strength} placeholder="0" />

                <Text>Quantity</Text>
                <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "quantity")} keyboardType="numeric" value={data.quantity} placeholder="0" />
                <Button onPress={() => navigation.navigate("PillCounter")} title="Count pills" />

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
    },
    inputDisabled: {
        marginVertical: 10,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#a6a6a6'
    }
});