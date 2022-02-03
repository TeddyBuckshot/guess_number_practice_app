import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import colours from "../constants/colours";



const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>
                GAME OVER, someone won..
            </Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/attachment.jpg')}
                    style={styles.image}
                    resizeMode='cover' />
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                    <Text style={styles.highlight}>
                        It took {props.roundsNumber} many rounds
                    </Text>
                    <Text style={styles.highlight}>
                        The number to guess was {props.userNumber}
                    </Text>
                </Text>
            </View>
            <Button title='would you like to play again?' onPress={props.onRestart} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: colours.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;