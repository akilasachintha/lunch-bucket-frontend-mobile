import axios from "axios";
import {log} from "../helpers/logs/log";

const getUTCDateTime = async () => {
    try {
        const response = await axios.get('https://worldtimeapi.org/api/timezone/utc');
        log("info", "service", "timeService", "getUTCDateTime", response.data.datetime);
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        log("error", "service", "timeService", "getUTCDateTime", error.message);
        return '';
    }
}

const fetchRemainingTimes = async (
    setRemainingTimeLunch,
    setRemainingTimeDinner,
    setRemainingTimeLunchColor,
    setRemainingTimeDinnerColor
) => {
    try {
        let response = await getUTCDateTime();
        let currentTime = new Date(response.data.datetime);

        const timeLimitDateLunch = new Date(response?.data?.datetime);
        const timeLimitDateDinner = new Date(response?.data?.datetime);

        const currentUTCHours = currentTime.getUTCHours();
        const currentUTCMinutes = currentTime.getUTCMinutes();

        if ((currentUTCHours > 4 || (currentUTCHours === 4 && currentUTCMinutes >= 30)) &&
            (currentUTCHours < 10 || (currentUTCHours === 10 && currentUTCMinutes < 30))
        ) {
            // Current time is between 4:30 AM and 10:30 AM
            timeLimitDateLunch.setUTCHours(10, 30, 0, 0);
            timeLimitDateDinner.setUTCHours(10, 30, 0, 0);

            setRemainingTimeLunchColor("rgba(238, 41, 41, 0.5)");
            setRemainingTimeDinnerColor("rgb(173,253,167)");
        } else if (currentUTCHours > 10 || (currentUTCHours === 10 && currentUTCMinutes >= 30) &&
            (currentUTCHours < 0 || (currentUTCHours === 0 && currentUTCMinutes < 0))
            // Current time is between 10:30 AM and 12:00 AM
        ) {
            // Current time is after 10:30 AM or before 4:30 AM
            timeLimitDateLunch.setDate(currentTime.getDate() + 1);
            timeLimitDateLunch.setUTCHours(4, 30, 0, 0);

            timeLimitDateDinner.setDate(currentTime.getDate() + 1);
            timeLimitDateDinner.setUTCHours(4, 30, 0, 0);

            setRemainingTimeLunchColor("rgb(173,253,167)");
            setRemainingTimeDinnerColor("rgba(238, 41, 41, 0.5)");
        } else if ((currentUTCHours > 0 || (currentUTCHours === 0 && currentUTCMinutes >= 0)) &&
            (currentUTCHours < 4 || (currentUTCHours === 4 && currentUTCMinutes < 30))
        ) {
            // Current time is between 12:00 AM and 4:30 AM
            timeLimitDateLunch.setDate(currentTime.getDate());
            timeLimitDateLunch.setUTCHours(4, 30, 0, 0);

            timeLimitDateDinner.setDate(currentTime.getDate());
            timeLimitDateDinner.setUTCHours(4, 30, 0, 0);

            setRemainingTimeLunchColor("rgb(173,253,167)");
            setRemainingTimeDinnerColor("rgba(238, 41, 41, 0.5)");
        }

        setInterval(async () => {
            const updatedCurrentTime = new Date();
            const lunchTimeDifference = timeLimitDateLunch - updatedCurrentTime;
            const dinnerTimeDifference = timeLimitDateDinner - updatedCurrentTime;

            if (lunchTimeDifference <= 0) {
                setRemainingTimeLunch("00:00:00");
                response = await getUTCDateTime();
                currentTime = new Date(response.data.datetime);

            } else {
                const lunchTotalSeconds = Math.floor(lunchTimeDifference / 1000);
                const lunchHours = Math.floor(lunchTotalSeconds / 3600);
                const lunchMinutes = Math.floor((lunchTotalSeconds % 3600) / 60);
                const lunchSeconds = Math.floor(lunchTotalSeconds % 60);

                setRemainingTimeLunch(
                    `${lunchHours.toString().padStart(2, "0")}:${lunchMinutes.toString().padStart(2, "0")}:${lunchSeconds.toString().padStart(2, "0")}`
                );
            }

            if (dinnerTimeDifference <= 0) {
                setRemainingTimeDinner("00:00:00");
                response = await getUTCDateTime();
                currentTime = new Date(response.data.datetime);

            } else {
                const dinnerTotalSeconds = Math.floor(dinnerTimeDifference / 1000);
                const dinnerHours = Math.floor(dinnerTotalSeconds / 3600);
                const dinnerMinutes = Math.floor((dinnerTotalSeconds % 3600) / 60);
                const dinnerSeconds = Math.floor(dinnerTotalSeconds % 60);

                setRemainingTimeDinner(
                    `${dinnerHours.toString().padStart(2, "0")}:${dinnerMinutes.toString().padStart(2, "0")}:${dinnerSeconds.toString().padStart(2, "0")}`
                );
            }
        }, 1000);
    } catch (error) {
        log("error", "service", "timeService", "fetchRemainingTimes", error.message);
        setRemainingTimeLunch("00:00:00");
        setRemainingTimeDinner("00:00:00");
    }
};


export {getUTCDateTime, fetchRemainingTimes}