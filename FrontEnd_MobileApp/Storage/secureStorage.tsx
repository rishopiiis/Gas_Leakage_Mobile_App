// // import * as SecureStore from 'expo-secure-store';

// // export async function save(key : string, token : string) {
// //   await SecureStore.setItemAsync(key, token);
// // }

// // export async function get(key: string) {
// //   return await SecureStore.getItemAsync(key);
// // }

// // export async function remove(key: string) {
// //   await SecureStore.deleteItemAsync(key);
// // }



// import * as SecureStore from 'expo-secure-store';

// async function getSecureData() {
//   try {
//     const token = await SecureStore.getItemAsync('userToken');
//     if (token) {
//       console.log('Token retrieved successfully');
//       return token;
//     }
//     console.log('No token found');
//     return null;
//   } catch (error) {
//     console.error('Error retrieving secure data:', error);
//     return null;
//   }
// }

// // Usage
// getSecureData().then(token => {
//   if (token) {
//     // Use the token
//   }
// });


import * as SecureStore from "expo-secure-store";

// Secure storage utility functions
export const save = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`Successfully saved ${key}`);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    throw error;
  }
};

export const get = async (key: string): Promise<string | null> => {
  try {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
      console.log(`Successfully retrieved ${key}`);
      return value;
    }
    console.log(`No value found for ${key}`);
    return null;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
};

export const remove = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`Successfully removed ${key}`);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
};

// Specific functions for common use cases
export const saveUserToken = async (token: string): Promise<void> => {
  return save("userToken", token);
};

export const getUserToken = async (): Promise<string | null> => {
  return get("userToken");
};

export const removeUserToken = async (): Promise<void> => {
  return remove("userToken");
};

export const saveUserData = async (userData: any): Promise<void> => {
  return save("userData", JSON.stringify(userData));
};

export const getUserData = async (): Promise<any | null> => {
  const data = await get("userData");
  return data ? JSON.parse(data) : null;
};

export const removeUserData = async (): Promise<void> => {
  return remove("userData");
};

export default {
  save,
  get,
  remove,
  saveUserToken,
  getUserToken,
  removeUserToken,
  saveUserData,
  getUserData,
  removeUserData,
};