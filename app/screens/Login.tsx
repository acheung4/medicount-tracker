import { View, TextInput, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error: any) {
            console.log(error);
            alert("Log in failed: " + error.message);
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
                    <Button title="Login" onPress={handleLogin} />
                    <Button onPress={() => navigation.navigate('Register')} title="No account? Register" />
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