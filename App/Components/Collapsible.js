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


export default class Collapsible extends Component {
  // // Prop type warnings
  static propTypes = {
    sections: PropTypes.array,
    steps: PropTypes.bool, 
    pageColor: PropTypes.string
  }

  constructor (props) {
    super(props);

    this.state = {
      expanded: null,
    }
  }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  /*componentDidMount() {
    console.log(this.refs)
  }*/

  expandDescription(indexExpanded){
    const { sections } = this.props;
    const { expanded } = this.state;

    this.setState({
      expanded: indexExpanded === expanded ? null : indexExpanded
    });

  }

  onPress(selectedIndex){
    const { sections, onPress } = this.props;
    
    onPress(selectedIndex)
  }

  renderTitle(item, index) {
    const { expanded } = this.state;
   
    // console.log('renderTitle', item)
    return (
      <View ref={'title' + index} style={styles.titleView}>
        <Text style={styles.title} textBreakStrategy='simple'>{item.title}</Text>
      </View>
      
    );
  }

  renderSubTitle(item, index) {
    const { expanded } = this.state;
    const { pageColor } = this.props;

    // console.log('renderSubTitle', item)
    return (
      <View style={styles.wrapper}>
        { index === expanded &&
        <View style={styles.descriptionView}>
          <Text style={styles.description} textBreakStrategy='simple'>{item.description}</Text>
        </View>
        }

        { index === expanded &&
        <Button 
            title={item.button || 'Agende agora esse serviço'}
            onPress={() => this.onPress(index)}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            underlayColor={'transparent'}
          />
        }
      </View>
      
    );
  }

  render () {
    const { sections, steps, pageColor } = this.props;
    const { expanded } = this.state;
    const total = sections.length -1;
    
    // console.log('total', total)
    return (
       <View style={styles.container}>
      {
          sections.map((item, index) => {
            
            let divider = index!==total;
            
            return (
              <ListItem
                key={index}
                pad={0}
                title={this.renderTitle(item, index)}
                subtitle={steps ? null : this.renderSubTitle(item, index)}
                containerStyle={[styles.listContainer, !divider ? styles.listNoBorder : '', pageColor ? {borderBottomColor: pageColor} : '']}
                subtitleStyle={styles.listSubtitle}
                onPress={() => steps ? this.onPress(index) : this.expandDescription(index)}
                onLongPress={null}
                rightIcon={

                  steps ? (<ResponsiveImage 
                    source={Images.icons.rightButtonGrey}
                    style={styles.iconSteps}
                    initWidth={20} 
                    initHeight={26} />

                  ):
                  (<ResponsiveImage 
                    source={expanded == index ? Images.icons.upButtonGrey : Images.icons.downButtonGrey}
                    style={styles.icon}
                    initWidth={20} 
                    initHeight={26} />)

                 }
              />
              )
          })
        }
      </View>
    )
  }
}
