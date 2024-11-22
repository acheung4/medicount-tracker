import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { getDoc, updateDoc, collection, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';

export default function PrescriptionDetails({ route, navigation }: any) {

    const { id } = route.params;

    const [data, setData] = useState<any>({
        name: "",
        strength: "",
        quantity: "",
        signature: "",
        prescriber: ""
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {

        const fetchPrescription = async () => {
            try {
                const response = await getDoc(doc(FIREBASE_DB, "users", String(FIREBASE_AUTH.currentUser?.uid), "medications", id));
                const data = response.data();
                setData({ ...data, quantity: data?.quantity.toString() });
            } catch (error) {
                console.error('Error fetching prescription details:', error);
            }
        };

        fetchPrescription();
    }, [])

    const handleChange = (value: any, name: string) => {
        setData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    }

    const navigateToCounter = () => {
        navigation.navigate('PillCounter', {
            onGoBack: (count: number) => {

                // Callback function to extract pill count
                setData((prevData: any) => ({
                    ...prevData,
                    ["quantity"]: count.toString()
                }));

            },
        });
    };

    const updateMedication = async () => {
        setIsEditing(false);

        try {
            const formattedData = {
                name: data.name,
                strength: data.strength,
                quantity: Number(data.quantity),
                signature: data.signature,
                prescriber: data.prescriber
            };

            console.log(formattedData);
            await updateDoc(doc(FIREBASE_DB, "users", String(FIREBASE_AUTH.currentUser?.uid), "medications", id), formattedData);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.form}>
                <Text>Drug Name</Text>
                {isEditing ?
                    (<TextInput style={styles.input} onChangeText={(value) => handleChange(value, "name")} value={data.name} placeholder="Drug Name" />)
                    :
                    <Text>{data.name}</Text>
                }

                <Text>Strength</Text>
                {isEditing ?
                    (<TextInput style={styles.input} onChangeText={(value) => handleChange(value, "strength")} value={data.strength} placeholder="0" />)
                    :
                    <Text>{data.strength}</Text>
                }

                <Text>Quantity</Text>
                {isEditing ?
                    <View>
                        <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "quantity")} keyboardType="numeric" value={data.quantity} placeholder="0" />
                        <Button onPress={navigateToCounter} title="Count pills" />
                    </View>
                    :
                    <Text>{data.quantity}</Text>
                }


                <Text>Signature</Text>
                {isEditing ?
                    (<TextInput style={styles.input} onChangeText={(value) => handleChange(value, "signature")} value={data.signature} placeholder="Signature" />)
                    :
                    <Text>{data.signature}</Text>
                }


                <Text>Prescriber</Text>
                {isEditing ?
                    (<TextInput style={styles.input} onChangeText={(value) => handleChange(value, "prescriber")} value={data.prescriber} placeholder="Prescriber Name" />)
                    :
                    <Text>{data.prescriber}</Text>
                }
            </View>
            {isEditing ? (
                <Button onPress={() => updateMedication()} title="Save Changes" />
            ) : (
                <Button onPress={() => setIsEditing(true)} title="Edit Medication" />
            )}
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