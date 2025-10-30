import {MongoClient, ServerApiVersion} from "mongodb";

const uri = "mongodb+srv://floodalert:admin123@floodalert.26hahle.mongodb.net/?appName=FloodAlert";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

export default connectDB;