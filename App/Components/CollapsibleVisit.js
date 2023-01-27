import React, { Component, Fragment } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// import UIManager from
import { ListItem, Button } from 'react-native-elements'
import ResponsiveImage from 'react-native-responsive-image';
// import Accordion  from 'react-native-accordion';

// import Accordion from 'react-native-accordion';

import PropTypes from 'prop-types';

import { Images } from '../Themes'
import styles from './Styles/CollapsibleStyle'
import VisitsActions from '../Redux/VisitsRedux'

class CollapsibleVisit extends Component {
  // // Prop type warnings
  static propTypes = {
    sections: PropTypes.array,
    steps: PropTypes.bool,
    pageColor: PropTypes.string,

    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    cancelRequest: PropTypes.func,
  }

  constructor (props) {
    super(props);

    this.state = {
      expanded: null,

      modalItem: null,
      modalAction: null
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

  onCancelPress(item){
    console.log('cancel', item);

    this.setState({

      modalAction: 'cancel',
      modalItem: item
    });
    this.props.toggleModal(true);
    this.props.toggleSuccess(false);

  }

  onReschedulePress(item){
    console.log('reschedule', item);
    this.setState({
      modalAction: 'reschedule',
      modalItem: item,
      modalCheck: false
    });
    this.props.toggleModal(true);
    this.props.toggleSuccess(false);
  }

  onConfirm(){
    console.log('confirm');


  }

  onAccept(){
    const {cancelRequest, datesReschedule} = this.props;
    const {modalAction, modalItem} = this.state;

    console.log('accept action', modalAction);
    if(modalAction == 'cancel'){
      console.log('cancel request', modalItem);
      cancelRequest(modalItem);
    } else {
      datesReschedule(modalItem);

    }

  }

  onRefresh(){
    this.setState({
      modalAction: null
    });
    this.props.toggleModal(false);
    this.props.toggleSuccess(false);

    global.visitScreen.reloadContents();
  }

  onDecline(){
    console.log('decline');

    this.setState({

      modalAction: null

    });
    this.props.toggleModal(false);
    this.props.toggleSuccess(false);
  }

  renderTitle(item, index) {
    const { pageColor } = this.props;

    return (
      <View ref={'title' + index} style={[styles.titleView, styles.titleViewWithIcon]}>
        <Text style={[item.subtitle ? styles.titleWithSubtitle : styles.title, pageColor ? {borderBottomColor: pageColor} : '']} textBreakStrategy='simple'>{item.title}</Text>
        {item.subtitle &&
          <Text style={styles.subtitle} textBreakStrategy='simple'>{item.subtitle}</Text>
        }
      </View>

    );
  }

  renderSubTitle(item, index) {
    const { expanded } = this.state;
    const { pageColor } = this.props;

    // console.log('renderSubTitle', item)
    return (
      <View style={styles.wrapper}>
        { (!item.done && index === expanded) &&
        <View style={[styles.descriptionView, pageColor ? {borderTopColor: pageColor} : '']}>
          <TouchableHighlight
            onPress={() => this.onCancelPress(item)}
            style={styles.button}
            underlayColor={'transparent'}>
              <Text style={[styles.buttonText]} textBreakStrategy='simple'>Cancelar Visita</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.onReschedulePress(item)}
            style={styles.button}
            underlayColor={'transparent'}>
              <Text style={[styles.buttonText]} textBreakStrategy='simple'>Reagendar Visita</Text>
          </TouchableHighlight>
        </View>
        }
      </View>
    );
  }

  render () {
    const { sections, error, pageColor, modalItem,  modalVisible, modalSuccess, modalSuccessSchedule } = this.props;
    const { expanded, modalAction } = this.state;
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
                subtitle={this.renderSubTitle(item, index)}
                containerStyle={[styles.listContainer, !divider ? styles.listNoBorder : '', pageColor ? {borderBottomColor: pageColor} : '']}
                subtitleStyle={styles.listSubtitle}
                onPress={() => this.expandDescription(index)}
                onLongPress={null}


                leftIcon={<ResponsiveImage
                  source={Images.icons[item.icon]}
                  style={[styles.leftIcon, item.subtitle ? styles.leftIconWithSubtitle : '']}
                  initWidth={40}
                  initHeight={40}/>}

                rightIcon={!item.done ?<ResponsiveImage
                    source={expanded == index ? Images.icons.upButtonGrey : Images.icons.downButtonGrey}
                    style={styles.iconVisit}
                    initWidth={20}
                    initHeight={26} /> : <ResponsiveImage initWidth={20}
                    initHeight={26} />
                 }
              />
              )
          })
        }

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modalContainer}>
            {error ? <View style={styles.modal}>
              <Text style={styles.modalTitle} textBreakStrategy='simple'>Algum problema ocorreu, por favor tente novamente</Text>
              <TouchableHighlight
                onPress={() => this.onDecline()}
                style={styles.button}
                underlayColor={'transparent'}>
                  <Text style={[styles.buttonText]} textBreakStrategy='simple'>Voltar para minhas visitas</Text>
              </TouchableHighlight>
            </View> : (!modalSuccess ? <View style={styles.modal}>
              <Text style={styles.modalTitle} textBreakStrategy='simple'>
              É necessário que a visita técnica
              seja {modalAction == 'cancel' ? 'cancelada' : 'reagendada'} até 24 horas antes da
              data agendada. Isso garante que o
              técnico receba as informações à
              tempo e não perca a viagem.
              </Text>

              <TouchableHighlight
                onPress={() => this.onAccept()}
                style={styles.button}
                underlayColor={'transparent'}>
                  <Text style={[styles.buttonText]} textBreakStrategy='simple'>Confirmar {modalAction == 'cancel' ? 'cancelamento' : 'reagendamento'} da visita</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.onDecline()}
                style={styles.button}
                underlayColor={'transparent'}>
                  <Text style={[styles.buttonText]} textBreakStrategy='simple'>Voltar para minhas visitas</Text>
              </TouchableHighlight>

            </View> : <View style={styles.modal}>
              <Text style={styles.modalTitle} textBreakStrategy='simple'>
              Visita {!modalSuccessSchedule ? 'cancelada' : 'reagendada'} com sucesso
              </Text>
              { modalSuccessSchedule  && <Fragment>
              <Text style={styles.modalTitle} textBreakStrategy='simple'>
              {modalItem.address}
              </Text>
              <Text style={styles.modalTitle} textBreakStrategy='simple'>
              {modalSuccessSchedule}
              </Text>
              </Fragment> }

              <TouchableHighlight
                onPress={() => this.onRefresh()}
                style={styles.button}
                underlayColor={'transparent'}>
                  <Text style={[styles.buttonText]} textBreakStrategy='simple'>Voltar para minhas visitas</Text>
              </TouchableHighlight>

            </View>)}
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    fetching: state.visits.fetching,
    visits: state.visits.visits,
    error: state.visits.error,
    modalVisible: state.visits.modalVisible,
    modalSuccess: state.visits.modalSuccess,
    modalItem: state.visits.modalItem,
    modalSuccessSchedule: state.visits.modalSuccessSchedule
    // phone: state.form.user.phone
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelRequest: (visit) => {
      // console.log('visitsRequest')
      return dispatch(VisitsActions.cancelRequest(visit))
    },
    datesReschedule: (visit) => {
      return dispatch(VisitsActions.datesRescheduleRequest(visit));
    },
    toggleModal: (toggle) => {
      return dispatch(VisitsActions.toggleModal(toggle));
    },
    toggleSuccess: (toggle) => {
      return dispatch(VisitsActions.toggleSuccess(toggle));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleVisit)
