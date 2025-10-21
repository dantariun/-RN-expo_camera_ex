import { Colors } from '@/constants/Colors';
import { DementiaRecord } from '@/src/types/diagnosis';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const confirmGreen = require('@/assets/images/confirm_green.png');
interface DementiaDataViewProps {
  data: DementiaRecord;
}

const DementiaDataView: React.FC<DementiaDataViewProps> = ({ data }) => {
  const progressValue = data.probability;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.round(value));
    });

    Animated.timing(animatedValue, {
      toValue: progressValue,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [progressValue]);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <CircularProgress
          value={progressValue}
          showProgressValue={false}
          radius={55}
          duration={2000}
          progressValueColor={Colors.appPrimaryColor.purple}
          maxValue={100}
          activeStrokeColor={Colors.appPrimaryColor.purpleLite}
          inActiveStrokeColor={'#F3F3F3'}
          inActiveStrokeOpacity={100}
          inActiveStrokeWidth={16}
          activeStrokeWidth={16}
          activeStrokeSecondaryColor={Colors.appPrimaryColor.purpleDeep}
        />

        <View style={styles.progressInnerTextContainer}>
          <View>
            <Text style={styles.progressValueText}>{progressValue}<Text style={styles.valueSuffixText}>%</Text></Text>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.statusContainer}>
          <Image source={confirmGreen} resizeMode="contain" />
          <Text style={styles.status}>{data.status}</Text>
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
    padding: 20,
    backgroundColor: Colors.greyColors.grey100,
    borderRadius: 8,
  },
  progressContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  status: {
    fontSize: 18,
    marginStart: 7,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#555555',
  },
  progressInnerTextContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressValueTitleText: {
    color: Colors.textColors.grey,
    fontWeight: 400,
  },
  progressValueText: {
    color: Colors.appPrimaryColor.purple,
    fontWeight: 700,
    fontSize: 34,
  }, // valueSuffix
  valueSuffixText: {
    color: Colors.appPrimaryColor.purple,
    fontSize: 22,
  }
});

export default DementiaDataView;