
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const locations = [
  { name: "Paris", code: "PAR" },
  { name: "New York", code: "NYC" },
  { name: "Tokyo", code: "TOK" },
  { name: "London", code: "LDN" },
];

const carTypes = [
  { name: "Economy", code: "ECO" },
  { name: "SUV", code: "SUV" },
  { name: "Luxury", code: "LUX" },
  { name: "Electric", code: "ELE" },
];

const CarBooking = () => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [carType, setCarType] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const handleBooking = () => {
    if (!pickupLocation || !carType || !pickupDate || !dropoffDate) {
      alert("Please fill in all fields!");
      return;
    }
    setConfirmation({
      location: pickupLocation.name,
      car: carType.name,
      pickup: pickupDate.toDateString(),
      dropoff: dropoffDate.toDateString(),
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-4 transition duration-300 hover:shadow-xl">
      <h1 className="text-2xl font-bold text-center text-gray-700">Car Booking</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Pickup Location</label>
          <Dropdown 
            value={pickupLocation} 
            options={locations} 
            onChange={(e) => setPickupLocation(e.value)} 
            optionLabel="name" 
            placeholder="Select a location" 
            className="w-full p-2 border border-gray-300 rounded-lg" 
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Car Type</label>
          <Dropdown 
            value={carType} 
            options={carTypes} 
            onChange={(e) => setCarType(e.value)} 
            optionLabel="name" 
            placeholder="Select car type" 
            className="w-full p-2 border border-gray-300 rounded-lg" 
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Pickup Date</label>
          <Calendar 
            value={pickupDate} 
            onChange={(e) => setPickupDate(e.value)} 
            showIcon 
            className="w-full p-2 border border-gray-300 rounded-lg" 
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Dropoff Date</label>
          <Calendar 
            value={dropoffDate} 
            onChange={(e) => setDropoffDate(e.value)} 
            showIcon 
            className="w-full p-2 border border-gray-300 rounded-lg" 
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <Button 
          label="Book Now" 
          icon="pi pi-check" 
          onClick={handleBooking} 
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300" 
        />
      </div>
      {confirmation && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-blue-600">Booking Confirmation</h2>
          <Card className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md">
            <p><strong>Location:</strong> {confirmation.location}</p>
            <p><strong>Car:</strong> {confirmation.car}</p>
            <p><strong>Pickup Date:</strong> {confirmation.pickup}</p>
            <p><strong>Dropoff Date:</strong> {confirmation.dropoff}</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CarBooking
