import { View, TextInput, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleRegister = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            FIREBASE_AUTH.signOut();
            navigation.navigate('Login');
            alert("Registration successful!");
        }
        catch (error: any) {
            console.log(error);
            alert("Register failed: " + error.message);
        }
        finally {
            setLoading(false);
            setEmail('');
            setPassword('');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={email} placeholder="Email" onChangeText={(e) => setEmail(e)}></TextInput>
            <TextInput style={styles.input} value={password} secureTextEntry={true} placeholder="Password" onChangeText={(e) => setPassword(e)}></TextInput>

            {loading ? <ActivityIndicator size="large" color="#0000ff" />
                :
                <View>
                    <Button title="Register" onPress={handleRegister} />
                    <Button onPress={() => navigation.navigate('Login')} title="Already have an account? Login" />
                </View>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },

    input: {
        marginVertical: 8,
        marginHorizontal: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#fff'
    }
});