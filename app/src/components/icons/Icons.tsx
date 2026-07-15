import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';

type IconProps = {
  size?: number;
  color?: string;
};

// Checkmark drawn with two rotated borders (tick shape).
export const CheckmarkIcon = ({ size = 14, color = Colors.onPrimary }: IconProps) => {
  return (
    <View style={[styles.checkWrap, { width: size, height: size }]}>
      <View
        style={[
          styles.checkStem,
          {
            height: size * 0.9,
            width: size * 0.16,
            backgroundColor: color,
            left: size * 0.55,
            top: size * 0.05,
          },
        ]}
      />
      <View
        style={[
          styles.checkKick,
          {
            height: size * 0.45,
            width: size * 0.16,
            backgroundColor: color,
            left: size * 0.24,
            top: size * 0.5,
          },
        ]}
      />
    </View>
  );
};

// Simple glyph-based icons keep this dependency-free and crisp enough for the demo.
export const EyeIcon = ({ size = 18, color = Colors.textSecondary }: IconProps) => (
  <Text style={{ fontSize: size, color, lineHeight: size + 2 }}>👁</Text>
);

export const ExitIcon = ({ size = 18, color = Colors.danger }: IconProps) => (
  <Text style={{ fontSize: size, color, fontWeight: '700' }}>⏻</Text>
);

export const EditIcon = ({ size = 16, color = Colors.primary }: IconProps) => (
  <Text style={{ fontSize: size, color }}>✎</Text>
);

export const TrashIcon = ({ size = 16, color = Colors.danger }: IconProps) => (
  <Text style={{ fontSize: size, color }}>🗑</Text>
);

export const ClipboardIcon = ({ size = 34, color = Colors.onPrimary }: IconProps) => (
  <Text style={{ fontSize: size, color }}>📋</Text>
);

export const PlusIcon = ({ size = 22, color = Colors.onPrimary }: IconProps) => (
  <Text style={{ fontSize: size, color, fontWeight: '600', lineHeight: size + 2 }}>＋</Text>
);

const styles = StyleSheet.create({
  checkWrap: {
    position: 'relative',
  },
  checkStem: {
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
  checkKick: {
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 2,
  },
});
