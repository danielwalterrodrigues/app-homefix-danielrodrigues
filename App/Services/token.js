import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

var Token = {
    _config: {
        login: 'https://webservicehml.cdf.net:8443/cdf-ws/',
        loginTaki: 'https://webservicehml.cdf.net:8443/IntegracaoTakiWS/login',
        taki: 'https://webservicehml.cdf.net:8443/IntegracaoTakiWS/',
        user: 'vivo',
        secret: 'vivo@123'
    },
    config: {
        login: 'https://webservice.cdf.net:8444/cdf-ws/',
        loginTaki: 'https://webservice.cdf.net:8444/IntegracaoTakiWS/login',
        taki: 'https://webservice.cdf.net:8444/IntegracaoTakiWS/',
        user: 'vivo',
        secret: 'vivo@123'
    },
    clean: function () {
        AsyncStorage.removeItem('TOKEN');
    },
    defer:  new Promise((resolve, reject) => {
        AsyncStorage.getItem('TOKEN', function (error, token) {
            if (error) {
                AsyncStorage.removeItem('TOKEN', function () {
                    reject();
                });
            }
            else if (token){
                resolve(token);
            } else {
                fetch(Token.config.loginTaki, {
                    method: 'post',
                    headers: new Headers({
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }),
                    body: 'username='+ Token.config.user +'&password=' + Token.config.secret
                  }).then(function (res) {
                      return res.json();
                  }).then(function (json) {
                      if (json.result == 'OK') {
                        Token.token = json.token;
                        AsyncStorage.setItem('TOKEN', Token.token, function () {
                            resolve(Token.token);
                        });
                      }
                  }).catch(function () {
                        AsyncStorage.removeItem('TOKEN', function () {
                            reject();
                        });
                  });
            }
        });
    })
}

module.exports = Token;
