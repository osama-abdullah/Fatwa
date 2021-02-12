/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,StyleSheet,StatusBar,TextInput,View ,TouchableOpacity} from 'react-native';
import {Divider} from '@ui-kitten/components';
import { Icon, Text, TopNavigation, TopNavigationAction,List } from '@ui-kitten/components';
import SQLite from 'react-native-sqlite-storage';
import HTMLView from 'react-native-htmlview';
let db;
export class SearchScreen extends React.Component {

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
      scount:0,
      FlatListItems: [],
    };
  }
  successDB() {
    db.transaction((tx) => {
      tx.executeSql('select * from fatawas ' , [], (tx, results) => {
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
      renderItem = ({ item }) => (
        <React.Fragment>
        <TouchableOpacity  style={styles.item}   onPress={() => this.props.navigation.navigate('DetailsScreen',{FlatListItems:this.state.FlatListItems,item:item})}>
        <HTMLView  value={"<div>"+item.title +"</div>"}  stylesheet={styles} contentWidth="100%" />
        </TouchableOpacity>
        <Divider/>
        </React.Fragment>
      );
      renderHeader = () => {
        return (
      <View>
      <TextInput
        style={styles.input}
        placeholder='بحث'
        autoFocus={true}
        underlineColorAndroid="transparent"
        onChangeText={text =>this.search(text)}
          />
        <View style={{padding:4,paddingLeft:10,}}>
        <Text style={{fontFamily:'DroidKufi-Regular',color:'#3A67BF'}}>نتائج البحث : {this.state.scount}</Text>
        </View>
        </View>
        );
      };
      search(text){
        if (text == ''){
          db.transaction((tx) => {
            tx.executeSql('select * from fatawas' + this.id, [], (tx, results) => {
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
         var searchWords= text.split(' ');
         var finalText;
         for(let i=0;i<searchWords.length;++i){
          var checkWord=searchWords[i];
          if(checkWord.startsWith('ال')){
            finalText= text.replace(checkWord,checkWord+" "+checkWord.slice(2));
            if(['ب','ف','و','ي','ك','ل','س'].includes(checkWord.charAt(0))){
              finalText= finalText.replace(checkWord,checkWord+" "+checkWord.slice(1));
             }
            else{
              finalText= finalText.replace(checkWord,checkWord+" "+"و"+checkWord);
              finalText= finalText.replace(checkWord,checkWord+" "+"ف"+checkWord);
            }
          }
          else{
            finalText= text.replace(checkWord,checkWord+" "+"ال"+checkWord);
            if(['ب','ف','و','ي','ك','ل','س'].includes(checkWord.charAt(0))){
              finalText= finalText.replace(checkWord,checkWord+" "+checkWord.slice(1));
             }
            else{
              finalText= finalText.replace(checkWord,checkWord+" "+"و"+checkWord);
              finalText= finalText.replace(checkWord,checkWord+" "+"ف"+checkWord);
            }
          }          
         
          }
          }

          this.setState({
            searchTerm:'"*' + text.split(' ').join('"* "*') + '"*',
          });
          finalText= '"' + finalText.split(' ').join('" OR "') + '"';
          db.transaction((tx) => {
            tx.executeSql("SELECT  id,highlight(search, 2, '<i>', '</i>') as title,highlight(search,3, '<i>', '</i>') as question,highlight(search,4, '<i>', '</i>') as answer,highlight(search,5, '<i>', '</i>') as source FROM search WHERE search MATCH 'NEAR(" + this.state.searchTerm + ")' OR search MATCH '"+finalText+"' ORDER BY bm25(search, 40.0, 30.0,20,10);", [], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              this.setState({
                FlatListItems: temp,
                scount:results.rows.length,
              });
            });
          });
        }

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
        <TouchableOpacity  style={styles.item}   onPress={() => this.props.navigation.navigate('DetailsScreen',{FlatListItems:this.state.FlatListItems,item:item})}>
        <HTMLView  value={"<div>"+item.title +"</div>"}  stylesheet={styles} contentWidth="100%" />
        </TouchableOpacity>
        <Divider/>
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
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    padding: 20,
  },
  i:{
    backgroundColor:'#3A67BF',
    color:'#fff',
  },
  div: {
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
