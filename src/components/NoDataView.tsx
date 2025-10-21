import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface NoDataViewProps {
  description: string;
  iconSource: ImageSourcePropType;
}

const NoDataView: React.FC<NoDataViewProps> = ({ description, iconSource }) => {
  return (
    <View style={styles.container}>
      <Image source={iconSource} style={styles.icon} resizeMode="contain" />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888888',
  },
});

export default NoDataView;