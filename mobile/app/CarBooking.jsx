import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const locations = ["Paris", "New York", "Tokyo", "London"];
const carTypes = ["Economy", "SUV", "Luxury", "Electric"];

const CarBooking = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [carType, setCarType] = useState("");
  const [pickupDate, setPickupDate] = useState(new Date());
  const [dropoffDate, setDropoffDate] = useState(new Date());
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showDropoffPicker, setShowDropoffPicker] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleBooking = () => {
    if (!pickupLocation || !carType || !pickupDate || !dropoffDate) {
      alert("Please fill in all fields!");
      return;
    }

    setConfirmation({
      location: pickupLocation,
      car: carType,
      pickup: pickupDate.toDateString(),
      dropoff: dropoffDate.toDateString(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Car Booking</Text>

      <Text style={styles.label}>Pickup Location</Text>
      <Picker
        selectedValue={pickupLocation}
        onValueChange={(itemValue) => setPickupLocation(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Location" value="" />
        {locations.map((loc) => (
          <Picker.Item label={loc} value={loc} key={loc} />
        ))}
      </Picker>

      <Text style={styles.label}>Car Type</Text>
      <Picker
        selectedValue={carType}
        onValueChange={(itemValue) => setCarType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Car Type" value="" />
        {carTypes.map((type) => (
          <Picker.Item label={type} value={type} key={type} />
        ))}
      </Picker>

      <Text style={styles.label}>Pickup Date</Text>
      <TouchableOpacity onPress={() => setShowPickupPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{pickupDate.toDateString()}</Text>
      </TouchableOpacity>
      {showPickupPicker && (
        <DateTimePicker
          value={pickupDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowPickupPicker(false);
            if (selectedDate) setPickupDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Dropoff Date</Text>
      <TouchableOpacity onPress={() => setShowDropoffPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{dropoffDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDropoffPicker && (
        <DateTimePicker
          value={dropoffDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowDropoffPicker(false);
            if (selectedDate) setDropoffDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>

      {confirmation && (
        <View style={styles.confirmationBox}>
          <Text style={styles.confirmationHeading}>Booking Confirmation</Text>
          <Text>Location: {confirmation.location}</Text>
          <Text>Car: {confirmation.car}</Text>
          <Text>Pickup: {confirmation.pickup}</Text>
          <Text>Dropoff: {confirmation.dropoff}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  dateButton: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginTop: 5,
  },
  dateText: {
    color: "#333",
  },
  bookButton: {
    backgroundColor: "#38b000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmationBox: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
  },
  confirmationHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
});

export default CarBooking;
