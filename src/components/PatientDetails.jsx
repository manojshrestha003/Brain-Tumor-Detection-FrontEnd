import React from "react";
import { FaUser, FaCalendarAlt, FaVenusMars, FaIdBadge } from "react-icons/fa";

const PatientDetails = ({
  patientName,
  setPatientName,
  patientAge,
  setPatientAge,
  patientGender,
  setPatientGender,
  patientId,
  setPatientId,
}) => {
  return (
    <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Patient Information
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-4">
        <FaUser className="text-blue-500 dark:text-blue-400 mb-2 sm:mb-0" />
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-4">
        <FaCalendarAlt className="text-blue-500 dark:text-blue-400 mb-2 sm:mb-0" />
        <input
          type="number"
          placeholder="Patient Age"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-4">
        <FaVenusMars className="text-blue-500 dark:text-blue-400 mb-2 sm:mb-0" />
        <select
          value={patientGender}
          onChange={(e) => setPatientGender(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
        <FaIdBadge className="text-blue-500 dark:text-blue-400 mb-2 sm:mb-0" />
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>
    </div>
  );
};

export default PatientDetails;
