import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PATHS from "../../helpers/paths/paths";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";

export default function CelebrationScreen() {
    const navigation = useNavigation();
    const handlePressLetsStart = async () => {
        try {
            let loginStatus = await getDataFromLocalStorage('loginStatus');
            if (loginStatus === 'true') {
                navigation.replace('Menu');
            } else {
                navigation.replace('SignUp');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar/>
            <View style={styles.titleContainer}>
                <Image source={PATHS.logo} style={styles.logo}/>
            </View>
            <ImageBackground
                source={PATHS.celebration}
                style={styles.celebrationBackgroundIcons}
                imageStyle={styles.celebrationBackgroundImage}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyles} onPress={handlePressLetsStart}>
                    <Text style={styles.buttonText}>Let’s make history!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#630A10",
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        paddingTop: "20%",
        alignItems: "center",
    },
    logo: {
        width: "100%",
        height: "50%",
    },
    celebrationBackgroundIcons: {
        flex: 2,
        width: "100%",
        height: "80%",
    },
    celebrationBackgroundImage: {
        resizeMode: "contain",
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonStyles: {
        backgroundColor: "#FCF0C8",
        width: "80%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    buttonText: {
        color: "#630A10",
        fontSize: 20,
        fontWeight: "bold",
    }
});
