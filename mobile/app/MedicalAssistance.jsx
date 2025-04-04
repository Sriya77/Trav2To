import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Linking, StyleSheet, ScrollView } from 'react-native';

const mockHospitals = [
  { name: "City Hospital", location: "Paris", contact: "123-456-7890" },
  { name: "MediCare Clinic", location: "Mumbai", contact: "987-654-3210" },
  { name: "GreenLife Hospital", location: "New York", contact: "456-789-0123" },
];

const MedicalAssistance = () => {
  const [location, setLocation] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handleSearchHospitals = () => {
    if (!location.trim()) {
      Alert.alert("Enter Location", "Please enter a location to search.");
      return;
    }

    const results = mockHospitals.filter(hospital =>
      hospital.location.toLowerCase().includes(location.toLowerCase())
    );

    setHospitals(results);

    if (results.length > 0) {
      Alert.alert("Search Complete", "Hospitals found!");
    } else {
      Alert.alert("No Results", "No hospitals found for this location.");
    }
  };

  const callNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Medical Assistance</Text>

      <Text style={styles.label}>Enter Your Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="E.g., Paris, Mumbai"
        style={styles.input}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearchHospitals}>
        <Text style={styles.searchButtonText}>Find Hospitals</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
      {hospitals.length > 0 ? (
        hospitals.map((hospital, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.hospitalName}>{hospital.name}</Text>
            <Text><Text style={styles.bold}>Location:</Text> {hospital.location}</Text>
            <Text><Text style={styles.bold}>Contact:</Text> {hospital.contact}</Text>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => callNumber(hospital.contact)}
            >
              <Text style={styles.callButtonText}>Call Now</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noResultText}>No hospitals found. Try another search.</Text>
      )}

      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
      <View style={styles.emergencyButtons}>
        <TouchableOpacity style={styles.emergencyBtn} onPress={() => callNumber('102')}>
          <Text style={styles.emergencyText}>🚑 Ambulance - 102</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.emergencyBtn, { backgroundColor: '#dc2626' }]} onPress={() => callNumber('101')}>
          <Text style={styles.emergencyText}>🔥 Fire - 101</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.emergencyBtn, { backgroundColor: '#3b82f6' }]} onPress={() => callNumber('100')}>
          <Text style={styles.emergencyText}>🚔 Police - 100</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: '600',
  },
  callButton: {
    backgroundColor: '#16a34a',
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  callButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  noResultText: {
    color: '#6b7280',
    marginBottom: 20,
  },
  emergencyButtons: {
    marginTop: 10,
    gap: 10,
  },
  emergencyBtn: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MedicalAssistance;
