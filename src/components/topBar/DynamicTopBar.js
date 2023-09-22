import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {SelectedTab} from "../../helpers/enums/enums";
import {useDispatch, useSelector} from "react-redux";

const iconsData = [
    {
        name: 'home',
        tabName: SelectedTab.MAIN,
        screenName: 'Menu',
    },
    {
        name: 'clock',
        tabName: SelectedTab.PREVIOUS,
        screenName: 'OrdersList',
    },
    {
        name: 'comment',
        tabName: SelectedTab.CHAT,
        screenName: 'Chat',
    },
    {
        name: 'user',
        tabName: SelectedTab.PROFILE,
        screenName: 'Profile',
    },
];

function TabIcon({name, tabName, screenName, selectedTab, onPress}) {
    const isEditMenu = useSelector(state => state.menu.isEditMenu);
    const dispatch = useDispatch();

    const navigation = useNavigation();

    const color = selectedTab === tabName ? '#FFC42D' : '#7E1F24';

    const handlePress = () => {
        if (tabName === SelectedTab.MAIN) {
            dispatch({type: 'menu/setIsEditMenuFalseReducer'});
        }
        if (screenName) {
            navigation.navigate(screenName);
        }
        onPress && onPress();
    };

    return (
        <TouchableOpacity style={styles.icons} onPress={handlePress}>
            <Icon name={name} size={30} color={color} solid/>
        </TouchableOpacity>
    );
}

export default function DynamicTopBar({selectedTab}) {
    return (
        <View style={styles.topBarContainer}>
            <View style={styles.container}>
                {iconsData.map((iconData, index) => (
                    <TabIcon
                        key={index}
                        name={iconData.name}
                        tabName={iconData.tabName}
                        screenName={iconData.screenName}
                        selectedTab={selectedTab}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBarContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    container: {
        marginTop: 2,
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex: 1,
    },
    icons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
