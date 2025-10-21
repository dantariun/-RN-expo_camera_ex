import { Colors } from '@/constants/Colors';
import { useCommonHeader } from '@/src/components/useCommonHeader';
// import { PhotoContext } from '@/src/context/PhotoContext';
import { PhotoScreenProps } from '@/src/navigation/types';
import { usePhotoStore } from '@/src/store/photoStore';
import { ActivityIndicator, ImageBackground, Pressable, Text, View } from 'react-native';


export default function ConfirmPhotoScreen({ navigation }: PhotoScreenProps) {
  // const { photoData, setPhotoData } = useContext(PhotoContext)!;

  const { clearPhoto, photoData } = usePhotoStore();

  const handleRetake = () => {
    console.log('재촬영 버튼 클릭');
    // setPhotoData(null);
    clearPhoto();
    navigation.goBack();
  };

  const handleSubmit = () => {
    console.log('제출하기 버튼 클릭');
    navigation.navigate("Loading")
  };

  useCommonHeader({ title: '' });

  return (
    <View className="flex-1 bg-grey-100 pb-[70px]">
      <View className="flex-1 rounded-lg justify-center items-center mx-2.5 my-4 bg-grey-300">
        {photoData?.base64 ? (
          <ImageBackground
            source={{ uri: `data:image/jpeg;base64,${photoData.base64}` }}
            className="w-full h-full"
            resizeMode="contain"
          />
        ) : (
          <View className="justify-center items-center">
            <ActivityIndicator size="large" color={Colors.appPrimaryColor.purple} />
            <Text className="text-black mt-2.5 text-base">사진을 불러오는 중...</Text>
          </View>
        )}
      </View>

      {/* 6. 하단 버튼 영역 */}
      <View className="flex-row justify-around items-center py-[15px] px-2.5 bg-white">
        <Pressable
          className="flex-1 py-[18px] rounded-lg items-center mr-[10px] border border-purple-default bg-white active:bg-gray-100"
          onPress={handleRetake}>
          <Text className="text-purple-default text-base font-bold">재촬영</Text>
        </Pressable>
        <Pressable
          className="flex-1 py-[18px] rounded-lg items-center  bg-purple-default active:opacity-80"
          onPress={handleSubmit}
        >
          <Text className="text-white text-base font-bold">제출하기</Text>
        </Pressable>
      </View>
    </View>
  );
}