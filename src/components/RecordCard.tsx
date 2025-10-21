import { Colors } from '@/constants/Colors';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface RecordCardProps {
  title: string;
  subtitle?: string;
  subtitleIcon?: any;
  buttonText: string;
  buttonColor: string;
  onPress: () => void;
  children: React.ReactNode;
}

const RecordCard = ({ title, subtitle, subtitleIcon, buttonText, buttonColor, onPress, children }: RecordCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle && (
          <View style={styles.subtitleContainer}>
            {subtitleIcon && <Image source={subtitleIcon} style={styles.subtitleIcon} resizeMode="contain" />}
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
          </View>
        )}
      </View>

      <View style={styles.contentArea}>
        {children}
      </View>

      <Pressable
        style={[styles.cardButton, { backgroundColor: buttonColor }]}
        onPress={onPress}
      >
        <Text style={styles.cardButtonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 1,
  },
  cardHeader: {
    width: '100%',
    alignItems: 'flex-start',
  },
  contentArea: {
    flex: 1,
    width: '100%',
    marginVertical: 10,
  },
  cardButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  cardButtonText: {
    color: Colors.greyColors.grey950,
    fontSize: 17,
    fontWeight: 600,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  subtitleIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
});

export default RecordCard;