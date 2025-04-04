import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

const mockHospitals = [
  { name: "City Hospital", location: "Paris", contact: "123-456-7890" },
  { name: "MediCare Clinic", location: "Mumbai", contact: "987-654-3210" },
  { name: "GreenLife Hospital", location: "New York", contact: "456-789-0123" },
];

const MedicalAssistance = () => {
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const toast = useRef(null);

  const handleSearchHospitals = () => {
    if (!location) {
      toast.current.show({ severity: "warn", summary: "Enter Location", detail: "Please enter a location to search." });
      return;
    }
    setHospitals(mockHospitals.filter(hospital => hospital.location.toLowerCase().includes(location.toLowerCase())));
    toast.current.show({ severity: "success", summary: "Search Complete", detail: "Hospitals found!" });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">Medical Assistance</h1>
      <Toast ref={toast} />

      <div className="mb-4">
        <label className="block mb-2 font-medium">Enter Your Location</label>
        <InputText 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="E.g., Paris, Mumbai" 
          className="w-full p-2 border rounded-lg" 
        />
      </div>

      <div className="text-center mb-4">
        <Button 
          label="Find Hospitals" 
          icon="pi pi-search" 
          className="p-button-danger w-full py-2" 
          onClick={handleSearchHospitals} 
        />
      </div>

      <h2 className="text-lg font-bold mb-3">Nearby Hospitals</h2>
      {hospitals.length > 0 ? (
        hospitals.map((hospital, index) => (
          <Card key={index} className="mb-4 p-4 shadow-lg bg-white rounded-lg">
            <h3 className="text-xl font-semibold">{hospital.name}</h3>
            <p><strong>Location:</strong> {hospital.location}</p>
            <p><strong>Contact:</strong> {hospital.contact}</p>
            <Button 
              label="Call Now" 
              icon="pi pi-phone" 
              className="p-button-success w-full mt-2 py-2" 
              onClick={() => window.location.href = `tel:${hospital.contact}`} 
            />
          </Card>
        ))
      ) : (
        <p className="text-gray-600">No hospitals found. Try another search.</p>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">Emergency Contacts</h2>
        <div className="grid gap-3">
          <Button label="🚑 Ambulance - 102" className="p-button-help w-full py-2" onClick={() => window.location.href = "tel:102"} />
          <Button label="🔥 Fire - 101" className="p-button-danger w-full py-2" onClick={() => window.location.href = "tel:101"} />
          <Button label="🚔 Police - 100" className="p-button-primary w-full py-2" onClick={() => window.location.href = "tel:100"} />
        </div>
      </div>
    </div>
  );
};

export default MedicalAssistance;