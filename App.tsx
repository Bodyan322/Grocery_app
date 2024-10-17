import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider } from '@gluestack-ui/themed';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import GroceryList from "./components/GroceryList";

const queryClient = new QueryClient()
export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GluestackUIProvider config={config}>
            <StatusBar barStyle="dark-content" />
            <Home />
          </GluestackUIProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
  );
}
const Home = () => {
  return (
      <Box backgroundColor="#F6F4F5" flex={1}>
          <SafeAreaView style={styles.container}>
            <GroceryList/>
          </SafeAreaView>
      </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
