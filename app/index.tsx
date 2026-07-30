import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

export default function Index() {

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
  Animated.sequence([
    Animated.timing(opacity,{toValue : 1,duration : 1000,useNativeDriver : true}),
    Animated.delay(50),
    Animated.timing(opacity,{toValue : 0,duration : 800,useNativeDriver : true}),
  ]).start(()=>{
    router.replace('/alarms');
  })

  },[])
  return (
    <Animated.View style = {{opacity, flex : 1,backgroundColor : '#0f0f0f',alignItems : 'center',justifyContent : 'center'}}>
      <Text style={styles.title}>GeoAlarm</Text>
      <Text style={styles.subtitle}>Set the Location.{'\n'}Not an Alarm.</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title:{
    fontSize : 39,
    fontWeight : 'bold',
    color : '#ffffff',
    letterSpacing : 2,
  },
  subtitle : {
    fontSize: 20,
    color : '#888888',
    marginTop : 12,
    lineHeight : 28,
    
    // alignContent : 'center'
  }
});
