import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
  Main: undefined;
  Camera: undefined;
  Photo: undefined;
  Loading: undefined;
  Tongue: undefined;
  Dementia: undefined;
};

export type IntroScreenProps = StackScreenProps<RootStackParamList, 'Intro'>;
export type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;
export type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;
export type MainScreenProps = StackScreenProps<RootStackParamList, 'Main'>;
export type CameraScreenProps = StackScreenProps<RootStackParamList, 'Camera'>;
export type PhotoScreenProps = StackScreenProps<RootStackParamList, 'Photo'>;
export type LoadingScreenProps = StackScreenProps<RootStackParamList, 'Loading'>;
export type TongueScreenProps = StackScreenProps<RootStackParamList, 'Tongue'>;
export type DemetiaScreenProps = StackScreenProps<RootStackParamList, 'Dementia'>;