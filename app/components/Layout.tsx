import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Medications from '../screens/Medications';
import Search from '../screens/Search';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

export default function Layout() {
    return (
        <Tab.Navigator
            initialRouteName="Medications"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Medications') {
                        return focused ? (<Ionicons name={'medkit'} size={size} color={color} />) : (<Ionicons name={'medkit-outline'} size={size} color={color} />);
                    }
                    else if (route.name === 'Search') {
                        return focused ? (<Ionicons name={'search'} size={size} color={color} />) : (<Ionicons name={'search-outline'} size={size} color={color} />);
                    }
                    else if (route.name === 'Settings') {
                        return focused ? (<Ionicons name={'settings'} size={size} color={color} />) : (<Ionicons name={'settings-outline'} size={size} color={color} />);
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#eb984b',
                tabBarInactiveTintColor: '#7bb4ad',
            })}
        >
            <Tab.Screen name="Medications" component={Medications} options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" 
                component={Settings}
                options={{
                    headerStyle: {
                        backgroundColor: '#eb984b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Poppins',
                    },
                }} />
        </Tab.Navigator>
    );
};