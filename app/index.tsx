import { View , StyleSheet , Text, TouchableOpacity} from 'react-native'
import { router } from 'expo-router';
// import { subscribe } from 'expo-router/build/link/linking';

export default function Index() {
  return(
    <View style = {styles.container}>
      <View style = {styles.titleSection}>
        <Text style = {styles.title}>GeoAlarm</Text>
        <Text style = {styles.subtitle}>Set a Location{'\n'}Not an Alarm</Text>
      </View>
      <TouchableOpacity
        style = {styles.startButton}
        onPress ={()=>router.push('/map')}
        >
          <Text style = {styles.startButtonText}>Set Alarm</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container : {
    flex : 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    paddingVertical: 24,
  },
  titleSection:{
    flex : 1,
    justifyContent : 'center',
  },
  title:{
    fontSize : 39,
    fontWeight : 'bold',
    color : '#ffffff',
    letterSpacing : 2,
    alignItems: 'center'
  },
  subtitle : {
    fontSize: 20,
    color : '#888888',
    marginTop : 12,
    lineHeight : 28,
    marginLeft : 30,
    
    // alignContent : 'center'
  },
  startButton : {
    backgroundColor : '#ffffff',
    paddingVertical : 18,
    borderRadius : 12,
    
    alignItems: 'center',
  },
  startButtonText:{
    color : '#0f0f1a',
    fontSize : 18,
    fontWeight : 'bold',
    letterSpacing : 1,
  },
});
