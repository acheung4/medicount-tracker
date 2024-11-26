import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

export default function Settings() {
    return (
        <TouchableOpacity style={styles.button} onPress={() => FIREBASE_AUTH.signOut()}>
            <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
        marginHorizontal: 'auto',
        marginTop: 25,
        width: 100,
        borderRadius: 6,
        backgroundColor: '#9bc7c3',
    },
    buttonText: {
        fontFamily: 'Poppins-bold',
        fontSize: 20,
        color: 'white',
    }
});