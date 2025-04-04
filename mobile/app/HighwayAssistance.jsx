import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const serviceTypes = [
  { name: "Towing Service", code: "TOW" },
  { name: "Fuel Delivery", code: "FUEL" },
  { name: "Flat Tire Repair", code: "TIRE" },
  { name: "Battery Jumpstart", code: "BATTERY" },
  { name: "Emergency Medical Help", code: "MEDICAL" },
];

const HighwayAssistance = () => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState();
  const [contact, setContact] = useState("");

  const handleRequestAssistance = () => {
    if (!location || !service || !contact) {
      Alert.alert("Missing Fields", "Please fill all the details!");
      return;
    }

    Alert.alert(
      "Request Sent",
      `Help is on the way for ${service}!`
    );

    setLocation("");
    setService(null);
    setContact("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Highway Assistance</Text>

      <Text style={styles.label}>Your Current Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter your location"
      />

      <Text style={styles.label}>Select Service</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={service}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          <Picker.Item label="Choose a service" value={null} />
          {serviceTypes.map((s) => (
            <Picker.Item key={s.code} label={s.name} value={s.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Your Contact Number</Text>
      <TextInput
        style={styles.input}
        value={contact}
        onChangeText={setContact}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRequestAssistance}
      >
        <Text style={styles.buttonText}>Request Assistance</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.subTitle}>Emergency Contacts</Text>
        <Text style={styles.contact}><Text style={styles.bold}>Roadside Helpline:</Text> 1987</Text>
        <Text style={styles.contact}><Text style={styles.bold}>Police:</Text> 100</Text>
        <Text style={styles.contact}><Text style={styles.bold}>Ambulance:</Text> 102</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f3f4f6",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  contact: {
    fontSize: 16,
    marginVertical: 4,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default HighwayAssistance;
