// import { Link, router } from "expo-router";
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Axios } from "../../app/AxiosRequestBuilder";
// import { themeAuth } from "../../Contexts/ThemeContext";
// // import * as WebBrowser from 'expo-web-browser'
// // import * as AuthSession from 'expo-auth-session'
// // import { useAuth, useSSO, useUser } from '@clerk/clerk-expo'
// import { userAuth } from "../../Contexts/UserContext";

// // export const useWarmUpBrowser = () => {
// // useEffect(() => {
// //   // Preloads the browser for Android devices to reduce authentication load time
// //   // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
// //   void WebBrowser.warmUpAsync()
// //   return () => {
// //     // Cleanup: closes browser when component unmounts
// //     void WebBrowser.coolDownAsync()
// //   }
// // }, [])
// // }
// // WebBrowser.maybeCompleteAuthSession()

// const Register: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const { theme } = themeAuth();
//   const { setUser } = userAuth();

//   // useWarmUpBrowser()

//   // // Use the `useSSO()` hook to access the `startSSOFlow()` method
//   // const { startSSOFlow } = useSSO()

//   // const onPress = useCallback(async () => {
//   // try {
//   //     // Start the authentication process by calling `startSSOFlow()`
//   //     const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
//   //     strategy: 'oauth_google',
//   //     // For web, defaults to current path
//   //     // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
//   //     // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
//   //     redirectUrl: AuthSession.makeRedirectUri({ scheme: 'myapp', path: '/' }),
//   //     })

//   //     // If sign in was successful, set the active session
//   //     if (createdSessionId) {
//   //       setActive!({ session: createdSessionId });
//   //     } else {
//   //     // If there is no `createdSessionId`,
//   //     // there are missing requirements, such as MFA
//   //     // Use the `signIn` or `signUp` returned from `startSSOFlow`
//   //     // to handle next steps
//   //       Alert.alert('Sign in or sign up is required to complete the authentication process.');
//   //     }
//   // } catch (err) {
//   //     // See https://clerk.com/docs/custom-flows/error-handling
//   //     // for more info on error handling
//   //     console.error(JSON.stringify(err, null, 2))
//   // }
//   // }, [])

//   // const {user} = useUser();
//   // const {isSignedIn, signOut} = useAuth();

//   // useEffect(() => {
//   //   if (isSignedIn) {
//   //     handleGoogleSignIn();
//   //   } else {
//   //       console.log('No user is signed in')
//   //   }
//   // }, [signOut, isSignedIn, user])

//   const handleRegister = async () => {
//     if (password == "" || confirmPassword == "" || email == "") {
//       alert("Fill the feilds");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Password and Confirm Password not match");
//       return;
//     }

//     try {
//       const response = await Axios.post("/auth/user/register", {
//         email,
//         password,
//         confirmPassword,
//       });
//       console.log(response.data);
//       router.push("/Authentication/login");
//     } catch (error) {
//       if (
//         typeof error === "object" &&
//         error !== null &&
//         "response" in error &&
//         typeof (error as any).response === "object" &&
//         (error as any).response !== null &&
//         "data" in (error as any).response
//       ) {
//         console.log((error as any).response.data);
//       } else {
//         console.log(error);
//       }
//     }
//   };

//   // For Google OAuth registration
//   // const handleGoogleSignIn = async () => {
//   //   try {
//   //     // After successful Clerk Google sign-in
//   //     const googleAuthData = {
//   //       email: user?.primaryEmailAddress?.emailAddress,
//   //       name: user?.fullName,
//   //       profileImage: user?.imageUrl,
//   //       clerkUserId: user?.id
//   //     };

//   //     const response = await Axios.post("auth/user/google-auth", googleAuthData);
//   //       console.log('Google Sign-In Response:', response.data);
//   //       if (response.data.action === 'REGISTERED') {
//   //         // New user registered via Google
//   //         Alert.alert('Welcome! Your account has been created.');
//   //       } else {
//   //         // Existing user logged in
//   //         Alert.alert('Welcome back!');
//   //       }
//   //       setUser(response.data.data.user);
//   //       await save("token", response.data.data.token);
//   //       router.replace("/Components/Home/Home");
//   //   } catch (error) {
//   //     Alert.alert('Error', 'Failed to sign in with Google. Please try again.')
//   //     console.error('Google Sign-In Error:', error);
//   //   }

