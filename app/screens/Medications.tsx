import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";


const Medications = ({ navigation }: any) => {
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
            <View style={styles.card}>
                <Text>{item.id}</Text>
                <Text>{item.name}</Text>
            </View>
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


            <Button onPress={() => navigation.navigate('Search')} title="Search" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log Out" />
        </View>
    );
};

export default Medications;

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