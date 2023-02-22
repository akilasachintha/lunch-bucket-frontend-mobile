import {StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TopBar(){
    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                <Icon name="clock" size={30} color='#7E1F24'></Icon>
            </View>
            <View style={styles.icons}>
                <Icon name="comment" size={30} color='#7E1F24'></Icon>
            </View>
            <View style={styles.icons}>
                <Icon name="clock-o" size={30} color='#7E1F24'></Icon>
            </View>
            <View style={styles.icons}>
                <Icon name="clock-o" size={30} color='#7E1F24'></Icon>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    icons: {
        flex: 1,
        margin: 2,
        justifyContent:'center',
        alignItems: 'center',
    }
});