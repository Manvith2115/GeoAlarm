import { View , StyleSheet , Text} from 'react-native'
import MapView, {Marker, Circle} from 'react-native-maps';
import {useState,useEffect} from 'react';
import * as Location from 'expo-location';
import {getDistance} from '../utils/haversine'
import { subscribe } from 'expo-router/build/link/linking';


export default function Index(){
  const [pinLocation, setPinLocation] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(()=>{
    if(!myLocation || !pinLocation) return;

    const dist = getDistance(myLocation,pinLocation);
    setDistance(dist);
  },[myLocation,pinLocation]);


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
    console.log('Permission status:', status);

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
            radius={500}
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
          {distance <= 500 && (
            <Text style = {styles.alarmText}> You are in alarm Zone!</Text>
          )}
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
  alarmText : {
    color : `#f5930b`,
    fontSize : 14,
    marginTop: 4,
  },
});
