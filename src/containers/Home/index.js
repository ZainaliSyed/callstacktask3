// // @flow
// import React, {Fragment, Component} from 'react';
// // import * as React from 'react';
// import {connect} from 'react-redux';
// import {SafeAreaView, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {push} from '../../services/NavigationService';
// import {Metrics} from '../../theme';
// import {request, logout, multipleRequest} from '../../actions/ServiceAction';
// import {LOGIN, SIGNUP} from '../../actions/ActionTypes';
// import constant from '../../constants';
// import {TextField} from '../../reuseableComponents';
// import {INPUT_TYPES} from '../../reuseableComponents/FormHandler/Constants';

// class Home extends Component {
//   state = {
//     isLoaded: false,
//   };
//   componentDidMount() {
//     // this.hitService();
//   }
//   state = {isOn: false};
//   _onStatusChange = () => {
//     this.hitService();
//     // this.props.logout();
//   };
//   hitService = () => {
//     this.props.multipleRequest(
//       [
//         {
//           url: constant.posts,
//           method: 'post',
//           data: {email: 'case@gmail.com', password: '123456'},
//           actionType: LOGIN,
//         },
//         {
//           url: constant.posts,
//           method: 'post',
//           data: {email: 'case@gmail.com', password: '123456'},
//           actionType: SIGNUP,
//         },
//       ],
//       true,
//       response => {
//         console.log('Home-response', response);
//       },
//       error => {
//         console.log('Home-error', error);
//       },
//     );

//     // let data = { email: "case@gmail.com", password: "123456" };
//     // let requests = [
//     // 	HttpServiceManager.getInstance().getRequestObject(
//     // 		constant.posts,
//     // 		data,
//     // 		"post"
//     // 	),
//     // 	HttpServiceManager.getInstance().getRequestObject(
//     // 		constant.posts,
//     // 		data,
//     // 		"post"
//     // 	)
//     // ];
//     // HttpServiceManager.getInstance()
//     // 	.multipleRequest(requests)
//     // 	.then(res => {
//     // 		console.log("res", res);
//     // 	})
//     // 	.catch(error => {
//     // 		console.log("error", error);
//     // 	});

//     // let data = { email: "case@gmail.com", password: "123456" };
//     // this.props.request(
//     // 	constant.posts,
//     // 	"post",
//     // 	data,
//     // 	LOGIN,
//     // 	true,
//     // 	res => {},
//     // 	err => {}
//     // );
//   };
//   render() {
//     return (
//       <Fragment>
//         <SafeAreaView>
//           <Text>{'Home'}</Text>
//           <TouchableOpacity
//             onPress={this._onStatusChange}
//             style={{
//               height: Metrics.heightRatio(100),
//               width: Metrics.widthRatio(100),
//               backgroundColor: 'blue',
//             }}
//           />
//           <TextField
//             onChangeText={() => {}}
//             placeholderTextinput="Paste your blog link here…"
//             label="Label"
//             error={'show'}
//             type={INPUT_TYPES.TEXT}
//             identifier="blogs"
//             topViewStyle={{
//               height: 100,
//               width: Metrics.screenWidth - Metrics.doubleBaseMargin,
//               // backgroundColor: "red"
//               borderWidth: 2,
//             }}
//             textInputStyle={{
//               fontFamily: 'Cochin',
//               fontSize: 20,
//               fontWeight: 'bold',
//             }}
//           />
//         </SafeAreaView>
//       </Fragment>
//     );
//   }
// }
// const actions = {
//   request,
//   logout,
//   multipleRequest,
// };
// const mapStateToProps = state => ({});

// export default connect(mapStateToProps, actions)(Home);

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#F5FCFF'},
//   top: {flex: 1, alignItems: 'center', justifyContent: 'center'},
//   bottom: {
//     width: '100%',
//     height: '100%',
//     zIndex: 999,
//     // alignItems: "center",
//     // justifyContent: "center",
//     // flex: 1
//   },
// });

import React from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import {Images} from '../../theme';
import {request} from '../../actions/ServiceAction';
import {SEARCH_REPO} from '../../actions/ActionTypes';
import constant from '../../constants';
import {store} from '../../store';
import moment from 'moment';
const searchHandler = (value, setList) => {
  store.dispatch(
    request(
      `${constant.SEARCH_REPO}react+native+splash+screen`,
      'get',
      {},
      SEARCH_REPO,
      true,
      res => {
        console.log('Hello world', res.data.items);
        setList(res.data.items);
      },
      () => {
        alert('falil');
      },
    ),
  );
};
const Home = () => {
  const [value, onChangeText] = React.useState('');
  const [list, setList] = React.useState([]);
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.textField}
          onChangeText={text => onChangeText(text)}
          value={value}
          placeholder="Search repo"
        />
        {value ? (
          <TouchableOpacity
            onPress={text => searchHandler(text, setList)}
            style={styles.button}>
            <Image source={Images.magnifyingGlass} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.headerContainer}>
        <View style={[styles.flexOne, styles.itemCenter]}>
          <Text>ID</Text>
        </View>
        <View style={[styles.flexTwo, styles.itemCenter]}>
          <Text>Repo Title</Text>
        </View>
        <View style={[styles.flexTwo, styles.itemCenter]}>
          <Text>Owner</Text>
        </View>
        <View style={[styles.flexOne, styles.itemCenter]}>
          <Text>Stars</Text>
        </View>
        <View style={[styles.flexTwo, styles.itemCenter]}>
          <Text>Created at</Text>
        </View>
      </View>
      <ScrollView>
        {list.map((data, index) => (
          <View key={index} style={styles.bodyContainer}>
            <View style={styles.flexOne}>
              <Text style={styles.text}>{data.id}</Text>
            </View>
            <View style={styles.flexTwo}>
              <Text style={styles.text}>{data.name}</Text>
            </View>
            <View style={styles.flexTwo}>
              <Text style={styles.text}>{data.owner.login}</Text>
            </View>
            <View style={styles.flexOne}>
              <Text style={styles.text}>star</Text>
            </View>
            <View style={styles.flexTwo}>
              <Text style={styles.text}>
                {new Date(data.created_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#dedede',
    borderRadius: 25,
    margin: 10,
  },
  textField: {height: 40, flex: 1, padding: 10},
  button: {padding: 10},
  flexOne: {flex: 1},
  flexTwo: {flex: 2},
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#b1b1b1',
    margin: 10,
    paddingVertical: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bodyContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    flex: 1,
    borderColor: 'gray',
  },
  itemCenter: {
    alignItems: 'center',
  },
});

export default Home;
