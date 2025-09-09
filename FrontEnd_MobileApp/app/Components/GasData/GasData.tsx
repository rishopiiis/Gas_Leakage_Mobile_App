import React, { useEffect, useState } from "react";
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { themeAuth } from "../../../Contexts/ThemeContext";
import { Axios } from "../../AxiosRequestBuilder";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type GasData = {
  id: number;
  gasType: string;
  ppm: number;
  threshold: number;
  status: string;
  zoneName: string;
  manufacturingMethod?: string;
  healthEffects?: string;
  safetyPrecautions?: string;
};

// Standard threshold values for common hazardous gases (in PPM)
const GAS_THRESHOLDS = {
  LPG: { danger: 1000, critical: 5000 },
  CO: { danger: 35, critical: 200 },
  CO2: { danger: 5000, critical: 40000 },
  CH4: { danger: 10000, critical: 50000 },
  NH3: { danger: 25, critical: 300 },
  H2: { danger: 10000, critical: 40000 },
  H2S: { danger: 10, critical: 100 },
  SO2: { danger: 2, critical: 100 },
  NO2: { danger: 1, critical: 20 },
  Cl2: { danger: 0.5, critical: 10 },
  O2: { low: 195000, high: 235000 },
};

// Consolidated gas information database
const GAS_ADDITIONAL_INFO = {
  LPG: {
    manufacturingMethod:
      "Produced during petroleum refining and natural gas processing",
    healthEffects:
      "Asphyxiation, dizziness, nausea, frostbite (liquid contact)",
    safetyPrecautions:
      "Use in well-ventilated areas, install gas detectors, no ignition sources",
  },
  CO: {
    manufacturingMethod:
      "Produced by incomplete combustion of carbon-containing materials",
    healthEffects: "Headache, dizziness, nausea, unconsciousness, death",
    safetyPrecautions:
      "Proper ventilation, regular maintenance of combustion equipment, CO detectors",
  },
  CO2: {
    manufacturingMethod:
      "Produced by combustion, fermentation, and chemical processes",
    healthEffects:
      "Headache, dizziness, shortness of breath, increased heart rate",
    safetyPrecautions:
      "Adequate ventilation, oxygen monitoring in confined spaces",
  },
  CH4: {
    manufacturingMethod:
      "Extracted from natural gas reserves or produced by anaerobic decay",
    healthEffects: "Asphyxiation in high concentrations, explosive hazard",
    safetyPrecautions: "Ventilation, gas detection, explosion-proof equipment",
  },
  NH3: {
    manufacturingMethod:
      "Manufactured using Haber-Bosch process (N₂ + 3H₂ → 2NH₃)",
    healthEffects: "Burns to skin/eyes, respiratory irritation, lung damage",
    safetyPrecautions:
      "Proper ventilation, personal protective equipment, emergency showers",
  },
  H2: {
    manufacturingMethod:
      "Produced by steam reforming, electrolysis, or chemical processes",
    healthEffects: "Asphyxiation in high concentrations, explosive hazard",
    safetyPrecautions:
      "Explosion-proof equipment, ventilation, hydrogen detectors",
  },
  H2S: {
    manufacturingMethod:
      "Byproduct of petroleum refining, natural gas processing, and microbial decay",
    healthEffects: "Eye irritation, headache, nausea, respiratory paralysis",
    safetyPrecautions:
      "Gas monitoring, respiratory protection, emergency planning",
  },
  SO2: {
    manufacturingMethod:
      "Produced by burning sulfur-containing fuels and industrial processes",
    healthEffects: "Respiratory problems, eye irritation, asthma exacerbation",
    safetyPrecautions:
      "Ventilation, respiratory protection, gas detection systems",
  },
  NO2: {
    manufacturingMethod:
      "Formed during combustion processes at high temperatures",
    healthEffects:
      "Respiratory irritation, lung damage, increased infection susceptibility",
    safetyPrecautions:
      "Ventilation, respiratory protection, regular air monitoring",
  },
  Cl2: {
    manufacturingMethod: "Produced by electrolysis of sodium chloride solution",
    healthEffects:
      "Severe respiratory irritation, lung damage, pulmonary edema",
    safetyPrecautions:
      "Gas detection, respiratory protection, emergency scrubbers",
  },
  O2: {
    manufacturingMethod:
      "Separated from air using cryogenic distillation or pressure swing adsorption",
    healthEffects: "Oxygen toxicity at high concentrations, fire hazard",
    safetyPrecautions:
      "No smoking, control ignition sources, monitor oxygen levels",
  },
};

