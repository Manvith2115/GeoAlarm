import { View , StyleSheet } from 'react-native'
import MapView, {Marker, Circle} from 'react-native-maps';
import {useState} from 'react';


export default function Index(){
  const [pinLocation, setPinLocation] = useState(null);

 const handleMapPress = (event) => {
  const coordinate = event?.nativeEvent?.coordinate ?? event?.coordinate;
  
  if (!coordinate) {
    console.log('No coordinate found in event');
    return;
  }

  const { latitude, longitude } = coordinate;
  setPinLocation({ latitude, longitude });
};
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
      </MapView>
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
});
