/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from './home.js';
import {SplashScreen} from './splash.js';
import {FatwasScreen} from './fatawas.js';
import {FavoriteScreen} from './favorite.js';
import {SearchScreen} from './search.js';
import {DetailsScreen} from './fatwa_details.js';
import {CategoriesList} from './CategoriesList.js';
import {SettingsScreen} from './settings.js';
const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Splash" component={SplashScreen} />
    <Screen name="Home" component={HomeScreen} />
    <Screen name="CategoriesList" component={CategoriesList} />
    <Screen name="FatwasScreen" component={FatwasScreen} />
    <Screen name="DetailsScreen" component={DetailsScreen} />
    <Screen name="SettingsScreen" component={SettingsScreen} />
    <Screen name="SearchScreen" component={SearchScreen} />
    <Screen name="FavoriteScreen" component={FavoriteScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
