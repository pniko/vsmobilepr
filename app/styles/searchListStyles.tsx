import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listcontainer: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    flex: 1
  },
  staticRow: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 40
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10
  }
});