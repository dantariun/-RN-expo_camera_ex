import type { RootStackParamList } from '@/src/navigation/types';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react';
import { BackHandler, Platform, ToastAndroid } from 'react-native';

type BackActionType = 'default' | 'exitApp' | 'goHome';

interface BackButtonContextType {
  setBackActionType: Dispatch<SetStateAction<BackActionType>>;
}

interface BackButtonProviderProps {
  children: ReactNode;
}

const BackButtonContext = createContext<BackButtonContextType | undefined>(undefined);

export const BackButtonProvider = ({ children }: BackButtonProviderProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [backActionType, setBackActionType] = useState<BackActionType>('default');
  const [isExitApp, setIsExitApp] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return;

      const backAction = (): boolean => {
        switch (backActionType) {
          case 'exitApp':
            if (!isExitApp) {
              setIsExitApp(true);
              ToastAndroid.show('한번 더 누르면 앱을 종료합니다.', ToastAndroid.SHORT);
              setTimeout(() => {
                setIsExitApp(false);
              }, 2000);
            } else {
              BackHandler.exitApp();
            }
            return true;

          case 'goHome':
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            });
            return true;

          default:
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              if (!isExitApp) {
                setIsExitApp(true);
                ToastAndroid.show('한번 더 누르면 앱을 종료합니다.', ToastAndroid.SHORT);
                setTimeout(() => {
                  setIsExitApp(false);
                }, 2000);
              } else {
                BackHandler.exitApp();
              }
            }
            return true;
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [isExitApp, backActionType, navigation])
  );

  const value: BackButtonContextType = { setBackActionType };

  return (
    <BackButtonContext.Provider value={value}>
      {children}
    </BackButtonContext.Provider>
  );
};

export const useCustomBackHandler = (type: BackActionType) => {
  const context = useContext(BackButtonContext);

  if (!context) {
    throw new Error('useCustomBackHandler must be used within a BackButtonProvider');
  }

  const { setBackActionType } = context;

  useFocusEffect(
    useCallback(() => {
      setBackActionType(type);
      return () => {
        setBackActionType('default');
      };
    }, [type, setBackActionType])
  );
};