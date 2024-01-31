import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
} from "react-native-reanimated";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<FlatList | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [category]);

  return (
    <View style={defaultStyles.container}>
      <FlatList
        ref={listRef}
        data={isLoading ? [] : items}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </View>
  );
};

const ListItem = ({ item }: any) => {
  return (
    <Link href={`/listings/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          {item.medium_url != null && (
            <Image source={{ uri: item.medium_url }} style={styles.image} />
          )}
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 30,
              top: 30,
            }}
          >
            <Ionicons name="heart-outline" size={24} color={"#000"} />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: "mon-sb" }}>
                {item.review_scores_rating / 20}
              </Text>
            </View>
          </View>

          <Text style={{ fontFamily: "mob-sb" }}>{item.room_type}</Text>

          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb" }}>$ {item.price}</Text>
            <Text style={{ fontFamily: "mon" }}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default Listings;
