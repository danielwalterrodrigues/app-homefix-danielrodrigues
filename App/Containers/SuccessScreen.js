import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import Header from '../Components/Header';
import { Colors } from '../Themes'
// Styles
import styles from './Styles/SuccessScreenStyle'

class SuccessScreen extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    const { navigation } = this.props;
    const { visitId } = navigation.state.params;
    console.log(navigation.state.params)
    const pageColor = Colors.backgroundForm;

    const header = {
      title: 'Visita agendada com sucesso!',
      subtitle: 'Anote o código da visita: ' + visitId,
      full: true,
      back: () => {
        return navigation.popToTop();
      },
      viewStyle: {
        backgroundColor: pageColor,
        borderBottomColor: pageColor,
      },
      next: () => {
        return navigation.popToTop();
      },
      nextButonText: 'Voltar para a Home',
      nextButtonStyle: styles.nextButtonStyle
    }

    return (
      <View style={styles.container}>
        <Header {...header} small={true}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessScreen)
