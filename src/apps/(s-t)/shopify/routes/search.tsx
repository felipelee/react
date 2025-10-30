import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Search as SearchIcon } from "lucide-react-native";
import { TabScreenContainer } from "../components/tab-screen-container";

export const Search: FC = () => {
  return (
    <TabScreenContainer>
      <View style={styles.emptyContainer}>
        <SearchIcon size={48} color="#D1D5DB" strokeWidth={2} />
        <Text style={styles.emptyTitle}>Search products</Text>
        <Text style={styles.emptyText}>
          Use the search bar above to find products
        </Text>
      </View>
    </TabScreenContainer>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
