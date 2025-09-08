import * as SecureStore from "expo-secure-store";
import { useState, useEffect, useCallback } from "react";

export const useSecureStorage = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    checkAvailability();
  }, []);

  const checkAvailability = async () => {
    try {
      // Try to set a test value to check if SecureStore is available
      await SecureStore.setItemAsync("test", "value");
      await SecureStore.deleteItemAsync("test");
      setIsAvailable(true);
    } catch (error) {
      console.warn("SecureStore is not available:", error);
      setIsAvailable(false);
    }
  };

  const get = useCallback(
    async (key: string): Promise<string | null> => {
      if (!isAvailable) {
        console.warn("SecureStore not available, using fallback");
        // Fallback to AsyncStorage or in-memory storage
        try {
          const value = localStorage.getItem(key);
          return value;
        } catch (error) {
          console.error("Fallback storage error:", error);
          return null;
        }
      }

      try {
        return await SecureStore.getItemAsync(key);
      } catch (error) {
        console.error("Error getting item from SecureStore:", error);
        return null;
      }
    },
    [isAvailable]
  );

  const set = useCallback(
    async (key: string, value: string): Promise<void> => {
      if (!isAvailable) {
        console.warn("SecureStore not available, using fallback");
        // Fallback to AsyncStorage or in-memory storage
        try {
          localStorage.setItem(key, value);
          return;
        } catch (error) {
          console.error("Fallback storage error:", error);
          return;
        }
      }

      try {
        await SecureStore.setItemAsync(key, value);
      } catch (error) {
        console.error("Error setting item in SecureStore:", error);
      }
    },
    [isAvailable]
  );

  const remove = useCallback(
    async (key: string): Promise<void> => {
      if (!isAvailable) {
        console.warn("SecureStore not available, using fallback");
        // Fallback to AsyncStorage or in-memory storage
        try {
          localStorage.removeItem(key);
          return;
        } catch (error) {
          console.error("Fallback storage error:", error);
          return;
        }
      }

      try {
        await SecureStore.deleteItemAsync(key);
      } catch (error) {
        console.error("Error removing item from SecureStore:", error);
      }
    },
    [isAvailable]
  );

  return {
    get,
    set,
    remove,
    isAvailable,
  };
};

export default useSecureStorage;
