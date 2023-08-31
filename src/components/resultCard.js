import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'
import { Fonts } from '../assets/Fonts'
import LottieView from 'lottie-react-native'

const Resultcard = (props) => {
    const {madeHighScore,score,opted,answer}=props
  return (
    <View style={{alignItems:'center'}}>
      { 
      madeHighScore?
      <LottieView
       loop={false}
    source={require('../assets/lottieanimations/celebration.json')} autoPlay
    style={{height:250,width:250,marginVertical:20,marginBottom:40,position:'absolute',alignSelf:'center',bottom:-120}}
    />
:
<LottieView
loop={false}
source={require('../assets/lottieanimations/failure.json')} autoPlay
style={{height:250,width:250,marginBottom:0}}
/>
}
       { 
       madeHighScore?
       <>
       <Text style={styles.heading}>🎉🎉</Text>
       <Text style={styles.heading}>Congratulations You've Made a New Hi-Score!</Text>
      <Text style={styles.result_text}>Score: {score}</Text>
       </>
       :
       <>
       <Text style={styles.heading}>Score:</Text>
      <Text style={styles.result_text}>{score}</Text>
      <View style={{marginTop:20}}>
      <Text style={styles.reveal_ans}>The correct answer was: <Text style={{fontWeight:'bold',fontSize:14,color:'green'}}>{answer}</Text></Text>
      <Text style={styles.reveal_ans}>But you entered: <Text style={{fontWeight:'bold',fontSize:14,color:'red'}}>{opted}</Text></Text>
      </View>
      </>
      }
    </View>
  )
}

export default Resultcard

const styles = StyleSheet.create({
    result_text:{
        color:Colors.Black,
        fontSize:36,
        fontFamily:Fonts.Regular,
        fontWeight:'800'
      },
      heading:{
        color:Colors.Black,
        fontSize:24,
        textAlign:'center',
        marginTop:10
      },
      reveal_ans:{
        color:'black',
        letterSpacing:1.2,
        fontSize:12,
        textAlign:'center'
      }
})