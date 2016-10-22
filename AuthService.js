import buffer from 'buffer';
import _ from 'lodash';
import {
  AsyncStorage
} from 'react-native';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(cb){
    AsyncStorage.multiGet([authKey, userKey],(err, val)=>{
      if(err){
        return cb(err);
      }
      if(!val){
        return cb();
      }

      var zippedObj = _.fromPairs(val);

      if(!zippedObj[authKey]){
        return cb();
      }

      var authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }

      return cb(null, authInfo);
    });
  }
  login(creds, cb){
    var b = new buffer.Buffer(creds.username + ':' + creds.password);
    var encodedAuth = b.toString('base64');
    var that = this;
    fetch('https://api.github.com/user', {
      headers: {
        'Authorization' : 'Basic ' + encodedAuth
      }
    })
    .then((response)=> {
      if(response.status >= 200 && response.status < 300){
        return response;
      }

      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response)=> {
      return response.json();
    })
    .then((results)=> {
      //PLURALSIGHT WAY
      AsyncStorage.multiSet([
        ['auth', encodedAuth],
        ['user', JSON.stringify(results)]
      ], (err)=>{
        if(err){
          throw err;
        }
        return cb({success: true});
      })
      //BELOW IS THE JOE WAY!
                  // try {
                  //   console.log('auth', encodedAuth);
                  //   AsyncStorage.setItem('auth', encodedAuth);
                  // } catch (error) {
                  //   console.log(error);
                  //   return cb({success: false});
                  // }
                  // try {
                  //   console.log('user', JSON.stringify(results));
                  //   AsyncStorage.setItem('user', JSON.stringify(results));
                  // } catch (error) {
                  //   console.log(error);
                  //   return cb({success: false});
                  // }
                  //
                  // return cb({success: true});
      // finally{
      //   return cb({success: true});
      // }

      // AsyncStorage.multiSet([
      //   'auth', this.encodedAuth
      //   'user', JSON.stringify(results)
      // ], (err)=> {
      //     if(err){
      //       throw err;
      //     }
      //     return cb({success: true});
      // });
    })
    .catch((err)=> {
      // this.setState(err);
      console.log(err);
      // that.setState({success: false}); // NOTE TO SELF TO REMOVE or implment over again as need4d success needs to be set on failure
      return cb(err)
    })
    .finally(()=> {
      if(that.setState)
      that.setState({showProgress: false});
    });
  }
}

module.exports = new AuthService();
