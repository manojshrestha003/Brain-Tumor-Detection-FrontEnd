import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import './App.css';
import PatientDetails from "./components/PatientDetails";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientId, setPatientId] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handlePredict = async () => {
    if (!file) return alert("Please select an image first!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Make sure FastAPI server is running.");
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    if (!result || !file) return alert("No prediction to generate report for!");
    const doc = new jsPDF("p", "mm", "a4");
    const now = new Date();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Brain Tumor Detection Report", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Report generated: ${now.toLocaleString()}`, 105, 28, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Details:", 20, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${patientName || "N/A"}`, 25, 55);
    doc.text(`Age: ${patientAge || "N/A"}`, 25, 63);
    doc.text(`Gender: ${patientGender || "N/A"}`, 25, 71);
    doc.text(`Patient ID: ${patientId || "N/A"}`, 25, 79);

    const imgData = await fileToBase64(file);
    doc.addImage(imgData, "JPEG", 20, 90, 170, 120);

    doc.setFont("helvetica", "bold");
    doc.text("Prediction Details:", 20, 220);
    doc.setFont("helvetica", "normal");
    doc.text(`Prediction: ${result.prediction}`, 25, 230);
    doc.text(`Confidence: ${(result.confidence * 100).toFixed(2)}%`, 25, 238);
    if (result.description) doc.text(`Description: ${result.description}`, 25, 246);
    if (result.recommendation) doc.text(`Recommendation: ${result.recommendation}`, 25, 254);

    doc.save(`brain_tumor_report_${patientName || "unknown"}.pdf`);
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 text-center">
        Brain Tumor Detection
      </h1>


      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 mt-6">
        
      <PatientDetails
        patientName={patientName}
        setPatientName={setPatientName}
        patientAge={patientAge}
        setPatientAge={setPatientAge}
        patientGender={patientGender}
        setPatientGender={setPatientGender}
        patientId={patientId}
        setPatientId={setPatientId}
      />
        {/* Left Column: Upload & Predict */}
        <div className="md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-6 w-full text-gray-700 dark:text-gray-200 file:bg-gradient-to-r file:from-blue-500 file:to-purple-500 file:text-white file:px-4 file:py-2 file:rounded-lg cursor-pointer hover:opacity-90 transition"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mb-6 w-full h-64 object-cover rounded-xl border-2 border-gray-200 shadow-md"
            />
          )}

          <button
            onClick={handlePredict}
            className={`w-full text-white font-semibold py-3 rounded-lg shadow-md transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            }`}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          {result && (
            <button
              onClick={generateReport}
              className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Download Report
            </button>
          )}
        </div>

      </div>
      
  <div className="md:w-full flex mt-5 justify-center">
  {result ? (
    <div className="w-full max-w-lg bg-white/80 dark:bg-gray-100/80 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col gap-4 transition-transform transform ">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-900">
        Prediction: <span className="text-blue-600">{result.prediction}</span>
      </h2>

      <p className="text-gray-600 dark:text-gray-700">
        <span className="font-semibold">Confidence:</span> {(result.confidence * 100).toFixed(2)}%
      </p>

      {result.description && (
        <p className="text-gray-700 dark:text-gray-800">
          <span className="font-semibold">Description:</span> {result.description}
        </p>
      )}

      {result.recommendation && (
        <p className="text-gray-700 dark:text-gray-800">
          <span className="font-semibold">Recommendation:</span> {result.recommendation}
        </p>
      )}
    </div>
  ) : (
    <p className="text-gray-500 dark:text-gray-400 text-center mt-8 md:mt-0">
      Your prediction results will appear here.
    </p>
  )}
</div>


    <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm text-center max-w-md">
        Upload an MRI image and let the AI predict whether a brain tumor is present.
      </p>
     
    </div>

    
  );
}

export default App;
