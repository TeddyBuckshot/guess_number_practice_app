import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from "../components/Card";
import colours from "../constants/colours";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number', 'Number must be between 1-99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>
                    chosen number:
                </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title='START' onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>
                    Start A New Game!
                </Text>
                <Card style={styles.inputContainer}>
                    <Text>
                        Select a Number
                    </Text>
                    <Input style={styles.input}
                        blurOnSubmit={true}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title='Reset' onPress={resetInputHandler} color={colours.accent} /></View>
                        <View style={styles.button}><Button title='Confirm' onPress={confirmInputHandler} color={colours.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      marginVertical: 10,
    //   fontFamily: 'open-sans-bold'
    },
    inputContainer: {
      width: 300,
      maxWidth: '80%',
      alignItems: 'center'
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15
    },
    button: {
      width: 100
    },
    input: {
      width: 50,
      textAlign: 'center'
    },
    summaryContainer: {
      marginTop: 20,
      alignItems: 'center'
    }
  });

export default StartGameScreen;