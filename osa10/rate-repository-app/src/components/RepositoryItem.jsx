import { View, Text } from 'react-native';

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

const RepositoryItem = (item) => (
  <View>
    <Text>Full name: {item.item.fullName}</Text>
    <Text>Description: {item.item.description}</Text>
    <Text>Language: {item.item.language}</Text>
    <Text>Stars: {item.item.stargazersCount}</Text>
    <Text>Forks: {item.item.forksCount}</Text>
    <Text>Reviews: {item.item.reviewCount}</Text>
    <Text>Ratings: {item.item.ratingAverage}</Text>
  </View>
);

export default RepositoryItem;
