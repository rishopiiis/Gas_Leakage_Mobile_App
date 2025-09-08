import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Simple storage utility with fallback
export const storage = {
  async get(key: string): Promise<string | null> {
    try {
      if (Platform.OS !== "web" && SecureStore.getItemAsync) {
        return await SecureStore.getItemAsync(key);
      } else {
        // Fallback for web or when SecureStore is not available
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.error("Error getting from storage:", error);
      return null;
    }
  },

  async set(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS !== "web" && SecureStore.setItemAsync) {
        await SecureStore.setItemAsync(key, value);
      } else {
        // Fallback for web or when SecureStore is not available
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error("Error setting to storage:", error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      if (Platform.OS !== "web" && SecureStore.deleteItemAsync) {
        await SecureStore.deleteItemAsync(key);
      } else {
        // Fallback for web or when SecureStore is not available
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error removing from storage:", error);
    }
  },
};

export default storage;
