import { View, TextInput, StyleSheet, ActivityIndicator, Button, Image, Text, TouchableOpacity } from 'react-native';
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

            <Image
                style={styles.image}
                source={require('../../assets/favicon.png')}
            />

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} placeholder="Email" onChangeText={(e) => setEmail(e)}></TextInput>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} value={password} secureTextEntry={true} placeholder="Password" onChangeText={(e) => setPassword(e)}></TextInput>
            </View>

            {loading ? <ActivityIndicator style={{marginTop: 75}} size="large" color='#fdc4b0' />
                :
                <View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 10, marginHorizontal:'auto' }} onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerText}>No account? Register</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7bb4ad',
        flex: 1,
        justifyContent: 'center'
    },
    form: {
        marginBottom: 8,
        marginHorizontal: 24,
        fontFamily: 'Poppins'
    },
    image: {
        width: 175,
        height: 175,
        justifyContent: 'center',
        marginHorizontal: 'auto'
    },
    label: {
        fontFamily: 'Poppins-bold',
        color: '#ddf0ed',
        fontSize: 16,
        marginLeft: 6,
        marginBottom: 2
    },
    input: {
        fontFamily: 'Poppins',
        height: 50,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        backgroundColor: '#fff'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 4,
        marginHorizontal: 'auto',
        marginTop: 75,
        width: 100,
        borderRadius: 6,
        backgroundColor: '#fdc4b0',
      },
    buttonText: {
        fontFamily: 'Poppins-bold',
        fontSize: 20,
        color: 'white',
    },
    registerText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: 'white',
    }
});