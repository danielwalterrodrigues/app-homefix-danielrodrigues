import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors, Fonts, Metrics } from '../Themes'
import PropTypes from 'prop-types';

import Header from '../Components/Header';
import Collapsible from '../Components/Collapsible';
import Spinner from '../Components/Spinner';
import CapitalizeFirstLetter from '../Transforms/CapitalizeFirstLetter'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import HomeInstallationActions from '../Redux/HomeInstallationRedux'

// Styles
import styles from './Styles/DoneStepsScreenStyle'
/*
const doneTexts = {
  "instala-tv-onde-parede": {
    title: 'Precisamos de algumas informações para direcionar o seu atendimento',
    subtitle: 'A TV de parede Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  },
  "instala-tv-onde-suporte": {
    title: 'Precisamos de algumas informações para direcionar o seu atendimento',
    subtitle: 'A TV com suporte Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  },
  "instala-tv-onde-outro": {
    title: 'Precisamos de algumas informações para direcionar o seu atendimento',
    subtitle: 'A TV outro Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  },
  "instala-tv-55":{
    title: 'Precisamos de algumas informações para direcionar o seu atendimento',
    subtitle: 'A TV 55 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  },
  "instala-tv-56":{
    title: 'Precisamos de algumas informações para direcionar o seu atendimento',
    subtitle: 'A TV 56 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  },
  "chaveiro-fechadura-yale":{
    title: 'Precisamos de algumas informações para direcionar o seu atendimento',
    subtitle: 'A chave Yale Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  },
  "chaveiro-fechadura-tetra":{
     title: 'Precisamos de algumas informações para direcionar o seu atendimento',
    subtitle: 'A chave Tetra Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  },
  "chaveiro-fechadura-multiponto":{
    title: 'Precisamos de algumas informações para direcionar o seu atendimento',
    subtitle: 'A chave Multiponto Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  }
  
}*/

const actualArea = 'installation';

class DoneStepsInstallationScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    homeRequest: PropTypes.func,
    selectSection: PropTypes.func,
    removeSection: PropTypes.func,
    getActualSection: PropTypes.func,
  }

  constructor (props) {
    super(props)
    const { selectSection, navigation, selected } = this.props;

    
    // selectSection(navigation.state.params.selectedItem);

    // this.onPress = this.onPress.bind(this);
  }

  /*onPress(selectedItem){
  
    const { actualSection, selectSection, getActualSection, navigation } = this.props;

    const hasMoreSections = actualSection.options[selectedItem].hasOwnProperty('options');

    // selectSection(selectedItem);

    // console.log('onPress', actualSection.options[selectedItem].hasOwnProperty('options'));

    if(!hasMoreSections){
      // console.log('End of sections');
      return navigation.navigate('done')

    }

    getActualSection(selectedItem);

  }*/

  render () {
    const { navigation, removedSection, actualSection, selected } = this.props;
    const { routeName, params } = navigation.state;
    // const { lastSelectedItem } = params;
    // const lastSelectedItem = {id: 'instala-tv-onde-parede'}    
    const pageColor = Colors['background' + CapitalizeFirstLetter(actualArea)];
    const pageColorButton = Colors['button' + CapitalizeFirstLetter(actualArea)];

     
/*
    if(!!!lastSelectedItem){
      return (
      <View style={styles.container}>
        <Spinner pageColor={pageColor}  />
      </View>)
    }*/
    // console.log(lastSelectedSection)
    const header = {
      title: 'Precisamos de algumas informações para direcionar o seu atendimento',
      full: true,
      back: () => {
        // console.log('DoneStepsScreen', selected)
        removedSection(-1);
        return navigation.navigate('initial')
      },
      /*counter: {
        page: '01',
        total: '03'
      },*/
      image: Images.home[actualArea],
      viewStyle: {
        backgroundColor: pageColor,
        pageColorButton: pageColorButton,
        borderBottomColor: pageColor,
      },
      imgStyle:{
        height: 150,
        marginTop: Metrics.doubleBaseMargin
      },
      next: () => {
        return navigation.navigate('login', {parent: 'installation'});
      },
    }

    return (
      <View style={styles.container}>
        <Header {...header} />
      </View>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sections: state.homeInstallation.sections,
    selected: state.homeInstallation.selected,
    removed: state.homeInstallation.removed,
    actualSection: state.homeInstallation.actualSection,
    actualArea: state.homeInstallation.actualArea
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removedSection: (removedIndex, fromDone) => {
      // console.log('removeSection', removedIndex, fromDone)
      return dispatch(HomeInstallationActions.homeInstallationRemovedSection(removedIndex, fromDone))
    },
    selectSection: (selected) => {
      // console.log('selectSection', selected)
      return dispatch(HomeInstallationActions.homeInstallationSelectedSection(selected))
    },
    getActualSection: (nextSection) => {
      // console.log('getActualSection', nextSection)
      return dispatch(HomeInstallationActions.homeInstallationGetActualSection(nextSection))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DoneStepsInstallationScreen)
