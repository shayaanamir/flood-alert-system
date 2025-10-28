import express from "express";
import cors from "cors";
import floodRoutes from "./routes/floodRoutes.js";
import coordinatesRoutes from "./routes/coordinatesRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import shelterRoutes from "./routes/shelterRoutes.js";
import {MongoClient, ServerApiVersion} from "mongodb";
const app = express();
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Flood route
app.use("/weather-data", floodRoutes);

app.use("/location-conversion", coordinatesRoutes);

app.use("/login-signup", loginRoutes);

app.use("/shelter", shelterRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const uri = "mongodb+srv://floodalert:admin123@floodalert.26hahle.mongodb.net/?appName=FloodAlert";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server    (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);