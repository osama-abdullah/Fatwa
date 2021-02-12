/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,StyleSheet,FlatList,StatusBar,View,TextInput,TouchableOpacity,I18nManager} from 'react-native';
import {Divider} from '@ui-kitten/components';
import { Icon, Text, TopNavigation, TopNavigationAction,Avatar,Button ,BottomNavigation,BottomNavigationTab} from '@ui-kitten/components';
import RNRestart from 'react-native-restart';
import SQLite from 'react-native-sqlite-storage';
let db;
export class CategoriesList extends React.Component { 
  constructor(props) {
    super(props);
    this.part=this.props.route.params.part;
    this.title="فتاوى أبواب الزكاة";
    if(this.part==2){
      this.title="فتاوى أبواب الصيام";
    }
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
    if (I18nManager.isRTL !== true){
      I18nManager.forceRTL(true);
      RNRestart.Restart();
   }
   }
   successDB() {
    db.transaction((tx) => {
      tx.executeSql('SELECT categories.id,categories.name,COUNT(fatawas.category_id) count FROM categories  LEFT JOIN fatawas ON (fatawas.category_id = categories.id) GROUP BY categories.id having part_id='+this.part, [], (tx, results) => {
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

       SettingIcon = (props) => (
        <Icon {...props} name='settings-2-outline' fill="#fff"/>
      );

      renderItem = ({ item }) => (
      <TouchableOpacity  style={styles.item} key={item.id}  onPress={() => this.props.navigation.navigate('FatwasScreen',{id:item.id})}>
       <Avatar source={require('../assets/img/rub-el-hizb.png')}/>
       <Text style={styles.title}>{item.name}</Text>
       <Text style={{marginLeft: 'auto',color:'#3A67BF'}}>
          {item.count}
        </Text>
       </TouchableOpacity>
      );
      search(text){
        if (text == ''){
          db.transaction((tx) => {
            tx.executeSql('SELECT categories.id,categories.name,COUNT(fatawas.category_id) count FROM categories  LEFT JOIN fatawas ON (fatawas.category_id = categories.id) GROUP BY categories.id having part_id='+this.part, [], (tx, results) => {
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
        else {
          db.transaction((tx) => {
            tx.executeSql("SELECT categories.id,categories.name,COUNT(fatawas.category_id) count FROM categories  LEFT JOIN fatawas ON (fatawas.category_id = categories.id) GROUP BY categories.id having name like '%" + text + "%' and part_id="+this.part, [], (tx, results) => {
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
      }
  render() {
    return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#fff'}}>
      <TopNavigation
        accessoryLeft={this.BackAction}
        title={evaProps => <Text {...evaProps} style={{ color: '#fff',fontFamily:'DroidKufi-Regular'}}>{this.title}</Text>}
        style={{backgroundColor:'#3A67BF',flexDirection:'row'}}
      />
        <Divider />
      <TextInput
        style={styles.input}
        placeholder='بحث'
        underlineColorAndroid="transparent"
        //onChangeText={text =>this.search(text)}
        onFocus={()=>this.props.navigation.navigate('SearchScreen')}
      />
        <FlatList
         style={{marginBottom:60}}
         data={this.state.FlatListItems}
         renderItem={this.renderItem}
         keyExtractor={item => item.id}
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
  item: {
    backgroundColor: '#F1F9FF',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderRadius:5,
    marginVertical: 3,
    marginHorizontal: 16,
    fontFamily:'DroidKufi-Bold',
  },
  title: {
    fontSize: 17,
    color:'#3A67BF',
    paddingRight:10,
    textAlignVertical:'center',
    fontFamily:'DroidKufi-Regular',
  },
  bottomNavigation: {
    backgroundColor:'#3A67BF',
    color:'#fff',
    flexDirection:'row-reverse',
    fontFamily:'DroidKufi-Regular',
    },
});
/*

      <BottomNavigation style={styles.bottomNavigation} selectedIndex='0'>
        <BottomNavigationTab {...this.TouchableOpacityProps}
         title={evaProps => <Text {...evaProps} style={{color:'#fff',fontFamily:'DroidKufi-Regular'}}>الرئيسية</Text>}  icon={this.HomeIcon}
          onPress={ () => alert('iyyu')}/>
        <BottomNavigationTab title={evaProps => <Text {...evaProps} style={{color:'#fff',fontFamily:'DroidKufi-Regular'}}>المفضلة</Text>} icon={this.StarIcon}
          onPress={() => this.props.navigation.navigate('FatwasScreen')}/>
        <BottomNavigationTab title={evaProps => <Text {...evaProps} style={{color:'#fff',fontFamily:'DroidKufi-Regular'}}>الإعدادات</Text>} icon={this.SettingIcon}
         onPress={() => this.props.navigation.navigate('SettingsScreen')}/>
      </BottomNavigation>

*/