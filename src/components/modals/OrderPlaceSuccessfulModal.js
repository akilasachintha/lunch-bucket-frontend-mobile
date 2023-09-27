import React, {useState} from "react";
import {ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {Formik} from "formik";
import * as Yup from "yup";
import {handleCheckoutTimeService} from "../../services/checkoutService";

export default function OrderPlaceSuccessfulModal({
                                                      isVisible,
                                                      setIsVisible,
                                                      successResult,
                                                      basket,
                                                  }) {
    const navigation = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePress = () => {
        setIsVisible(false);
        navigation.navigate("OrdersList");
    };

    const deliverySchema = Yup.object().shape({
        deliveryTime: Yup.string().required("Please select a delivery time"),
    });

    return (
        <View style={styles.container}>
            <Modal visible={isVisible} transparent>
                <TouchableOpacity
                    style={styles.background}
                    onPress={
                        successResult &&
                        successResult.time_state &&
                        !successResult.time_state.delivery_select_state
                            ? handlePress
                            : () => setIsVisible(true)
                    }
                >
                    <View style={styles.modal}>
                        <Formik
                            initialValues={{deliveryTime: ""}}
                            validationSchema={deliverySchema}
                            onSubmit={async (values) => {
                                try {
                                    setIsSubmitting(true);
                                    await handleCheckoutTimeService({
                                        order_ids:
                                            successResult && successResult.time_state
                                                ? successResult.time_state.order_ids
                                                : [],
                                        delivery_time: values.deliveryTime,
                                    });
                                    handlePress();
                                } catch (error) {
                                    log(
                                        "error",
                                        "OrderPlaceSuccessfulModal",
                                        "onSubmit",
                                        error.message,
                                        "OrderPlaceSuccessfulModal.js"
                                    );
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}
                        >
                            {({values, handleChange, handleSubmit, errors, touched}) => (
                                <>
                                    <View style={styles.modalTopTextContainer}>
                                        <Text style={styles.modalTopText}>Your order was placed successfully</Text>
                                    </View>
                                    <View style={styles.modalIconContainer}>
                                        <AntDesign name="checkcircle" size={50} color="rgba(56, 207, 98, 1)"/>
                                    </View>
                                    <View style={styles.earnedContainer}>
                                        <Text style={styles.earnedText}>
                                            You Earned Points: {successResult && successResult.earned_points}
                                        </Text>
                                        <Text style={styles.earnedText}>
                                            Your Total
                                            Points: {successResult && successResult.balance_points.toFixed(2)}
                                        </Text>
                                        <View style={styles.space}/>
                                        <Text style={styles.earnedText}>
                                            Your Total Payment: Rs.{" "}
                                            {successResult &&
                                                successResult.time_state &&
                                                successResult.time_state.total_payment.toFixed(2)}
                                        </Text>
                                        <Text style={styles.earnedText}>
                                            Your Extra Payment: Rs.{" "}
                                            {successResult &&
                                                successResult.time_state &&
                                                successResult.time_state.extra_payment.toFixed(2)}
                                        </Text>
                                    </View>
                                    {successResult && successResult.time_state && successResult.time_state.delivery_select_state && (
                                        <View>
                                            <Text style={styles.deliveryTimeText}>Select your Delivery time.</Text>
                                            <View style={styles.radioButtonsContainer}>
                                                {basket.venue === "Dinner" ? (
                                                    <View>
                                                        <TouchableOpacity
                                                            style={styles.radioButton}
                                                            onPress={() => handleChange("deliveryTime")("7:00 PM")}
                                                        >
                                                            {values.deliveryTime === "7:00 PM" ? (
                                                                <Radio selected={true}/>
                                                            ) : (
                                                                <Radio selected={false}/>
                                                            )}
                                                            <Text style={styles.radioText}>7:00 PM</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={styles.radioButton}
                                                            onPress={() => handleChange("deliveryTime")("8:00 PM")}
                                                        >
                                                            {values.deliveryTime === "8:00 PM" ? (
                                                                <Radio selected={true}/>
                                                            ) : (
                                                                <Radio selected={false}/>
                                                            )}
                                                            <Text style={styles.radioText}>8:00 PM</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <View>
                                                        <TouchableOpacity
                                                            style={styles.radioButton}
                                                            onPress={() => handleChange("deliveryTime")("11:30 AM")}
                                                        >
                                                            {values.deliveryTime === "11:30 AM" ? (
                                                                <Radio selected={true}/>
                                                            ) : (
                                                                <Radio selected={false}/>
                                                            )}
                                                            <Text style={styles.radioText}>11:30 AM</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={styles.radioButton}
                                                            onPress={() => handleChange("deliveryTime")("12:30 PM")}
                                                        >
                                                            {values.deliveryTime === "12:30 PM" ? (
                                                                <Radio selected={true}/>
                                                            ) : (
                                                                <Radio selected={false}/>
                                                            )}
                                                            <Text style={styles.radioText}>12:30 PM</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </View>
                                            {touched.deliveryTime && errors.deliveryTime ? (
                                                <Text style={styles.errorText}>{errors.deliveryTime}</Text>
                                            ) : null}
                                        </View>
                                    )}
                                    {successResult && successResult.time_state && successResult.time_state.delivery_select_state && (
                                        <View>
                                            {isSubmitting ? (
                                                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                                    <ActivityIndicator size="small" color="#fff"/>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                                    <Text style={styles.submitButtonText}>Done</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    )}
                                </>
                            )}
                        </Formik>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        flex: 1,
        zIndex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: "center",
    },
    modalIconContainer: {
        marginVertical: 10,
    },
    modalTopTextContainer: {
        marginVertical: 10,
    },
    modalTopText: {
        fontSize: 20,
        textAlign: "center",
        color: "rgba(68, 68, 68, 1)",
    },
    deliveryTimeText: {
        fontSize: 16,
    },
    earnedContainer: {
        width: "90%",
        alignItems: "center",
        marginVertical: "4%",
        paddingHorizontal: "5%",
        paddingVertical: "4%",
        backgroundColor: "rgba(68, 68, 68, 0.1)",
        borderRadius: 10,
    },
    earnedText: {
        color: "rgb(134,36,43)",
    },
    radioButtonsContainer: {
        marginTop: 20,
    },
    radioButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    errorText: {
        color: "red",
    },
    submitButton: {
        width: 200,
        alignItems: "center",
        backgroundColor: "rgb(134,36,43)",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: "center",
    },
    submitButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    radioText: {
        fontSize: 16,
    },
    space: {
        height: 10,
    },
});

function Radio({selected}) {
    return (
        <View
            style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "rgb(134,36,43)",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10,
            }}
        >
            {selected && (
                <View
                    style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: "rgb(134,36,43)",
                    }}
                />
            )}
        </View>
    );
}
