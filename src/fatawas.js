/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,StyleSheet,StatusBar,TextInput,View,TouchableOpacity} from 'react-native';
import {Divider} from '@ui-kitten/components';
import { Icon, Text, TopNavigation, TopNavigationAction,List} from '@ui-kitten/components';
import SQLite from 'react-native-sqlite-storage';
let db;
let cond;
export class FatwasScreen extends React.Component {
  id=this.props.route.params.id;
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
      searchTerm:'',
      FlatListItems: [],
    };
  }

  successDB() {

    db.transaction((tx) => {
      if (this.id > 0)
      {cond = 'category_id=' + this.id;
    }
      else
      {cond = 'fav=1';
    }
      tx.executeSql('select * from fatawas where ' + cond , [], (tx, results) => {
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

      BackIcon = (props) => (
        <Icon {...props} name="arrow-forward" fill="#fff"/>
      );
      BackAction = () => (
        <TopNavigationAction icon={this.BackIcon} onPress={this.navigateBack}/>
      );
      navigateBack = () => {
        this.props.navigation.goBack();
      };
       HomeIcon = (props) => (
        <Icon {...props} name='home-outline' fill="#fff"/>
      );

       StarIcon = (props) => (
        <Icon {...props} name='star-outline' fill="#fff"/>
      );
      SearchIcon = (props) => (
        <Icon {...props} name='search' fill="#414242"/>
      );
       SettingIcon = (props) => (
        <Icon {...props} name='settings-2-outline' fill="#fff"/>
      );
      renderItem = ({ item,index }) => (
        <React.Fragment>
        <TouchableOpacity  style={styles.item}   onPress={() => this.props.navigation.navigate('DetailsScreen',{FlatListItems:this.state.FlatListItems,item:item})}>
        <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        <Divider  />
        </React.Fragment>
      );
      renderHeader = () => {
        return (
      <TextInput
        style={styles.input}
        placeholder='بحث'
        underlineColorAndroid="transparent"
        accessoryRight={this.SearchIcon}
        onFocus={()=>this.props.navigation.navigate('SearchScreen')}
          />
        );
      };
  render() {
    return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#fff'}}>
      <TopNavigation
        accessoryLeft={this.BackAction}
        title={evaProps => <Text {...evaProps} style={{ color: '#fff',fontFamily:'DroidKufi-Regular'}}>فتاوى أبواب الزكاة</Text>}
        style={{backgroundColor:'#3A67BF',flexDirection:'row'}}
      />
        <Divider />
        <List
         style={{marginBottom:60}}
         data={this.state.FlatListItems}
         renderItem={({item, index}) =>(
      <React.Fragment>
        <TouchableOpacity style={{flexDirection:'row',flexWrap: 'wrap',padding: 10, backgroundColor: index % 2 == 0  ? '#7B8EB7' : '#fff'}} onPress={() => this.props.navigation.navigate('DetailsScreen',{FlatListItems:this.state.FlatListItems,item:item})}>
        <Text style={{color: index % 2 == 0  ?'#000' : '#000',fontSize:13,paddingRight:10,fontWeight:'900',textAlignVertical:'center',fontFamily:'DroidKufi-Regular', }}>{item.title}</Text>
        </TouchableOpacity>
        <Divider  />
      </React.Fragment>
         )}
         keyExtractor={item => item.id}
         ListHeaderComponent={this.renderHeader()}
       />
<View style={{position:'absolute',flex:1,flexDirection:'row',justifyContent:'space-around',paddingTop:5,width:'100%',backgroundColor:'#3A67BF',bottom:0}}>
<TouchableOpacity  onPress={() => this.props.navigation.navigate('Home')} >
    <Icon  style={{width:25,height:25,alignSelf:'center'}}  name="home-outline" fill="#fff"/>
     <Text style={{color:'#fff',textAlign:'center',fontWeight:'900',fontFamily:'DroidKufi-Regular',fontSize:14,marginTop:4}}>الرئيسية</Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={() => this.props.navigation.navigate('SearchScreen')} >
    <Icon  style={{width:25,height:25,alignSelf:'center'}}  name="search-outline" fill="#fff"/>
     <Text style={{color:'#fff',textAlign:'center',fontWeight:'900',fontFamily:'DroidKufi-Regular',fontSize:14,marginTop:4}}>بحث</Text>
    </TouchableOpacity>

    <TouchableOpacity  onPress={() => this.props.navigation.navigate('FavoriteScreen')} >
    <Icon  style={{width:25,height:25,alignSelf:'center'}}  name="star-outline" fill="#fff"/>
     <Text style={{color:'#fff',textAlign:'center',fontWeight:'900',fontFamily:'DroidKufi-Regular',fontSize:14,marginTop:4}}>المفضلة</Text>
    </TouchableOpacity>
</View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    fontFamily:'DroidKufi-Regular',
    backgroundColor: '#fff',
  },
  input: {
    margin:2,
    fontFamily:'DroidKufi-Regular',
    backgroundColor: '#fff',
    color: '#3A67BF',
    borderStyle:'solid',
    borderColor:'#BCE0FD',
    borderWidth:1,
  },
  highlight:{
backgroundColor:'#ff0',
  },
  litem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    padding: 10,
  },
  title: {
    fontSize: 13,
    color:'#3A67BF',
    paddingRight:10,
    fontWeight:'900',
    textAlignVertical:'center',
    fontFamily:'DroidKufi-Regular',
  },
  bottomNavigation: {
    backgroundColor:'#3A67BF',
    color:'#fff',
    flexDirection:'row-reverse',
    },
});