//   // };

//   return (
//     <View
//       style={[styles.container, { backgroundColor: theme.colors.background }]}
//     >
//       <View
//         style={[
//           styles.formContainer,
//           { backgroundColor: theme.colors.primary },
//         ]}
//       >
//         <Text style={[styles.title, { color: theme.colors.text }]}>
//           Register
//         </Text>
//         <View style={styles.form}>
//           <TextInput
//             style={[styles.inputs, { color: theme.colors.text }]}
//             placeholder="Email"
//             placeholderTextColor="rgb(173, 173, 173)"
//             value={email}
//             onChangeText={(value) => setEmail(value.trim())}
//           />
//           <TextInput
//             style={[styles.inputs, { color: theme.colors.text }]}
//             placeholder="Password"
//             placeholderTextColor="rgb(173, 173, 173)"
//             value={password}
//             onChangeText={(value) => setPassword(value.trim())}
//           />
//           <TextInput
//             style={[styles.inputs, { color: theme.colors.text }]}
//             placeholder="ConfirmPassword"
//             placeholderTextColor="rgb(173, 173, 173)"
//             value={confirmPassword}
//             onChangeText={(value) => setConfirmPassword(value.trim())}
//           />
//           <TouchableOpacity onPress={handleRegister} style={styles.register}>
//             <Text style={styles.text}>REGISTER</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.already}>Already have an account?</Text>
//         <Link href={"/Authentication/login"} style={styles.login}>
//           LOGIN
//         </Link>

