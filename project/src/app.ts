import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { AppContainer } from './components/AppContainer';

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

// Register entry component
const stackLayout = () => require('@nativescript/core').StackLayout;
const gridLayout = () => require('@nativescript/core').GridLayout;
const scrollView = () => require('@nativescript/core').ScrollView;
const button = () => require('@nativescript/core').Button;
const textField = () => require('@nativescript/core').TextField;
const label = () => require('@nativescript/core').Label;
const image = () => require('@nativescript/core').Image;

ReactNativeScript.registerElement('stackLayout', stackLayout);
ReactNativeScript.registerElement('gridLayout', gridLayout);
ReactNativeScript.registerElement('scrollView', scrollView);
ReactNativeScript.registerElement('button', button);
ReactNativeScript.registerElement('textField', textField);
ReactNativeScript.registerElement('label', label);
ReactNativeScript.registerElement('image', image);

ReactNativeScript.start(React.createElement(AppContainer, {}, null));