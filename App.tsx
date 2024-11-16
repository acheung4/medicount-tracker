import { useState, useEffect, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Layout from './app/components/Layout';
import './app/styles/global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (newUser) => {
      setUser(newUser);
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Layout' component={Layout} options={{ headerShown: false }} />
        ) : (
          <Fragment>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false, animation: 'none' }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false, animation: 'none' }} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}