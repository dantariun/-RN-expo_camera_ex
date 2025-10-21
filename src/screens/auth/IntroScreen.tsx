import { IntroScreenProps } from '@/src/navigation/types';
import { Image, Pressable, Text, View } from 'react-native';

const AppLogo = require('@/assets/images/logo.png');

export default function IntroScreen({ navigation }: IntroScreenProps) {

  const handleStart = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View className='flex-1 justify-between items-center bg-white pb-[50px]'>
      {/* 앱 로고 이미지 */}
      <View className='flex-1 justify-center items-center'>
        <Image source={AppLogo} className='w-[163px] h-[163px]' resizeMode="contain" />
      </View>

      {/* 앱 하단의 버튼 영역 */}
      <View className='w-full px-[20px]'>
        {/* 시작하기 버튼 */}
        <Pressable
          className="bg-purple-default py-5 rounded-lg items-center mb-2.5 active:opacity-70"
          onPress={handleStart}
        >
          <Text className="text-white text-[15px] font-[700]">
            회원가입하기
          </Text>
        </Pressable>

        {/* 로그인하기 버튼 */}
        <Pressable
          className="bg-transparent py-4 items-center active:opacity-70"
          onPress={handleLogin}
        >
          <Text className="text-grey-600 text-[14px] font-[400] underline">로그인하기</Text>
        </Pressable>
      </View>
    </View>
  );
}