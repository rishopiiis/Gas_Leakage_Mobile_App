import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Axios } from "../../app/AxiosRequestBuilder";
import { themeAuth } from "../../Contexts/ThemeContext";
// import * as WebBrowser from 'expo-web-browser'
// import * as AuthSession from 'expo-auth-session'
// import { useAuth, useSSO, useUser } from '@clerk/clerk-expo'
import { userAuth } from "../../Contexts/UserContext";

// export const useWarmUpBrowser = () => {
// useEffect(() => {
//   // Preloads the browser for Android devices to reduce authentication load time
//   // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
//   void WebBrowser.warmUpAsync()
//   return () => {
//     // Cleanup: closes browser when component unmounts
//     void WebBrowser.coolDownAsync()
//   }
// }, [])
// }
// WebBrowser.maybeCompleteAuthSession()

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { theme } = themeAuth();
  const { setUser } = userAuth();

  // useWarmUpBrowser()

  // // Use the `useSSO()` hook to access the `startSSOFlow()` method
  // const { startSSOFlow } = useSSO()

  // const onPress = useCallback(async () => {
  // try {
  //     // Start the authentication process by calling `startSSOFlow()`
  //     const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
  //     strategy: 'oauth_google',
  //     // For web, defaults to current path
  //     // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
  //     // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
  //     redirectUrl: AuthSession.makeRedirectUri({ scheme: 'myapp', path: '/' }),
  //     })

  //     // If sign in was successful, set the active session
  //     if (createdSessionId) {
  //       setActive!({ session: createdSessionId });
  //     } else {
  //     // If there is no `createdSessionId`,
  //     // there are missing requirements, such as MFA
  //     // Use the `signIn` or `signUp` returned from `startSSOFlow`
  //     // to handle next steps
  //       Alert.alert('Sign in or sign up is required to complete the authentication process.');
  //     }
  // } catch (err) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error(JSON.stringify(err, null, 2))
  // }
  // }, [])

  // const {user} = useUser();
  // const {isSignedIn, signOut} = useAuth();

  // useEffect(() => {
  //   if (isSignedIn) {
  //     handleGoogleSignIn();
  //   } else {
  //       console.log('No user is signed in')
  //   }
  // }, [signOut, isSignedIn, user])

  const handleRegister = async () => {
    if (password == "" || confirmPassword == "" || email == "") {
      alert("Fill the feilds");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and Confirm Password not match");
      return;
    }

    try {
      const response = await Axios.post("/auth/user/register", {
        email,
        password,
        confirmPassword,
      });
      console.log(response.data);
      router.push("/Authentication/login");
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object" &&
        (error as any).response !== null &&
        "data" in (error as any).response
      ) {
        console.log((error as any).response.data);
      } else {
        console.log(error);
      }
    }
  };

  // For Google OAuth registration
  // const handleGoogleSignIn = async () => {
  //   try {
  //     // After successful Clerk Google sign-in
  //     const googleAuthData = {
  //       email: user?.primaryEmailAddress?.emailAddress,
  //       name: user?.fullName,
  //       profileImage: user?.imageUrl,
  //       clerkUserId: user?.id
  //     };

  //     const response = await Axios.post("auth/user/google-auth", googleAuthData);
  //       console.log('Google Sign-In Response:', response.data);
  //       if (response.data.action === 'REGISTERED') {
  //         // New user registered via Google
  //         Alert.alert('Welcome! Your account has been created.');
  //       } else {
  //         // Existing user logged in
  //         Alert.alert('Welcome back!');
  //       }
  //       setUser(response.data.data.user);
  //       await save("token", response.data.data.token);
  //       router.replace("/Components/Home/Home");
  //   } catch (error) {
  //     Alert.alert('Error', 'Failed to sign in with Google. Please try again.')
  //     console.error('Google Sign-In Error:', error);
  //   }

  // };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.formContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Register
        </Text>
        <View style={styles.form}>
          <TextInput
            style={[styles.inputs, { color: theme.colors.text }]}
            placeholder="Email"
            placeholderTextColor="rgb(173, 173, 173)"
            value={email}
            onChangeText={(value) => setEmail(value.trim())}
          />
          <TextInput
            style={[styles.inputs, { color: theme.colors.text }]}
            placeholder="Password"
            placeholderTextColor="rgb(173, 173, 173)"
            value={password}
            onChangeText={(value) => setPassword(value.trim())}
          />
          <TextInput
            style={[styles.inputs, { color: theme.colors.text }]}
            placeholder="ConfirmPassword"
            placeholderTextColor="rgb(173, 173, 173)"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value.trim())}
          />
          <TouchableOpacity onPress={handleRegister} style={styles.register}>
            <Text style={styles.text}>REGISTER</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.already}>Already have an account?</Text>
        <Link href={"/Authentication/login"} style={styles.login}>
          LOGIN
        </Link>

        {/* <View>
                    <TouchableOpacity style={styles.googleLogin}>
                        <Ionicons name="logo-google" size={18} color="black" />
                        <Text onPress={onPress} style={styles.googleLoginText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
    backgroundColor: "#E9967A",
  },
  formContainer: {
    width: "80%",
    borderWidth: 2,
    borderColor: "#607F90",
    borderRadius: 20,
    padding: 10,
    color: "#607F90",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20,
    color: "rgb(232, 232, 232)",
  },
  form: {},
  inputs: {
    borderWidth: 1,
    borderColor: "#96FCDF",
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 12,
    padding: 10,
    width: "100%",
    color: "#16FCDF",
    fontSize: 16,
  },
  already: {
    marginTop: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "#36FCDF",
  },
  login: {
    color: "#F6FCDF",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#497699",
    borderRadius: 5,
  },
  register: {
    padding: 10,
    backgroundColor: "#F6FCDF",
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
  googleLoginText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  googleLogin: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#F6FCDF",
    borderRadius: 5,
  },
});

export default Register;
