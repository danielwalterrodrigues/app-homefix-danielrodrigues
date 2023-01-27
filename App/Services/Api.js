// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import moment from 'moment';
import {AsyncStorage} from 'react-native'
import Token from './token';

// const takiURL = 'https://webservice.cdf.net:8443/IntegracaoTakiWS/'; //TAKI homolog
// const loginURL = 'https://webservice.cdf.net:8443/cdf-ws/';
const takiURL = Token.config.taki; //TAKI prod
const loginURL = Token.config.login;
const amazonURL = 'https://s3-sa-east-1.amazonaws.com/vivo-home-fix/'




// our "constructor"
const create = (baseURL = 'https://s3-sa-east-1.amazonaws.com/vivo-home-fix/') => {

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const isSkiped = () => {
    // console.log('API skiped')
    return AsyncStorage.getItem('@Intro:skiped').then((value) => {
      return value !== null;
    })

  }

  const getIntro = () => api.get('sections.json')

  const getHomeSections = (area) =>{
    api.setBaseURL(amazonURL)
    return api.get( area + '.json')
  }

  const loginUser = (phone) => {
    // console.log('loginUser', loginURL + 'vivohomefix/?MSISDN=55' + phone)
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(loginURL)
      return api.get('vivohomefix/?MSISDN=55' + phone)
    })


  }

  const getAddress = (zip) => {
    // console.log('API getAddress')
    api.setBaseURL( 'https://viacep.com.br')

    return api.get(`ws/${zip}/json/`)
  }


  const getVisits = (phone) => {

    // console.log('getVisits', phone)
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      return AsyncStorage.getItem('@Login:phone').then(function(phone) {
        console.log('getVisits', phone)
        // same as login
        api.setBaseURL(loginURL)
        return api.get('vivohomefix/?MSISDN=55' + phone.replace(/\D/g,""))
      })
    })
  }

  const modifyVisits = (visits) => {
    console.log('modifyVisits', visits)

    toTitleCase = function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }

    let newVisits = []

    for (var i = 0; i < visits.length; i++) {
      let visit = visits[i]
      let status = visit.dsStatus.toLowerCase()
      let doneVisit = true
      /*



          1 Pendente
          2 Concluído
          3 Aceito
          4 Recusado
          5 Visita Perdida
          6 Finalizado
          7 Cancelado
          8 Pago
          9 Visita Perdida - Defeito no Produto
          13  Recusado Confirmado
          10  Pendente Confirmação Obrigatoria
          11  Pendente Confirmado
          12  Aceito Confirmado
          14  Cancelado na Confirmação

      */

     let subtitle = visit.dsStatus;

      switch(status){
        case 'concluído':
          subtitle = 'Realizado em ' + visit.dtVisita;
          break;
        case 'pendente':
        // case 'aceito':
        case 'pendente confirmado':
        case 'pendente confirmação obrigatoria':
        // case 'pago':
          subtitle = 'Agendado para ' + visit.dtVisita + ' - ' + toTitleCase(visit.dsPeriodo);
          doneVisit = false;
          break;
      }

      let icon = doneVisit ? 'Done' : 'Schedule';
      newVisits.push({
        id: visit.idVisitaTaki,
        title: toTitleCase(visit.dsTpVisita),
        subtitle: subtitle,
        icon: 'visit' + icon,
        date: visit.visitDate,
        done: doneVisit,
        status: status,
        address: [visit.logradouro + ', ' + visit.numero, visit.bairro, visit.municipio, 'CEP: '+ visit.cep].join(' - ')
      })
    }

    // console.log('newVisits', newVisits)
    return newVisits;
  }

  const cancelVisit = (visit) => {

    console.log('cancelVisit', visit)
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      return AsyncStorage.getItem('@Login:phone').then(function(phone) {
        console.log('cancelVisit', phone)
        // same as login
        let params = {
          COD_TRANSACAO: 51,
          ID_CLIENTE_CORPORATIVO: 186,
          ID_STATUS: 7,
          DS_LOGIN: 'appmobile',
          ID_VISITA: visit
        }

        console.log('canvelVisitParams', phone, params, takiURL + '?transacao=' + JSON.stringify(params))

        api.setBaseURL(takiURL)
        return api.get('JsonServices?transacao=' + JSON.stringify(params))
      })
    })
  }
  const datesReschedule = (visit) => {

    console.log('datesReschedule', visit)
    // same as login
    let params = {
      COD_TRANSACAO: 163,
      ID_VISITA: visit
    }
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(takiURL)
      return api.get('JsonServices?transacao=' + JSON.stringify(params))
    })
  }
  const periodsReschedule = (visit, date) => {

    console.log('periodsReschedule', visit, date)
    // same as login
    let params = {
      COD_TRANSACAO: 183,
      ID_VISITA: visit,
      DT_VISITA: date
    }
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(takiURL)
      return api.get('JsonServices?transacao=' + JSON.stringify(params))
    });
  }

  const sendReschedule = (visit, date, hour) => {

    console.log('sendReschedule', visit, date)
    // same as login
    let params = {
      COD_TRANSACAO: 73,
      ID_VISITA: visit,
      DT_VISITA: date,
      ID_PERIODO: hour.id,
      DS_LOGIN: 'apphomefix'
    }
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(takiURL)
      return api.get('JsonServices?transacao=' + JSON.stringify(params))
    })
  }


  const submitForm = (user) => {

    // console.log('submitForm API' , user)

    let mobile = user.phone.split(' ');

    user.ddd = mobile[0].replace(/\D/g, "");
    user.mobile = mobile[1].replace(/\D/g, "");

    let params = {
      COD_TRANSACAO: 1,
      ID_CLIENTE_CORPORATIVO: 186,
      NM_CLIENTE: user.name,
      DS_LOGIN: 'appmobile',
      NR_CPF: user.cpf,
      'LISTA_TELEFONE': [{
        CD_TIPO_TELEFONE: 2,
        NR_DDD: user.ddd,
        NR_FONE: user.mobile,
        NR_RAMAL: '',
        NM_RECADOS:''
      }],
      LISTA_ENDERECO: [{
        CD_TIPO_ENDERECO: 1,
        DS_LOGRADOURO: user.street,
        NR_LOGRADOURO: user.number,
        DS_COMPLEMENTO: user.complement,
        NR_CEP: user.zip,
        DS_BAIRRO: user.district,
        DS_CIDADE: user.city,
        CD_UF: user.state
      }]
    };

    console.log('onRegister', user, params, takiURL + '?transacao=' + JSON.stringify(params))

    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(takiURL)
      return api.get('JsonServices?transacao=' + JSON.stringify(params))
    });
  }

  const getDates = (user) => {

    // console.log(clientId);

    let params = {
      COD_TRANSACAO: 147,
      ID_CLIENTE: user.clientId,
      ID_CLIENTE_CORPORATIVO: 186,
      CD_PRODUTO_CLIENTE: 'homefix',
      DS_ENDERECO: user.street,
      NR_CEP: user.zip,
      NR_ENDERECO: user.number,
      DS_BAIRRO: user.district,
      // FL_UTILIZA_ENDERECO_CADASTRAL: 1
    }

    console.log('getDates', user, params, takiURL + '?transacao=' + JSON.stringify(params))
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(takiURL)
      return api.get('JsonServices?transacao=' + JSON.stringify(params))
    });
  }

  const periodsRequest = (selectedDate, user) => {
    console.log(selectedDate, user)


    let params = {
      COD_TRANSACAO: 149,
      ID_CLIENTE: user.clientId,
      ID_CLIENTE_CORPORATIVO: 186,
      CD_PRODUTO_CLIENTE: 'homefix',
      DS_ENDERECO: user.street,
      NR_CEP: user.zip,
      NR_ENDERECO: user.number,
      DS_BAIRRO: user.district,
      DT_VISITA: selectedDate
    }

    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(takiURL)
      return api.get('JsonServices?transacao=' + JSON.stringify(params))
    });
  }

  const sendSchedule = (user, pageTakiSelection) => {

    let params = {
      COD_TRANSACAO: 151,
      CD_PRODUTO_CLIENTE: 'homefix',
      ID_SERVICO: 1201,
      ID_CLIENTE_CORPORATIVO: 186,
      ID_CLIENTE: user.clientId,
      DS_ENDERECO: user.street,
      NR_CEP: user.zip,
      NR_ENDERECO: user.number,
      DT_VISITA: user.selected.date,
      ID_PERIODO: user.selected.hour.id,
      DS_LOGIN: 'appmobile',
      DS_COMPLEMENTO: user.complement,
      DS_BAIRRO: user.district,
      DS_CIDADE: user.city,
      CD_UF: user.state,
      NR_CONTRATO: '55' + user.phone.replace(/\D/g,""),
      ID_TIPO_VISITA: pageTakiSelection
    }

    console.log('sendSchedule', params)
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(takiURL)
      return api.get('JsonServices?transacao=' + JSON.stringify(params))
    });

  }

  const sendAnswers = (visitId, aswers) => {
    console.log('sendAnswers', visitId, aswers)
    let answer = aswers.id.split('-').join(' ');


    let params = {
      COD_TRANSACAO: 167,
      ID_VISITA: visitId,
      DS_LOGIN: 'appmobile',
      DS_OBS: answer
    }
    return Token.defer.then(function (token) {
      api.setHeader('Authorization',  `Bearer ${token}`);
      api.setBaseURL(takiURL)
      return api.get('JsonServices?transacao=' + JSON.stringify(params))
    });

  }




  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    getIntro,
    getHomeSections,
    loginUser,
    getVisits,
    modifyVisits,
    cancelVisit,
    datesReschedule,
    periodsReschedule,
    sendReschedule,
    getAddress,
    submitForm,
    getDates,
    periodsRequest,
    sendSchedule,
    sendAnswers
  }
}

// let's return back our create method as the default.
export default {
  create
}
