import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
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
  const [selectedSorting, setSelectedSorting] = useState("la");

  const navigate = useNavigate();
  const { data, loading, error } = useRepositories(selectedSorting);

  const handlePress = id => {
    console.log("Navigating to", id);
    navigate(`/repository/${id}`);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <>
      <Picker
        selectedValue={selectedSorting}
        // eslint-disable-next-line no-unused-vars
        onValueChange={(itemValue, _itemIndex) => setSelectedSorting(itemValue)}>
        <Picker.Item
          label="Latest repositories"
          value="la"
        />
        <Picker.Item
          label="Highest rated repositories"
          value="hi"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="lo"
        />
      </Picker>
      <ItemSeparator />
      <RepositoryListContainer
        repositories={data.repositories}
        onPressItem={handlePress}
      />
    </>
  );
};

export default RepositoryList;
