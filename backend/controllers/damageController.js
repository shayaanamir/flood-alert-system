import Report from "../models/Report.js";

// Create a new damage report
export const createDamageReport = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      lat,
      long,
      severity,
      images,
      reporter_contact,
    } = req.body;

    // Validate required fields
    if (!description || !location || !severity || !reporter_contact) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create new damage report
    const damageReport = new Report({
      title: title || "Flood Damage Report",
      description,
      location,
      lat: lat || 0,
      long: long || 0,
      severity,
      images: images || [],
      reporter_contact,
      status: "pending",
    });

    await damageReport.save();

    res.status(201).json({
      success: true,
      message: "Damage report submitted successfully",
      data: damageReport,
    });
  } catch (error) {
    console.error("Error creating damage report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit damage report",
      error: error.message,
    });
  }
};

// Get all damage reports
export const getAllDamageReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ created_at: -1 });
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    console.error("Error fetching damage reports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch damage reports",
      error: error.message,
    });
  }
};

// Get damage report by ID
export const getDamageReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Damage report not found",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Error fetching damage report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch damage report",
      error: error.message,
    });
  }
};

// Update damage report status
export const updateDamageReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Damage report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error updating damage report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update damage report",
      error: error.message,
    });
  }
};