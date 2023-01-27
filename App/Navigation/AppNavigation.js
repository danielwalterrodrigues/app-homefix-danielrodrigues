import React from 'react'
import { AsyncStorage } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom, TabView, SwitchNavigator } from 'react-navigation'
import SuccessScreen from '../Containers/SuccessScreen'



import ResponsiveImage from 'react-native-responsive-image';

//screens
import IntroScreen from '../Containers/IntroScreen'
import VisitsScreen from '../Containers/VisitsScreen'
import ChannelsScreen from '../Containers/ChannelsScreen'
import HomeAssistanceScreen from '../Containers/HomeAssistanceScreen'
import DoneStepsScreen from '../Containers/DoneStepsScreen'
import HomeInstallationScreen from '../Containers/HomeInstallationScreen'
import DoneStepsInstallationScreen from '../Containers/DoneStepsInstallationScreen'
import FormScreen from '../Containers/FormScreen'
import LoginScreen from '../Containers/LoginScreen'
import PreVisitsScreen from '../Containers/PreVisitsScreen'
import CalendarScreen from '../Containers/CalendarScreen'
import RescheduleCalendarScreen from '../Containers/RescheduleCalendarScreen'

//styles
import { Images, Colors } from '../Themes/'
import styles from './Styles/NavigationStyles'

import HomeActions from '../Redux/HomeRedux'
import InstallationActions from '../Redux/HomeInstallationRedux'


const tabConfig = {
	navigationOptions: ({ navigation }) => ({
	  tabBarIcon: ({ focused, tintColor }) => {
		const { routeName } = navigation.state;


		iconName = focused ? Images.menu[routeName + 'Active'] : Images.menu[routeName];

		return <ResponsiveImage source={iconName}  initWidth="25" initHeight="25" />
	  },
		tabBarOnPress: config => {
			const {scene, index, jumpToIndex} = config;
			if (scene.index == 0) {
				HomeActions.removedSection(-1);
			}
			if (scene.index == 1) {
				InstallationActions.clean();
			}
			if (scene.index == 3) {
				if(global.visitScreen && global.visitScreen.props.visits){
					global.visitScreen.reloadContents();
				}
			}
			jumpToIndex(scene.index);
		}
	}),
	tabBarOptions: {
	  activeTintColor: Colors.tabActiveTintColor,
	  inactiveTintColor: Colors.tabInactiveTintColor,
	  labelStyle: styles.tabLabel,
	  tabStyle: styles.tabStyles,
	  style: styles.containerStyle
	},
  tabBarComponent: TabBarBottom,
	tabBarPosition: "bottom"
};

const mainStackConfig = {
// Default config for all screens
  headerMode: 'none',
  initialRouteName: 'intro', //'Calendar',
  navigationOptions: {
    headerStyle: styles.header
  }
}

const internalStackConfig = {
// Default config for all screens
  headerMode: 'none',
  initialRouteName: 'initial', // 'initial',
  navigationOptions: {
    headerStyle: styles.header,
  }
}


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  VisitsScreen: { screen: VisitsScreen },
  // FormScreen: { screen: FormScreen },
  // login: { screen: LoginScreen },
  Calendar: { screen: CalendarScreen },
  intro: {
  	screen: IntroScreen, //IntroScreen
  },
	main: {
    screen: TabNavigator({

      assistance: {
        screen: StackNavigator({
            initial: { screen: HomeAssistanceScreen },
            // filter: { screen: FilterStepsScreen },
            done: { screen: DoneStepsScreen },
            login: { screen: LoginScreen },
            form: { screen: FormScreen },
            calendar: {screen: CalendarScreen},
            success: { screen: SuccessScreen },

        }, {
          ...internalStackConfig,
          initialRouteParams: {
        parent: 'assistance'
       },
        }),
        navigationOptions:{
          title: 'Assistência',
        },
      },
      installation: {
        screen: StackNavigator({
            initial: { screen: HomeInstallationScreen },
            // filter: { screen: FilterStepsInstallationScreen },
            done: { screen: DoneStepsInstallationScreen },
            login: { screen: LoginScreen },
            form: { screen: FormScreen },
            calendar: {screen: CalendarScreen },
            success: { screen: SuccessScreen },
        },{
          ...internalStackConfig,
          initialRouteParams: {
          parent: 'installation'
            },
        }),
        navigationOptions:{
          title: 'Instala',
        },
      },

      channels:{
        screen: StackNavigator({
          initial: { screen: ChannelsScreen },
        },{
          ...internalStackConfig,
          initialRouteParams: {
            parent: 'channels'
          },
        }),
        navigationOptions:{
          title: 'Atendimento',
        },
      },
      visits: {
				// screen: StackNavigator({
        //     initial: { screen: LoginScreen },
        //     home: { screen: VisitsScreen },
        // },{
        //   ...internalStackConfig,
        //   initialRouteParams: {
        //     parent: 'visits',
        //   },
        // }),
        // navigationOptions:{
        //   title: 'Visitas',
        // },
				screen: SwitchNavigator({
						pre: { screen: PreVisitsScreen },
						login: { screen: LoginScreen },
						home: StackNavigator({
              initial: { screen: VisitsScreen },
              reschedule: { screen: RescheduleCalendarScreen  }
            }, internalStackConfig),
					}, {
          	initialRouteName: 'pre'
	        }),
				navigationOptions: {
					title: 'Visitas',
				}
      },
    }, tabConfig),

 }
},mainStackConfig)

export default PrimaryNav
