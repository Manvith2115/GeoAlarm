import { View , StyleSheet , Text, TouchableOpacity, Vibration} from 'react-native'
import MapView, {Marker, Circle} from 'react-native-maps';
import Slider from '@react-native-community/slider'
import {useState,useEffect} from 'react';
import * as Location from 'expo-location';
import {getDistance} from '../utils/haversine'
import {Audio} from 'expo-av';
import { Vibration as RNVibration } from 'react-native';
import { subscribe } from 'expo-router/build/link/linking';


export default function Index(){
  const [setupDone,setSetupDone] = useState(false);
  const [pinLocation, setPinLocation] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [distance, setDistance] = useState(null);
  const [alarmActive, setAlarmActive] = useState(false);
  const [sound, setSound] = useState(null);
  const [radius, setRadius] = useState(500);
  
  const formatRadius = (value) => {
    if(value >= 1000){
        return `${(value/1000).toFixed(1)}km`;
    }
    return `${Math.round(value)}m`
  };

  useEffect(()=>{
    if(!myLocation || !pinLocation) return;

    const dist = getDistance(myLocation,pinLocation);
    setDistance(dist);

    if(dist<=radius && !alarmActive)
    {
      setAlarmActive(true);
      playAlarm();
    }
  },[myLocation,pinLocation]);

  const playAlarm = async () =>{

    RNVibration.vibrate([500,1000,500,1000],true);

    try{
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      const { sound : alarmSound } = await Audio.Sound.createAsync(
        require('../assets/alarm.mp3'),
        {
          shouldPlay : true, isLooping : true
        }
      );
      setSound(alarmSound);
    }
    catch(error){
      console.log("Error Playing Sound",error)
    }
  };

  const stopAlarm = async () =>{
    RNVibration.cancel();
    if(sound){
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    setAlarmActive(false);
  };

 const handleMapPress = (event) => {
  const coordinate = event?.nativeEvent?.coordinate ?? event?.coordinate;
  if (!coordinate) return;
  const { latitude, longitude } = coordinate;
  setPinLocation({ latitude, longitude });
};
useEffect(()=>{
  let subscriber = null;

  const startLocationTracking = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    // console.log('Permission status:', status);   

    if(status !== "granted"){
      setLocationError("Location permission denied");
      return;
    }

    subscriber = await Location.watchPositionAsync(
      {
        accuracy : Location.Accuracy.High,
        timeInterval : 3000,
        distanceInterval : 10,
      },
      (location) => {
        setMyLocation({
          latitude : location.coords.latitude,
          longitude : location.coords.longitude,
        });
      }
    );
  };

  startLocationTracking();

  return () =>{
    if(subscriber){
      subscriber.remove();
    }
  };
},[]);
if(!setupDone)
{
    return (
        <View style = {styles.setupContainer}>
            <Text style = {styles.setupTitle}>Set Alarm Radius</Text>
            <Text style = {styles.setupSubtitle}>Alarm triggers when you are within this distance</Text>
            <Text style = {styles.radiusValue}>{formatRadius(radius)}</Text>

            <Slider 
                style = {styles.slider}
                minimumValue={100}
                maximumValue={5000}
                step = {50}
                value = {radius}
                onValueChange={(value)=>setRadius(value)}
                minimumTrackTintColor='#ffffff'
                maximumTrackTintColor='#444444'
                thumbTintColor='#ffffff'/>

            <View style = {styles.sliderLabels}>
                <Text style = {styles.sliderLabel}>100m</Text>
                <Text style = {styles.sliderLabel}>5km</Text>
            </View>
            
            <TouchableOpacity 
                style = {styles.okButton}
                onPress = {()=> setSetupDone(true)}
            >
                <Text style = {styles.okButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
}

  return(
    <View style = {styles.container}>
      <MapView style = {styles.map}
      onPress = {handleMapPress}
      initialRegion={{
        latitude : 17.4065,
        longitude : 78.442,
        latitudeDelta : 0.05,
        longitudeDelta : 0.05,
      }}>
        {pinLocation && (<Marker coordinate={pinLocation}/>)
        }
        
        {pinLocation && (<Circle 
            center={pinLocation}
            radius={radius}
            fillColor='rgba(99,102,241,0.2)'
            strokeColor='rgba(99,102,241,0.8)'
            strokeWidth={2}/>
            )}
        {myLocation && (<Marker coordinate={myLocation}
        pinColor='blue'/>)}
      </MapView>
      {distance !== null && (
        <View style = {styles.distanceBox}>
          <Text style = {styles.distanceText}>
            {
              distance < 1000 ? `${Math.round(distance)}m away`
              : `${(distance/1000).toFixed(1)}km away`
            }
          </Text>

          {alarmActive ?(
            <TouchableOpacity style = {styles.stopButton} onPress={stopAlarm}>
              <Text style = {styles.stopButtonText}> Stop Alarm</Text>
            </TouchableOpacity>
          ) : 
          (distance <= radius && (
            <Text style = {styles.alarmText}> You are in alarm Zone!</Text>
          ))}
        </View>
      )}
    </View>
    // <View style = {styles.container}>
    //   <Text style = {styles.title}>Geo Alarm</Text>
    //   <Text style = {styles.subtitle}>Set a location. We'll wake you up.</Text>
    // </View>
  );
}

const styles = StyleSheet.create({

  setupContainer:{
    flex  : 1,
    backgroundColor: '#0f0f1a',
    justifyContent : 'center',
    paddingHorizontal : 32,
  },
  setupTitle:{
    fontSize : 32,
    fontWeight : 'bold',
    color : '#fffff',
    marginBottom : 8,
  },
  setupSubtitle:{
    fontSize : 14,
    color : '#888888',
    marginBottom:48,
    lineHeight : 22,
  },
  radiusValue:{
    fontSize : 56,
    fontWeight : 'bold',
    color : '#ffffff',
    textAlign : 'center',
    marginBottom : 24,
  },
  slider:{
    width : '100%',
    height : 40,
  },
  sliderLabels:{
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop : 4,
    marginBottom : 48,
  },
  sliderLabel:{
    color : '#888888',
    fontSize : 12,
  },
  okButton : {
    backgroundColor : '#ffffff',
    paddingVertical : 18,
    borderRadius : 12,
    alignItems:'center',
  },
  okButtonText : {
    color : '#0f0f1a',
    fontSize : 18,
    fontWeight : 'bold',
    letterSpacing : 1,
  },

  container : {
    flex : 1,
  },
  map:{
    flex : 1,
  },
  distanceBox : {
    backgroundColor : '#0f0f1a',
    padding : 16,
    alignItems : 'center'
  },
  distanceText : {
    color : `#ffffff`,
    fontSize : 18,
    fontWeight : 'bold'
  },
  radiusHint : {
    color : '#888888',
    fontSize : 14,
    marginTop : 8,
  },
  
  alarmText : {
    color : `#f5930b`,
    fontSize : 14,
    marginTop: 4,
  },
  stopButton : {
    backgroundColor : '#ef4444',
    paddingHorizontal : 32,
    paddingVertical : 12,
    borderRadius : 8,
    marginTop : 8,
  },
  stopButtonText: {
    color : '#ffffff',
    fontSize: 16,
    fontWeight : 'bold',
  },
});
