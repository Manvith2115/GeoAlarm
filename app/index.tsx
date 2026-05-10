import {Text, View , StyleSheet } from 'react-native'

export default function Index(){
  return(
    <View style = {styles.container}>
      <Text style = {styles.title}>Geo Alarm</Text>
      <Text style = {styles.subtitle}>Set a location. We'll wake you up.</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  subtitle : {
    fontSize : 16,
    color : '#888888',
    marginTop : 8,
  },

  title : {
    fontSize: 32,
    fontWeight: 'bold',
    color : '#ffffff'
  },
  container : {
    flex : 1,
    backgroundColor : '#0f0f1a',
    justifyContent : 'center',
    alignItems : 'center'
  },
});