//         {/* <View>
//                     <TouchableOpacity style={styles.googleLogin}>
//                         <Ionicons name="logo-google" size={18} color="black" />
//                         <Text onPress={onPress} style={styles.googleLoginText}>Sign in with Google</Text>
//                     </TouchableOpacity>
//                 </View> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: -40,
//     backgroundColor: "#E9967A",
//   },
//   formContainer: {
//     width: "80%",
//     borderWidth: 2,
//     borderColor: "#607F90",
//     borderRadius: 20,
//     padding: 10,
//     color: "#607F90",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 30,
//     marginBottom: 20,
//     color: "rgb(232, 232, 232)",
//   },
//   form: {},
//   inputs: {
//     borderWidth: 1,
//     borderColor: "#96FCDF",
//     borderRadius: 5,
//     textAlign: "center",
//     marginBottom: 12,
//     padding: 10,
//     width: "100%",
//     color: "#16FCDF",
//     fontSize: 16,
//   },
//   already: {
//     marginTop: 20,
//     textAlign: "center",
//     marginBottom: 10,
//     color: "#36FCDF",
//   },
//   login: {
//     color: "#F6FCDF",
//     textAlign: "center",
//     padding: 10,
//     marginBottom: 5,
//     backgroundColor: "#497699",
//     borderRadius: 5,
//   },
//   register: {
//     padding: 10,
//     backgroundColor: "#F6FCDF",
//     borderRadius: 5,
//   },
//   text: {
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   googleLoginText: {
//     fontWeight: "bold",
//     textAlign: "center",
//     fontSize: 15,
//   },
//   googleLogin: {
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: "#F6FCDF",
//     borderRadius: 5,
//   },
// });

// export default Register;



import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import { Axios } from "../../app/AxiosRequestBuilder";
import { themeAuth } from "../../Contexts/ThemeContext";
import { userAuth } from "../../Contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = themeAuth();
  const { setUser } = userAuth();

  // Validate phone number format
  const validatePhoneNumber = (phone: string): boolean => {
    // Basic international phone validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleRegister = async () => {
    // Validate all fields
    if (!email || !password || !confirmPassword || !phoneNumber || !fullName) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password and Confirm Password do not match");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        "Error",
        "Please enter a valid phone number with country code (e.g., +1234567890)"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await Axios.post("/auth/user/register", {
        email,
        password,
        confirmPassword,
        phoneNumber: phoneNumber.replace(/\s/g, ""), // Remove spaces
        fullName,
      });

      console.log(response.data);

      Alert.alert(
        "Success",
        "Account created successfully! You will now receive emergency alerts via SMS.",
        [
          {
            text: "OK",
            onPress: () => router.push("/Authentication/login"),
          },
        ]
      );
    } catch (error: any) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Format phone number as user types
  const formatPhoneNumber = (text: string) => {
    // Remove all non-digit characters except +
    const cleaned = text.replace(/[^\d+]/g, "");

    // Format with spaces for readability
    let formatted = cleaned;
    if (cleaned.startsWith("+")) {
      // International format: +1 234 567 8900
      if (cleaned.length > 3)
        formatted = cleaned.slice(0, 3) + " " + cleaned.slice(3);
      if (cleaned.length > 6)
        formatted = formatted.slice(0, 7) + " " + formatted.slice(7);
      if (cleaned.length > 10)
        formatted = formatted.slice(0, 11) + " " + formatted.slice(11);
    } else {
      // Local format (without country code)
      if (cleaned.length > 3)
        formatted = cleaned.slice(0, 3) + " " + cleaned.slice(3);
      if (cleaned.length > 6)
        formatted = formatted.slice(0, 7) + " " + formatted.slice(7);
    }

    setPhoneNumber(formatted);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View
        style={[
          styles.formContainer,
          { backgroundColor: theme.colors.cardBackground },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Create Account
        </Text>

        <Text style={[styles.subtitle, { color: theme.colors.text }]}>
          Register for emergency alert notifications
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person"
              size={20}
              color={theme.colors.text}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.inputs, { color: theme.colors.text }]}
              placeholder="Full Name"
              placeholderTextColor="rgb(173, 173, 173)"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail"
              size={20}
              color={theme.colors.text}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.inputs, { color: theme.colors.text }]}
              placeholder="Email Address"
              placeholderTextColor="rgb(173, 173, 173)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="call"
              size={20}
              color={theme.colors.text}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.inputs, { color: theme.colors.text }]}
              placeholder="Phone Number (with country code)"
              placeholderTextColor="rgb(173, 173, 173)"
              value={phoneNumber}
              onChangeText={formatPhoneNumber}
              keyboardType="phone-pad"
              maxLength={20}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed"
              size={20}
              color={theme.colors.text}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.inputs, { color: theme.colors.text }]}
              placeholder="Password (min. 8 characters)"
              placeholderTextColor="rgb(173, 173, 173)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed"
              size={20}
              color={theme.colors.text}
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.inputs, { color: theme.colors.text }]}
              placeholder="Confirm Password"
              placeholderTextColor="rgb(173, 173, 173)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.register, isLoading && styles.registerDisabled]}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.text}>Creating Account...</Text>
            ) : (
              <Text style={styles.text}>CREATE ACCOUNT</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.alertInfo}>
          <Ionicons name="alert-circle" size={18} color="#ffa726" />
          <Text style={[styles.alertText, { color: theme.colors.text }]}>
            Your phone number will be used for emergency gas leak alerts via SMS
          </Text>
        </View>

        <Text style={[styles.already, { color: theme.colors.text }]}>
          Already have an account?
        </Text>
        <Link
          href={"/Authentication/login"}
          style={[styles.login, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.loginText}>LOGIN TO EXISTING ACCOUNT</Text>
        </Link>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 25,
    opacity: 0.8,
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
    opacity: 0.7,
  },
  inputs: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  register: {
    padding: 15,
    backgroundColor: "#2e7d32",
    borderRadius: 8,
    marginTop: 10,
  },
  registerDisabled: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  alertInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#ffa726",
  },
  alertText: {
    marginLeft: 10,
    fontSize: 12,
    flex: 1,
  },
  already: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  login: {
    padding: 15,
    borderRadius: 8,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Register;