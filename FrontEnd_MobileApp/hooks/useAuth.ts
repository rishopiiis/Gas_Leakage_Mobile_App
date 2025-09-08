// import { useState, useEffect } from "react";
// import { User } from "../types";
// import storage from "../utils/storage";

// export const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       setIsLoading(true);
//       try {
//         const userData = await storage.get("user");
//         if (userData) {
//           setUser(JSON.parse(userData));
//         }
//       } catch (error) {
//         console.error("Error loading user data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   const signOut = async () => {
//     try {
//       await storage.remove("user");
//       await storage.remove("authToken");
//     } catch (error) {
//       console.error("Error during sign out:", error);
//     } finally {
//       setUser(null);
//     }
//   };

//   const signIn = async (email: string, password: string): Promise<boolean> => {
//     setIsLoading(true);
//     try {
//       const userData = {
//         id: "1",
//         name: "John Doe",
//         email: email,
//         phoneNumber: "+1 (555) 123-4567",
//       };

//       await storage.set("user", JSON.stringify(userData));
//       await storage.set("authToken", "mock-auth-token-123");

//       setUser(userData);
//       return true;
//     } catch (error) {
//       console.error("Error during sign in:", error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const signUp = async (
//     email: string,
//     password: string,
//     name: string,
//     phone: string
//   ): Promise<boolean> => {
//     setIsLoading(true);
//     try {
//       const userData = {
//         id: "1",
//         name: name,
//         email: email,
//         phoneNumber: phone || "+1 (555) 123-4567",
//       };

//       await storage.set("user", JSON.stringify(userData));
//       await storage.set("authToken", "mock-auth-token-123");

//       setUser(userData);
//       return true;
//     } catch (error) {
//       console.error("Error during sign up:", error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     user,
//     isLoading,
//     signIn,
//     signUp,
//     signOut,
//     isAuthenticated: !!user,
//   };
// };


import { useState, useEffect } from "react";
import { User } from "../types";
import saveUserToken from "../utils/secureStorage";
import getUserToken from "../utils/secureStorage";
import removeUserToken from "../utils/secureStorage";
import saveUserData from "../utils/secureStorage";
import getUserData from "../utils/secureStorage";
import removeUserData from "../utils/secureStorage";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      setIsLoading(true);
      try {
        // Load both token and user data
        const [token, userData] = await Promise.all([
          getUserToken(),
          getUserData(),
        ]);

        if (token && userData) {
          setAuthToken(token);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const signOut = async () => {
    try {
      // Remove both token and user data
      await Promise.all([removeUserToken(), removeUserData()]);
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setUser(null);
      setAuthToken(null);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      const userData = {
        id: "1",
        name: "John Doe",
        email: email,
        phoneNumber: "+1 (555) 123-4567",
      };

      const mockToken = "mock-auth-token-" + Date.now();

      // Save both token and user data
      await Promise.all([saveUserToken(mockToken), saveUserData(userData)]);

      setAuthToken(mockToken);
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    phone: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userData = {
        id: "1",
        name: name,
        email: email,
        phoneNumber: phone || "+94 (74) 233 - 2291",
      };

      const mockToken = "mock-auth-token-" + Date.now();

      await Promise.all([saveUserToken(mockToken), saveUserData(userData)]);

      setAuthToken(mockToken);
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Error during sign up:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    authToken,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user && !!authToken,
  };
};