import { Colors } from '@/constants/Colors';
import { DIAGNOSIS_MODES } from '@/constants/DiagnosisModes';
import CustomModal from '@/src/components/CustomModal';
import DementiaDataView from '@/src/components/DementiaDataView';
import NoDataView from '@/src/components/NoDataView';
import RecordCard from '@/src/components/RecordCard';
import TongueDataView from '@/src/components/TongueDataView';
import { useCustomBackHandler } from '@/src/context/BackButtonContext';
import { MainScreenProps } from '@/src/navigation/types';
import { useAppStateStore } from '@/src/store/useAppStateStore';
import { DementiaRecord, TongueRecord } from '@/src/types/diagnosis';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';

const mockTongueData: TongueRecord = {
  tonguePhotoUri: 'https://via.placeholder.com/150', // 예시 이미지 URL
  userName: '김퓨잇',
  healthStatus: '양호한 상태',
  diagnosisDate: '2025.09.12',
};

const mockDementiaData: DementiaRecord = {
  probability: 75,
  status: '주의 단계',
  diagnosisDate: '2025.09.10',
};

export default function MainScreen({ navigation }: MainScreenProps) {
  const { setMode, name } = useAppStateStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tongueData, setTongueData] = useState<TongueRecord | null>(mockTongueData);
  const [dementiaData, setDementiaData] = useState<DementiaRecord | null>(mockDementiaData);

  useCustomBackHandler("exitApp")

  useEffect(() => {
    if (tongueData || dementiaData) {
      setIsTransferEnabled(true);
    } else {
      setIsTransferEnabled(false);
    }
  }, [tongueData, dementiaData]);

  const [isTransferEnabled, setIsTransferEnabled] = useState(false);

  const handleTongueDiagnosis = () => {
    setMode(DIAGNOSIS_MODES.TONGUE)
    navigation.navigate("Camera")
  };

  const handleDementiaDiagnosis = () => {
    setMode(DIAGNOSIS_MODES.DEMENTIA)
    navigation.navigate("Loading")
  };

  const handleTransfer = () => {
    console.log('내 건강 정보 전송하기 버튼 클릭');
    if (isTransferEnabled) setIsModalVisible(true);
  };

  const handleConfirm = () => {
    console.log('확인 버튼이 눌렸습니다. 관련 로직을 실행합니다.');
  };

  return (
    <View className="flex-1 bg-grey-100 ">
      <View className="px-5 pt-5">
        <View className='w-full items-start mt-[40px]'>
          <Image source={require('@/assets/images/logo_small.png')}
            className='w-[45px] h-[30px]'
            style={{ resizeMode: 'contain' }} />
        </View>
        <Text className="text-[22px] font-bold mt-2.5 mb-5">{name}님, 안녕하세요.</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <RecordCard
          title="설진 기록"
          buttonText="설진하기"
          buttonColor={Colors.buttonBg.sky}
          onPress={handleTongueDiagnosis}
        >
          {tongueData ? (
            <TongueDataView data={tongueData} />
          ) : (
            <NoDataView
              description="최근 진단 기록이 없습니다."
              iconSource={require('@/assets/images/icon_report.png')}
            />
          )}
        </RecordCard>

        <RecordCard
          title="치매진단 기록"
          subtitleIcon={require('@/assets/images/clock.png')}
          subtitle={dementiaData ? "" : "최근 7일 저장된 건강정보가 없습니다."}
          buttonText="치매 검사하기"
          buttonColor={Colors.buttonBg.enYellow}
          onPress={handleDementiaDiagnosis}
        >
          {dementiaData ? (
            <DementiaDataView data={dementiaData} />
          ) : (
            <NoDataView
              description="최근 진단 기록이 없습니다."
              iconSource={require('@/assets/images/icon_report.png')}
            />
          )}
        </RecordCard>
      </ScrollView>

      <LinearGradient colors={['rgba(245, 245, 247, 0.0)', '#F5F5F7']}
        className="absolute left-0 right-0 bottom-[100px] h-20"
        pointerEvents="none"
      />

      <View className="absolute bottom-10 left-5 right-5 pb-[20px]">
        <Pressable
          className={`w-full py-4 rounded-lg items-center ${isTransferEnabled ? 'bg-purple-default' : 'bg-gray-300'
            }`}
          onPress={handleTransfer}
        >
          <Text className={`text-base font-bold ${isTransferEnabled ? 'text-white' : 'text-gray-400'
            }`}>
            내 건강 정보 전송하기
          </Text>
        </Pressable>
      </View>
      <CustomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const { height } = Dimensions.get('window');
