import React, { Component } from 'react'
import { ScrollView, Text, View, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import SplashScreen from 'react-native-splash-screen'
import AppIntro from '../Components/AppIntro';
import Spinner from '../Components/Spinner';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import IntroActions from '../Redux/IntroRedux'

// Styles
import { Images, Colors, Fonts, Metrics } from '../Themes'
import styles from './Styles/IntroScreenStyle';


const pageArray = [{
      title: 'Assistência Residencial',
      description: 'Precisando de encanador, eletricista ou chaveiro?\nDeixe com a gente!',
      img: Images.intro.residential,
      imgStyle: {
        height: 71 * 2.8,
        width: 80 * 2.8,
        
        // height: 71 * 2.8,
        // width: 80 * 2.8,
        marginTop: 120
      },
      backgroundColor: Colors.backgroundAssistance,
      fontColor: Colors.introTitle,
      level: 10,
    }, 
    {
      title: 'Instalação de TV',
      description: 'Conte com\nprofissionais qualificados para instalar sua TV.',
      img: Images.intro.eletronics,
      imgStyle: {
        height: 60 * 2.8,
        width: 80 * 2.8,
        marginTop: 120
      },
      backgroundColor: Colors.backgroundInstallation,
      fontColor: Colors.introTitle,
      level: 10,
    },
    {
      title: 'Instalação de eletrodomésticos',
      description: 'Segurança para deixar seus eletrodomésticos funcionando.',
      img: Images.intro.appliances,
      imgStyle: {
        height: 66 * 2.8,
        width: 80 * 2.8,
        marginTop: 120
      },
      backgroundColor: Colors.backgroundAppliances,
      fontColor: Colors.introTitle,
      level: 10,
    }];


class IntroScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
   /* introRequest: PropTypes.func,
    introSkiped: PropTypes.func,*/
  }

  constructor (props) {
    super(props)
    const { navigation, introRequest } = this.props;
    // const _this = this;
    // console.log(this.props)
    this.state = {
      fetching: true
    }
    AsyncStorage.getItem('@Intro:skiped').then((value) => {
      if(value !== null){
        navigation.navigate('main') 
      }
      else{
        this.setState({
          fetching: false
        });

        SplashScreen.hide();
      }
    })


    // this.state = {
    //   fetching: false
    // }
    // SplashScreen.hide();    
    
  }

  goToHome = () => {
    const { navigation } = this.props;
    
    AsyncStorage.setItem('@Intro:skiped', 'true').then((isSkiped) => {
      navigation.navigate('main')
    })
    
    
  }

  onSkipBtnHandle = (index) => {
    // Alert.alert('Skip');
    // console.log(index);
    this.goToHome();
  }
  doneBtnHandle = () => {
     // console.log('Done');
     this.goToHome();
  }
  nextBtnHandle = (index) => {
    // Alert.alert('Next');
    // console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    // console.log(index, total);
  }


  componentDidMount() {
    const { skiped } = this.state;

    // console.log('componentDidMount Intro')
    // SplashScreen.hide();
  }

  render () {
    const { skiped, fetching } = this.state;
    // console.log('skiped render', skiped, fetching)


     if(!fetching){
      SplashScreen.hide();
      return( <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
        nextBtnLabel={'PRÓXIMO'}
        skipBtnLabel={'PULAR'}
        doneBtnLabel={'FINALIZAR'}
        customStyles={styles}
      />);
    }
    
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /*introRequest: () => dispatch(IntroActions.introRequest()),
    introSkiped: () => dispatch(IntroActions.introSkiped()),*/
    // isSkiped: () => dispatch(IntroActions.isSkiped()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroScreen)
