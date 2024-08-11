import { FlatList } from "react-native";
import { useParams } from "react-router-dom";
import useRepository from "../../hooks/useRepository";
import globalStyles from "../../styles";
import Text from "../common/Text";
import View from "../common/View";
import RepositoryItem from "./RepositoryItem";

const ReviewItem = ({ review }) => {
  return (
    <View
      container
      horizontal>
      <View style={globalStyles.ratingCircle}>
        <Text>{review.rating}</Text>
      </View>
      <View>
        <View>
          <Text bold>{review.user.username}</Text>
        </View>
        <View>
          <Text>{review.createdAt.split("T")[0]}</Text>
        </View>
        <View style={globalStyles.reviewText}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={globalStyles.separator} />;

const RepositoryDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews =
    data.repository && data.repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={data.repository} />
          <ItemSeparator />
        </>
      )}
    />
  );
};

export default RepositoryDetail;
