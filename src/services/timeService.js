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
        const { utc_time, utc_date } = response;

        const trimmedUtcDate = utc_date.trim();
        const currentTime = moment.utc(`${trimmedUtcDate} ${utc_time}`);

        const timeLimitDateLunch = moment.utc(currentTime);
        const timeLimitDateDinner = moment.utc(currentTime);

        let currentUTCHours = currentTime.hours() + 5;
        let currentUTCMinutes = currentTime.minutes() + 30;

        if (currentUTCMinutes >= 60) {
            currentUTCHours += 1;
            currentUTCMinutes -= 60;
        }

        if (currentUTCHours >= 23 || (currentUTCHours === 23 && currentUTCMinutes === 59)) {
            currentUTCHours = 0;
        }

        console.log(currentUTCHours, currentUTCMinutes);

        // 10 AM to 4 PM
        if (
            (currentUTCHours > 11 || (currentUTCHours === 11 && currentUTCMinutes >= 0)) &&
            (currentUTCHours < 17 || (currentUTCHours === 17 && currentUTCMinutes < 0))
        ) {
            console.log("11 AM to 5 PM");
            timeLimitDateLunch.set({hours: 17, minutes: 0, seconds: 0});
            timeLimitDateDinner.set({hours: 17, minutes: 0, seconds: 0});

            setRemainingTimeLunchColor("rgb(245,33,33)");
            setRemainingTimeDinnerColor("rgb(10,152,0)");

            // 4 PM to 12 AM
        } else if (
            (currentUTCHours > 17 || (currentUTCHours === 17 && currentUTCMinutes >= 0)) &&
            (currentUTCHours < 24 || (currentUTCHours === 24 && currentUTCMinutes < 0))
        ) {
            console.log("5 PM to 12 AM");
            timeLimitDateLunch.add(1, "days").set({hours: 11, minutes: 0, seconds: 0});
            timeLimitDateDinner.add(1, "days").set({hours: 11, minutes: 0, seconds: 0});

            setRemainingTimeLunchColor("rgb(10,152,0)");
            setRemainingTimeDinnerColor("rgb(245,33,33)");
        }
        else if ((currentUTCHours > 0 || (currentUTCHours === 0 && currentUTCMinutes >= 0)) &&
            (currentUTCHours < 11 || (currentUTCHours === 11 && currentUTCMinutes < 0))) {
            console.log("12 AM to 11 AM");
            timeLimitDateLunch.add(0, "days").set({hours: 11, minutes: 0, seconds: 0});
            timeLimitDateDinner.add(0, "days").set({hours: 11, minutes: 0, seconds: 0});

            setRemainingTimeLunchColor("rgb(10,152,0)");
            setRemainingTimeDinnerColor("rgb(245,33,33)");
        }

        setInterval(() => {
            let updatedCurrentTime = moment.utc().add(5, 'hours').add(30, 'minutes');
            const lunchTimeDifference = timeLimitDateLunch.diff(updatedCurrentTime);
            const dinnerTimeDifference = timeLimitDateDinner.diff(updatedCurrentTime);

            if (lunchTimeDifference <= 0) {
                setRemainingTimeLunch("00:00:00");
                return;
            } else {
                const lunchTotalSeconds = Math.floor(lunchTimeDifference / 1000);
                const lunchHours = Math.floor(lunchTotalSeconds / 3600);
                const remainingSecondsAfterHours = lunchTotalSeconds % 3600;
                const lunchMinutes = Math.floor(remainingSecondsAfterHours / 60);
                const lunchSeconds = remainingSecondsAfterHours % 60;

                setRemainingTimeLunch(
                    `${lunchHours.toString().padStart(2, "0")}:${lunchMinutes.toString().padStart(2, "0")}:${lunchSeconds.toString().padStart(2, "0")}`
                );
            }

            if (dinnerTimeDifference <= 0) {
                setRemainingTimeDinner("00:00:00");
                return;
            } else {
                const dinnerTotalSeconds = Math.floor(dinnerTimeDifference / 1000);
                const dinnerHours = Math.floor(dinnerTotalSeconds / 3600);
                const remainingSecondsAfterDinnerHours = dinnerTotalSeconds % 3600;
                const dinnerMinutes = Math.floor(remainingSecondsAfterDinnerHours / 60);
                const dinnerSeconds = remainingSecondsAfterDinnerHours % 60;

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

export { getUTCDateTime, fetchRemainingTimes }