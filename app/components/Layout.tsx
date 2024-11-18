import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Medications from '../screens/Medications';
import Search from '../screens/Search';
import SearchAPI from '../screens/SearchAPI';

const Tab = createBottomTabNavigator();

export default function Layout() {
    return (
        <Tab.Navigator initialRouteName="Medications">
            <Tab.Screen name="Medications" component={Medications} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="API" component={SearchAPI} />
        </Tab.Navigator>
    );
};