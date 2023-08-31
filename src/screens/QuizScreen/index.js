import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/colors'
import { Fonts } from '../../assets/Fonts'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Timer from '../../components/timer'
const Quiz = ({ navigation }) => {

  const [question, setQuestion] = useState()
  const [answer, setAnswer] = useState()
  const [submittedAns, setSubmit] = useState()
  const [score, setScore] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [questionsCount, setCount] = useState(0)
  const [correct, setCorrect] = useState()
  const [hiScore, setHiScore] = useState()
  const [madeHighScore, setMadeHighScore] = useState(false)
  const [resetTimer, setTimer] = useState(true)
  const [level, setLevel] = useState(0)
  const [flipAnimation] = useState(new Animated.Value(0));


  const startFlipAnimation = () => {
    Animated.timing(flipAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      flipAnimation.setValue(0);
    });
  };



  const generateQuestion = async () => {
    setTimer(true)
    setSubmitted(false)
    setCount((prev) => prev + 1)
    setSubmit('')
    startFlipAnimation()
    score % 5 === 0 ? setLevel((prev) => prev + 1) : null
    let a = Math.floor(Math.random() * (level * 100) + 1)
    let b = Math.floor(Math.random() * (level * 100) + 1)
    let operators = ['+', '-']
    let operator = operators[Math.round(Math.random())]
    setQuestion(`${a}${operator}${b}`)
    switch (operator) {
      case '+':
        setAnswer(a + b)
        break
      case '-':
        setAnswer(a - b)
    }
  }

  const checkHiScore = async () => {
    const value = await AsyncStorage.getItem('hiscore');
    if (value !== null) {
      setHiScore(value)
    }
    else {
      await AsyncStorage.setItem('hiscore', "0")
      setHiScore(0)
    }
  }

  useEffect(() => {
    checkHiScore()
    generateQuestion()
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.Secondary,
      },
      headerTintColor: Colors.White,
      title: "Maths Quiz",
      headerBackVisible: false,
      headerShadowVisible: false,
    })
  }, [])


  const checkAnswer = async () => {
    setSubmitted(true)
    if (parseInt(answer) === parseInt(submittedAns)) {
      setScore((prev) => prev + 1)
      setTimer(false)
      setCorrect(true)
      if (score >= +hiScore) {
        setHiScore(`${score + 1}`)
        await AsyncStorage.setItem('hiscore', `${score + 1}`)
        setMadeHighScore(true)
      }
    }
    else {
      setTimer(false)
      setCorrect()
      setScore(0)
      generateQuestion()
      setSubmitted(false)
      navigation.replace('Result', { score: score, answer: answer, opted: submittedAns, madeHighScore: madeHighScore })
    }
  }

  const showTimer = () => {
    return <Timer
      onComplete={() => checkAnswer('')}
      level={level}
    />
  }

  useEffect(() => {
    showTimer()
  }, [resetTimer])

  return (
    <View style={styles.main_conatiner}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary} translucent={true} />
      <View style={styles.content_container}>
        <View style={styles.score_container}>
          <Text style={styles.score_text}>Current Score. {score}</Text>
          <Text style={[styles.score_text,{color:'green'}]}>Level. {level}</Text>
          <Text style={[styles.score_text, { color: Colors.Black }]}>HiScore. {hiScore}</Text>
        </View>
        <Animated.View
          style={[
            styles.data_holder,
            {
              transform: [
                {
                  perspective: 1000,
                },
                {
                  rotateY: flipAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            },
          ]}
        >


          {
            resetTimer ? showTimer() : <View
              style={{ height: 120, width: 120, marginVertical: 20, marginBottom: 40 }}
            />
          }
          <Text style={styles.heading}>{questionsCount}. What is the value of:</Text>
          <Text style={styles.questionText}>{question}</Text>
          <TextInput
            style={styles.answer_placeholder}
            placeholder='Enter Your Answer!'
            keyboardType='numeric'
            value={submittedAns}
            editable={!submitted}
            onChangeText={(text) => setSubmit(text)}
          />

          {
            submitted ?
              <>

                <Text style={[styles.btn_text, { color: correct ? 'green' : 'red' }]}>Submitted Answer: {submittedAns ? submittedAns : 'NA'}</Text>
                <Text style={[styles.btn_text, { color: 'green' }]}>Correct Answer: {answer}</Text>
                <Text style={[styles.btn_text, { color: correct ? 'green' : 'red' }]}>Score : {correct ? '+1' : '0'}</Text>
              </> : null}
          {!submitted ?
            <TouchableOpacity
              style={styles.button}
              onPress={() => checkAnswer()}
            >
              <Text style={styles.btn_text}>Submit Answer</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={styles.button}
              onPress={() => generateQuestion()}
            >
              <Text style={styles.btn_text}>Next</Text>
            </TouchableOpacity>
          }
        </Animated.View>
      </View>
    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
  main_conatiner: {
    flex: 1,
    backgroundColor: Colors.Secondary
  },
  content_container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: Colors.Primary,
    elevation: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: 30,
    color: Colors.Black,
  },
  questionText: {
    color: Colors.Black,
    fontSize: 24,
    fontFamily: Fonts.Regular
  },
  data_holder: {
    flex: 1,
    marginTop: 10,
    // elevation:5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.White,
    width: '100%',
    alignItems: 'center',
    // justifyContent:'center'
  },
  answer_placeholder: {
    width: "60%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    elevation: 5,
    backgroundColor: 'white',
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.White,
    marginBottom: 20
  },
  button: {
    width: "50%",
    paddingVertical: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 9999,
    backgroundColor: Colors.Primary,
    elevation: 5
  },
  btn_text: {
    color: Colors.White,
    fontFamily: Fonts.Regular,
    letterSpacing: 1,
    fontSize: 15
  },
  score_container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    width: '80%'
  },
  score_text: {
    color: Colors.White,
    fontWeight: 'bold',
    letterSpacing: 1.2
  }

})