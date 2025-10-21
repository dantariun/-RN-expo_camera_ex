import { Colors } from '@/constants/Colors';
import { postAuthRegister } from '@/src/api/services/auth.service';
import { useCommonHeader } from '@/src/components/useCommonHeader';
import { SignUpScreenProps } from '@/src/navigation/types';
import { UserRequest } from '@/src/types/auth';
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
const DOB_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

type Gender = '남' | '여' | '';
type DoctorStatus = 'yes' | 'no' | '';

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [gender, setGender] = useState<Gender>('');
  const [dob, setDob] = useState(''); // Date of Birth
  const [isDobValid, setIsDobValid] = useState(false);
  const [isDoctor, setIsDoctor] = useState<DoctorStatus>('');

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isDobFocused, setIsDobFocused] = useState(false);

  const phoneInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setIsNameValid(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setIsPhoneValid(PHONE_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setIsDobValid(DOB_REGEX.test(dob));
  }, [dob]);

  const isButtonEnabled = isNameValid && isPhoneValid && isDobValid && gender !== '' && isDoctor !== '';

  const handlePhoneNumberChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = '';
    if (cleaned.length > 0) formatted = cleaned.substring(0, 3);
    if (cleaned.length > 3) formatted += '-' + cleaned.substring(3, 7);
    if (cleaned.length > 7) formatted += '-' + cleaned.substring(7, 11);
    setPhoneNumber(formatted);
  };

  const handleDobChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 4);
    }
    if (cleaned.length > 4) {
      formatted += '-' + cleaned.substring(4, 6);
    }
    if (cleaned.length > 6) {
      formatted += '-' + cleaned.substring(6, 8);
    }
    setDob(formatted);
  };

  const handleSignUp = async () => {
    if (!isButtonEnabled || isLoading) return;
    setIsLoading(true);

    try {
      const newUser: UserRequest = {
        name: name,
        phone: phoneNumber,
        gender: gender,
        birth_date: dob,
        is_kdm: isDoctor === 'yes' ? true : false,
      };

      const result = await postAuthRegister(newUser);

      if (result) {
        Alert.alert('회원가입 성공', `${result.name}님, 회원가입이 완료되었습니다.`);
        navigation.replace('Login');
      } else {
        Alert.alert('회원가입 실패', '오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      Alert.alert('오류', '네트워크 요청에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }

  };

  const RadioButton = ({ label, value, selected, onSelect }: { label: string, value: any, selected: boolean, onSelect: (value: any) => void }) => (
    <Pressable className="flex-row items-center mr-7" onPress={() => onSelect(value)}>
      <View className={`h-5 w-5 rounded-full border-2 items-center justify-center mr-2 ${selected ? 'border-purple-default' : 'border-gray-300'
        }`}>
        {selected && <View className="h-2.5 w-2.5 rounded-full bg-purple-default" />}
      </View>
      <Text className='text-[16px] font-[400] text-grey-500'>{label}</Text>
    </Pressable>
  );

  const content = (
    <View className="flex-1 justify-between p-[20px]">
      <View>
        <View className="w-full mb-[30px]">
          <Text className="text-2xl font-bold ">
            <Text>신규로 등록하는{'\n'}</Text>
            <Text className="text-purple-default">회원정보</Text>
            <Text>를 입력해주세요</Text>
          </Text>
        </View>
        <View>
          {/* 이름 */}
          <View className='mb-5'>
            <Text className="text-base font-[600] mb-2 text-black">이름</Text>
            <TextInput
              onSubmitEditing={() => phoneInputRef.current?.focus()}
              className="bg-white border border-gray-300 rounded p-4 text-base focus:border-purple-default"
              placeholder="성함을 입력해주세요"
              returnKeyType="next"
              value={name} onChangeText={setName}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
            />
          </View>
          {/* 전화번호 */}
          <View className='mb-5'>
            <Text className="text-base font-semibold mb-2 text-black">전화번호</Text>
            <TextInput
              className={`rounded p-4 text-base border 
                ${phoneNumber.length > 0 && !isPhoneValid
                  ? 'focus:border-red-500 bg-red-500/5'
                  : 'border-gray-300 bg-white'
                } focus:border-purple-default`
              }
              placeholder="전화번호를 입력해주세요"
              value={phoneNumber} onChangeText={handlePhoneNumberChange}
              keyboardType="numeric" maxLength={13}
              ref={phoneInputRef}
            />
          </View>
          {phoneNumber.length > 0 && !isPhoneValid && (
            <Text className="text-red-500 text-xs mt-1.5 ml-2">
              전화번호를 확인해주세요
            </Text>
          )}
          {/* 성별 */}
          <View className='mb-5'>
            <Text className="text-base font-semibold mb-2 text-black">성별</Text>
            <View className="flex-row items-center">
              <RadioButton label="남자" value="남" selected={gender === '남'} onSelect={setGender} />
              <RadioButton label="여자" value="여" selected={gender === '여'} onSelect={setGender} />
            </View>
          </View>
          {/* 생년월일 */}
          <View className='mb-5'>
            <Text className="text-base font-semibold mb-2 text-black">생년월일</Text>
            <TextInput
              className={`rounded p-4 text-base border ${dob.length > 0 && !isDobValid
                ? 'focus:border-red-500 bg-red-500/10'
                : 'border-gray-300 bg-white'
                } focus:border-purple-default`}
              placeholder="ex) 19951012"
              value={dob}
              onChangeText={handleDobChange}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
          {/* 한의사 여부 */}
          <View className='mb-5'>
            <Text className="text-base font-semibold mb-2 text-black">한의사 여부</Text>
            <View className="flex-row items-center">
              <RadioButton label="예" value="yes" selected={isDoctor === 'yes'} onSelect={setIsDoctor} />
              <RadioButton label="아니오" value="no" selected={isDoctor === 'no'} onSelect={setIsDoctor} />
            </View>
          </View>
        </View>
      </View>

      <Pressable
        className={`w-full py-4 rounded-lg items-center mb-12 ${isButtonEnabled ? 'bg-purple-default' : 'bg-grey-300'
          }`}
        onPress={handleSignUp} disabled={!isButtonEnabled}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.buttnText.active} />
        ) : (
          <Text
            className={`text-lg font-bold ${isButtonEnabled ? 'text-white' : 'text-grey-600'
              }`}
          >다음</Text>
        )}
      </Pressable>
    </View>
  )

  useCommonHeader({ title: '신규회원등록' });
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white">

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