import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import PrescriptionDetails from "./PrescriptionDetails";
import PillCounter from "./PillCounter";

const MedicationStack = createNativeStackNavigator();

export default function Medications() {
    return (
        <MedicationStack.Navigator initialRouteName="MedicationList">
            <MedicationStack.Screen name="MedicationList"
                component={MedicationList}
                options={{
                    title: "Medication List",
                    headerStyle: {
                        backgroundColor: '#eb984b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Poppins',
                    },
                }}
            />
            <MedicationStack.Screen name="PrescriptionDetails" 
                component={PrescriptionDetails} 
                options={{
                    title: "Prescription Details",
                    headerStyle: {
                        backgroundColor: '#eb984b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Poppins',
                    },
                }}
            />
            <MedicationStack.Screen name="PillCounter" 
                component={PillCounter} 
                options={{
                    title: "Pill Counter",
                    headerStyle: {
                        backgroundColor: '#eb984b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Poppins',
                    },
                }}
            />
        </MedicationStack.Navigator>
    );
}

const MedicationList = ({ navigation }: any) => {
    const [medications, setMedications] = useState<any[]>([]);

    useEffect(() => {
        const medRef = collection(FIREBASE_DB, "users", String(FIREBASE_AUTH.currentUser?.uid), "medications");

        const subscriber = onSnapshot(medRef, {
            next: (snapshot) => {
                const meds: any[] = [];
                snapshot.docs.forEach((doc) => {
                    meds.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setMedications(meds);
            }
        });

        return () => subscriber();

    }, [])

    const medicationDetails = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("PrescriptionDetails", { id: item.id })}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.strength}>{item.strength}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {medications.length > 0 && (
                <FlatList
                    data={medications}
                    renderItem={medicationDetails}
                    keyExtractor={(medication) => medication.id}
                    showsVerticalScrollIndicator={false} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        marginHorizontal: 20
    },
    item: {
        borderColor: '#9bc7c3',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 25,
        padding: 10
    },
    name: {
        fontFamily: 'Poppins-bold',
        fontSize: 20,
        marginLeft: 4
    },
    strength: {
        fontFamily: 'Poppins',
        fontSize: 18,
        marginLeft: 4
    }
});