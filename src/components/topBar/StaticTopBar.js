import {StatusBar, StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from "@react-navigation/native";

export default function StaticTopBar() {
    const navigation = useNavigation();

    return (
        <View style={styles.topBarContainer}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('OrdersList')}>
                    <Icon name="clock" size={30} color='#7E1F24' solid></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Chat')}>
                    <Icon name="comment" size={30} color='#7E1F24' solid></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Menu')}>
                    <Icon name="crown" size={30} color='#FFC42D' solid></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Profile')}>
                    <Icon name="user" size={30} color='#7E1F24' solid></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBarContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
    container: {
        marginTop: 2,
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex: 1,
    },
    icons: {
        flex: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
});