import { Colors } from '@/constants/Colors';
import React from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const AppLogo = require('@/assets/images/confirm.png');
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isUseCancel?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title = "",
  message = "",
  isUseCancel = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 팝업 배경 (어두운 오버레이) */}
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          {/* 컨텐츠 영역 */}
          <View style={styles.contentContainer}>
            <Image source={AppLogo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.titleText}>진단 기록이 <Text style={styles.titleInnerText}>전송</Text> 되었습니다!</Text>
          </View>

          {/* 버튼 영역 */}
          <View style={styles.buttonContainer}>
            {isUseCancel ? <Pressable style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>취소</Text>
            </Pressable> : null}
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>확인</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '86%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    overflow: 'hidden',
    elevation: 5, // 안드로이드용 그림자
    shadowColor: '#000', // iOS용 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleInnerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.appPrimaryColor.purple
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButton: {
    borderRightWidth: 1,
    borderRightColor: '#eeeeee',
  },
  confirmButton: {
    backgroundColor: Colors.appPrimaryColor.purple,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
  },
  confirmButtonText: {
    color: 'white',
  },

  logo: {
    width: 42,
    height: 42,
    marginBottom: 20,
  },
});

export default CustomModal;