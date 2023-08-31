import { StyleSheet, Text, View,StatusBar,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Colors } from '../../constants/colors'
import { Fonts } from '../../assets/Fonts'
import Resultcard from '../../components/resultCard'
const Result = ({navigation}) => {
  const route=useRoute()
  useEffect(()=>{
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
  return (
    <View style={styles.main_conatiner}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.Secondary} translucent={true} />
      <View style={styles.content_container}>
<View style={styles.data_holder}>
<Resultcard
madeHighScore={route?.params?.madeHighScore}
score={route?.params?.score}
opted={route?.params?.opted}
answer={route?.params?.answer}
/>

<TouchableOpacity
style={styles.button}
onPress={()=>navigation.replace('Quiz')}
>
  <Text
  style={styles.btn_text}
  >Restart Game</Text>
</TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
  main_conatiner:{
    flex:1,
    backgroundColor:Colors.Secondary
  },
  content_container:{
    flex:1,
    marginTop:40,
    backgroundColor:Colors.Primary,
    elevation:20,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    alignItems:'center',
    justifyContent:'center'
  },
  data_holder:{
    flex:1,
    marginTop:10,
    elevation:5,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    backgroundColor:Colors.White,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:100
  },
  button:{
    width:"50%",
    paddingVertical:20,
    marginTop:10,
    paddingHorizontal:10,
    alignItems:'center',
    borderRadius:9999,
    backgroundColor:Colors.Primary,
    elevation:5
  },
  btn_text:{
    color:Colors.White,
    fontFamily:Fonts.Regular,
    letterSpacing:1,
    fontSize:15
  },
})