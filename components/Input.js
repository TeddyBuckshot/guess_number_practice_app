import React from "react";
import { TextInput, StyleSheet, Text } from "react-native";

const Input = props => {
    return <TextInput {...props} style={{...StyleSheet.input, ...props.style}} />;
};

const style = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;