import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import PropTypes from 'prop-types';
import _ from 'lodash'

import { Images, Colors, Fonts, Metrics } from '../Themes'
import CapitalizeFirstLetter from '../Transforms/CapitalizeFirstLetter'

// import { Button } from 'react-native-elements'
import Header from '../Components/Header';
import Collapsible from '../Components/Collapsible';
import Spinner from '../Components/Spinner';

import HomeActions from '../Redux/HomeRedux'

// Styles
import styles from './Styles/HomeScreenStyle'

const actualArea = 'assistance';


class HomeAssistanceScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    homeRequest: PropTypes.func,
    selectSection: PropTypes.func
  }

  constructor (props) {
    super(props)

    const {navigation, homeRequest} = this.props;

    homeRequest(actualArea);

    this.onPress = this.onPress.bind(this);
    this.back = this.back.bind(this);
  }

  onPress(selectedItem){
   const { actualSection, selectSection, navigation, getActualSection, sections, selected, clean } = this.props;
    let hasMoreSections = true;
    if (actualSection && !actualSection.hasOwnProperty('options')) {
      clean();
      const self  = this;
      setTimeout(function () {
        self.onPress(selectedItem);
      }, 100);
      return;
    }

    selectSection(selectedItem);

    let nextSection = actualSection ? actualSection.options[selectedItem] : sections[selected]
    if(nextSection && !nextSection.hasOwnProperty('options')){
       hasMoreSections = false
    }
    // hasMoreSections = selected ? actualSection && actualSection.hasOwnProperty('options') : true;


    // console.log('onPress' , sections, selected, hasMoreSections)
    if(!hasMoreSections){
      // console.log('End of sections', nextSection);
     // clean();

     return navigation.navigate('done', {
        lastSelectedItem: nextSection,
        selectedItem: selectedItem
      });
    }

    this.refs.scrollView.scrollTo({ y: 0, animated: false});

  }

  back(){
    const { removedSection } = this.props;

    removedSection(-1);
  }

  render () {
    const { fetching, sections, clean} = this.props;
    let {actualSection, lastSection, selected} = this.props;
    const pageColor = Colors['background' + CapitalizeFirstLetter(actualArea)];
    const pageColorButton = Colors['button' + CapitalizeFirstLetter(actualArea)];

    if(sections){
      SplashScreen.hide();
    }



    if(fetching){

      return (
      <View style={styles.container}>
        <Spinner pageColor={pageColor}  />
      </View>)
    }
    if (sections && actualSection && !actualSection.hasOwnProperty('options')) {
      actualSection = null;
      selected = null;
    }

    // console.log('selected HomeInstallation', selected, actualSection, sections)

    const header = {
      title: selected && selected.length >= 1 && actualSection ? actualSection.title : 'Assistência Residencial',
      subtitle: selected && selected.length >= 1 ? null : 'Selecione o profissional que deseja chamar',
      image: Images.home[actualArea],
      viewStyle: {
        backgroundColor: pageColor,
        borderBottomColor: pageColor,
      },
      back: selected && selected.length >= 1 ? this.back : null
    }

    return (
      <View style={styles.container}>
        <ScrollView ref="scrollView">
        <Header {...header} />

          {fetching &&
            <Spinner pageColor={pageColor}  />
          }

          {sections &&

            <Collapsible
              sections={
                selected && selected.length >= 1 && actualSection.options ?
                actualSection.options :
                sections
              }
              pageColor={pageColor}
              pageColorButton={pageColorButton}
              onPress={this.onPress}
              steps={selected && selected.length >= 1 ? true : false} />
          }
        </ScrollView>
      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.home.fetching,
    sections: state.home.sections,
    selected: state.home.selected,
    removed: state.home.removed,
    actualSection: state.home.actualSection,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    homeRequest: (type) => dispatch(HomeActions.homeRequest(type)),
    selectSection: (selected) => dispatch(HomeActions.selectedSection(selected)),
    removedSection: (removedIndex) => dispatch(HomeActions.removedSection(removedIndex)),
    getActualSection: (nextSection) => dispatch(HomeActions.getActualSection(nextSection)),
    clean: () => dispatch(HomeActions.clean()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeAssistanceScreen)
