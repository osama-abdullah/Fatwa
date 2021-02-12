/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Layout,Icon } from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView,View,Text,StyleSheet,Image,TouchableOpacity,I18nManager,Linking } from 'react-native';
import WavyHeaderH from './WavyHeaderH';
import Svg, {Path,Rect,G} from 'react-native-svg';
import RNRestart from 'react-native-restart';
export const HomeScreen = ({navigation}) => {
  if (I18nManager.isRTL !== true){
    I18nManager.forceRTL(true);
    RNRestart.Restart();
 }
 React.useEffect(
  () =>
    navigation.addListener('beforeRemove', (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();

    }),
);
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#fff'}} >
    <View style={styles.container}>
      <WavyHeaderH customStyles={styles.svgCurve} />
    </View>

<View style={{flexDirection:'column',flex:1,zIndex:999}}>
<View style={{flex:1,flexDirection:'column', position:'absolute',top:'45%',right:0}}>
<TouchableOpacity style={{backgroundColor:'#395693',padding:4,borderRadius:4}}  onPress={() => Linking.openURL('https://www.facebook.com/FatawaPedia')}>
<Icon  style={{width:25,height:25,alignSelf:'center'}}  name="facebook" fill="#fff"/>
</TouchableOpacity>
<TouchableOpacity style={{backgroundColor:'#1CA0F1',marginTop:5,padding:4,borderRadius:4}}  onPress={() => Linking.openURL('https://twitter.com/FatawaPedia')}>
<Icon  style={{width:25,height:25,alignSelf:'center'}}  name="twitter" fill="#fff"/>
</TouchableOpacity>
<TouchableOpacity style={{width:32,height:30,backgroundColor:'#61A8DE',marginTop:5,position:'absolute',top:'100%',right:0,padding:4,borderRadius:4}}  onPress={() => Linking.openURL('https://t.me/fatawapedia')}>
<Svg width="100%" height="100%" preserveAspectRatio="none" >
<G>
	<Path fill="#fff" d="M19.46.07.44,7.48A.69.69,0,0,0,.5,8.79l4.83,1.43,1.8,5.72a.83.83,0,0,0,1.39.33L11,13.72l4.9,3.6a1,1,0,0,0,1.6-.62L20.77,1.18A1,1,0,0,0,19.46.07ZM17.07,3.51,8.24,11.32a.52.52,0,0,0-.16.31l-.34,3a.09.09,0,0,1-.17,0l-1.4-4.51a.48.48,0,0,1,.2-.55L16.8,3.14A.23.23,0,0,1,17.07,3.51Z"/>
</G>
</Svg>
</TouchableOpacity>
<TouchableOpacity style={{width:32,height:30,backgroundColor:'#6A26B0',marginTop:5,position:'absolute',top:'150%',right:0,padding:4,borderRadius:4}}  onPress={() => Linking.openURL('https://instagram.com/fatawapedia/')}>
<Svg width="100%" height="100%" preserveAspectRatio="none" >
<G>
<Path fill="#fff" d="M14.94,0H5.54A5.55,5.55,0,0,0,0,5.54v9.4a5.55,5.55,0,0,0,5.54,5.54h9.4a5.55,5.55,0,0,0,5.54-5.54V5.54A5.55,5.55,0,0,0,14.94,0Zm4.34,14.94a4.35,4.35,0,0,1-4.34,4.34H5.54A4.35,4.35,0,0,1,1.2,14.94V5.54A4.35,4.35,0,0,1,5.54,1.2h9.4a4.35,4.35,0,0,1,4.34,4.34Z"/>
<Path fill="#fff" d="M10.24,4.68a5.6,5.6,0,1,0,5.6,5.6A5.6,5.6,0,0,0,10.24,4.68Zm0,10a4.4,4.4,0,1,1,4.4-4.4A4.4,4.4,0,0,1,10.24,14.68Z"/>
<Path fill="#fff" d="M16,2.65a1.66,1.66,0,1,0,1.66,1.66A1.65,1.65,0,0,0,16,2.65Zm0,2.11a.45.45,0,0,1-.45-.45A.46.46,0,0,1,16,3.85a.47.47,0,0,1,.46.46A.46.46,0,0,1,16,4.76Z"/>
</G>
</Svg>
</TouchableOpacity>
</View>
<View style={{position:'absolute',top:'40%',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',flex: 1,width:'90%'}} >
    <View style={{flexDirection:'row',justifyContent:'space-between',width:'75%'}} >

    <TouchableOpacity style={{backgroundColor:'#3a519b',padding:5,borderRadius:10,paddingHorizontal:15,width:100}} onPress={() => navigation.navigate('CategoriesList',{part:2})}>
    <Image
    style={{width:50,height:50,alignSelf:'center'}}
    source={require('../assets/img/soum.png')}
     />
     <Text style={{color:'#fff',textAlign:'center',fontWeight:'900',fontFamily:'DroidKufi-Regular',fontSize:16,marginTop:4}}> الصيام</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:'#3a519b',padding:5,borderRadius:10,paddingHorizontal:15,width:100}} onPress={() => navigation.navigate('CategoriesList',{part:1})} >
    <Image
    style={{width:50,height:50,alignSelf:'center'}}
    source={require('../assets/img/zakah.png')}
     />
     <Text style={{color:'#fff',textAlign:'center',fontWeight:'900',fontFamily:'DroidKufi-Regular',fontSize:16,marginTop:4}}> الزكاة</Text>
    </TouchableOpacity>
    </View>

    <View style={{ marginTop:20, flexDirection:'row',justifyContent:'space-between',width:'75%'}} >

    <TouchableOpacity style={{backgroundColor:'#3a519b',padding:5,borderRadius:10,paddingHorizontal:15,width:100}} onPress={() => navigation.navigate('FavoriteScreen')}>
    <Image
    style={{width:50,height:50,alignSelf:'center'}}
    source={require('../assets/img/stars.png')}
     />
     <Text style={{color:'#fff',textAlign:'center',fontWeight:'900',fontFamily:'DroidKufi-Regular',fontSize:16,marginTop:4}}>المفضلة</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:'#3a519b',padding:5,borderRadius:10,paddingHorizontal:15,width:100}} onPress={() => navigation.navigate('SettingsScreen')} >
    <Icon  style={{width:50,height:50,alignSelf:'center'}}  name="alert-circle-outline" fill="#fff"/>
     <Text style={{color:'#fff',textAlign:'center',fontWeight:'900',fontFamily:'DroidKufi-Regular',fontSize:12,marginTop:4}}>عن التطبيق</Text>
    </TouchableOpacity>
    </View>
    </View>
</View>
    <Image
    source={require('../assets/img/mosque.png')}
    style={{width:'100%',position:'absolute',bottom:-140}}
    resizeMode="contain"
     />
   <Image
    source={require('../assets/img/app-name.png')}
    style={{width:'70%',position:'absolute',alignSelf:'center',top:-10,right:4}}
    resizeMode="contain"
     />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  // rest of the styles
  svgCurve: {
    position: 'absolute',
    width: '100%',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily:'DroidKufi-Regular',
    // change the color property for better output
    color: '#fff',
    textAlign: 'center',
    marginTop: 35,
  },
  container:{
     backgroundColor:'#fff',
     fontFamily:'DroidKufi-Regular',
  },
});
