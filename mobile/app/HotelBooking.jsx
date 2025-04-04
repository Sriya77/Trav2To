import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button as RNButton,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const guestsOptions = [
  { label: "1 Guest", value: 1 },
  { label: "2 Guests", value: 2 },
  { label: "3 Guests", value: 3 },
  { label: "4+ Guests", value: 4 },
];

const mockHotels = [
  { name: "Grand Paris Hotel", location: "Paris", price: "$120/night" },
  { name: "Beachside Resort", location: "Goa", price: "$150/night" },
  { name: "Mountain View Inn", location: "Manali", price: "$100/night" },
];

const HotelBooking = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [guests, setGuests] = useState(null);
  const [hotels, setHotels] = useState([]);

  const handleSearchHotels = () => {
    if (!location || !checkIn || !checkOut || !guests) {
      Alert.alert("Missing Fields", "Please fill all details!");
      return;
    }
    const foundHotels = mockHotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
    setHotels(foundHotels);
    Alert.alert("Search Complete", "Hotels found!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hotel Booking</Text>

      <Text style={styles.label}>Enter Destination</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="E.g., Paris, Goa"
      />

      <Text style={styles.label}>Check-in Date</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowCheckInPicker(true)}
      >
        <Text style={styles.datePickerText}>
          {checkIn ? checkIn.toDateString() : "Select Check-in Date"}
        </Text>
      </TouchableOpacity>
      {showCheckInPicker && (
        <DateTimePicker
          value={checkIn || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowCheckInPicker(false);
            if (selectedDate) setCheckIn(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Check-out Date</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowCheckOutPicker(true)}
      >
        <Text style={styles.datePickerText}>
          {checkOut ? checkOut.toDateString() : "Select Check-out Date"}
        </Text>
      </TouchableOpacity>
      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOut || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowCheckOutPicker(false);
            if (selectedDate) setCheckOut(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Number of Guests</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={guests}
          onValueChange={(itemValue) => setGuests(itemValue)}
        >
          <Picker.Item label="Select guests" value={null} />
          {guestsOptions.map((g) => (
            <Picker.Item key={g.value} label={g.label} value={g.value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearchHotels}>
        <Text style={styles.buttonText}>Search Hotels</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Available Hotels</Text>
      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <Text><Text style={styles.bold}>Location:</Text> {hotel.location}</Text>
            <Text><Text style={styles.bold}>Price:</Text> {hotel.price}</Text>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noHotelsText}>No hotels found. Try another search.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  datePickerButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  datePickerText: {
    color: "#333",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bold: {
    fontWeight: "600",
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: "#f59e0b",
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  noHotelsText: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
  },
});

export default HotelBooking;
