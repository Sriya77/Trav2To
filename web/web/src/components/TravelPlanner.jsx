import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const destinations = [
  { name: "Paris", code: "PAR" },
  { name: "New York", code: "NYC" },
  { name: "Tokyo", code: "TOK" },
  { name: "London", code: "LDN" }
];

const TravelPlanner = () => {
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState(null);
  const [travelers, setTravelers] = useState("");
  const [itinerary, setItinerary] = useState([]);

  const generateItinerary = () => {
    if (!destination || !date || !travelers) {
      alert("Please fill in all fields!");
      return;
    }

    setItinerary([
      { time: "9:00 AM", activity: `Breakfast in ${destination.name}` },
      { time: "11:00 AM", activity: `Visit the main attraction of ${destination.name}` },
      { time: "2:00 PM", activity: `Lunch at a local restaurant` },
      { time: "4:00 PM", activity: `Explore hidden gems of ${destination.name}` },
      { time: "7:00 PM", activity: `Dinner and nightlife` }
    ]);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Plan Your Trip</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-left font-semibold">Destination</label>
          <Dropdown
            value={destination}
            options={destinations}
            onChange={(e) => setDestination(e.value)}
            optionLabel="name"
            placeholder="Select a destination"
            className="w-full p-2 border rounded-md shadow-sm bg-white"
          />
        </div>
        
        <div>
          <label className="block text-left font-semibold">Date</label>
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            showIcon
            className="w-full p-2 border rounded-md shadow-sm bg-white"
          />
        </div>
        
        <div>
          <label className="block text-left font-semibold">Number of Travelers</label>
          <InputText
            type="number"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            placeholder="Enter number"
            className="w-full p-2 border rounded-md shadow-sm"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <Button
          label="Generate Plan"
          icon="pi pi-check"
          onClick={generateItinerary}
          className="w-full p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
        />
      </div>
      
      {itinerary.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">Your Itinerary</h2>
          {itinerary.map((item, index) => (
            <Card key={index} className="p-4 mb-3 shadow-md rounded-md bg-white">
              <h3 className="text-lg font-semibold text-blue-500">{item.time}</h3>
              <p className="text-gray-700">{item.activity}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelPlanner;