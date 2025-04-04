import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

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
  const [guests, setGuests] = useState(null);
  const [hotels, setHotels] = useState([]);
  const toast = useRef(null);

  const handleSearchHotels = () => {
    if (!location || !checkIn || !checkOut || !guests) {
      toast.current.show({ severity: "warn", summary: "Missing Fields", detail: "Please fill all details!" });
      return;
    }
    setHotels(mockHotels.filter(hotel => hotel.location.toLowerCase().includes(location.toLowerCase())));
    toast.current.show({ severity: "success", summary: "Search Complete", detail: "Hotels found!" });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-5">Hotel Booking</h1>
      <Toast ref={toast} />

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Enter Destination</label>
          <InputText value={location} onChange={(e) => setLocation(e.target.value)} placeholder="E.g., Paris, Goa" className="w-full p-2 border rounded-md" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Check-in Date</label>
          <Calendar value={checkIn} onChange={(e) => setCheckIn(e.value)} showIcon className="w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Check-out Date</label>
          <Calendar value={checkOut} onChange={(e) => setCheckOut(e.value)} showIcon className="w-full" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Number of Guests</label>
          <Dropdown value={guests} options={guestsOptions} onChange={(e) => setGuests(e.value)} placeholder="Select guests" className="w-full" />
        </div>
      </div>

      <Button label="Search Hotels" icon="pi pi-search" className="w-full mt-4 p-button-success" onClick={handleSearchHotels} />

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Available Hotels</h2>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <Card key={index} className="mb-4 p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold">{hotel.name}</h3>
              <p><strong>Location:</strong> {hotel.location}</p>
              <p><strong>Price:</strong> {hotel.price}</p>
              <Button label="Book Now" icon="pi pi-check" className="w-full p-button-warning mt-3" />
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No hotels found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

export default HotelBooking;