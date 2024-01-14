import axios from "axios";
import moment from "moment";
import {useEffect, useState} from "react";

const useFetchRemainingTimes = () => {
    const [remainingTimeLunch, setRemainingTimeLunch] = useState("00:00:00");
    const [remainingTimeDinner, setRemainingTimeDinner] = useState("00:00:00");
    const [remainingTimeLunchColor, setRemainingTimeLunchColor] = useState("rgb(10,152,0)");
    const [remainingTimeDinnerColor, setRemainingTimeDinnerColor] = useState("rgb(245,33,33)");

    const getUTCDateTime = async () => {
        try {
            const response = await axios.get('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/getUtcTime');
            if (response.status === 200) {
                return response.data?.data;
            }
        } catch (error) {
            console.error("Error fetching UTC time:", error);
            return null;
        }
    }

    useEffect(() => {
        let intervalId;

        const fetchRemainingTimes = async () => {
            const response = await getUTCDateTime();
            if (!response) {
                setRemainingTimeLunch("Error");
                setRemainingTimeDinner("Error");
                return;
            }

            const {utc_time, utc_date} = response;
            const isoDateTime = `${utc_date.trim()}T${utc_time.trim()}`;
            let currentTime = moment.utc(isoDateTime);

            let lunchTimeStart = moment.utc().set({hour: 11, minute: 30, second: 0}); // 4:00 PM IST
            let dinnerTimeStart = moment.utc().set({hour: 5, minute: 30, second: 0}); // 11:00 AM IST

            if (currentTime.isAfter(lunchTimeStart)) {
                lunchTimeStart.add(1, 'days');
            }
            if (currentTime.isAfter(dinnerTimeStart)) {
                dinnerTimeStart.add(1, 'days');
            }

            const updateRemainingTime = () => {
                currentTime = moment.utc();
                let remainingTime;
                let isLunchNext = currentTime.isBefore(lunchTimeStart);

                if (isLunchNext) {
                    remainingTime = lunchTimeStart.diff(currentTime);
                    setRemainingTimeLunchColor("rgb(245,33,33)");
                    setRemainingTimeDinnerColor("rgb(10,152,0)");
                } else {
                    remainingTime = dinnerTimeStart.diff(currentTime);
                    setRemainingTimeLunchColor("rgb(10,152,0)");
                    setRemainingTimeDinnerColor("rgb(245,33,33)");
                }

                let formattedTime = formatTimeDifference(remainingTime);
                setRemainingTimeLunch(formattedTime);
                setRemainingTimeDinner(formattedTime);
            }

            intervalId = setInterval(updateRemainingTime, 1000);
        }

        fetchRemainingTimes().catch((error) => console.error("Error fetching remaining times:", error));

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    const formatTimeDifference = (difference) => {
        if (difference <= 0) {
            return "00:00:00";
        } else {
            const hours = Math.floor(difference / 3600000);
            const minutes = Math.floor((difference % 3600000) / 60000);
            const seconds = Math.floor((difference % 60000) / 1000);
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
    }

    return {remainingTimeLunch, remainingTimeDinner, remainingTimeLunchColor, remainingTimeDinnerColor, getUTCDateTime};
};

export default useFetchRemainingTimes;
