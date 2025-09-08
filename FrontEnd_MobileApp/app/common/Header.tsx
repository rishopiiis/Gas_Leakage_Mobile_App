import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { themeAuth } from "../../Contexts/ThemeContext";
import { userAuth } from "../../Contexts/UserContext";
import { get, remove } from "../../Storage/secureStorage";
// import { useAuth } from '@clerk/clerk-expo';

interface USER {
  name: string;
  email: string;
  phoneNumber: number;
  imageData: string;
  imageType: string;
  imageName: string;
  authMethod: string;
}

const Header: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const { theme, toggleTheme } = themeAuth();
  // const {isSignedIn, signOut} = useAuth();

  const { user, setUser } = userAuth();
  const imageUri = `data:${user?.imageType};base64,${user?.imageData}`;

  useEffect(() => {
    // const checkToken = async () => {
    //   const token = await get("token");
    //   if (!token) {
    //     router.push("/Authentication/login");
    //   }
    // };
    // checkToken();

    // Update immediately
    updateDateTime();

    // Update every second for real-time seconds
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateDateTime = () => {
    const now = new Date();

    // Format time with seconds (HH:MM:SS)
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Format date
    const date = now.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setCurrentTime(time);
    setCurrentDate(date);
  };

  const handleLogout = () => {
    remove("token");
    setUser({} as USER);
    setSidebarVisible(false);
    router.push("/Authentication/login");
  };

  // const googleSignout = async () => {
  //   await signOut();
  //   remove("token");
  //   setUser({} as USER);
  //   setSidebarVisible(false);
  //   router.push('/Authentication/login');
  // }

  return (
    <>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.cardBackground },
        ]}
      >
        <View style={styles.dateTimeContainer}>
          <Text style={[styles.timeText, { color: theme.colors.text }]}>
            {currentTime}
          </Text>
          <Text style={[styles.dateText, { color: theme.colors.text }]}>
            {currentDate}
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push("Components/Home/Home")}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 20,
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            Schem-G
          </Text>
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          <TouchableOpacity
            onPress={() => router.push("Components/Notification/Notification")}
            style={styles.iconButton}
          >
            <Ionicons
              name="notifications"
              size={26}
              color={theme.colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setSidebarVisible(true)}
          >
            <Ionicons name="menu" size={26} color={theme.colors.text} />
          </TouchableOpacity>

        </View>
      </View>

      <Modal
        visible={sidebarVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSidebarVisible(false)}
      >
        <View style={styles.sidebarContainer}>
          <View
            style={[
              styles.sidebarContent,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSidebarVisible(false)}
            >
              <Ionicons name="close" size={28} color={theme.colors.text} />
            </TouchableOpacity>

            <Image
              source={
                user?.imageData
                  ? { uri: imageUri }
                  : require("../../assets/profile_picture.webp")
              }
              style={[
                styles.profilePicture,
                { borderColor: theme.colors.text },
              ]}
            />

            <View style={styles.sidebarDateTime}>
              <Text style={[styles.sidebarTime, { color: theme.colors.text }]}>
                {currentTime}
              </Text>
              <Text style={[styles.sidebarDate, { color: theme.colors.text }]}>
                {currentDate}
              </Text>
            </View>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: theme.dark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "#aaa",
                },
              ]}
            />

            <TouchableOpacity
              style={[
                styles.sidebarItem,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={toggleTheme}
            >
              <Ionicons name="toggle" size={24} color={theme.colors.text} />
              <Text style={[styles.sidebarText, { color: theme.colors.text }]}>
                {theme.dark == true ? "Light mode" : "Dark mode"}
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: theme.dark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "#aaa",
                },
              ]}
            />

            <TouchableOpacity
              style={[
                styles.sidebarItem,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => {
                router.push("Components/Profile/Profile");
                setSidebarVisible(false);
              }}
            >
              <Ionicons name="person" size={24} color={theme.colors.text} />
              <Text style={[styles.sidebarText, { color: theme.colors.text }]}>
                Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sidebarItem,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => {
                router.push("Components/Tools/Tools");
                setSidebarVisible(false);
              }}
            >
              <Ionicons
                name="square-sharp"
                size={24}
                color={theme.colors.text}
              />
              <Text style={[styles.sidebarText, { color: theme.colors.text }]}>
                Components
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sidebarItem,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => {
                router.push("Components/Setting/Setting");
                setSidebarVisible(false);
              }}
            >
              <Ionicons name="settings" size={24} color={theme.colors.text} />
              <Text style={[styles.sidebarText, { color: theme.colors.text }]}>
                Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.sidebarItem,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => {
                router.push("Components/Manual/Manual");
                setSidebarVisible(false);
              }}
            >
              <Ionicons name="book" size={24} color={theme.colors.text} />
              <Text style={[styles.sidebarText, { color: theme.colors.text }]}>
                Manual
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: theme.dark
                    ? "rgba(255, 255, 255, 0.2)"
                    : "#aaa",
                },
              ]}
            />
            <Text style={[styles.versionText, { color: theme.colors.text }]}>
              GreenTech App Version 10.2.1
            </Text>

            <TouchableOpacity
              style={[
                styles.logoutButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={handleLogout}
            >
              <Text style={[styles.logoutText, { color: theme.colors.text }]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#01694D",
    height: 90,
    paddingHorizontal: 20,
    paddingTop: 40,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  dateTimeContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  timeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.8,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
  sidebarContainer: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width : "-30%",
  },
  sidebarContent: {
    width: "70%",
    padding: 25,
    elevation: 10,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
  },
  sidebarDateTime: {
    alignItems: "center",
    marginBottom: 15,
  },
  sidebarTime: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sidebarDate: {
    fontSize: 14,
    opacity: 0.8,
  },
  closeButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "white",
    alignSelf: "center",
    marginVertical: 10,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  sidebarText: {
    fontSize: 18,
    color: "white",
    marginLeft: 15,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 15,
  },
  versionText: {
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    paddingTop: 20,
    fontSize: 14,
  },
  logoutText: {
    fontSize: 24,
    padding: 4,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  logoutButton: {
    marginTop: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 10,
  },
});

export default Header;
