// backend/controllers/shelterController.js
import Shelter from "../models/Shelter.js";

/**
 * GET /shelter
 * Optional query: ?zone=...&search=...
 */
export const getShelters = async (req, res) => {
  try {
    const { zone, search } = req.query;
    const filter = {};

    if (zone) filter.zone = zone;
    if (search) filter.name = { $regex: search, $options: "i" };

    const shelters = await Shelter.find(filter).lean();
    return res.json({ success: true, count: shelters.length, data: shelters });
  } catch (err) {
    console.error("getShelters error", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /shelter/:id
 * Tries Mongo _id first; if not found and `id` looks like custom id (starts with SH-), tries findOne({ id })
 */
export const getShelterById = async (req, res) => {
  try {
    const param = req.params.id;

    // Try by Mongo _id first
    let shelter = null;
    try {
      shelter = await Shelter.findById(param).lean();
    } catch (err) {
      // ignore cast errors, will try findOne below
    }

    // If not found by _id, try by custom `id` field
    if (!shelter) {
      shelter = await Shelter.findOne({ id: param }).lean();
    }

    if (!shelter) {
      return res.status(404).json({ success: false, message: "Shelter not found" });
    }

    return res.json({ success: true, data: shelter });
  } catch (err) {
    console.error("getShelterById error", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /shelter/nearby?lat=...&lon=...&radius_km=5
 * Debug-friendly: logs incoming query and returns shelters within radius.
 */
export const getNearbyShelters = async (req, res) => {
  try {

    const rawLat = req.query.lat ?? req.query.latitude;
    const rawLon = req.query.lon ?? req.query.longitude;
    const radiusKm = Number(req.query.radius_km ?? req.query.radius ?? 5);

    const lat = rawLat === undefined ? NaN : Number(rawLat);
    const lon = rawLon === undefined ? NaN : Number(rawLon);

    if (!isFinite(lat) || !isFinite(lon)) {
      console.warn("getNearbyShelters: invalid lat/lon. Received:", { rawLat, rawLon, parsedLat: lat, parsedLon: lon });
      return res.status(400).json({
        success: false,
        message: "Invalid lat/lon",
        received: { rawLat, rawLon, parsedLat: lat, parsedLon: lon, originalQuery: req.query }
      });
    }

    // Bounding box to limit DB scanning
    const latDelta = radiusKm / 111.32;
    const lonDelta = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180) || 1);

    const minLat = lat - latDelta;
    const maxLat = lat + latDelta;
    const minLon = lon - lonDelta;
    const maxLon = lon + lonDelta;

    const candidates = await Shelter.find({
      latitude: { $gte: minLat, $lte: maxLat },
      longitude: { $gte: minLon, $lte: maxLon }
    }).lean();

    // Haversine
    const haversineKm = (lat1, lon1, lat2, lon2) => {
      const toRad = (d) => (d * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    const within = candidates
      .map((s) => {
        const sLat = Number(s.latitude);
        const sLon = Number(s.longitude);
        if (!isFinite(sLat) || !isFinite(sLon)) return null;
        const distance_km = Number(haversineKm(lat, lon, sLat, sLon).toFixed(3));
        return { ...s, distance_km };
      })
      .filter(Boolean)
      .filter(s => s.distance_km <= radiusKm)
      .sort((a,b) => a.distance_km - b.distance_km);

    return res.json({ success: true, count: within.length, data: within });
  } catch (err) {
    console.error("getNearbyShelters error", err);
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
