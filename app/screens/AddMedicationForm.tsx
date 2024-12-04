import { Button, TextInput, View, StyleSheet, Text, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import Ionicons from '@expo/vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import { useState } from 'react';

export default function AddMedicationForm({ route, navigation }: any) {

    const { name, strength } = route.params;

    const [data, setData] = useState({
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        strength: strength.toLowerCase(),
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
                strength: data.strength,
                quantity: Number(data.quantity),
                signature: data.signature,
                prescriber: data.prescriber
            };

            await addDoc(collection(FIREBASE_DB, "users", String(FIREBASE_AUTH.currentUser?.uid), "medications"), formattedData);
            alert("Medication has been added. Redirecting to medication list.");
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Medications' },
                    ],
                })
            );
        }
        catch (error) {
            console.error(error);
        }
    }

    const disableButton = (data.name === '' || data.strength === '' || data.quantity === '' || data.signature === '' || data.prescriber === '');

    const navigateToCounter = () => {
        navigation.navigate('PillCounter', {
            onGoBack: (count: number) => {

                // Callback function to extract pill count
                setData((prevData) => ({
                    ...prevData,
                    ["quantity"]: count.toString()
                }));

            },
        });
    };

    return (
        <View style={styles.container} >
            <KeyboardAvoidingView behavior='position'>
                <ScrollView style={styles.form}>
                    <Text style={[styles.title, { marginTop: 20 }]}>Drug Name</Text>
                    <TextInput style={styles.inputDisabled} editable={false} value={data.name} placeholder="Drug Name" />

                    <Text style={styles.title}>Strength</Text>
                    <TextInput style={styles.inputDisabled} editable={false} value={data.strength} placeholder="0" />

                    <Text style={styles.title}>Quantity</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TextInput style={[styles.input, { flex: 1 }]} onChangeText={(value) => handleChange(value, "quantity")} keyboardType="numeric" value={data.quantity} placeholder="0" />
                        <TouchableOpacity style={styles.countButton} onPress={navigateToCounter}>
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={require('../../assets/capsules.png')}
                            />
                            <Text style={{ fontSize: 20, fontFamily: 'Poppins' }}>Count</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.title}>Signature</Text>
                    <TextInput style={[styles.input, { height: 100 }]} multiline={true} numberOfLines={3} onChangeText={(value) => handleChange(value, "signature")} value={data.signature} placeholder="Signature" />

                    <Text style={styles.title}>Prescriber</Text>
                    <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "prescriber")} value={data.prescriber} placeholder="Prescriber Name" />

                    <TouchableOpacity style={[styles.button, {backgroundColor: disableButton ? 'darkgray' : '#fdc4b0' }]} disabled={disableButton} onPress={addMedication}>
                        <Text style={styles.buttonText}>Add Medication</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    form: {
        height: 750
    },
    title: {
        fontFamily: 'Poppins-bold',
        fontSize: 20,
        paddingLeft: 4
    },
    input: {
        fontFamily: 'Poppins',
        marginTop: 5,
        marginBottom: 15,
        height: 35,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#fff'
    },
    inputDisabled: {
        fontFamily: 'Poppins',
        marginTop: 5,
        marginBottom: 15,
        height: 35,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        backgroundColor: '#bfbfbf'
    },
    countButton: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 5,
        backgroundColor: '#7bb4ad'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
        marginHorizontal: 'auto',
        marginTop: 50,
        width: 175,
        borderRadius: 6
    },
    buttonText: {
        fontFamily: 'Poppins-bold',
        fontSize: 20,
        color: 'white',
    }
});