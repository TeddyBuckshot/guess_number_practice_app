import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, FlatList } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import { MaterialIcons } from '@expo/vector-icons';

const generateRandomNumBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max - min)) + min;
    if (randomNum === exclude) {
        return generateRandomNumBetween(min, max, exclude);
    } else {
        return randomNum;
    }
};

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text>#{listLength - itemData.index}</Text>
        <Text>{itemData.item}</Text>
    </View>
);

const GameScreen = props => {

    const initialGuess = generateRandomNumBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPassedGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    //destructuring
    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'down' && currentGuess < props.userChoice) || (direction === 'up' && currentGuess > props.userChoice)) {
            Alert.alert('that\'s wrong , Try again?', 'would you like to?', [{ text: 'oops!', style: 'cancel' }
            ]);
            return;
        }
        if (direction === 'down') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomNumBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currentRounds => currentRounds + 1);
        setPassedGuesses(currentPastGuesses => [nextNumber.toString(), ...currentPastGuesses]);
    };

    return (
        <View style={StyleSheet.screen}>
            <Text>
                CPU guess:
            </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title='down' onPress={nextGuessHandler.bind(this, 'down')} />
                </View>
                {/* <MaterialIcons name='remove' size={24} color='white' /> */}
                {/* </Button> */}
                <View style={styles.button}>
                    <Button title='up' onPress={nextGuessHandler.bind(this, 'up')} />
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList keyExtractor={(item) => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        //   width: 400,
        //   maxWidth: '90%'
    },
    listContainer: {
    //   flex: 1,
    //   width: '60%'
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    button: {
        width: 100
    },
});

export default GameScreen;