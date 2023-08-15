import axios from "axios";
import {log} from "../helpers/logs/log";
import moment from "moment";

const getUTCDateTime = async () => {
    try {
        const response = await axios.get('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/getUtcTime');
        if (response.status === 200) {
            return response.data?.data;
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
        const response = await getUTCDateTime();
        const {utc_time, utc_date} = response;

        const trimmedUtcDate = utc_date.trim();
        const currentTime = moment.utc(`${trimmedUtcDate} ${utc_time}`);

        const timeLimitDateLunch = moment.utc(currentTime);
        const timeLimitDateDinner = moment.utc(currentTime);

        const currentUTCHours = currentTime.hours();
        const currentUTCMinutes = currentTime.minutes();

        if (
            (currentUTCHours > 4 || (currentUTCHours === 4 && currentUTCMinutes >= 30)) &&
            (currentUTCHours < 10 || (currentUTCHours === 10 && currentUTCMinutes < 30))
        ) {
            timeLimitDateLunch.set({hours: 10, minutes: 30, seconds: 0});
            timeLimitDateDinner.set({hours: 10, minutes: 30, seconds: 0});

            setRemainingTimeLunchColor("rgba(238, 41, 41, 0.5)");
            setRemainingTimeDinnerColor("rgb(173,253,167)");
        } else if (
            (currentUTCHours >= 10 || (currentUTCHours < 24)) ||
            (currentUTCHours === 0 && currentUTCMinutes < 30)
        ) {
            timeLimitDateLunch.add(1, "days").set({hours: 4, minutes: 30, seconds: 0});
            timeLimitDateDinner.add(1, "days").set({hours: 4, minutes: 30, seconds: 0});

            setRemainingTimeLunchColor("rgb(173,253,167)");
            setRemainingTimeDinnerColor("rgba(238, 41, 41, 0.5)");
        } else if (
            (currentUTCHours >= 0 && currentUTCMinutes >= 0) &&
            (currentUTCHours < 4 || (currentUTCHours === 4 && currentUTCMinutes < 30))
        ) {
            timeLimitDateLunch.set({hours: 4, minutes: 30, seconds: 0});
            timeLimitDateDinner.set({hours: 4, minutes: 30, seconds: 0});

            setRemainingTimeLunchColor("rgb(173,253,167)");
            setRemainingTimeDinnerColor("rgba(238, 41, 41, 0.5)");
        }

        setInterval(() => {
            const updatedCurrentTime = moment.utc();
            const lunchTimeDifference = timeLimitDateLunch.diff(updatedCurrentTime);
            const dinnerTimeDifference = timeLimitDateDinner.diff(updatedCurrentTime);

            if (lunchTimeDifference <= 0) {
                setRemainingTimeLunch("00:00:00");
            } else {
                const lunchTotalSeconds = Math.floor(lunchTimeDifference / 1000); // Convert to seconds
                const lunchHours = Math.floor(lunchTotalSeconds / 3600); // Calculate hours
                const remainingSecondsAfterHours = lunchTotalSeconds % 3600; // Calculate remaining seconds after hours
                const lunchMinutes = Math.floor(remainingSecondsAfterHours / 60); // Calculate minutes
                const lunchSeconds = remainingSecondsAfterHours % 60; // Calculate remaining seconds

                setRemainingTimeLunch(
                    `${lunchHours.toString().padStart(2, "0")}:${lunchMinutes.toString().padStart(2, "0")}:${lunchSeconds.toString().padStart(2, "0")}`
                );
            }

            if (dinnerTimeDifference <= 0) {
                setRemainingTimeDinner("00:00:00");
            } else {
                const dinnerTotalSeconds = Math.floor(dinnerTimeDifference / 1000); // Convert to seconds
                const dinnerHours = Math.floor(dinnerTotalSeconds / 3600); // Calculate hours
                const remainingSecondsAfterDinnerHours = dinnerTotalSeconds % 3600; // Calculate remaining seconds after hours
                const dinnerMinutes = Math.floor(remainingSecondsAfterDinnerHours / 60); // Calculate minutes
                const dinnerSeconds = remainingSecondsAfterDinnerHours % 60; // Calculate remaining seconds

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