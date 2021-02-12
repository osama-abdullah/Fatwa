/* eslint-disable prettier/prettier */
import * as React from 'react';
import SQLite from 'react-native-sqlite-storage';
import {FlatList, View, Text} from 'react-native';
let db;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    db = SQLite.openDatabase(
      {
        name: 'fatawa.db3',
        createFromLocation: 1,
      },
      this.successDB.bind(this),
      this.failedDB,
    );
    this.state = {
      FlatListItems: [],
    };
  }
  successDB() {
    // eslint-disable-next-line no-alert
    alert('success');
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM editors', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  failedDB(err) {
    console.log(err);
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View key={item.id} style={{backgroundColor: 'white', padding: 20}}>
              <Text>Id: {item.id}</Text>
              <Text>Name: {item.name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
