import { Button, TextInput, View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';
import AddMedicationForm from "./AddMedicationForm";
import PillCounter from "./PillCounter";

const SearchStack = createNativeStackNavigator();

export default function Search() {
    return (
        <SearchStack.Navigator initialRouteName="SearchMedications">
            <SearchStack.Screen
                name="SearchMedications"
                component={SearchMedications}
                options={{
                    title: "Search",
                    headerStyle: {
                        backgroundColor: '#eb984b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Poppins',
                    },
                }}
            />
            <SearchStack.Screen
                name="AddMedicationForm"
                component={AddMedicationForm}
                options={{
                    title: "Add Medication",
                    headerStyle: {
                        backgroundColor: '#eb984b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Poppins',
                    },
                }}
            />
            <SearchStack.Screen
                name="PillCounter"
                component={PillCounter}
                options={{
                    title: "Pill Counter",
                    headerStyle: {
                        backgroundColor: '#eb984b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Poppins',
                    },
                }}
            />
        </SearchStack.Navigator>
    );
}

function SearchMedications({ navigation }: any) {

    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState("");

    const retrieveData = async () => {
        try {
            const response = await axios.get(`https://api.fda.gov/drug/drugsfda.json?search=openfda.generic_name:%22${query}%22+openfda.brand_name:%22${query}%22&limit=10`);
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

            uniqueDrugs.sort((a, b) => a.name.localeCompare(b.name) || parseInt(a.strength.replace(/[^0-9]/g, "")) - parseInt(b.strength.replace(/[^0-9]/g, "")));

            setData(uniqueDrugs);

        }
        catch (error) {
            console.error(error);
        }
    }

    const medicationResult = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("AddMedicationForm", { name: item.name, strength: item.strength })}>
                <Text style={styles.drug}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} <Text style={styles.strength}>{item.strength.toLowerCase()}</Text></Text>
                <Ionicons name="chevron-forward-outline" />
            </TouchableOpacity>
        );
    }

    const ItemSeparator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput style={styles.searchInput} onChangeText={(text) => setQuery(text)} value={query} placeholder="Enter drug name" />
                <TouchableOpacity style={styles.searchButton} onPress={retrieveData}>
                    <MaterialIcons name="search" size={35} color="black" />
                </TouchableOpacity>
            </View>

            <View>
                {data.length > 0 && (
                    <FlatList
                        data={data}
                        renderItem={medicationResult}
                        ItemSeparatorComponent={ItemSeparator}
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
        marginVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#d9d8d7",
        borderRadius: 5,
        paddingLeft: 5
    },
    searchButton: {
        backgroundColor: "#7bb4ad",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: 4
    },
    searchInput: {
        fontFamily: 'Poppins',
        height: 45,
        padding: 10,
        flex: 1,
    },
    row: {
        marginVertical: 5,
        padding: 10,
        height: 40,
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    separator: {
        height: 1,
        backgroundColor: 'gray'
    },
    drug: {
        fontFamily: 'Poppins-bold',
        fontSize: 15,
        flex: 1
    },
    strength: {
        fontFamily: 'Poppins'
    }

});