/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View ,Image} from 'react-native';
import Svg, { Defs, G, Text, TSpan, Path } from 'react-native-svg';
export default function WavyHeaderH({customStyles}) {
  return (
  <View style={{backgroundColor:'#3a519b',width:'100%',height:100,top:0,position:'absolute'}}>

    <Svg style={{position:'absolute',width:'100%',height:200,top:30,left:0}} viewBox="0 0 191.76 161.47" preserveAspectRatio="none">
       <Path
       d="M190.62,161.21c-10.4,0-21.84,1.1-30.81-3.7-25.87-13.84-8.22-33.42-32.38-46.48-19-10.26-37,6.73-50.33,16.7-20.11,15-38.78,7.89-57.6-5.34A31.46,31.46,0,0,0,0,116.22v-93C0,10.39,11.84,0,26.44,0H167.33c13.49,0,24.43,9.6,24.43,21.45v140A2.46,2.46,0,0,0,190.62,161.21Z"
       fill="#76cef9"
       opacity="0.4"
    />
    </Svg>
    <Svg style={{position:'absolute',width:'100%',height:200,top:25,left:0}} viewBox="0 0 191.76 139.03" preserveAspectRatio="none">
       <Path
      d="M155.66,119.51c-12.27-11-23-23.53-37.08-32.84-7-4.64-15-8.4-23.76-9.52-13.12-1.66-26.07,1.61-38.31,5.51A119.78,119.78,0,0,1,0,86.84V23.22C0,10.39,11.84,0,26.44,0H167.33c13.49,0,24.43,9.6,24.43,21.45V139C177.85,136.67,166.05,128.82,155.66,119.51Z"
      fill="#3a519b"
    />
  </Svg>

  <View style={{flexDirection:'column',flex:1,justifyContent:'space-between',alignSelf:'flex-start',margin:10}}>
  <Image
    source={require('../assets/img/logo.png')}
    style={{width:80,height:80,left:-5,marginBottom:10}}
    resizeMode="contain"
  />
  <Image
    source={require('../assets/img/allemniw.png')}
    style={{width:117.6,height:67.4}}
    resizeMode="contain"
  />


</View>
<View style={{backgroundColor:'#fff',width:3,height:80,left:100}} />
  </View>
  );
}
