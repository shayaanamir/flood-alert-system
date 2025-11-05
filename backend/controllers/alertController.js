import Alert from '../models/Alert.js';

// Get all alerts
export const getAllAlerts = async (req, res) => {
  try {
    const { status, severity, limit } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (severity) {
      query.severity = severity;
    }
    
    const alerts = await Alert.find(query)
      .sort({ timestamp: -1 })
      .limit(limit ? parseInt(limit) : 100);
    
    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching alerts',
      error: error.message
    });
  }
};

// Get recent alerts (for dashboard)
export const getRecentAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ status: { $in: ['Active', 'Pending'] } })
      .sort({ timestamp: -1 })
      .limit(10);
    
    res.status(200).json({
      success: true,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recent alerts',
      error: error.message
    });
  }
};

// Get alert statistics
export const getAlertStats = async (req, res) => {
  try {
    const total = await Alert.countDocuments({ status: 'Active' });
    const critical = await Alert.countDocuments({ 
      status: 'Active', 
      severity: 'Critical' 
    });
    const moderate = await Alert.countDocuments({ 
      status: 'Active', 
      severity: 'Moderate' 
    });
    
    res.status(200).json({
      success: true,
      data: {
        total,
        critical,
        moderate,
        low: total - critical - moderate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching alert statistics',
      error: error.message
    });
  }
};

// Create new alert
export const createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    
    res.status(201).json({
      success: true,
      data: alert
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating alert',
      error: error.message
    });
  }
};

// Update alert
export const updateAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: alert
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating alert',
      error: error.message
    });
  }
};

// Delete alert
export const deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndDelete(req.params.id);
    
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Alert deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting alert',
      error: error.message
    });
  }
};