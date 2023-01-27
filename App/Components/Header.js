import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native'
// import { Button } from 'react-native-elements';

import ResponsiveImage from 'react-native-responsive-image';
import PropTypes from 'prop-types';

import { Images } from '../Themes'
import styles from './Styles/HeaderStyle'

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    counter: PropTypes.object,
    back: PropTypes.func,
    image: PropTypes.number,
    imgStyle: PropTypes.object,
    viewStyle: PropTypes.object,
    full: PropTypes.bool,
    nextButtonStyle: PropTypes.object
  }

  render () {

    const {
      title,
      subtitle,
      counter,
      back,
      image,
      imgStyle,
      backgroundColor,
      viewStyle,
      titleStyle,
      full,
      next,
      nextButonText,
      small,
      nextButtonStyle
    } = this.props;

    const sizeAdjust = (Dimensions.get('window').width / 380)
    const smallStyle = small ? {fontSize: 23 * sizeAdjust} : {}

    return (
      <View style={styles.wrapper}>
      <View style={[styles.container, !back && !counter ? styles.containerWithoutButton : '', viewStyle, full ? styles.containerFull: '']}>
        <View style={[styles.buttonsContainer, !back ? styles.buttonsContainerWithoutBack : ''] }>

          {back &&
              <TouchableHighlight
                onPress={back}
                underlayColor={'transparent'}
                style={styles.backButton}>
                <ResponsiveImage
                  source={Images.icons.backButtonWhite}
                  initWidth={20}
                  initHeight={26} />
              </TouchableHighlight>
          }
          {counter && <View style={styles.containerCounter}><Text style={styles.counter}>{counter.page} / <Text style={styles.counterTotal}>{counter.total}</Text></Text></View>}
        </View>
        <View style={[styles.titleContainer, !back && !counter ? styles.titleWithoutButton : '']}>
          <Text style={[styles.title, titleStyle, smallStyle]} textBreakStrategy='simple'>{title}</Text>
          {subtitle && <Text style={[styles.subtitle, { fontSize:28 * sizeAdjust}, smallStyle]} textBreakStrategy='simple'>{subtitle}</Text>}
          {image && <View style={styles.containerImage}><Image source={image} style={[styles.image, imgStyle, { height: 130 * sizeAdjust, width: 130 * sizeAdjust }]} /></View>}
        </View>
      </View>
      {next && <TouchableHighlight onPress={next} style={[styles.nextButton, nextButtonStyle, viewStyle && viewStyle.pageColorButton ? {backgroundColor:viewStyle.pageColorButton} : '']} underlayColor={'transparent'}><Text style={styles.nextButonText} textBreakStrategy='simple'>{nextButonText || 'Continuar'}</Text></TouchableHighlight> }
      </View>
    )
  }
}
