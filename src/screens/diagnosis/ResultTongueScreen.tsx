import { Colors } from '@/constants/Colors';
import { useCommonHeader } from '@/src/components/useCommonHeader';
import { useCustomBackHandler } from '@/src/context/BackButtonContext';
import { useAppStateStore } from '@/src/store/useAppStateStore';
// import { PhotoContext } from '@/src/context/PhotoContext';
import { TongueScreenProps } from '@/src/navigation/types';
import { usePhotoStore } from '@/src/store/photoStore';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ResultTongueScreen({ navigation }: TongueScreenProps) {
  // const { photoData, setPhotoData } = useContext(PhotoContext)!;

  const { clearPhoto, photoData } = usePhotoStore();
  useCustomBackHandler("goHome")

  useEffect(() => {
    return () => {
      // setPhotoData(null);
      clearPhoto();
    };
  }, []);

  const { name } = useAppStateStore();
  const resultTitle = "정상";
  const resultDescription = "설진 분석 결과, 특별한 이상 징후가 발견되지 않았습니다. 혀의 색상과 형태가 모두 건강한 상태를 나타내고 있습니다. 꾸준한 건강 관리를 통해 현재 상태를 유지하는 것이 좋습니다.";


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
        <Text className="text-xl font-bold text-center text-grey-800 leading-[34px] mb-6">
          <Text className="text-purple-default">{name}님</Text>의 설진 결과 분석
        </Text>

        {/* 결과 이미지 */}
        <View className="w-full aspect-square rounded-xl mb-8 bg-gray-100 justify-center overflow-hidden">
          {photoData?.base64 ? (
            <ImageBackground
              source={{ uri: `data:image/jpeg;base64,${photoData.base64}` }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="justify-center items-center">
              <ActivityIndicator size="large" color={Colors.appPrimaryColor.purple} />
            </View>
          )}
        </View>

        {/* 진단 결과 */}
        <View className="w-full items-center justify-center">
          <Text className="text-[22px] font-bold text-grey-800 mb-3">
            진단 결과 : <Text className="text-purple-default">{resultTitle}</Text>
          </Text>
          <Text className="text-base text-grey-700 leading-6 text-center">
            {resultDescription}
          </Text>
        </View>
      </View>

      {/* 하단 메인으로 가기 버튼 */}
      <View className="absolute bottom-[50px] left-0 right-0 px-3.5 bg-white mb-[20px]">
        <TouchableOpacity className="bg-purple-default py-[17px] rounded-lg items-center justify-center w-full" onPress={goToMain}>
          <Text className="text-white text-[17px] font-bold">메인으로 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    lineHeight: 34,
    marginBottom: 24,
  },
  userNameText: {
    color: '#6A5ACD',
  },
  resultImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 32,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  resultSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  resultValue: {
    color: '#6A5ACD', // 진단 결과 값 강조
  },
  resultDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center'
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  mainButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 17,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mainButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 700,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: 'black',
    marginTop: 10,
    fontSize: 16,
  },
});


