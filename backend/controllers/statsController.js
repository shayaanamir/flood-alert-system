// controllers/statsController.js
import Report from "../models/Report.js";
import Shelter from "../models/Shelter.js";

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get total reports count
    const totalReports = await Report.countDocuments();
    
    // Get critical reports count
    const criticalReports = await Report.countDocuments({ 
      severity: 'critical' 
    });
    
    // Get all shelters
    const shelters = await Shelter.find();
    
    // Calculate total people in shelters
    const totalPeopleInShelters = shelters.reduce((sum, shelter) => {
      return sum + (shelter.capacity?.current || 0);
    }, 0);
    
    // Calculate total capacity
    const totalCapacity = shelters.reduce((sum, shelter) => {
      return sum + (shelter.capacity?.max || 0);
    }, 0);
    
    // Calculate capacity percentage
    const capacityPercentage = totalCapacity > 0 
      ? Math.round((totalPeopleInShelters / totalCapacity) * 100)
      : 0;

    // Get shelters status counts
    const fullShelters = shelters.filter(s => s.status === 'Full').length;
    const availableShelters = shelters.filter(s => s.status === 'Available').length;

    res.status(200).json({
      success: true,
      data: {
        reports: {
          total: totalReports,
          critical: criticalReports,
        },
        shelters: {
          totalPeople: totalPeopleInShelters,
          totalCapacity: totalCapacity,
          capacityPercentage: capacityPercentage,
          fullShelters: fullShelters,
          availableShelters: availableShelters,
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

// Get detailed shelter statistics
export const getShelterStats = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    
    const stats = {
      total: shelters.length,
      byStatus: {
        full: shelters.filter(s => s.status === 'Full').length,
        available: shelters.filter(s => s.status === 'Available').length,
        limited: shelters.filter(s => s.status === 'Limited').length,
      },
      capacity: {
        current: shelters.reduce((sum, s) => sum + (s.capacity?.current || 0), 0),
        max: shelters.reduce((sum, s) => sum + (s.capacity?.max || 0), 0),
      },
      demographics: {
        adults: shelters.reduce((sum, s) => sum + (s.demographics?.adults || 0), 0),
        children: shelters.reduce((sum, s) => sum + (s.demographics?.children || 0), 0),
        seniors: shelters.reduce((sum, s) => sum + (s.demographics?.seniors || 0), 0),
      },
      petFriendly: shelters.filter(s => s.pet_friendly).length,
    };
    
    res.status(200).json({ 
      success: true, 
      data: stats 
    });
  } catch (error) {
    console.error('Error fetching shelter stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch shelter statistics',
      error: error.message
    });
  }
};

// Get detailed report statistics
export const getReportStats = async (req, res) => {
  try {
    const reports = await Report.find();
    
    const stats = {
      total: reports.length,
      bySeverity: {
        low: reports.filter(r => r.severity === 'low').length,
        medium: reports.filter(r => r.severity === 'medium').length,
        high: reports.filter(r => r.severity === 'high').length,
        critical: reports.filter(r => r.severity === 'critical').length,
      },
      byStatus: {
        pending: reports.filter(r => r.status === 'pending').length,
        inProgress: reports.filter(r => r.status === 'in-progress').length,
        resolved: reports.filter(r => r.status === 'resolved').length,
      }
    };
    
    res.status(200).json({ 
      success: true, 
      data: stats 
    });
  } catch (error) {
    console.error('Error fetching report stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report statistics',
      error: error.message
    });
  }
};