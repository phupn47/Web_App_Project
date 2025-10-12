import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

// Define Port
const PORT = process.env.PORT;

// API URL
const CONFIG_URL = process.env.CONFIG_URL;
const LOG_URL = process.env.LOG_URL;
const LOG_API_TOKEN = process.env.LOG_API_TOKEN;

// Routes
app.get('/configs/:droneId', async (req, res) => {
    const droneId = req.params.droneId;

    try {
        const response = await fetch(CONFIG_URL);
        const data = await response.json();

        const drone = data.data.find((item) => item.drone_id == droneId);
        if (!drone) {
            return res.status(404).json({ message: "Drone not found" });
        }

        res.json({
            drone_id: drone.drone_id,
            drone_name: drone.drone_name,
            light: drone.light,
            country: drone.country,
            weight: drone.drone_weight,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching status", error: error.message });
    }
});

app.get('/status/:droneId', async (req, res) => {
    const droneId = req.params.droneId;

    try {
        const response = await fetch(CONFIG_URL);
        const data = await response.json();

        const drone = data.data.find((item) => item.drone_id == droneId);
        if (!drone) {
            res.status(404).json({ message: "Drone not found" });
        }

        res.json({
            condition: drone.condition,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching status", error: error.message });
    }
});

app.get('/logs/:droneId', async (req, res) => {
    const droneId = req.params.droneId;

    try {
        const response = await fetch(`${LOG_URL}?filter=(drone_id="${droneId}")`, {
            headers: {
                Authorization: `Bearer ${LOG_API_TOKEN}`
            }
        });

        const data = await response.json();
        const logs = data.items
            .filter((item) => item.drone_id == droneId)
            .sort((a, b) => new Date(b.created) - new Date(a.created))
            .slice(0, 12)
            .map((log) => ({
                drone_id: log.drone_id,
                drone_name: log.drone_name,
                created: log.created,
                country: log.created,
                celsius: log.celsius,
            }));

        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching status", error: error.message });
    }
});

app.post('/logs', async (req, res) => {
    const { drone_id, drone_name, country, celsius } = req.body;

    if (!drone_id || !drone_name || !country || celsius === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const response = await fetch(LOG_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${LOG_API_TOKEN}`
            },
            body: JSON.stringify({
                drone_id,
                drone_name,
                country,
                celsius
            })
        });

        const result = await response.json();
        res.status(201).json({ message: "Log created successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error creating log", error: error.message });
    }
});

app.get("/", (req, res) => {
    res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});