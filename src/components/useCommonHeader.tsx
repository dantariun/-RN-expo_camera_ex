
import type { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackHeaderLeftProps, StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { Pressable } from 'react-native';

interface CommonHeaderOptions {
    title?: string;
    headerRight?: React.ReactNode;
    onBackPress?: () => void;
}

export const useCommonHeader = ({ title, headerRight, onBackPress }: CommonHeaderOptions) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: title || '',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 700, fontSize: 17 },
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#F9FAFC' },
            headerRight: () => headerRight,
            headerTintColor: 'black',
            headerLeft: (props: StackHeaderLeftProps) => (
                props.canGoBack ? (
                    <Pressable onPress={handleBackPress} hitSlop={20} >
                        <Ionicons name="chevron-back" size={28} color={props.tintColor || 'black'} />
                    </Pressable>
                ) : null
            )
        });
    }, [navigation, title, headerRight, onBackPress]);
};