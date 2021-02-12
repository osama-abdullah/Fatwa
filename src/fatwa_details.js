/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView,StyleSheet,View,ScrollView,Share,ToastAndroid ,TouchableOpacity,Text} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Modal,
  TopNavigation,
  Button, Card,
  TopNavigationAction,OverflowMenu,
  MenuItem,
} from '@ui-kitten/components';
import SQLite from 'react-native-sqlite-storage';
import Slider from '@react-native-community/slider';
import HTMLView from 'react-native-htmlview';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
let db;
const BackIcon = (props) => <Icon {...props} name="arrow-forward"  fill="#fff" />;

const MenuIcon = (props) => (
  <Icon {...props} fill="#fff" name="more-vertical"/>
);

const InfoIcon = (props) => (
  <Icon {...props}  name="info"/>
);

export class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.item = this.props.route.params.item;
    this.FlatListItems=this.props.route.params.FlatListItems;
   this.state = {
    menuVisible: false,
    fontSize:14,
    modal:false,
    star:'star-outline',
    index:this.FlatListItems.findIndex(x => x.id == this.item.id),
    item:null,
  };
 
     }
   componentDidMount() {

    if (this.item.fav == 1){
      this.setState({star:'star'});
    }
    else {
      this.setState({star:'star-outline'});
    }
    db = SQLite.openDatabase(
      {
        name: 'fatawa.db3',
        createFromLocation: 1,
      },
      this.successDB.bind(this),
      this.failedDB,
    );
  }
  componentWillMount() {
    this.setState({index: this.FlatListItems.findIndex(x => x.id == this.item.id)});
    this.setState({item: this.FlatListItems[this.state.index]});

  }
   failedDB(err) {
    console.log(err);
  }
  successDB() {
    db.transaction((tx) => {
      tx.executeSql("select value from settings where key='fontSize'", [], (tx, results) => {
        this.setState({
          fontSize:Number(results.rows.item(0).value),
        });
      });
    });
  }
   BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={this.navigateBack}/>
  );
  StarAction = () => (
    <TopNavigationAction icon={this.StarIcon} onPress={this.addStar}/>
  );
  navigateBack = () => {
    this.props.navigation.goBack();
  };
  addStar = () => {
    var favorite;
    var toast;
    if (this.state.star == 'star'){
      favorite = 0;
      this.setState({star:'star-outline'});
      toast="تم إزالة الفتوى من المفضلة";
    }
    else {
      favorite = 1;
      this.setState({star:'star'});
      toast="تم إضافة الفتوى إلى المفضلة";
    }
    db.transaction((tx) => {
      tx.executeSql("UPDATE fatawas SET fav='" + favorite + "' WHERE id='" + this.state.item.id + "'", [], (tx, results) => {
        ToastAndroid.showWithGravity(
          toast,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
    });
  };

CopyIcon = (props) => (
    <Icon {...props}  name="copy-outline"/>
  );
   toggleMenu = () => {
    this.setState({menuVisible:!this.state.menuVisible});
  };

   onShare = async (item) => {
    try {
      const result = await Share.share({
        message:
        item.title + '\n'  + '\n' + item.question + '\n' + item.answer +'\n'+ item.source,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
         /* ToastAndroid.showWithGravity(
            'تمت المشاركة بنجاح',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );*/
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
   renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={this.toggleMenu}/>
  );
  infoApp(){
    this.setState({menuVisible:false});
    this.props.navigation.navigate('SettingsScreen');
  }
  renderRightActions = () => (
    <React.Fragment>
       <TopNavigationAction onPress={ () => this.addStar()} icon={this.StarIcon} />
       <TopNavigationAction onPress={ () => this.onShare(this.item)} icon={this.ShareIcon}  />
      <OverflowMenu
        anchor={this.renderMenuAction}
        visible={this.state.menuVisible}
        onBackdropPress={this.toggleMenu}>
        <MenuItem accessoryLeft={this.ZoomIcon}  onPress={() => this.setState({modal:true})} title="حجم الخط"/>
        <MenuItem accessoryLeft={InfoIcon}  onPress={() => this.infoApp()} title="معلومات التطبيق"/>
      </OverflowMenu>
    </React.Fragment>
  );
  ZoomIcon = (props) => (
    <Icon {...props} name="maximize-outline" />
  );
  ShareIcon = (props) => (
    <Icon {...props} fill="#fff" name="share-outline" />
  );
   StarIcon = (props) => (
    <Icon {...props} name={this.state.star} fill="#fff"/>
  );
  StarIcong = (props) => (
    <Icon {...props} name="star-outline" />
  );
   SettingIcon = (props) => (
    <Icon {...props} name="search-outline" fill="#fff"/>
  );
setSize(size){
  this.setState({fontSize:size});
  this.saveSetting();
}
swipLeft() {
  if (this.state.index > 0) {
    this.setState((state) => ({
      index: state.index - 1,
    }));
    this.setState((state) => ({
      item: this.FlatListItems[state.index]
    }));
  } 
}
swipRight(){
  if(this.state.index !== this.FlatListItems.length-1){
  this.setState((state) => ({index:state.index+1}));
  this.setState((state) => ({item:this.FlatListItems[state.index]}));
  }
}
saveSetting(){
  db.transaction((tx) => {
    tx.executeSql("UPDATE settings SET value='" + this.state.fontSize + "' WHERE key='fontSize'", [], (tx, results) => {
    });
  });
}
  render() {
    const styles ={
      topnav:{
        backgroundColor:'#3A67BF',
        padding:10,
        flex:1,
        flexDirection:'row',
      },
      container: {
        minHeight: 192,
      },
      backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      div:{
        margin:15,marginBottom:5,backgroundColor:'#F1F9FF',color:'#822326',fontWeight:'900',fontFamily:'DroidKufi-Bold',fontSize:this.state.fontSize,lineHeight:26,paddingVertical:10,paddingHorizontal:5,borderRadius:5,
      }, 
       i:{
        backgroundColor:'#3A67BF',
        color:'#fff'
      },
      p:{
        margin:15,marginTop:0,marginBottom:5,backgroundColor:'#F1F9FF',fontFamily:'DroidKufi-Regular',fontSize:this.state.fontSize,lineHeight:25,paddingVertical:10,paddingHorizontal:5,borderRadius:5
      },
      section:{
        margin:15,marginTop:0,marginBottom:5,backgroundColor:'#fff',fontFamily:'DroidKufi-Regular',fontSize:this.state.fontSize,lineHeight:25,paddingVertical:10,paddingHorizontal:5,borderRadius:5
      },
      bottomNavigation: {
        backgroundColor:'#3A67BF',
        color:'#fff',
        fontFamily:'DroidKufi',
        flexDirection:'row',
        },
    };
    return (
      <SafeAreaView style={{flex: 1}}>
       <TopNavigation
          style={{backgroundColor:'#3A67BF'}}
          title={evaProps => <Text {...evaProps} style={{ color: '#fff',fontSize:this.state.fontSize,fontFamily:'DroidKufi-Regular'}}>نص الفتوى</Text>}
          accessoryLeft={this.BackAction}
          accessoryRight={this.renderRightActions}   />
        <Divider />
        <Modal
          visible={this.state.modal}
          backdropStyle={styles.backdrop}
          onBackdropPress={() =>  this.setState({modal:false})}>
          <Card disabled={true}>
            <Text style={{textAlign:'center'}}>حجم الخط</Text>
            <Slider
             style={{width: 200, height: 40}}
             minimumValue={12}
             maximumValue={30}
             step={1}
             value={this.state.fontSize}
             onValueChange={ val => this.setSize(val)}
             minimumTrackTintColor="#A6A6A6"
             maximumTrackTintColor="#000"
           />
          <Text style={{textAlign:'center',marginBottom:8}}> الحجم : {this.state.fontSize}</Text>
            <Button onPress={() => this.setState({modal:false})}>
              موافق
            </Button>
          </Card>
        </Modal>
        <GestureRecognizer
          style={{flex: 1}}
        onSwipeLeft={() => this.swipLeft()}
        onSwipeRight={() => this.swipRight()}
          >
        <ScrollView style={{marginBottom:60}}>
          <HTMLView  value={"<div>"+this.state.item.question +"</div>"}  stylesheet={styles} contentWidth="100%" />
          <View
            style={{
              borderBottomColor: '#BDCAE3',
              borderBottomWidth: 1,
              marginBottom:5,
              marginHorizontal:5,
            }}
          />
          <HTMLView  value={"<section>"+this.state.item.answer +"</section>"}  stylesheet={styles} contentWidth="100%" />
          <View
            style={{
              borderBottomColor: '#BDCAE3',
              borderBottomWidth: 1,
              marginBottom:5,
              marginHorizontal:5,
            }}
          />
          <HTMLView  value={"<p> المصدر : "+this.state.item.source +"</p>"}  stylesheet={styles} contentWidth="100%" />
          <View
            style={{
              borderBottomColor: '#BDCAE3',
              borderBottomWidth: 1,
              marginBottom:5,
              marginHorizontal:5,
            }}
          />
          <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.swipLeft()}}>
            <Icon style={{width:30,height:30,alignSelf:'center'}}  name="arrow-ios-forward-outline" fill="#3A67BF"/>
             <Text style={{fontFamily:'DroidKufi-Regular',color:'#3A67BF',fontSize:14,fontWeight:'900'}} >السابق</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{this.swipRight()}}>
             <Text style={{fontFamily:'DroidKufi-Regular',color:'#3A67BF',fontSize:14,fontWeight:'900'}}>التالي</Text>
             <Icon  style={{width:30,height:30,alignSelf:'center'}}  name="arrow-ios-back-outline" fill="#3A67BF"/>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </GestureRecognizer>
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




