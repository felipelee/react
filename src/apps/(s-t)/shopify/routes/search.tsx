import React, { FC, useState } from "react";
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Search as SearchIcon } from "lucide-react-native";
import { TabScreenContainer } from "../components/tab-screen-container";
import { ProductCard } from "../components/product-card";
import { useProductSearch } from "@/src/shared/lib/hooks/use-products";
import { useRouter } from "expo-router";

export const Search: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { products, loading } = useProductSearch(query);

  React.useEffect(() => {
    const params = (router as any).params as { searchQuery?: string };
    if (params?.searchQuery) {
      setQuery(params.searchQuery);
    }
  }, [(router as any).params]);

  return (
    <TabScreenContainer>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          keyboardDismissMode="on-drag"
        />
      ) : query ? (
        <View style={styles.emptyContainer}>
          <SearchIcon size={48} color="#D1D5DB" strokeWidth={2} />
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>
            Try searching for something else
          </Text>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <SearchIcon size={48} color="#D1D5DB" strokeWidth={2} />
          <Text style={styles.emptyTitle}>Search products</Text>
          <Text style={styles.emptyText}>
            Search for products by name
          </Text>
        </View>
      )}
    </TabScreenContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
    gap: 16,
  },
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
