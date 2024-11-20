import { Button, TextInput, View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import axios from 'axios';
import AddMedicationForm from "./AddMedicationForm";
import PillCounter from "./PillCounter";

const SearchStack = createNativeStackNavigator();

export default function Search() {
    return (
        <SearchStack.Navigator initialRouteName="SearchMedications">
            <SearchStack.Screen name="SearchMedications" component={SearchMedications} options={{ title: "Search" }} />
            <SearchStack.Screen
                name="AddMedicationForm"
                component={AddMedicationForm}
                options={{
                    title: "Add Medication",
                    // headerLeft: () => (
                    //     <Button title="Search" onPress={({navigation}: any) => navigation.navigate('Search')}></Button>
                    // ),
                    // headerBackVisible: true,
                    // headerBackTitle: 'Back',
                }} />
            <SearchStack.Screen name="PillCounter" component={PillCounter} options={{ title: "Pill Counter" }} />
        </SearchStack.Navigator>
    );
}

function SearchMedications({ navigation }: any) {

    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState("");

    const retrieveData = async () => {
        try {
            const response = await axios.get(`https://api.fda.gov/drug/drugsfda.json?search=openfda.generic_name:%22${query}%22+search=openfda.brand_name%22${query}%22&limit=10`);
            const productList = response.data.results.map((entry: any) => entry.products);

            const drugs: any[] = [];

            for (const productArray of productList) {
                productArray.forEach((product: any) => {
                    if (product.active_ingredients.length == 1) {
                        drugs.push(product.active_ingredients[0]);
                    }
                });
            }

            //removes duplicates
            var uniqueDrugs = drugs.filter((drug, index, self) =>
                index === self.findIndex((t) => (t.name === drug.name && t.strength === drug.strength)));

            setData(uniqueDrugs);

        }
        catch (error) {
            console.error(error);
        }
    }

    const medicationResult = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.result} onPress={() => navigation.navigate("AddMedicationForm", { name: item.name, strength: item.strength })}>
                <Text>{item.name}</Text>
                <Text>{item.strength}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput style={styles.input} onChangeText={(text) => setQuery(text)} value={query} placeholder="Enter drug name" />
                <Button title="Search" onPress={retrieveData} />
            </View>

            <View>
                {data.length > 0 && (
                    <FlatList
                        data={data}
                        renderItem={medicationResult}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    search: {
        marginVertical: 10,
        marginHorizontal: 4,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        marginVertical: 10,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        flex: 1,
        backgroundColor: '#fff'
    },
    result: {
        backgroundColor: 'orange',
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        textAlign: 'center'
    }
});