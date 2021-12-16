import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';

export default class App extends Component {
  state = {
    buttonValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    buttonValueShow: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    buttonPressedStatus: [false, false, false, false, false, false, false, false, false],
    buttonColor: ["#EBEBEB", "#EBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB"],
    buttonTitle: "Mulai Game Baru",
    singlePairNumber: 0,
    gameStarted: false,
    isFirstPair: true,
    firstValue: 0,
    firstIndex: 0,
    rightPair: 0,
    startButtonDisable: false,
    resultText: "",
    resultTextColor: "#000000",
  }

  randomNumber = () => {
    var temp = []
    var singlePairNumberTemp = 0
    for (let i = 0; i < 5; i++) {
      do {
        var random = Math.floor(Math.random() * 100)
      } while (temp.includes(random))
      temp.push(random)
      if (i < 4) temp.push(random)
      else singlePairNumberTemp = random
    }

    var buttonValueShowTemp = []
    for (let i = 9; i > 0; i--) {
      var position = Math.floor(Math.random() * i)
      buttonValueShowTemp.push(temp[position])
      temp.splice(position, 1);
    }

    this.setState({
      buttonValue: buttonValueShowTemp,
      buttonValueShow: buttonValueShowTemp,
      buttonTitle: "Mulai",
      buttonPressedStatus: [true, true, true, true, true, true, true, true, true],
      buttonColor: ["#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB", "#EBEBEBEB"],
      rightPair: 0,
      resultText: "",
      resultTextColor: "#000000",
      singlePairNumber: singlePairNumberTemp,
    })
  }

  startGame = () => {
    var show = ['?', '?', '?', '?', '?', '?', '?', '?', '?']
    this.setState({
      buttonValueShow: show,
      gameStarted: true,
      buttonPressedStatus: [false, false, false, false, false, false, false, false, false],
    })
  }

  checkAnswer = (buttonIndex) => {
    if (this.state.buttonValue[buttonIndex] == this.state.singlePairNumber) {
      var buttonColorTemp = this.state.buttonColor
      buttonColorTemp[buttonIndex] = "#eb4742"

      this.setState({
        buttonPressedStatus: [true, true, true, true, true, true, true, true, true],
        buttonTitle: "Mulai Game Baru",
        startButtonDisable: false,
        buttonValueShow: this.state.buttonValue,
        resultText: "Coba Lagi",
        resultTextColor: "#eb4742",
        isFirstPair: true,
        buttonColorTemp: buttonColorTemp,
      })
    } else {
      if (this.state.isFirstPair) {
        var firstValueTemp = this.state.buttonValue[buttonIndex]
        var buttonValueShowTemp = this.state.buttonValueShow
        buttonValueShowTemp[buttonIndex] = firstValueTemp
        var buttonPressedStatusTemp = this.state.buttonPressedStatus
        buttonPressedStatusTemp[buttonIndex] = true

        this.setState({
          firstValue: firstValueTemp,
          firstIndex: buttonIndex,
          buttonValueShow: buttonValueShowTemp,
          buttonPressedStatus: buttonPressedStatusTemp,
          isFirstPair: false,
          startButtonDisable: true,
        })
      } else {
        var secondValueTemp = this.state.buttonValue[buttonIndex]
        var buttonValueShowTemp = this.state.buttonValueShow
        buttonValueShowTemp[buttonIndex] = secondValueTemp
        var buttonPressedStatusTemp = this.state.buttonPressedStatus
        buttonPressedStatusTemp[buttonIndex] = true
        var buttonColorTemp = this.state.buttonColor

        if (this.state.firstValue == secondValueTemp) {
          buttonColorTemp[buttonIndex] = "#3cd681"
          buttonColorTemp[this.state.firstIndex] = "#3cd681"
          var right = this.state.rightPair + 1

          if (right == 4) {
            this.setState({
              buttonTitle: "Mulai Game Baru",
              startButtonDisable: false,
              resultText: "Selamat",
              resultTextColor: "#3cd681",
              buttonPressedStatus: [true, true, true, true, true, true, true, true, true],
              buttonValueShow: buttonValueShowTemp,
            })
          } else {
            this.setState({
              rightPair: right,
              buttonValueShow: buttonValueShowTemp,
              buttonPressedStatus: buttonPressedStatusTemp,
            })
          }
        } else {
          buttonColorTemp[buttonIndex] = "#eb4742"
          buttonColorTemp[this.state.firstIndex] = "#eb4742"

          this.setState({
            buttonPressedStatus: [true, true, true, true, true, true, true, true, true],
            buttonTitle: "Mulai Game Baru",
            startButtonDisable: false,
            buttonValueShow: this.state.buttonValue,
            resultText: "Coba Lagi",
            resultTextColor: "#eb4742",
          })
        }
        this.setState({
          isFirstPair: true,
          buttonColorTemp: buttonColorTemp,
        })
      }
    }
  }

  render() {
    return (

      <View style={styles.container}>
          <Text style={[styles.titleText]}>Game Memori Angka</Text>
        <View style={styles.title}>
          <Text style={[styles.titleText, { color: this.state.resultTextColor }]}>{this.state.resultText}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.marginRight20}>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(0)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[0] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[0] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[0]}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.marginRight20}>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(1)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[1] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[1] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[1]}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(2)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[2] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[2] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[2]}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.marginRight20}>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(3)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[3] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[3] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[3]}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.marginRight20}>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(4)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[4] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[4] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[4]}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(5)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[5] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[5] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[5]}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.marginRight20}>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(6)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[6] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[6] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[6]}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.marginRight20}>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(7)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[7] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[7] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[7]}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => {
              if (this.state.gameStarted) this.checkAnswer(8)
            }} disabled={this.state.gameStarted ? this.state.buttonPressedStatus[8] : true}>
              <View style={[{ backgroundColor: this.state.buttonColor[8] }, styles.numberButton]}>
                <Text style={styles.numberButtonFont}>{this.state.buttonValueShow[8]}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.button}>
          <Button title={this.state.buttonTitle}
            onPress={
              this.state.buttonTitle == "Mulai Game Baru" ? this.randomNumber : this.startGame
            }
            disabled={this.state.gameStarted ? this.state.startButtonDisable : false}></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  jumbotron: {
    flex: 0.5,
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numberButton: {
    fontSize: 30,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberButtonFont: {
    fontSize: 50,
  },
  marginRight20: {
    marginRight: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  }
});
