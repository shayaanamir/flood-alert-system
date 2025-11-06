// hooks/useMultiLocationAlerts.js
import { useState, useEffect } from "react";
import { weatherService } from "../services/weatherService";

// Static array of 7 monitoring locations
const MONITORING_LOCATIONS = [
  // Tier 1 Cities
  { name: "Mumbai", lat: "19.0760", lon: "72.8777" },
  { name: "Delhi", lat: "28.6139", lon: "77.2090" },
  { name: "Bengaluru", lat: "12.9716", lon: "77.5946" },
  { name: "Chennai", lat: "13.0827", lon: "80.2707" },
  { name: "Kolkata", lat: "22.5726", lon: "88.3639" },
  { name: "Hyderabad", lat: "17.3850", lon: "78.4867" },
  { name: "Pune", lat: "18.5204", lon: "73.8567" },
  { name: "Ahmedabad", lat: "23.0225", lon: "72.5714" },
  { name: "Jaipur", lat: "26.9124", lon: "75.7873" },
  { name: "Lucknow", lat: "26.8467", lon: "80.9462" },

  // // Tier 2 Cities
  // { name: "Surat", lat: "21.1702", lon: "72.8311" },
  // { name: "Indore", lat: "22.7196", lon: "75.8577" },
  // { name: "Bhopal", lat: "23.2599", lon: "77.4126" },
  // { name: "Nagpur", lat: "21.1458", lon: "79.0882" },
  // { name: "Patna", lat: "25.5941", lon: "85.1376" },
  // { name: "Vadodara", lat: "22.3072", lon: "73.1812" },
  // { name: "Ludhiana", lat: "30.9010", lon: "75.8573" },
  // { name: "Agra", lat: "27.1767", lon: "78.0081" },
  // { name: "Varanasi", lat: "25.3176", lon: "82.9739" },
  // { name: "Coimbatore", lat: "11.0168", lon: "76.9558" },
  // { name: "Kochi", lat: "9.9312", lon: "76.2673" },
  // { name: "Visakhapatnam", lat: "17.6868", lon: "83.2185" },
  // { name: "Kanpur", lat: "26.4499", lon: "80.3319" },
  // { name: "Thiruvananthapuram", lat: "8.5241", lon: "76.9366" },
  // { name: "Chandigarh", lat: "30.7333", lon: "76.7794" },
  // { name: "Guwahati", lat: "26.1445", lon: "91.7362" },
  // { name: "Ranchi", lat: "23.3441", lon: "85.3096" },
  // { name: "Mysuru", lat: "12.2958", lon: "76.6394" },
  // { name: "Madurai", lat: "9.9252", lon: "78.1198" },
  // { name: "Nashik", lat: "19.9975", lon: "73.7898" },
  // { name: "Raipur", lat: "21.2514", lon: "81.6296" },
  // { name: "Dehradun", lat: "30.3165", lon: "78.0322" },
  // { name: "Amritsar", lat: "31.6340", lon: "74.8723" },
  // { name: "Aurangabad", lat: "19.8762", lon: "75.3433" },
  // { name: "Jodhpur", lat: "26.2389", lon: "73.0243" },

  // // Tier 3 & Emerging Cities
  // { name: "Udaipur", lat: "24.5854", lon: "73.7125" },
  // { name: "Gwalior", lat: "26.2183", lon: "78.1828" },
  // { name: "Jammu", lat: "32.7266", lon: "74.8570" },
  // { name: "Mangalore", lat: "12.9141", lon: "74.8560" },
  // { name: "Tiruchirappalli", lat: "10.7905", lon: "78.7047" },
  // { name: "Salem", lat: "11.6643", lon: "78.1460" },
  // { name: "Warangal", lat: "17.9784", lon: "79.5941" },
  // { name: "Rajkot", lat: "22.3039", lon: "70.8022" },
  // { name: "Bhavnagar", lat: "21.7645", lon: "72.1519" },
  // { name: "Jalandhar", lat: "31.3260", lon: "75.5762" },
  // { name: "Bareilly", lat: "28.3670", lon: "79.4304" },
  // { name: "Aligarh", lat: "27.8974", lon: "78.0880" },
  // { name: "Tirupati", lat: "13.6288", lon: "79.4192" },
  // { name: "Hubballi", lat: "15.3647", lon: "75.1240" },
  // { name: "Belagavi", lat: "15.8497", lon: "74.4977" },
  // { name: "Cuttack", lat: "20.4625", lon: "85.8828" },
  // { name: "Bhubaneswar", lat: "20.2961", lon: "85.8245" },
  // { name: "Srinagar", lat: "34.0837", lon: "74.7973" },
  // { name: "Dharamshala", lat: "32.2190", lon: "76.3234" },
  // { name: "Shillong", lat: "25.5788", lon: "91.8933" },
  // { name: "Aizawl", lat: "23.7271", lon: "92.7176" },
  // { name: "Gangtok", lat: "27.3314", lon: "88.6138" },
  // { name: "Imphal", lat: "24.8170", lon: "93.9368" },
  // { name: "Port Blair", lat: "11.6234", lon: "92.7265" },
  // { name: "Puducherry", lat: "11.9139", lon: "79.8145" },
  // { name: "Silchar", lat: "24.8333", lon: "92.7789" },
  // { name: "Dibrugarh", lat: "27.4728", lon: "94.9119" },
  // { name: "Jamshedpur", lat: "22.8046", lon: "86.2029" },
  // { name: "Rourkela", lat: "22.2604", lon: "84.8536" },
  // { name: "Kolhapur", lat: "16.7049", lon: "74.2433" },
  // { name: "Solapur", lat: "17.6599", lon: "75.9064" },
  // { name: "Guntur", lat: "16.3067", lon: "80.4365" },
  // { name: "Nellore", lat: "14.4426", lon: "79.9865" },
  // { name: "Erode", lat: "11.3410", lon: "77.7172" },
  // { name: "Karur", lat: "10.9601", lon: "78.0766" },
  // { name: "Thanjavur", lat: "10.7870", lon: "79.1378" },
  // { name: "Vellore", lat: "12.9165", lon: "79.1325" },
  // { name: "Kollam", lat: "8.8932", lon: "76.6141" },
  // { name: "Alappuzha", lat: "9.4981", lon: "76.3388" },
  // { name: "Palakkad", lat: "10.7867", lon: "76.6548" },
  // { name: "Thrissur", lat: "10.5276", lon: "76.2144" },
  // { name: "Noida", lat: "28.5355", lon: "77.3910" },
  // { name: "Ghaziabad", lat: "28.6692", lon: "77.4538" },
  // { name: "Faridabad", lat: "28.4089", lon: "77.3178" },
  // { name: "Meerut", lat: "28.9845", lon: "77.7064" },
  // { name: "Gurugram", lat: "28.4595", lon: "77.0266" },
];

