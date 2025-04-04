import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const destinations = [
  { name: 'Paris', code: 'PAR' },
  { name: 'New York', code: 'NYC' },
  { name: 'Tokyo', code: 'TOK' },
  { name: 'London', code: 'LDN' }
];

const TravelPlanner = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [travelers, setTravelers] = useState('');
  const [itinerary, setItinerary] = useState([]);

  const generateItinerary = () => {
    if (!destination || !date || !travelers) {
      Alert.alert('Incomplete', 'Please fill in all fields!');
      return;
    }

    const destName = destinations.find((d) => d.code === destination)?.name;

    setItinerary([
      { time: '9:00 AM', activity: `Breakfast in ${destName}` },
      { time: '11:00 AM', activity: `Visit the main attraction of ${destName}` },
      { time: '2:00 PM', activity: 'Lunch at a local restaurant' },
      { time: '4:00 PM', activity: `Explore hidden gems of ${destName}` },
      { time: '7:00 PM', activity: 'Dinner and nightlife' }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Plan Your Trip</Text>

      <Text style={styles.label}>Destination</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={destination}
          onValueChange={(itemValue) => setDestination(itemValue)}
        >
          <Picker.Item label="Select a destination" value="" />
          {destinations.map((d) => (
            <Picker.Item key={d.code} label={d.name} value={d.code} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Number of Travelers</Text>
      <TextInput
        value={travelers}
        onChangeText={setTravelers}
        placeholder="Enter number"
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={generateItinerary}>
        <Text style={styles.buttonText}>Generate Plan</Text>
      </TouchableOpacity>

      {itinerary.length > 0 && (
        <View style={styles.itineraryWrapper}>
          <Text style={styles.subtitle}>Your Itinerary</Text>
          {itinerary.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTime}>{item.time}</Text>
              <Text style={styles.cardText}>{item.activity}</Text>
            </View>
          ))}
        </View>
      )}
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
    marginBottom: 20
  },
  label: {
    fontWeight: '600',
    marginBottom: 6
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: 'white'
  },
  dateButton: {
    backgroundColor: 'white',
    padding: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 16
  },
  dateText: {
    fontSize: 16,
    color: '#374151'
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  itineraryWrapper: {
    marginTop: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2
  },
  cardTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6'
  },
  cardText: {
    color: '#374151'
  }
});

export default TravelPlanner;
