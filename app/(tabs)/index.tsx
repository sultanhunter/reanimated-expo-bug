import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import listings from "@/assets/data/airbnb-listings.json";
import Listings from "@/components/Listings";

export default function TabOneScreen() {
  const [category, setCategory] = useState("Tiny homes");

  const items = useMemo(() => listings as any, []);

  return (
    <View style={styles.container}>
      <Listings listings={items} category={category} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
