import { Image, Pressable, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";
import View from "./View";

import * as Linking from "expo-linking";

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
  bigBlueButton: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 20,
    padding: 20,
    width: 250
  }
});

const formatNumber = numberString => {
  let number = parseInt(numberString);
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  }
  return number.toString();
};

const RepositoryLink = ({ link }) => {
  return (
    <Pressable onPress={() => Linking.openURL(link)}>
      <Text
        bold
        style={[styles.blueButton, styles.bigBlueButton]}>
        Open in GitHub
      </Text>
    </Pressable>
  );
};

const RepositoryItem = ({ item, hideLink }) => {
  return (
    <View
      testID="repositoryItem"
      container>
      <View horizontal>
        <Image
          style={[styles.avatar, { flex: 0.25 }]}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View noWrap>
          <Text bold>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.blueButton}>{item.language}</Text>
        </View>
      </View>
      <View
        horizontal
        centered>
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

      {!hideLink && <RepositoryLink link={item.url} />}
    </View>
  );
};

export default RepositoryItem;
