import { Colors } from '@/constants/Colors';
import { TongueRecord } from '@/src/types/diagnosis';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const confirmGreen = require('@/assets/images/confirm_green.png');

interface TongueDataViewProps {
  data: TongueRecord;
}

const TongueDataView: React.FC<TongueDataViewProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.tonguePhotoUri }} style={styles.tongueImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.status}>{data.userName}</Text>
        <View style={styles.statusContainer}>
          <Image source={confirmGreen} resizeMode="contain" />
          <Text style={styles.statusSub}>{data.healthStatus}</Text>
        </View>
        <Text style={styles.date}>{data.diagnosisDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.greyColors.grey100,
    borderRadius: 8,
  },
  tongueImage: {
    width: 110,
    height: 140,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: Colors.greyColors.grey600,
    marginBottom: 4,
  },
  userName: {
    fontSize: 12,
    color: '#888888',
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },

  statusSub: {
    fontSize: 18,
    fontWeight: 'bold',
    marginStart: 7,
    color: Colors.textColors.stateGreen
  },
});

export default TongueDataView;