import { Text, View } from "react-native";
import { useParams } from "react-router-dom";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const RepositoryDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useRepository(id);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      {data && data.repository && <RepositoryItem item={data.repository} />}
    </View>
  );
};

export default RepositoryDetail;
