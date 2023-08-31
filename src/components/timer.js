import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import LottieView from 'lottie-react-native'

const Timer = ({onComplete,setSeconds}) => {
console.log(setSeconds)

    const [second, setSec] = useState(60);
    useEffect(() => {
        const timer = setInterval(() => {
          if (second === 0) {
            onComplete()
          }
          setSec((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      },[second]);
  return (
    <View>
      <LottieView
    source={require('../assets/lottieanimations/timer_border.json')} autoPlay loop
    style={{height:120,width:120,marginVertical:20,marginBottom:40}}
    />
    <View style={{position:'absolute',bottom:'45%',left:42,}}>
    <Text style={{fontWeight:'800',fontSize:20,color:second<=10?'red':'green',textAlign:'center'}}>{second}</Text>
    <Text style={{color:'black',fontSize:8,textAlign:'center'}}>Seconds Left</Text>
    </View>
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({})