const GasDataScreen = () => {
  const [gasData, setGasData] = useState<GasData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { theme } = themeAuth();

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchGasData();
      setRefreshing(false);
    }, 1500);
  };

  const fetchGasData = async () => {
    try {
      const response = await Axios.get("/gas/readings");
      // Enhance the data with additional information
      const enhancedData = response.data.map((gas: GasData) => {
        const additionalInfo =
          GAS_ADDITIONAL_INFO[
            gas.gasType as keyof typeof GAS_ADDITIONAL_INFO
          ] || {};

        return {
          ...gas,
          manufacturingMethod:
            additionalInfo.manufacturingMethod ||
            "Unknown manufacturing process",
          healthEffects:
            additionalInfo.healthEffects || "No specific health effects data",
          safetyPrecautions:
            additionalInfo.safetyPrecautions ||
            "Follow general gas safety procedures",
        };
      });
      setGasData(enhancedData);
    } catch (error) {
      console.error("Error fetching gas data:", error);
      Alert.alert(
        "Error",
        "Failed to fetch gas data. Please check your connection."
      );
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const getStatusColor = (gas: GasData) => {
    const thresholds =
      GAS_THRESHOLDS[gas.gasType as keyof typeof GAS_THRESHOLDS];
    if (!thresholds) return "#ffa726";

    if ("critical" in thresholds) {
      if (gas.ppm >= thresholds.critical) return "#b71c1c";
      if (gas.ppm >= thresholds.danger) return "#ff6f00";
    }

    return "#2e7d32";
  };

  const getStatusText = (gas: GasData) => {
    const thresholds =
      GAS_THRESHOLDS[gas.gasType as keyof typeof GAS_THRESHOLDS];
    if (!thresholds) return "Unknown";

    if ("critical" in thresholds) {
      if (gas.ppm >= thresholds.critical) return "CRITICAL";
      if (gas.ppm >= thresholds.danger) return "DANGER";
    }

    return "NORMAL";
  };

  useEffect(() => {
    fetchGasData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={[styles.heading, { color: theme.colors.text }]}>
        🧪 Gas Monitoring System
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        Real-time hazardous gas detection and safety monitoring
      </Text>

      {gasData.map((gas, index) => {
        const statusColor = getStatusColor(gas);
        const statusText = getStatusText(gas);

        return (
          <TouchableOpacity
            key={index}
            onPress={() => toggleExpand(index)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.colors.cardBackground,
                  borderLeftWidth: 5,
                  borderLeftColor: statusColor,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.gasInfo}>
                  <Text style={[styles.gasName, { color: theme.colors.text }]}>
                    {gas.gasType}
                    <Text style={styles.zoneName}> • {gas.zoneName}</Text>
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusColor },
                    ]}
                  >
                    <Text style={styles.statusText}>{statusText}</Text>
                  </View>
                </View>

                <Ionicons
                  name={expandedCard === index ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={theme.colors.text}
                />
              </View>

              <View style={styles.readingsContainer}>
                <View style={styles.reading}>
                  <Text
                    style={[styles.readingLabel, { color: theme.colors.text }]}
                  >
                    Current Level:
                  </Text>
                  <Text style={[styles.readingValue, { color: statusColor }]}>
                    {gas.ppm} ppm
                  </Text>
                </View>

                <View style={styles.reading}>
                  <Text
                    style={[styles.readingLabel, { color: theme.colors.text }]}
                  >
                    Threshold:
                  </Text>
                  <Text
                    style={[styles.readingValue, { color: theme.colors.text }]}
                  >
                    {gas.threshold} ppm
                  </Text>
                </View>
              </View>

              {expandedCard === index && (
                <View style={styles.expandedContent}>
                  <View style={styles.divider} />

                  <View style={styles.infoSection}>
                    <Text
                      style={[
                        styles.sectionTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      ℹ️ Manufacturing Method
                    </Text>
                    <Text
                      style={[styles.infoText, { color: theme.colors.text }]}
                    >
                      {gas.manufacturingMethod}
                    </Text>
                  </View>

                  <View style={styles.infoSection}>
                    <Text
                      style={[
                        styles.sectionTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      ⚕️ Health Effects
                    </Text>
                    <Text
                      style={[styles.infoText, { color: theme.colors.text }]}
                    >
                      {gas.healthEffects}
                    </Text>
                  </View>

                  <View style={styles.infoSection}>
                    <Text
                      style={[
                        styles.sectionTitle,
                        { color: theme.colors.text },
                      ]}
                    >
                      🛡️ Safety Precautions
                    </Text>
                    <Text
                      style={[styles.infoText, { color: theme.colors.text }]}
                    >
                      {gas.safetyPrecautions}
                    </Text>
                  </View>

                  {statusText !== "NORMAL" && (
                    <View
                      style={[
                        styles.alertBanner,
                        { backgroundColor: statusColor },
                      ]}
                    >
                      <Ionicons name="warning" size={20} color="white" />
                      <Text style={styles.alertText}>
                        {statusText} LEVEL DETECTED! Take immediate safety
                        measures.
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Legend Section */}
      <View
        style={[
          styles.legendCard,
          { backgroundColor: theme.colors.cardBackground },
        ]}
      >
        <Text style={[styles.legendTitle, { color: theme.colors.text }]}>
          Status Legend
        </Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#2e7d32" }]} />
          <Text style={[styles.legendText, { color: theme.colors.text }]}>
            Normal: Below danger threshold
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#ff6f00" }]} />
          <Text style={[styles.legendText, { color: theme.colors.text }]}>
            Danger: Above safe limits
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#b71c1c" }]} />
          <Text style={[styles.legendText, { color: theme.colors.text }]}>
            Critical: Immediate action required
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    opacity: 0.8,
  },
  card: {
    width: width * 0.92,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  gasInfo: {
    flex: 1,
  },
  gasName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  zoneName: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: "normal",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  readingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reading: {
    alignItems: "center",
  },
  readingLabel: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 2,
  },
  readingValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expandedContent: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 12,
  },
  infoSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  alertBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  alertText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    flex: 1,
  },
  legendCard: {
    width: width * 0.92,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
  },
});

export default GasDataScreen;
