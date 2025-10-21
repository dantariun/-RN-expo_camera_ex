import { CameraScreenProps } from '@/src/navigation/types';
import { usePhotoStore } from '@/src/store/photoStore';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { CameraView, useCameraPermissions, type CameraType } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen({ navigation }: CameraScreenProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setPhotoData } = usePhotoStore();

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        setIsCameraActive(true);
      }, 300);

      return () => {
        clearTimeout(timer);
        setIsCameraActive(false);
      };
    }, [])
  );


  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-center text-white">카메라를 사용하려면 권한이 필요합니다.</Text>
        <Button onPress={requestPermission} title="권한 다시 요청하기" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlash() {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      setIsLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        setPhotoData({ uri: photo.uri, base64: photo.base64 ?? null });
        navigation.navigate("Photo")
      } catch (error) {
        console.error("사진 촬영 오류:", error);
        alert("사진을 처리하는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <View className="flex-1 bg-black">
      {/* 1. 헤더 영역 (화면 상단 15%) */}
      <View className="h-[15%] bg-black justify-end items-start px-5 pb-2.5">
        <Pressable className="w-12 h-12 justify-center items-center" onPress={toggleFlash}>
          <Ionicons name={flash === 'on' ? 'flash' : 'flash-off'} size={20} color="white" />
        </Pressable>
        {/* 추가적인 헤더 요소 (예: 타이틀) */}
      </View>

      {/* 2. 카메라 프리뷰 영역 (화면 중앙 60%) */}
      <View className="h-[60%] justify-center items-center">

        {isCameraActive ? <CameraView style={StyleSheet.absoluteFillObject} facing={facing} ref={cameraRef} flash={flash} />
          : <View className='flex-1 w-full h-[60%] bg-black' />}

        <Image
          source={require('@/assets/images/scan.png')} // 2. 실제 이미지 경로로 변경해주세요.
          className="absolute"
          resizeMode="contain" // 이미지 비율 유지하며 지정된 영역에 맞춤
        />

      </View>


      {/* 3. 하단 컨트롤러 영역 (화면 하단 35%) */}
      <View className="h-[25%] bg-black flex-row items-center justify-around">
        {/* buttonsRow View를 제거하고 버튼들을 직접 배치합니다. */}
        <Pressable className="w-[60px] h-[60px] justify-center items-center" onPress={() => navigation.goBack()}>
          <Text className="text-white text-base">취소</Text>
        </Pressable>

        <TouchableOpacity
          className="w-[70px] h-[70px] rounded-full bg-white justify-center items-center"
          onPress={takePicture}>
          <View className="w-[60px] h-[60px] rounded-full border-2 border-black" />
        </TouchableOpacity>

        <Pressable className="w-[60px] h-[60px] justify-center items-center" onPress={toggleCameraFacing}>
          <Ionicons name="camera-reverse" size={32} color="white" />
        </Pressable>
      </View>
      {isLoading && (
        <View
          className="absolute inset-0 bg-black/70 justify-center items-center"
        >
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-2.5 text-base">처리 중...</Text>
        </View>
      )}
    </View>
  );
}
