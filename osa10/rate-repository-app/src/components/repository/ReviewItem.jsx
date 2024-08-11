import globalStyles from "../../styles";
import Text from "../common/Text";
import View from "../common/View";

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

export default ReviewItem;
