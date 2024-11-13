import { NavigationProp } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Medications = ({ navigation }: any) => {
    return (
        <View>
            <Button onPress={() => navigation.navigate('Search')} title="Search" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log Out" />
        </View>
    );
};

export default Medications;