import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import listings from "@/assets/data/airbnb-listings.json";
import { defaultStyles } from "@/constants/Styles";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const IMAGE_HEIGHT = 300;

const Page = () => {
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    setItem((listings as any[]).find((l) => l.id === id));
  }, []);

  const { id } = useLocalSearchParams<{ id: string }>();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  if (item === null) return <Text>Loading...</Text>;

  return (
    <View style={defaultStyles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
        // onScroll={handleScroll}
      >
        <Animated.Image
          source={{ uri: item.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>
            {item.room_type} in {item.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {item.guests_included} guests · {item.bedrooms} bedrooms ·{" "}
            {item.beds} bed · {item.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {item.review_scores_rating / 20} · {item.number_of_reviews}{" "}
              reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image
              source={{ uri: item.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {item.host_name}
              </Text>
              <Text>Host since {item.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={[
          defaultStyles.footer,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
        entering={SlideInDown.delay(200)}
      >
        <TouchableOpacity style={styles.footerText}>
          <Text style={styles.footerPrice}>${item.price}</Text>
          <Text>night</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[defaultStyles.btn, { paddingHorizontal: 20 }]}
        >
          <Text style={defaultStyles.btnText}>Reserve</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: IMAGE_HEIGHT,
    width: "100%",
  },

  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: "mon",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
});

export default Page;
