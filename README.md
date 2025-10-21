# 치매코호트 한방케어 앱  👋

## update
### (25.09.25)
- tailwindcss 적용
- zustand 적용 (전역 상태 관리)


### Project Structure
```
src/
├── api/ # REST API 연동          
│   ├── client.ts # Axios 인스턴스 설정 
│   └── services/
│       └── auth.service.ts # 인증 api
├── components/ # 재사용 공통 컴포넌트
│   ├── CustomModal.tsx # 팝업창
│   ├── DementiaDataView.tsx # 치매 진단 기록 카드
│   ├── LoadingDots.tsx # 결과 분석 로딩 Dot Animation
│   ├── NoDataView.tsx # 기록 기본 카드 (Default : nodata)
│   ├── RecordCard.tsx # 기록 카드
│   ├── TongueDataView.tsx # 설진 기록 카드
│   └── useCommonHeader.tsx # 공통 앱 헤더 뷰
├── context/ # 상태 관리
│   ├── BackButtonContext.ts # 뒤로 가기 기능 관리 
├── navigation/ # 화면 전환(네비게이션) 설정
│   └── types.ts # 네비게이션 파라미터 타입 정의 
├── providers/   
│   └── AppProviders.ts # 전역 상태 관리
├── screens/ # 개별 화면 컴포넌트  
│   ├── auth/
│   │   ├── IntroScreen.tsx # 시작 화면
│   │   ├── LoginScreen.tsx # 로그인 화면
│   │   └── SignUpScreen.tsx # 회원 가입 화면
│   ├── camera/
│   │   ├── CameraScreen.tsx # 카메라 화면
│   │   └── ConfirmPhotoScreen.tsx # 사진 확인 화면
│   ├── diagnosis/
│   │   ├── DiagnosisLoadingScreen.tsx # 결과 분석 로딩 화면
│   │   ├── ResultDementiaScreen.tsx # 설진 결과 분석 화면
│   │   └── ResultTongueScreen.tsx # 치매 확율 분석 화면
│   ├── diagnosis/
│   │   └── MainScreen.tsx # 메인 화면
│   └── store/ # Zustand 적용 예정
│       ├── PhotoState.ts # 카메라 촬영 이미지 관리 
│       └── useAppStateStore.ts # 앱 상태 관리 
└── types/ # 공용 타입 정의
    ├── api.ts # API 공통 요청/응답 타입
    ├── auth.ts # API 인증 요청/응답 타입 
    └── diagnosis.ts # 진단 데이터 타입  

```

### Tech stack & Open-source libraries 

- React (v19.0.0)
- React Native (v0.79.6)
- Expo (SDK 54)
- React Navigation
- Axios
- Expo-camera
- Tailwindcss ( with nativewind )
- Zustand
- UI
   - Vector Icons
   - react-native-circular-progress-indicator

---

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
