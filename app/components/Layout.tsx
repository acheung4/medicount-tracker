import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Medications from '../screens/Medications';
import Search from '../screens/Search';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

export default function Layout() {
    return (
        <Tab.Navigator initialRouteName="Medications">
            <Tab.Screen name="Medications" component={Medications} options={{ headerShown: false }} />
            <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};