export const useMultiLocationAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAllLocations = async () => {
    setLoading(true);
    setError(null);
    const newAlerts = [];

    try {
      // Fetch weather data for all locations in parallel
      const weatherPromises = MONITORING_LOCATIONS.map(async (location) => {
        try {
          const dailyData = await weatherService.getDaily(
            location.lat,
            location.lon
          );

          // Filter days with precipitation >= 10mm
          const alertDays = dailyData.filter(
            (day) => day.precipitationSum >= 1
          );

          if (alertDays.length > 0) {
            return {
              location: location.name,
              coordinates: { lat: location.lat, lon: location.lon },
              alertDays: alertDays,
              maxPrecipitation: Math.max(
                ...alertDays.map((d) => d.precipitationSum)
              ),
            };
          }
          return null;
        } catch (err) {
          console.error(`Error fetching data for ${location.name}:`, err);
          return null;
        }
      });

      const results = await Promise.all(weatherPromises);

      // Filter out null results and set alerts
      const validAlerts = results.filter((alert) => alert !== null);
      setAlerts(validAlerts);
    } catch (err) {
      setError(err.message);
      console.error("Error checking locations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAllLocations();

    // Refresh alerts every 30 minutes
    const interval = setInterval(checkAllLocations, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    alerts,
    loading,
    error,
    refresh: checkAllLocations,
  };
};
