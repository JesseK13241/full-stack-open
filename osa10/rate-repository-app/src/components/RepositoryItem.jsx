import { Image, StyleSheet } from "react-native";
import Text from "./Text";
import View from "./View";
import theme from "../theme";

const styles = StyleSheet.create({
  avatar: {
    aspectRatio: 1,
    borderRadius: theme.spacings.borderRadius
  },
  blueButton: {
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: theme.spacings.borderRadius,
    padding: 5,
    alignSelf: "flex-start"
  },
});

/*  
id: "django.django",
fullName: "django/django",
description: "The Web framework for perfectionists with deadlines.",
language: "Python",
forksCount: 21015,
stargazersCount: 48496,
ratingAverage: 73,
reviewCount: 5,
ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4"
 */

const formatNumber = numberString => {
  let number = parseInt(numberString);
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  }
  return number.toString();
};

const RepositoryItem = ({ item }) => (
  <View container>
    <View horizontal>
      <Image
        style={[styles.avatar, { flex: 0.25 }]}
        source={{
          uri: item.ownerAvatarUrl
        }}
      />
      <View noWrap>
        <Text bold>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.blueButton}>{item.language}</Text>
      </View>
    </View>
    <View horizontal centered>
      <View>
        <Text bold>{formatNumber(item.stargazersCount)}</Text>
        <Text>Stars</Text>
      </View>
      <View centered>
        <Text bold>{formatNumber(item.forksCount)}</Text>
        <Text>Forks</Text>
      </View>
      <View centered>
        <Text bold>{formatNumber(item.reviewCount)}</Text>
        <Text>Reviews</Text>
      </View>
      <View centered>
        <Text bold>{formatNumber(item.ratingAverage)}</Text>
        <Text>Ratings</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
