"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var LoginScreen = function () {
    var navigation = native_1.useNavigation();
    var goToMainScreen = function () {
        navigation.navigate('Main');
    };
    return (react_1["default"].createElement(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' } },
        react_1["default"].createElement(react_native_1.Text, null, "Login Screen"),
        react_1["default"].createElement(react_native_1.Platform, null, "loginlogin"),
        react_1["default"].createElement(react_native_1.Button, { title: "LogIn", onPress: goToMainScreen, color: react_native_1.Platform.OS === 'android' ? 'blue' : 'green' })));
};
exports["default"] = LoginScreen;