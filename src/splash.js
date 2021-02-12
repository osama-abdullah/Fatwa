/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, ImageBackground, Image} from 'react-native';

import {Dimensions} from 'react-native';
import WavyHeader from './WavyHeader';

export class SplashScreen extends React.Component{

  constructor(){
    super();
    this.state = {
    isVisible : true,
   };
 }
 Hide_Splash_Screen=()=>{
  this.setState({
    isVisible : false,
  });
}
componentDidMount(){
  var that = this;
  setTimeout(function(){
    that.Hide_Splash_Screen();
  }, 3000);
 }
  render() {
  return (
    <View style={styles.container}>
      <WavyHeader customStyles={styles.svgCurve} />
      <ImageBackground
        source={require('../assets/img/back.jpg')}
        style={{opacity: 0.08, width: '100%', height: '100%'}}
        resizeMode="repeat"
      />
         {
      (this.state.isVisible === false) ? this.props.navigation.navigate('Home') :null
        }
    </View>
  );
  }
}

const styles = StyleSheet.create({
  // rest of the styles
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    // change the color property for better output
    color: '#fff',
    textAlign: 'center',
    marginTop: 35,
  },
  container: {
    backgroundColor: '#fff',
  },
});
