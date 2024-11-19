import { Button } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

export default function Settings() {
    return (
        <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log Out" />
    );
};