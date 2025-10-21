import { postAuthLogin } from '@/src/api/services/auth.service';
import { useCommonHeader } from '@/src/components/useCommonHeader';
import { LoginScreenProps } from '@/src/navigation/types';
import { useAppStateStore } from '@/src/store/useAppStateStore';
import { LoginRequest } from '@/src/types/auth';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const NAME_REGEX = /^[가-힣]{1,6}$/;
const PHONE_REGEX = /^010-\d{4}-\d{4}$/;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { setUserName, setUserPhoneNumber } = useAppStateStore();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const phoneInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setIsNameValid(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setIsPhoneValid(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  const isButtonEnabled = isNameValid && isPhoneValid;

  const handlePhoneNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = '';

    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += '-' + cleaned.substring(3, 7);
    }
    if (cleaned.length > 7) {
      formatted += '-' + cleaned.substring(7, 11);
    }
    setPhoneNumber(formatted);
  };


  const handleNext = async () => {
    if (!isButtonEnabled || isLoading) return;
    setIsLoading(true);

    try {
      const loginData: LoginRequest = {
        name: name,
        phone: phoneNumber,
      };

      const loginResult = await postAuthLogin(loginData);

      setUserName(loginResult.name);
      setUserPhoneNumber(loginResult.phone);

      navigation.replace("Main");

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('로그인 실패', error.message);
      } else {
        Alert.alert('오류', '알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useCommonHeader({ title: '로그인' });

  const content = (
    <View className='flex-1 justify-between p-[20px]'>
      {/* 상단 안내 텍스트 */}
      <View className='w-full mt-[40px]'>
        <Text className='text-[20px] font-[700]'>
          <Text className='text-purple-default'>이름</Text>
          <Text>과 </Text>
          <Text className='text-purple-default'>전화번호</Text>
          <Text>를{'\n'}입력해주세요</Text>
        </Text>
      </View>

      {/* 입력 필드 영역 */}
      <View className='flex-1 justify-start mt-[50px]'>
        <View className='mb-[20px]'>
          <Text className='text-[16px] font-[600] mb-[8px] text-black'>이름</Text>
          <TextInput
            className="border border-gray-300 bg-white px-[16px] py-[16px] rounded-[4px] text-[15px] 
             focus:border-purple-default placeholder:text-gray-400"
            placeholder="성함을 입력해주세요"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => phoneInputRef.current?.focus()}
          />
        </View>
        <View>
          <Text className='text-[16px] font-[600] mb-[8px] text-black'>전화번호</Text>
          <TextInput
            ref={phoneInputRef}
            className={`
              w-full rounded-lg border px-[16px] py-[16px] text-base 
              placeholder:text-gray-400
              ${phoneNumber.length > 0 && !isPhoneValid
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-purple-default '
              }
            `}
            placeholder="전화번호를 입력해주세요"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="numeric"
            returnKeyType="done"
            maxLength={13}
            onSubmitEditing={handleNext}
          />
          {phoneNumber.length > 0 && !isPhoneValid && (
            <Text className='text-red-600 mt-[5px] text-[12px] ms-[8px]'>
              전화번호를 확인해주세요
            </Text>
          )}
        </View>
      </View>

      {/* 하단 '다음' 버튼 */}
      <Pressable
        className={`w-full py-[18px] rounded-[6px] items-center
          ${isButtonEnabled ? "bg-purple-default"
            : "bg-grey-300"}
          `}
        onPress={handleNext}
        disabled={!isButtonEnabled}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text className={`text-[15px] font-[700]
            ${isButtonEnabled ? "text-white" : "text-grey-600"}
              `}
          >다음</Text>
        )}
      </Pressable>
    </View>
  )

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-white pb-[50]'
    >
      {Platform.OS === 'web' ? (
        content
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {content}
        </TouchableWithoutFeedback>
      )}
    </KeyboardAvoidingView>
  );
}