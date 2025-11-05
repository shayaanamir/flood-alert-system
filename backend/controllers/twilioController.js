// controllers/alertController.js
import twilio from "twilio";

// Load from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendAlert = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing 'to' or 'message' field",
      });
    }

    const response = await client.messages.create({
      body: message,
      from: twilioNumber,
      to: to,
    });

    res.status(200).json({
      success: true,
      sid: response.sid,
      message: "Alert sent successfully!",
    });
  } catch (error) {
    console.error("Error sending alert:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
