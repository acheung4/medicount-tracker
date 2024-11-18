import { Button, TextInput, View, StyleSheet, Text, FlatList } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../FirebaseConfig";
import axios from 'axios';
import { useState } from 'react';

export default function SearchAPI() {

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

            console.log(uniqueDrugs);
            setData(uniqueDrugs);

        }
        catch (error) {
            console.error(error);
        }
    }

    const medicationResult = ({ item }: any) => {
        return (
            <View>
                <Text>{item.name}</Text>
                <Text>{item.strength}</Text>
            </View>
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
        flexDirection: "row"
    },
    input: {
        marginVertical: 10,
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        flex: 1,
        backgroundColor: '#fff'
    }
});