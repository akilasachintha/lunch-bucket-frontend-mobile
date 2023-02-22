import Swiper from 'react-native-swiper';
import {StyleSheet} from 'react-native';
import STRINGS from "../common/strings/strings";
import PATHS from "../common/paths/paths";
import WelcomeSlide from "../components/welcomeSlide/WelcomeSlide";

const WelcomeScreen = ({navigation}) => {
    return (
        <Swiper
            loop={false}
            showsPagination={true}
            index={1}
            dotStyle={{
                backgroundColor: '#630A10',
                width: 8,
                height: 8,
                borderRadius: 8,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
            }
            }
            activeDotStyle={{
                backgroundColor: '#630A10',
                width: 12,
                height: 12,
                borderRadius: 12,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
            }
            }
        >
            <WelcomeSlide
                imagePath={PATHS.welcome1}
                headerText={STRINGS.welcome1}
                contentText={STRINGS.welcome1content}
            />

            <WelcomeSlide
                imagePath={PATHS.welcome2}
                headerText={STRINGS.welcome2}
                contentText={STRINGS.welcome2Content}
            />

            <WelcomeSlide
                imagePath={PATHS.welcome3}
                headerText={STRINGS.welcome3}
                contentText={STRINGS.welcome3Content}
                buttonText="Get Started"
                onPress={() => navigation.navigate('Login')}
            />
        </Swiper>
    );
};

export default WelcomeScreen;
StyleSheet.create({});
