import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableHighlight, Modal } from 'react-native'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { List, ListItem, Icon } from 'react-native-elements'
import Header from '../Components/Header';
import VisitsActions from '../Redux/VisitsRedux'
import Spinner from '../Components/Spinner';

import _ from 'lodash'
import Moment from 'moment'
// Styles
import styles from './Styles/CalendarScreenStyle'
import { Colors, Fonts, Metrics } from '../Themes'
/*
let parent = 'assistance'
let user = {
  city:"Cidade Z",
  clientId: 6724318,
  cpf:"320.860.668-05",
  ddd:"16",
  district:"Bairro Y",
  mobile:"996433112",
  name:"Lucas Pedroza",
  number:"123",
  phone:"(16) 99643-3112",
  state:"SP",
  street:"Avenida X",
  zip:"05467-060",
  dates:{
    futureScrollRange: 1,
    maxDate:"2018-06-21",
    minDate:"2018-05-18",
    markedDates: {
      "2018-05-18": { marked: true },
      "2018-05-21": { marked: true },
      "2018-05-22": { marked: true },
      "2018-05-23": { marked: true },
      "2018-05-24": { marked: true },
      "2018-05-25": { marked: true },
      "2018-05-28": { marked: true },
      "2018-05-29": { marked: true },
      "2018-05-30": { marked: true },
      "2018-05-31": { marked: true },
      "2018-06-01": { marked: true },
      "2018-06-04": { marked: true },
      "2018-06-05": { marked: true },
      "2018-06-06": { marked: true },
      "2018-06-07": { marked: true },
      "2018-06-08": { marked: true },
      "2018-06-11": { marked: true },
      "2018-06-12": { marked: true },
      "2018-06-13": { marked: true },
      "2018-06-14": { marked: true },
      "2018-06-15": { marked: true },
      "2018-06-18": { marked: true },
      "2018-06-19": { marked: true },
      "2018-06-20": { marked: true },
      "2018-06-21": { marked: true }
    }
  }
}*/

const locales = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['D','S','T','Q','Q','S','S']
};

LocaleConfig.locales['pt-br'] = locales

LocaleConfig.defaultLocale = 'pt-br';

class RescheduleCalendarScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      checkedKey: '',
      selectedDate: null,
      selectedHour: null,
      disabled: true,
      error: false,
      selectedDate: null,
      selectedHour: null
    }

	checkDirection= ( current) => {
		if(!this.refs.calendar) return true;

		let left = current.clone().subtract(1, 'months')
		this.refs.calendar.state.enableLeft = left.isSameOrAfter(this.refs.calendar.props.minDate, 'month');

		let right = current.clone().add(1, 'months')
		this.refs.calendar.state.enableRight = right.isSameOrBefore(this.refs.calendar.props.maxDate, 'month');
	}

	onPressArrowLeft= (callback) => {
		if(this.refs.calendar && !this.refs.calendar.state.enableLeft) {
			return false;
		}

		callback();
	}

	onPressArrowRight= (callback) => {
		if(this.refs.calendar && !this.refs.calendar.state.enableRight) {
			return false;
		}

		callback();
	}

	onMonthChange= (current) =>{
		checkDirection(Moment(current.timestamp))
	}


	renderArrow= (direction) => {
	  if(direction == 'left') {
		   	return (<Text>{(!this.refs.calendar || this.refs.calendar.state.enableLeft ? 'Prev' : '')}</Text>)
	  	}

	  if(direction == 'right') {
			return (<Text>{(!this.refs.calendar || this.refs.calendar.state.enableRight ? 'Next' : '')}</Text>)
	  }
	}

    this.onPress = this.onPress.bind(this);
    this.backButton = this.backButton.bind(this);

    this.onPressArrowLeft = onPressArrowLeft.bind(this)
    this.onPressArrowRight = onPressArrowRight.bind(this)
    this.renderArrow = renderArrow.bind(this)
	this.onMonthChange = onMonthChange.bind(this);

	setTimeout(function(){
		checkDirection(Moment(new Date()));
	}, 50);

  }

  componentDidMount() {
    const { navigation } = this.props;

    const { showModal } = this.props;

  }

  onDayPress = (selectedDate) => {
    const { navigation, periodsRequest, setPeriodsUnavaliable, setLoader} = this.props;

    const dates = navigation.state.params.dates;
    const actualDate = Moment(selectedDate.dateString).format('YYYY-MM-DD');
    let newDates = {};
    let newSelected = {};
    let isValidDate = false;


    // setLoader('loadingHours')
    // delete selected.hour;
    console.log('onDayPress', selectedDate)
    _.forEach(dates.markedDates, (value, key) => {
      if(actualDate === key){
        newDates[key] = {
          marked: true,
          selected: true
        }
      }
      else{
        newDates[key] = {
          marked: true
        }
      }

      if(selectedDate.dateString === key){
        isValidDate = true;
      }
    })

    newDates.minDate = dates.minDate;
    newDates.maxDate = dates.maxDate;
    newDates.markedDates = {...newDates };

    let visitDate = Moment(selectedDate.dateString).format('DD/MM/YYYY');
    let weekday = locales.dayNames[Moment(selectedDate.dateString).isoWeekday()];

    if(!isValidDate){
      // setPeriodsUnavaliable()
      return false;
    }

    navigation.state.params.dates = newDates;

    this.setState({
      selectedDate: visitDate,
    });

    periodsRequest(   navigation.state.params.visit, visitDate);

	  let selfthis = this;

    let timer = setInterval(function(){
      const {avaliablePeriods} = selfthis.props;
      if (avaliablePeriods) {
        selfthis._scrollView.scrollTo({y:300, animated: true});
        clearInterval(timer);
      }

    }, 150);
  }

  selectPeriod(key, selectedHour){
    this.setState({
      checkedKey: key,
      selectedHour: selectedHour,
      disabled: false
    });
  }
  onPress(){
    const { sendReschedule, navigation } = this.props;


    let { selectedDate, selectedHour } = this.state;
    console.log('onConfirm', selectedDate, selectedHour);
    sendReschedule(navigation.state.params.visit, selectedDate, selectedHour);
  }

  backButton(){

  }

  render () {
    const {
      navigation,
      periodsUnavaliable,
      loadingHours,
      avaliablePeriods,
      error,
      submiting,
      modalVisible,
      fetching
    } = this.props;


    const { checkedKey, disabled, selectedDate, selectedHour } = this.state;
    // const { user } = navigation.state.params;
    const dates = navigation.state.params.dates;
    const pageColor = Colors.backgroundForm;

    console.log('render', modalVisible, submiting, modalVisible && submiting)

    const header = {
      title: 'Para quando você deseja reagendar a visita?',
      back: () => {
        return navigation.navigate('initial')
      },
      viewStyle: {
        backgroundColor: pageColor,
        borderBottomColor: pageColor,
        height: 190,
        borderWidth: 1
      },
    }

    const theme = {
      backgroundColor: pageColor,
      todayTextColor: Colors.green,
      calendarBackground: pageColor,
      textSectionTitleColor: Colors.calendarFontColor,
      selectedDayBackgroundColor: Colors.calendarFontColor,
      selectedDotColor: pageColor,
      selectedDayTextColor: pageColor,
      dayTextColor: Colors.calendarFontColor,
      textDisabledColor: Colors.calendarDotColor,
      dotColor: Colors.calendarDotColor,
      arrowColor: Colors.calendarFontColor,
      monthTextColor: Colors.calendarFontColor,
      textDayFontSize: 16,
      textMonthFontSize: 16,
      textDayHeaderFontSize: 16,
      textDayFontFamily: Fonts.type.robotoMedium,
      textMonthFontFamily: Fonts.type.robotoMedium,
      textDayHeaderFontFamily: Fonts.type.robotoMedium,
    }

    return (
      <View style={styles.container}>
        <ScrollView ref={view => this._scrollView = view}>
        <Header {...header} />


          <Calendar
			ref='calendar'
            minDate={dates.minDate}
            maxDate={dates.maxDate}
            markedDates={dates.markedDates}
            pastScrollRange={0}
            hideArrows={false}
            hideExtraDays={false}
            disableMonthChange={true}
            onDayPress={this.onDayPress}
            onPressArrowLeft={this.onPressArrowLeft}
            onPressArrowRight={this.onPressArrowRight}
  		    onMonthChange={this.onMonthChange}
            theme={theme}
          />

          <View>
          {
            fetching &&
            <Spinner pageColor={Colors.calendarFontColor}  />
          }

          {
            periodsUnavaliable &&
            <Text style={styles.error} textBreakStrategy='simple'>Não temos horários disponíveis para essa dia. Por favor, escolha outra data.</Text>
          }

          {

            avaliablePeriods &&
            <View>
              <List containerStyle={styles.listContainerStyle}>
              {
                avaliablePeriods.map((hour, key) => (
                  <ListItem
                    key={key}
                    leftIcon={{
                      name: key === checkedKey ? 'radio-button-checked' : 'radio-button-unchecked',
                      color: pageColor,
                      style: styles.icon
                    }}
                    onPress={() => this.selectPeriod(key, hour) }
                    titleStyle={styles.title}
                    hideChevron
                    title={hour.description + ' - ' + hour.time}
                  />


                ))
              }
              </List>

              {
                error &&
                 <Text style={[styles.error]} textBreakStrategy='simple'>Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde.</Text>
              }

              {
                modalVisible ?
                <Spinner pageColor={Colors.calendarFontColor}  />:
                <TouchableHighlight
                  onPress={this.onPress}
                  style={styles.nextButtonReschedule}
                  disabled={disabled}
                  underlayColor={'transparent'}>
                    <Text style={[styles.nextButonText, disabled ? styles.disabledButton : '' ]} textBreakStrategy='simple'>Continuar</Text>
                </TouchableHighlight>
              }

            </View>
          }

          </View>
        </ScrollView>

      </View>

    )
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps', state)
  return {
    loadingHours: state.visits.loadingHours,
    selected: state.visits.selected,
    periodsUnavaliable: state.visits.periodsUnavaliable,
    avaliablePeriods: state.visits.avaliablePeriods,
    error: state.visits.error,
    fetching: state.visits.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    periodsRequest: (visit, date) => dispatch(VisitsActions.periodsRescheduleRequest(visit, date)),
    sendReschedule: (visit, date, period) => dispatch(VisitsActions.sendRescheduleRequest(visit, date, period)),
    setPeriodsUnavaliable: () =>  dispatch(VisitsActions.setPeriodsUnavaliable()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RescheduleCalendarScreen)
