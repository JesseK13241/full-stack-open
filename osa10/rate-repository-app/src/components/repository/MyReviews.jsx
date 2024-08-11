import { useQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { ME } from "../../graphql/queries";
import globalStyles from "../../styles";
import View from "../common/View";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={globalStyles.separator} />;

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true }
  });

  if (loading) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const reviews = data?.me?.reviews && data.me.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
