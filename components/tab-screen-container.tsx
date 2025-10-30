import React, { FC, PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';

export const TabScreenContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
});
