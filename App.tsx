import { useColorScheme } from '@/hooks/useColorScheme';
import { BackButtonProvider } from '@/src/context/BackButtonContext';
import { RootStackParamList } from '@/src/navigation/types';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import IntroScreen from '@/src/screens/auth/IntroScreen';
import LoginScreen from '@/src/screens/auth/LoginScreen';
import SignUpScreen from '@/src/screens/auth/SignUpScreen';
import LoadingScreen from './src/screens//diagnosis/DiagnosisLoadingScreen';
import DementiaScreen from './src/screens//diagnosis/ResultDementiaScreen';
import TongueScreen from './src/screens//diagnosis/ResultTongueScreen';
import CameraScreen from './src/screens/camera/CameraScreen';
import PhotoScreen from './src/screens/camera/ConfirmPhotoScreen';
import MainScreen from './src/screens/main/MainScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <BackButtonProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Intro" component={IntroScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen name="Photo" component={PhotoScreen} />
              <Stack.Screen name="Loading" component={LoadingScreen} />
              <Stack.Screen name="Dementia" component={DementiaScreen} />
              <Stack.Screen name="Tongue" component={TongueScreen} />
            </Stack.Navigator>
          </BackButtonProvider>
        </NavigationContainer>
        <StatusBar style="dark" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}