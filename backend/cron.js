import cron from 'cron'

import https from 'https'
import { url } from 'inspector'

const URL = "https://travel-site-ueg1.onrender.com/"

const job new cron.CronJob('/14 * * * *', function () {
    https.get(URL, (res) => {
        if (res.statusCode === 200) {
            console.log("request sent success");
        } else {
            console.log('request failed', res.statusCode);
        }
    }).on('error', (e) => {
        console.error("Error sending request error: ", e);
    })
})

export default job