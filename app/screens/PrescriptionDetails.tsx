import { TextInput, View, StyleSheet, Text, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import { getDoc, updateDoc, doc } from "firebase/firestore";
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

            await updateDoc(doc(FIREBASE_DB, "users", String(FIREBASE_AUTH.currentUser?.uid), "medications", id), formattedData);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container} >
            <KeyboardAvoidingView behavior='position'>
                <ScrollView style={styles.form}>

                    {isEditing ?
                        (<View>
                            <Text style={styles.title}>Drug Name</Text>
                            <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "name")} value={data.name} placeholder="Drug Name" />
                        </View>
                        )
                        :
                        <View style={styles.item}>
                            <Text style={[styles.title]}>Drug Name</Text>
                            <Text style={styles.info}>{data.name}</Text>
                        </View>
                    }

                    {isEditing ?
                        (<View>
                            <Text style={styles.title}>Strength</Text>
                            <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "strength")} value={data.strength} placeholder="0" />
                        </View>
                        )
                        :
                        <View style={styles.item}>
                            <Text style={styles.title}>Strength</Text>
                            <Text style={styles.info}>{data.strength}</Text>
                        </View>
                    }


                    {isEditing ?
                        <View>
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
                        </View>
                        :
                        <View style={styles.item}>
                            <Text style={styles.title}>Quantity</Text>
                            <Text style={styles.info}>{data.quantity}</Text>
                        </View>
                    }


                    {isEditing ?
                        (
                            <View>
                                <Text style={styles.title}>Signature</Text>
                                <TextInput style={[styles.input, { height: 100 }]} multiline={true} numberOfLines={3} onChangeText={(value) => handleChange(value, "signature")} value={data.signature} placeholder="Signature" />
                            </View>
                        )
                        :
                        <View style={styles.item}>
                            <Text style={styles.title}>Signature</Text>
                            <Text style={styles.info}>{data.signature}</Text>
                        </View>
                    }


                    {isEditing ?
                        <View>
                            <Text style={styles.title}>Prescriber</Text>
                            <TextInput style={styles.input} onChangeText={(value) => handleChange(value, "prescriber")} value={data.prescriber} placeholder="Prescriber Name" />
                        </View>
                        :
                        <View style={styles.item}>
                            <Text style={styles.title}>Prescriber</Text>
                            <Text style={styles.info}>{data.prescriber}</Text>
                        </View>
                    }

                    {isEditing ? (
                        <TouchableOpacity style={styles.button} onPress={() => updateMedication()}>
                            <Text style={styles.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                            <Text style={styles.buttonText}>Edit Medication</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20
    },
    item: {
        backgroundColor: '#9bc7c3',
        borderRadius: 5,
        marginBottom: 25,
        padding: 10
    },
    info: {
        fontFamily: 'Poppins',
        fontSize: 15,
        marginLeft: 4
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
        marginHorizontal: 'auto',
        marginTop: 50,
        width: 175,
        borderRadius: 6,
        backgroundColor: '#fdc4b0',
    },
    buttonText: {
        fontFamily: 'Poppins-bold',
        fontSize: 20,
        color: 'white',
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
    }
});