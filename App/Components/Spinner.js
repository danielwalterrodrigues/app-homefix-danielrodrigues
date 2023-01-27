import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native'
import styles from './Styles/SpinnerStyle'
import { Colors } from '../Themes'
export default class Spinner extends Component {
  // // Prop type warnings
  static propTypes = {
    pageColor: PropTypes.string,
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const { pageColor } = this.props;
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={pageColor || Colors.defaultSpinnerBackground} />
      </View>
    )
  }
}
