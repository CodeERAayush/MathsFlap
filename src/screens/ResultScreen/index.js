import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Colors } from '../../constants/colors'
import { Fonts } from '../../assets/Fonts'
import Resultcard from '../../components/resultCard'
import Sound from 'react-native-sound'


const Result = ({ navigation }) => {
  const route = useRoute()
  useEffect(() => {
    setTimeout(() => {
      startShakeAnimation()
    }, 300)
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.Secondary,
      },
      headerTintColor: Colors.White,
      title: "Result",
      headerBackVisible: false,
      headerShadowVisible: false,
    })
  })
  const [shakeAnimation] = useState(new Animated.Value(0));

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 20,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -20,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  Sound.setCategory('Playback');

  const soundObject = new Sound(
    `http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a`,
    null,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log(
        'duration in seconds: ' +
          soundObject.getDuration() +
          'number of channels: ' +
          soundObject.getNumberOfChannels(),
      );
      soundObject.setVolume(1)
      soundObject.play()
    },
  );


  return (
    <View style={styles.main_conatiner}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary} translucent={true} />
      <View style={styles.content_container}>
        <Animated.View
          style={[
            styles.data_holder,
            {
              transform: [
                {
                  translateX: shakeAnimation,
                },
              ],
            },
          ]}
        >
          <Resultcard
            madeHighScore={route?.params?.madeHighScore}
            score={route?.params?.score}
            opted={route?.params?.opted}
            answer={route?.params?.answer}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('Quiz')}
          >
            <Text
              style={styles.btn_text}
            >Restart Game</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  )
}

export default Result

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
  data_holder: {
    flex: 1,
    marginTop: 10,
    elevation: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: Colors.White,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
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
})