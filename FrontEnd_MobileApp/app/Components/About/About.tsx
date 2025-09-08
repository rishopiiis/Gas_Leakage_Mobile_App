import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { themeAuth } from '../../../Contexts/ThemeContext';

const AboutScreen = () => {
  const { theme } = themeAuth();
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Image
        source={require("../../../assets/greenHouse.jpg")} // replace with your actual image
        style={styles.image}
      />

      <Text style={[styles.title, { color: theme.colors.text }]}>Schem-G</Text>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        Smart Auto Gas Leakage Detection
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        <u>About the Project</u>
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Our schem-G Gas Safety System is an advanced IoT-based solution
        designed to protect chemical laboratories and industrial facilities from
        the dangers of hazardous gas leaks. This intelligent system continuously
        monitors for leaks of potentially dangerous gases like LPG, ammonia,
        methane, and other toxic or combustible substances commonly found in
        chemical environments.
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        ⚙️ How It Works
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        The system employs a network of smart sensor units (Slave nodes)
        strategically placed throughout the facility, all connected to a central
        monitoring unit (Master node): Slave Nodes: Each ESP32-based sensor unit
        continuously monitors air quality using high-sensitivity gas sensors
        Real-time Detection: Instant identification of gas concentrations
        exceeding safety thresholds Immediate Local Alerts: Visual (OLED
        display) and audible (buzzer) warnings at the detection site Centralized
        Monitoring: All slave units communicate with a master unit via Wi-Fi
        Remote Notifications: Instant SMS alerts to responsible personnel via
        GSM technology Power Resilience: Automatic battery backup activation
        during power outage
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        🎯 Safety Benefits
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Prevents accidents by providing early warning of gas leaks.{"\n"}{" "}
        Reduces health risks associated with toxic gas exposure .{"\n"}.{"\n"}
        Minimizes environmental impact through prompt detection Ensures
        regulatory compliance with safety standards .{"\n"}Protects valuable
        assets and research from potential damage The schem-G Advantage
      </Text>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        📡 Technologies Used
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        • ESP32 Microcontroller{"\n"}• DHT22, Capacitive Moisture Sensor, LDR
        {"\n"}• AWS IoT Core, MQTT Protocol{"\n"}• React Native (Mobile App),
        Spring Boot (Backend){"\n"}• Firebase / AWS DynamoDB (Cloud Storage)
      </Text>

      <Text style={[styles.footer, { color: theme.colors.text }]}>
        {"©2025 schem-G  75th Jubilee Edition.\nAll rights reserved."}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#012A1C',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ddd',
    marginTop: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    color: '#ccc',
  },
});

export default AboutScreen;
