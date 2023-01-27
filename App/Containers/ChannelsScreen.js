import React, { Component } from 'react'
import { ScrollView, Text, View, Platform, Linking } from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import PropTypes from 'prop-types';
// import { ListItem, Button } from 'react-native-elements'

import { Images, Colors, Fonts, Metrics } from '../Themes'
import CapitalizeFirstLetter from '../Transforms/CapitalizeFirstLetter'
import ResponsiveImage from 'react-native-responsive-image';
import Header from '../Components/Header';
import List from '../Components/List';

// Styles
import styles from './Styles/ChannelsScreenStyle'
const actualArea = 'channels';

class ChannelsScreen extends Component {
  constructor (props) {
    super(props)
    // this.state = {}
    SplashScreen.hide();
    this.onPress = this.onPress.bind(this);
    // this.back = this.back.bind(this);
  }

  onPress(link){
    console.log(link)

    return Linking.canOpenURL(link)
      .then(supported => {
        if (supported) {
          return Linking.openURL(link);
        }
        else{
          alert("Não suportado")
        }
      })
      .catch(err => err);

  }

  render () {
    const pageColor = Colors['background' + CapitalizeFirstLetter(actualArea)];
    const isiOS = Platform.OS === 'ios';

    const header = {
      title: 'Precisa de ajuda? Fale com a nossa equipe',
      image: Images.home[actualArea],
      viewStyle: {
        backgroundColor: pageColor,
        borderBottomColor: pageColor,
        // height: 200,
      },
      titleStyle:{
        ...Fonts.style.headerSubtitle
      }
    }

    const links = {
      chat: "https://cdf.cxcontact.com.br/WhatsAppbot/webchatnew/customwebchat.html?s=3-ylsRAVXLk.VFI9H_qUfeYPm4NMhnN8UFB8Zd2gczX_eTQtWg3W-aQ&username=anonimo&parceiroNegocio=vivo_homefix&locale=pt&",
      whatsapp: "https://api.whatsapp.com/send?phone=5511934670747&text=Vivo%20HomeFix%3A%20envie%20essa%20msg%20p%2F%20falar%20com%20um%20especialista",
      telephone: "tel: *4678",
      others: "tel: 0800 776 0646"
    }

    /**/
    const sections = [
      {
        title: 'Telefone',
        // subtitle: 'Agendado para 23/04/2017',
        icon: 'phone',
        link: isiOS ? links['others'] : links['telephone']

      },
      {
        title: 'Whatsapp',
        icon: 'whatsapp',
        link: links['whatsapp']
      },
      {
        title: 'Chat',
        icon: 'chat',
        link: links['chat']
      },
      {
        title: 'Demais Telefones',
        icon: 'others',
        link: links['others']
      }
    ];


    return (
      <View style={styles.container}>
        <ScrollView>
          <Header {...header} />

          <List
              sections={sections}
              pageColor={pageColor}
              onPress={this.onPress}
              steps={false} />
          {/*<List
              sections={sections}
              pageColor={pageColor}
              onPress={this.onPress} />
          })*/}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsScreen)
