import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import useRepositories from "../../hooks/useRepositories";
import globalStyles from "../../styles";
import theme from "../../theme";

import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  search: {
    backgroundColor: "white",
    borderColor: theme.colors.background,
    borderWidth: 3,
    borderRadius: 10,
    margin: 10
  }
});

const ItemSeparator = () => <View style={globalStyles.separator} />;

const RepositoryListHeader = ({
  searchQuery,
  setSearchQuery,
  selectedSorting,
  setSelectedSorting
}) => {
  return (
    <View style={{backgroundColor: theme.colors.background}}>
      <Searchbar
        placeholder="Search"
        style={styles.search}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <Picker
        style={styles.picker}
        selectedValue={selectedSorting}
        onValueChange={itemValue => setSelectedSorting(itemValue)}>
        <Picker.Item
          label="Latest repositories"
          value="CREATED_AT:DESC"
        />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE:DESC"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="RATING_AVERAGE:ASC"
        />
      </Picker>
    </View>
  );
};

class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchQuery, setSearchQuery, selectedSorting, setSelectedSorting } =
      this.props;

    return (
      <RepositoryListHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSorting={selectedSorting}
        setSelectedSorting={setSelectedSorting}
      />
    );
  };

  renderItem = ({ item }) => (
    <Pressable onPress={() => this.props.onPressItem(item.id)}>
      <RepositoryItem
        item={item}
        hideLink={true}
      />
    </Pressable>
  );

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSorting, setSelectedSorting] = useState("CREATED_AT:DESC");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const navigate = useNavigate();

  const [orderBy, orderDirection] = selectedSorting.split(":");
  const { repositories, loading, error } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery
  });

  const handlePress = id => {
    console.log("Navigating to", id);
    navigate(`/repository/${id}`);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressItem={handlePress}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedSorting={selectedSorting}
      setSelectedSorting={setSelectedSorting}
    />
  );
};

export default RepositoryList;
