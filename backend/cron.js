import axios from 'axios';
import pkg from 'node-cron';
const { schedule } = pkg;

const SERVER_URL = process.env.SERVER_URL || "https://travel-site-ueg1.onrender.com/";

export const startKeepAliveJob = () => {
    return schedule("*/5 * * * *", async () => {
        try {
            const res = await axios.get(SERVER_URL);
            console.log(`Pinged server at ${new Date().toISOString()} - Status: ${res.status}`);
        } catch (error) {
            console.error("Error pinging server:", {
                message: error.message,
                code: error.code,
                url: SERVER_URL,
                time: new Date().toISOString()
            });
        }
    });
};
