// import React, { Component } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Linking,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// // Update the import path if ThemeContext is located elsewhere, e.g.:
// import { themeAuth } from "../../Contexts/ThemeContext";
// // Or, if ThemeContext.tsx does not exist, create it as shown below.

// const { width } = Dimensions.get("window");

// interface SafetyItem {
//   id: number;
//   title: string;
//   description: string;
//   icon: string;
//   color: string;
//   emergency?: boolean;
// }

// interface SafetyState {
//   expandedSection: number | null;
// }

// class Safety extends Component<{}, SafetyState> {
//   state: SafetyState = {
//     expandedSection: null,
//   };

//   toggleSection = (id: number) => {
//     this.setState((prevState) => ({
//       expandedSection: prevState.expandedSection === id ? null : id,
//     }));
//   };

//   callEmergency = () => {
//     Alert.alert("Emergency Call", "Do you want to call emergency services?", [
//       { text: "Cancel", style: "cancel" },
//       { text: "Call", onPress: () => Linking.openURL("tel:911") },
//     ]);
//   };

//   render() {
//     const { theme } = themeAuth();
//     const { expandedSection } = this.state;

//     const safetyInstructions: SafetyItem[] = [
//       {
//         id: 1,
//         title: "🚨 Emergency Procedures",
//         description: `• IMMEDIATELY EVACUATE area if gas leak is detected
// • DO NOT operate electrical switches or create sparks
// • ACTIVATE emergency alarm system
// • USE emergency exits only
// • ASSEMBLE at designated safe assembly point
// • DO NOT re-enter until declared safe by authorities
// • REPORT to supervisor after evacuation`,
//         icon: "alert-circle",
//         color: "#ff4444",
//         emergency: true,
//       },
//       {
//         id: 2,
//         title: "🧯 Fire Safety",
//         description: `• KNOW locations of fire extinguishers and emergency exits
// • USE Class ABC fire extinguishers for electrical/chemical fires
// • REMEMBER PASS technique: Pull, Aim, Squeeze, Sweep
// • NEVER use water on electrical or oil fires
// • KEEP fire exits clear at all times
// • PARTICIPATE in regular fire drills
// • REPORT any fire hazards immediately`,
//         icon: "flame",
//         color: "#ff8800",
//       },
//       {
//         id: 3,
//         title: "🧪 Chemical Handling",
//         description: `• ALWAYS wear appropriate PPE (gloves, goggles, lab coat)
// • READ MSDS before handling any chemicals
// • NEVER mix unknown chemicals
// • USE fume hoods for volatile substances
// • PROPERLY label all containers
// • DISPOSE of chemicals according to regulations
// • WASH hands thoroughly after handling chemicals`,
//         icon: "flask",
//         color: "#009688",
//       },
//       {
//         id: 4,
//         title: "🛡️ Personal Protective Equipment",
//         description: `• ALWAYS wear required PPE in designated areas
// • INSPECT equipment before use
// • KNOW proper donning and doffing procedures
// • USE respiratory protection when required
// • MAINTAIN and clean PPE regularly
// • REPORT damaged or expired equipment
// • STORE PPE in clean, designated areas`,
//         icon: "shield-checkmark",
//         color: "#33b5e5",
//       },
//       {
//         id: 5,
//         title: "⚠️ Gas Leak Response",
//         description: `• IMMEDIATELY report any gas smell or detector alarm
// • EVACUATE upwind from the leak source
// • DO NOT use phones or electronic devices in leak area
// • SHUT OFF gas supply if safe to do so
// • VENTILATE area by opening windows if possible
// • WAIT for trained personnel to handle the situation
// • DO NOT attempt repairs unless qualified`,
//         icon: "warning",
//         color: "#ffbb33",
//       },
//       {
//         id: 6,
//         title: "🚪 Evacuation Routes",
//         description: `• FAMILIARIZE yourself with all exit routes
// • KNOW locations of emergency assembly points
// • USE nearest safe exit during emergency
// • ALTERNATE routes should be known in case primary is blocked
// • NEVER use elevators during fire or gas emergency
// • HELP visitors and unfamiliar personnel evacuate
// • ACCOUNT for all personnel at assembly point`,
//         icon: "exit",
//         color: "#aa66cc",
//       },
//       {
//         id: 7,
//         title: "📋 Emergency Contacts",
//         description: `• SECURITY: Ext. 911 or (555) 123-4567
// • FIRE DEPARTMENT: 911
// • MEDICAL EMERGENCY: Ext. 911 or (555) 987-6543
// • FACILITIES MANAGEMENT: Ext. 2222
// • SAFETY OFFICER: Ext. 3333
// • POISON CONTROL: 1-800-222-1222
// • AFTER-HOURS EMERGENCY: (555) 789-0123`,
//         icon: "call",
//         color: "#2e7d32",
//       },
//       {
//         id: 8,
//         title: "⚡ Electrical Safety",
//         description: `• INSPECT cords and equipment before use
// • NEVER overload electrical circuits
// • USE GFCI outlets in wet locations
// • KEEP electrical equipment away from water
// • REPORT damaged electrical equipment immediately
// • LOCKOUT/TAGOUT equipment before maintenance
// • QUALIFIED personnel only for electrical repairs`,
//         icon: "flash",
//         color: "#ff6d00",
//       },
//     ];

