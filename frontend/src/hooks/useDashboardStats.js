// hooks/useDashboardStats.js
import { useState, useEffect } from 'react';

export const useDashboardStats = () => {
  const [stats, setStats] = useState({
    reports: {
      total: 0,
      critical: 0,
    },
    shelters: {
      totalPeople: 0,
      totalCapacity: 0,
      capacityPercentage: 0,
      fullShelters: 0,
      availableShelters: 0,
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('http://localhost:5000/stats/dashboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard statistics');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setStats(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch statistics');
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchStats, 300000);
    
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error };
};