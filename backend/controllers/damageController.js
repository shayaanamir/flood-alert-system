// controllers/damageController.js
import Report from "../models/Report.js";

/**
 * Create a new damage report
 */
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

/**
 * Get all damage reports
 * Supports optional query params:
 *  - limit (number)
 *  - sort (asc | desc)  // sorts by created_at
 *  - status (comma separated statuses) -> filters by status
 */
export const getAllDamageReports = async (req, res) => {
  try {
    const { limit, sort, status, page, pageSize } = req.query;
    const q = {};
    if (status) {
      // accept comma separated list
      const list = String(status).split(",").map((s) => s.trim());
      q.status = { $in: list };
    }

    const sortDir = sort === "asc" ? 1 : -1;
    const lim = limit ? Math.max(1, parseInt(limit, 10)) : undefined;

    let query = Report.find(q).sort({ created_at: sortDir });

    if (lim) query = query.limit(lim);

    // optional pagination
    if (page && pageSize) {
      const p = Math.max(1, parseInt(page, 10));
      const ps = Math.max(1, parseInt(pageSize, 10));
      query = query.skip((p - 1) * ps).limit(ps);
    }

    const reports = await query.exec();

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

/**
 * Get damage report by ID
 */
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

/**
 * Update damage report status
 */
export const updateDamageReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "in-progress", "resolved", "verified", "confirmed"].includes(status)) {
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

/**
 * Get recent reports (for dashboard / community feed)
 * Query params:
 *  - limit (default 5)
 *  - status (optional, e.g. verified,confirmed,pending)
 */
export const getRecentReports = async (req, res) => {
  try {
    const { limit = 5, status } = req.query;
    const q = {};
    if (status) {
      const list = String(status).split(",").map((s) => s.trim());
      q.status = { $in: list };
    } else {
      // default: prefer verified/confirmed and pending too — adjust as needed
      q.status = { $in: ["verified", "confirmed", "pending"] };
    }

    const docs = await Report.find(q)
      .sort({ updated_at: -1, created_at: -1 })
      .limit(Math.max(1, parseInt(limit, 10)))
      .lean();

    return res.json({ success: true, count: docs.length, data: docs });
  } catch (err) {
    console.error("getRecentReports error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch reports" });
  }
};
