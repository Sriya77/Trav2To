import React, { useState, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";

const serviceTypes = [
  { name: "Towing Service", code: "TOW" },
  { name: "Fuel Delivery", code: "FUEL" },
  { name: "Flat Tire Repair", code: "TIRE" },
  { name: "Battery Jumpstart", code: "BATTERY" },
  { name: "Emergency Medical Help", code: "MEDICAL" },
];

const HighwayAssistance = () => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState(null);
  const [contact, setContact] = useState("");
  const toast = useRef(null);

  const handleRequestAssistance = () => {
    if (!location || !service || !contact) {
      toast.current.show({ severity: "warn", summary: "Missing Fields", detail: "Please fill all the details!" });
      return;
    }
    toast.current.show({ severity: "success", summary: "Request Sent", detail: `Help is on the way for ${service.name}!` });
    setLocation("");
    setService(null);
    setContact("");
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 max-w-lg mx-auto text-center transition-all duration-300">
      <h1 className="text-2xl font-bold mb-4">Highway Assistance</h1>
      <Toast ref={toast} />

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Your Current Location</label>
          <InputText
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Select Service</label>
          <Dropdown
            value={service}
            options={serviceTypes}
            onChange={(e) => setService(e.value)}
            optionLabel="name"
            placeholder="Choose a service"
            className="w-full p-2 border-2 border-blue-500 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Your Contact Number</label>
          <InputText
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="mt-4">
        <Button
          label="Request Assistance"
          icon="pi pi-check"
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          onClick={handleRequestAssistance}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Emergency Contacts</h2>
        <Card className="p-4 border rounded-lg shadow-md bg-white">
          <p><strong>Roadside Helpline:</strong> </p>
          <p><strong>Police:</strong> </p>
          <p><strong>Ambulance:</strong> </p>
        </Card>
      </div>
    </div>
  );
};

export default HighwayAssistance;