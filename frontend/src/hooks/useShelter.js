import { useState, useEffect } from "react";
import { getShelterByZone } from "../services/shelterService";

const useShelter = (zone) => {
  const [shelterData, setShelterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getShelterByZone(zone);
        console.log("shelters: ", data);
        setShelterData(data);
      } catch (err) {
        setError("Failed to fetch shelter data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [zone]);
  return { shelterData, loading, error };
};

export default useShelter;
