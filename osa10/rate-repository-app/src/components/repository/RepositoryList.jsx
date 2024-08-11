import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-dom";
import useRepositories from "../../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#e1e4e8",
    height: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, onPressItem }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <Pressable onPress={() => onPressItem(item.id)}>
      <RepositoryItem
        item={item}
        hideLink={true}
      />
    </Pressable>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useRepositories();

  const handlePress = id => {
    console.log("Navigating to", id);
    navigate(`/repository/${id}`);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      onPressItem={handlePress}
    />
  );
};

export default RepositoryList;
