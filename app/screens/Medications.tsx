import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import PrescriptionDetails from "./PrescriptionDetails";

const MedicationStack = createNativeStackNavigator();

export default function Medications() {
    return (
        <MedicationStack.Navigator initialRouteName="MedicationList">
            <MedicationStack.Screen name="MedicationList" component={MedicationList} options={{ title: "Medication List" }} />
            <MedicationStack.Screen name="PrescriptionDetails" component={PrescriptionDetails} options={{ title: "Prescription Details" }} />
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
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("PrescriptionDetails", { id: item.id })}>
                <Text>{item.name}</Text>
                <Text>{item.strength}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            {medications.length > 0 && (
                <FlatList
                    data={medications}
                    renderItem={medicationDetails}
                    keyExtractor={(medication) => medication.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        marginHorizontal: 20,
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },
});