import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import colours from "../constants/colours";

const Header = props => {
    return (
        <View style={styles.header}>
            <Text>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colours.primary,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Header;