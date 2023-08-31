/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { View as AnimatedView } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
