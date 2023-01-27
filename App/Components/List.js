import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
// import UIManager from 
import { ListItem, Button } from 'react-native-elements'
import ResponsiveImage from 'react-native-responsive-image';
// import Accordion  from 'react-native-accordion';

// import Accordion from 'react-native-accordion';
import PropTypes from 'prop-types';

import { Images } from '../Themes'
import styles from './Styles/CollapsibleStyle'


export default class List extends Component {
  // // Prop type warnings
  static propTypes = {
    sections: PropTypes.array,
    steps: PropTypes.bool, 
    pageColor: PropTypes.string,
    noItemsTitle: PropTypes.string
  }

  constructor (props) {
    super(props);
  }
  
  renderTitle(item, index) {

    return (
      <View ref={'title' + index} style={[styles.titleView, styles.titleViewWithIcon]}>
        <Text style={[item.subtitle ? styles.titleWithSubtitle : styles.title]} textBreakStrategy='simple'>{item.title}</Text>
        {item.subtitle &&
          <Text style={styles.subtitle} textBreakStrategy='simple'>{item.subtitle}</Text>
        }
      </View>
      
    );
  }

  onPress(link){
    const { onPress } = this.props;
    
    onPress(link)
  }

  render () {
    const { sections, steps, pageColor, onPress, noItemsTitle } = this.props;
    const total = sections.length -1;

    return (
       <View style={styles.container}>

      { 
        sections.length > 0 ?
          sections.map((item, index) => {
            
            let divider = index!==total;
            
            return (
              <ListItem
                key={index}
                title={this.renderTitle(item, index)}
                containerStyle={[styles.listContainer, !divider ? styles.listNoBorder : '', pageColor ? {borderBottomColor: pageColor} : '']}
                onPress={() => onPress ? this.onPress(item.link) : null}
                onLongPress={null}
                hideChevron={true}
                leftIcon={<ResponsiveImage 
                  source={Images.icons[item.icon]}
                  style={[styles.leftIcon, item.subtitle ? styles.leftIconWithSubtitle : '']}
                  initWidth={40} 
                  initHeight={40} />}
              />
              )
          }) :
          <View style={styles.titleView}>
            <Text style={[styles.title]} textBreakStrategy='simple'>{noItemsTitle ? noItemsTitle : 'Nenhum item encontrado.'}</Text>
          </View> 
        }
      </View>
    )
  }
}
