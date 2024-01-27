import {useState} from "react";
import axios from "axios";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {useToast} from "../helpers/toast/Toast";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";

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

            const result = await lunchBucketAPI.get("checkmealstatus/Lunch", {
                headers: {
                    'token': token,
                }
            });

            if (result?.data?.data?.state) {
                setDisableLunchCheckbox(false);
            }

        } catch (e) {
            setDisableLunchCheckbox(true);
            console.log(e.message);
        }
    }

    const fetchDisableDinnerCheckbox = async () => {
        try {
            const token = await getDataFromLocalStorage('token')
            if (!token) {
                setDisableLunchCheckbox(true);
                setDisableDinnerCheckbox(true);
                return;
            }

            const result = await lunchBucketAPI.get("checkmealstatus/Dinner", {
                headers: {
                    'token': token,
                }
            });

            if (result?.data?.data?.state) {
                setDisableDinnerCheckbox(false);
            }

        } catch (e) {
            setDisableDinnerCheckbox(true);
            console.log(e.message);
        }
    }

    const checkPacketLimitLunch = async () => {
        try {
            const token = await getDataFromLocalStorage('token');
            if (!token) {
                setLunchPacketLimit(true);
                return;
            }

            const result = await lunchBucketAPI.get("checkpacketlimit/Lunch", {
                headers: {
                    'token': token,
                }
            });

            if (result?.data?.data?.state === false) {
                setLunchPacketLimit(true);
            } else {
                setLunchPacketLimit(false);
            }

        } catch (e) {
            setLunchPacketLimit(false);
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

            const result = await lunchBucketAPI.get("checkpacketlimit/Dinner", {
                headers: {
                    'token': token,
                }
            });

            if (result?.data?.data?.state === false) {
                setDinnerPacketLimit(true);
            } else {
                setDinnerPacketLimit(false);
            }


        } catch (e) {
            setDinnerPacketLimit(false);
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