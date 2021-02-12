/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
export default function WavyHeader({customStyles}) {
  return (
    <View style={customStyles}>
      <View style={{backgroundColor: '#3A60AC', height: 280}}>

        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 191 277.14"
          preserveAspectRatio="none"
          style={{position: 'absolute', bottom: -130}}>
          <Path
            fill="#0099ff"
            opacity="0.4"
            d="M50.65,251.8c15.42,4.33,26.13,17.54,41.18,22.58,10.29,3.44,21.2,4.05,31.29-.4,18.49-8.16,30-27.2,43.81-41,7-7,14.83-13.34,24.07-17.08V26.34A26.34,26.34,0,0,0,164.66,0H24.33A24.33,24.33,0,0,0,0,24.33v241C16.12,257.59,31.93,246.55,50.65,251.8Z"
          />
        </Svg>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 191 272.61"
          preserveAspectRatio="none"
          style={{position: 'absolute', top: 210}}>
          <Path
            fill="#3A60AC"
            fill-opacity="1"
            d="M50.73,239.49c27.17-.58,45.55-26,72-29.21,11.06-1.35,21,2.59,29.44,9.66,11.76,9.9,18.17,22.76,25.84,35.73a86.78,86.78,0,0,0,13,16.94V2a2,2,0,0,0-2-2H0V211.55C12.77,227.58,30.55,239.92,50.73,239.49Z"
          />
        </Svg>
        <Image
          source={require('../assets/img/logo.png')}
          style={{width:150,height:150,position:'absolute',top:35,alignSelf:'center'}}
          resizeMode="contain"
        />
  <Image
    source={require('../assets/img/app-name.png')}
    style={{width:'75%',position:'absolute',alignSelf:'center',bottom:-30}}
    resizeMode="contain"
    resizeMethod="resize"
    preserveAspectRatio="none"
  />
      </View>
      <Image
        source={require('../assets/img/allemni.png')}
        style={{
          width: 128.436,
          height: 73.444,
          alignSelf: 'center',
          position: 'absolute',
          bottom: -270,
        }}
        resizeMode="stretch"
      />
    </View>
  );
}
