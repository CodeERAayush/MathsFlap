import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../constants/colors'
import LottieView from 'lottie-react-native'

const SplashScreen = ({navigation}) => {

    useEffect(()=>{
        setTimeout(function(){
            navigation.replace('Quiz')
        },3000)
        navigation.setOptions({
          headerShown: false,
      })
    })


  return (
    <View style={styles.main_container}>
                  <StatusBar barStyle="light-content" backgroundColor={Colors.Primary} translucent={true} />
                  <LottieView
    source={require('../../assets/lottieanimations/timer.json')} autoPlay loop
    style={{height:250,width:250,marginVertical:20,marginBottom:40}}
    />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  main_container:{
    flex : 1 , backgroundColor:Colors.White, justifyContent:"center", alignItems :"center"
  }
})