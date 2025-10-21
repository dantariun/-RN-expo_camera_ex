import { Colors } from '@/constants/Colors';
import { useCommonHeader } from '@/src/components/useCommonHeader';
import { useCustomBackHandler } from '@/src/context/BackButtonContext';
import { DemetiaScreenProps } from '@/src/navigation/types';
import { useAppStateStore } from '@/src/store/useAppStateStore';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const { width } = Dimensions.get('window');

export default function ResultDementiaScreen({ navigation }: DemetiaScreenProps) {

  // 파라미터가 없을 경우를 대비한 Mock 데이터
  const { name } = useAppStateStore();
  const resultDescription = "치매 위험도가 다소 있습니다.";
  const dementiaRisk = 67;
  const [displayValue, setDisplayValue] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useCustomBackHandler("goHome")

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.round(value));
    });

    Animated.timing(animatedValue, {
      toValue: dementiaRisk,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    return () => {
      animatedValue.removeListener(listener);
    };
  }, [dementiaRisk]);


  const goToMain = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  useCommonHeader({ onBackPress: goToMain });

  return (
    <View className="flex-1 bg-grey-100">

      <View className="flex-1 items-center p-5 pb-[100px]">
        {/* 상단 분석 결과 타이틀 */}
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-center text-grey-800 leading-[34px] mb-6">
            <Text className="text-purple-default">{name}님</Text>의 치매 확율 분석
          </Text>
        </View>
        {/* 결과 Circle 차트 */}
        <View className="flex-[3] items-center w-full">

          <View className="justify-center items-center"
            style={{ width: width * 0.71, height: width * 0.71 }}>
            <Image
              source={require('@/assets/images/dotted_line.png')}
              className="absolute w-full h-full"
              resizeMode="contain"
            />
            <CircularProgress
              value={dementiaRisk}
              showProgressValue={false}
              radius={width * 0.32}
              duration={2000}
              progressValueColor={Colors.appPrimaryColor.purple}
              maxValue={100}
              activeStrokeColor={Colors.appPrimaryColor.purpleLite}
              inActiveStrokeColor={'#F3F3F3'}
              inActiveStrokeOpacity={1}
              inActiveStrokeWidth={40}
              activeStrokeWidth={40}
              activeStrokeSecondaryColor={Colors.appPrimaryColor.purpleDeep}
            />
            <View className="absolute inset-0 justify-center items-center">
              <Text className="text-grey-600 font-normal">치매 위험도</Text>
              <View>
                <Text className="text-purple-default font-bold text-[50px]">
                  {displayValue}
                  <Text className="text-purple-default text-[22px]">%</Text>
                </Text>
              </View>
            </View>

          </View>

          {/* 진단 결과 */}
          <View className="mt-14 w-full items-center justify-center">
            <Text className="text-lg font-medium text-grey-700 leading-6 text-center">
              {resultDescription}
            </Text>
          </View>

        </View>
      </View>

      {/* 하단 메인으로 가기 버튼 */}
      <View className="absolute bottom-[50px] left-0 right-0 px-3.5 bg-white mb-[20px]">
        <TouchableOpacity
          className="bg-purple-default py-[17px] rounded-lg items-center justify-center w-full"
          onPress={goToMain}>
          <Text className="text-white text-[17px] font-bold">메인으로 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
