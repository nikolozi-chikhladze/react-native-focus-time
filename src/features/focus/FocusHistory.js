import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  )
}

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => onClear();

  return (
    <>
      <SafeAreaView style={styles.safeArea}>

        {!!focusHistory.length &&
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        }
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center'
  },
  flatList: {
    flex: 1
  },
  flatListContent: {
    flex: 1,
    alignItems: 'center'
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md
  }),
  title: {
    color: colors.white,
    fontSize: fontSizes.lg
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md
  }
})