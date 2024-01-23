import {useState} from "react";
import axios from "axios";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {useToast} from "../helpers/toast/Toast";

export default function useMenuHook() {
    const [disableLunchCheckbox, setDisableLunchCheckbox] = useState(false);
    const [disableDinnerCheckbox, setDisableDinnerCheckbox] = useState(false);
    const [lunchPacketLimit, setLunchPacketLimit] = useState(false);
    const [dinnerPacketLimit, setDinnerPacketLimit] = useState(false);

    const {showToast} = useToast();

    const fetchDisableLunchCheckbox = async () => {
        try {
            const token = await getDataFromLocalStorage('token');
            if (!token) {
                setDisableLunchCheckbox(true);
                setDisableDinnerCheckbox(true);
                return;
            }

            const result = await axios.get("https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/checkmealstatus/Lunch", {
                headers: {
                    'token': token,
                }
            });

            if (result?.data?.data?.state) {
                setDisableLunchCheckbox(false);
            }

        } catch (e) {
            setDisableLunchCheckbox(true);
            console.warn(e);
        }
    }

    const fetchDisableDinnerCheckbox = async () => {
        try {
            const token = await getDataFromLocalStorage('token');
            console.log(token);
            if (!token) {
                setDisableLunchCheckbox(true);
                setDisableDinnerCheckbox(true);
                return;
            }

            const result = await axios.get("https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/checkmealstatus/Dinner", {
                headers: {
                    'token': token,
                }
            });

            console.log(result);

            if (result?.data?.data?.state) {
                setDisableDinnerCheckbox(false);
            }

        } catch (e) {
            setDisableDinnerCheckbox(true);
            console.log(e);
        }
    }

    const checkPacketLimitLunch = async () => {
        try {
            const token = await getDataFromLocalStorage('token');
            if (!token) {
                setLunchPacketLimit(true);
                return;
            }

            const result = await axios.get("https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/checkpacketlimit/Lunch", {
                headers: {
                    'token': token,
                }
            });

            if (result?.data?.data?.state) {
                setLunchPacketLimit(false);
            }

        } catch (e) {
            setLunchPacketLimit(true);
            showToast('error', 'Something went wrong!');
            console.warn(e);
        }
    }

    const checkPacketLimitDinner = async () => {
        try {
            const token = await getDataFromLocalStorage('token');
            if (!token) {
                setDinnerPacketLimit(true);
                return;
            }

            const result = await axios.get("https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/checkpacketlimit/Dinner", {
                headers: {
                    'token': token,
                }
            });

            if (result?.data?.data?.state) {
                setDinnerPacketLimit(false);
            }

        } catch (e) {
            setDinnerPacketLimit(true);
            showToast('Something went wrong!', 'error');
            console.warn(e);
        }
    }

    return {
        disableLunchCheckbox,
        disableDinnerCheckbox,
        lunchPacketLimit,
        dinnerPacketLimit,
        fetchDisableLunchCheckbox,
        fetchDisableDinnerCheckbox,
        checkPacketLimitLunch,
        checkPacketLimitDinner,
    };
}