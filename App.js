import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [selectedUserNumber, setSelectedUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configNewGameHandler = () => {
    setGuessRounds(0);
    setSelectedUserNumber(null);
  };

  const startGameHandler = (selectedUserNumber) => {
    setSelectedUserNumber(selectedUserNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen  onStartGame={startGameHandler}/>;

  if (selectedUserNumber && guessRounds <= 0) {
    content = <GameScreen  userChoice={selectedUserNumber} onGameOver={gameOverHandler}/>
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={selectedUserNumber} onRestart={configNewGameHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title="guess a number" />
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }

});
