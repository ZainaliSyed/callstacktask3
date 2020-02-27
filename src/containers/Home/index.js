import React from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Images} from '../../theme';
import {request, success, generalSaveAction} from '../../actions/ServiceAction';
import {SEARCH_REPO, SEARCH_DATA_STORAGE} from '../../actions/ActionTypes';
import constant from '../../constants';
import {store} from '../../store';
import {connect} from 'react-redux';
const searchHandler = (value, setList, storeData) => {
  var refectorValue = value.replace(/[^A-Z0-9]+/gi, '+');
  if (refectorValue[0] === '+') {
    refectorValue = refectorValue.slice(1);
  }
  if (refectorValue.indexOf('+') != -1) {
    if (storeData[refectorValue]) {
      setList(storeData[refectorValue]);
    } else {
      store.dispatch(
        request(
          `${constant.SEARCH_REPO}${refectorValue}`,
          'get',
          {},
          SEARCH_REPO,
          true,
          res => {
            searchSuccess(res.data.items, setList, refectorValue);
          },
          () => {},
        ),
      );
    }
  }
};
const searchSuccess = (data, setList, key) => {
  store.dispatch(
    generalSaveAction(SEARCH_DATA_STORAGE.ADD_OBJECT, {[key]: data}),
  );
  setList(data);
};
const Home = props => {
  const {searchDataStorage} = props;
  const [value, onChangeText] = React.useState('');
  const [list, setList] = React.useState([]);
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.textField}
          onChangeText={text => onChangeText(text)}
          value={value.toLowerCase()}
          placeholder="Search repo"
        />
        {value ? (
          <TouchableOpacity
            onPress={() => searchHandler(value, setList, searchDataStorage)}
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
        {!list.length ? (
          <View style={styles.itemCenter}>
            <Text>Data not found</Text>
          </View>
        ) : null}
        <SafeAreaView />
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

const actions = {};
const mapStateToProps = ({searchDataStorage}) => {
  return {
    searchDataStorage: searchDataStorage.data,
  };
};

export default connect(mapStateToProps, actions)(Home);