//     return (
//       <ScrollView
//         style={[styles.container, { backgroundColor: theme.colors.background }]}
//         contentContainerStyle={styles.contentContainer}
//       >
//         <Text style={[styles.header, { color: theme.colors.text }]}>
//           🛡️ Safety Protocols & Emergency Procedures
//         </Text>

//         <Text style={[styles.subheader, { color: theme.colors.text }]}>
//           Every user MUST follow these safety instructions
//         </Text>

//         {/* Emergency Quick Action Button */}
//         <TouchableOpacity
//           style={styles.emergencyButton}
//           onPress={this.callEmergency}
//         >
//           <Ionicons name="alert-circle" size={24} color="white" />
//           <Text style={styles.emergencyText}>EMERGENCY CALL</Text>
//         </TouchableOpacity>

//         {safetyInstructions.map((item) => (
//           <View
//             key={item.id}
//             style={[
//               styles.card,
//               {
//                 backgroundColor: theme.colors.cardBackground,
//                 borderLeftWidth: 4,
//                 borderLeftColor: item.color,
//               },
//             ]}
//           >
//             <TouchableOpacity
//               style={styles.cardHeader}
//               onPress={() => this.toggleSection(item.id)}
//               activeOpacity={0.7}
//             >
//               <View style={styles.titleContainer}>
//                 <Ionicons
//                   name={item.icon as any}
//                   size={22}
//                   color={item.color}
//                   style={styles.icon}
//                 />
//                 <Text style={[styles.title, { color: theme.colors.text }]}>
//                   {item.title}
//                 </Text>
//               </View>
//               <Ionicons
//                 name={
//                   expandedSection === item.id ? "chevron-up" : "chevron-down"
//                 }
//                 size={22}
//                 color={theme.colors.text}
//               />
//             </TouchableOpacity>

//             {expandedSection === item.id && (
//               <View style={styles.descriptionContainer}>
//                 <Text
//                   style={[styles.description, { color: theme.colors.text }]}
//                 >
//                   {item.description}
//                 </Text>
//                 {item.emergency && (
//                   <View
//                     style={[
//                       styles.emergencyNote,
//                       { backgroundColor: `${item.color}20` },
//                     ]}
//                   >
//                     <Ionicons name="warning" size={16} color={item.color} />
//                     <Text
//                       style={[styles.emergencyNoteText, { color: item.color }]}
//                     >
//                       CRITICAL: Follow these procedures immediately in emergency
//                       situations
//                     </Text>
//                   </View>
//                 )}
//               </View>
//             )}
//           </View>
//         ))}

//         {/* Safety Commitment Pledge */}
//         <View
//           style={[
//             styles.pledgeCard,
//             { backgroundColor: theme.colors.cardBackground },
//           ]}
//         >
//           <Text style={[styles.pledgeTitle, { color: theme.colors.text }]}>
//             📝 Safety Commitment
//           </Text>
//           <Text style={[styles.pledgeText, { color: theme.colors.text }]}>
//             I pledge to:
//             {"\n"}• Follow all safety procedures and protocols
//             {"\n"}• Use proper PPE at all times in designated areas
//             {"\n"}• Report any unsafe conditions or hazards immediately
//             {"\n"}• Participate in safety training and drills
//             {"\n"}• Look out for the safety of my colleagues
//             {"\n"}• Stop any work that appears unsafe
//           </Text>
//         </View>

//         {/* Important Notice */}
//         <View
//           style={[
//             styles.noticeCard,
//             { backgroundColor: "#fff3cd", borderColor: "#ffeaa7" },
//           ]}
//         >
//           <Ionicons name="information-circle" size={24} color="#856404" />
//           <Text style={styles.noticeText}>
//             Regular safety audits are conducted. Violations of safety protocols
//             may result in disciplinary action.
//           </Text>
//         </View>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   contentContainer: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 8,
//     marginTop: 10,
//   },
//   subheader: {
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 20,
//     opacity: 0.8,
//   },
//   emergencyButton: {
//     flexDirection: "row",
//     backgroundColor: "#dc3545",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//     gap: 10,
//   },
//   emergencyText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   card: {
//     borderRadius: 12,
//     marginBottom: 16,
//     padding: 16,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//     flex: 1,
//   },
//   descriptionContainer: {
//     marginTop: 12,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(0,0,0,0.1)",
//   },
//   description: {
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   emergencyNote: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 6,
//     marginTop: 10,
//     gap: 8,
//   },
//   emergencyNoteText: {
//     fontSize: 12,
//     fontWeight: "600",
//     flex: 1,
//   },
//   pledgeCard: {
//     borderRadius: 12,
//     padding: 20,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   pledgeTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   pledgeText: {
//     fontSize: 14,
//     lineHeight: 22,
//   },
//   noticeCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     gap: 10,
//   },
//   noticeText: {
//     color: "#856404",
//     fontSize: 12,
//     flex: 1,
//   },
// });

// export default Safety;
