import { Colors } from '@/constants/Colors';
import { DIAGNOSIS_MODES } from '@/constants/DiagnosisModes';
import LoadingDots from '@/src/components/LoadingDots';
import { useCommonHeader } from '@/src/components/useCommonHeader';
import { LoadingScreenProps } from '@/src/navigation/types';
import { useAppStateStore } from '@/src/store/useAppStateStore';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function DiagnosisLoadingScreen({ navigation }: LoadingScreenProps) {
  const { mode, name } = useAppStateStore();
  const progress = useRef(new Animated.Value(0)).current;

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    const startAnalysis = async () => {
      if (isAnalyzing) return;
      setIsAnalyzing(true);

      Animated.timing(progress, {
        toValue: 0.9,
        duration: 15000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      }).start();

      try {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 3000 + 2000));
        const fakeApiResult = { result: "some analysis data" }; // API 결과 예시

        if (!isMounted.current) {
          return;
        }

        console.log('분석 완료:', fakeApiResult);

        Animated.timing(progress, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }).start(() => {
          if (isMounted.current) {

            if (mode === DIAGNOSIS_MODES.DEMENTIA) {
              navigation.navigate("Dementia");
            } else if (mode === DIAGNOSIS_MODES.TONGUE) {
              navigation.navigate("Tongue");
            }

            // Alert.alert("완료", "결과 분석 완료.", [
            //   {
            //     text: "확인", onPress: () => {
            //       if (mode === DIAGNOSIS_MODES.DEMENTIA) {
            //         navigation.navigate("Dementia");
            //       } else if (mode === DIAGNOSIS_MODES.TONGUE) {
            //         navigation.navigate("Tongue");
            //       }
            //     }
            //   }
            // ]);
          }
        });
      } catch (error) {
        if (isMounted.current) {
          console.error("API 통신 오류:", error);
          progress.stopAnimation();
          Alert.alert("오류", "결과 분석 중 오류가 발생했습니다. 다시 시도해 주세요.", [
            {
              text: "확인", onPress: () => {
                navigation.goBack();
              }
            }
          ]);
        }
      }
    };

    startAnalysis();

    return () => {
      isMounted.current = false;
      progress.stopAnimation();
    };
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const onCancel = () => {
    console.log('분석하기 취소 클릭');
    navigation.goBack();
  };

  useCommonHeader({});

  return (
    <View className="flex-1 bg-grey-100">
      <View className="flex-1 items-center justify-center p-5">
        <View className="flex-[2] items-center justify-center w-full mb-10">
          <LoadingDots spacing={15} dotCount={3} dotColor={Colors.appPrimaryColor.purple} dotSize={30} />
        </View>

        <View className="flex-1 items-center justify-center w-full">
          <Text className="text-2xl font-bold text-center text-grey-800 leading-[34px]">
            {name}님의{'\n'}<Text className='text-purple-default'>결과</Text>를 분석중 입니다...
          </Text>

          <View className="h-[5px] w-4/5 bg-grey-300 rounded-[5px] mt-[30px] mb-5 overflow-hidden">
            <Animated.View
              className="h-full bg-purple-default rounded-[5px]"
              style={{ width: progressBarWidth }} />
          </View>

          <Text className="text-sm text-center text-grey-600 leading-5">
            1~2분 소요될 수 있습니다.{'\n'}앱을 종료하지말고 기다려주세요.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center w-full">
          <TouchableOpacity className="absolute p-2.5 bottom-[50px]" onPress={onCancel}>
            <Text className="text-sm text-grey-600 underline">분석하기 취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
