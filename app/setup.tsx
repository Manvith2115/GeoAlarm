import { getAlarms, saveAlarm, updateAlarm } from '@/utils/storage';
import Slider from '@react-native-community/slider';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function Setup() {
  const [name, setName] = useState('');
  const [radius, setRadius] = useState(500);
  
    const { id } = useLocalSearchParams();

    useEffect(()=>{
        const load = async() =>{
            if(!id) return;
            const ala = await getAlarms();
            const alarm = ala.find(a => a.id === id);
            if(alarm)
            {
                setName(alarm.name);
                setRadius(alarm.radius);
            }
        };
        load();
    },[])

        async function handleSave() {
        console.log('saving alarm with:', { name, radius, id });
        
        if (id) {
            await updateAlarm(id, { name, radius });
        } else {
            const saved = await saveAlarm({ name, radius });
            console.log('saved result:', saved);
        }
        router.replace(`/map?radius=${radius}&alarmId=${id || ''}`);
        }

    const formatRadius = (value) =>{
        if(value >= 1000)
            return `${(value/1000).toFixed(1)}km`;
        else
            return `${Math.round(value)}m`;
    };

  return (

    <View>
        <TextInput
            value = {name}
            onChangeText = {(text) => setName(text)}
            placeholder = "Enter Alarm name"
        />

        <Slider 
                minimumValue={100}
                maximumValue={5000}
                step = {50}
                value = {radius}
                onValueChange={(value)=>setRadius(value)}
                minimumTrackTintColor='#ffffff'
                maximumTrackTintColor='#444444'
                thumbTintColor='#ffffff'/>

        <Text>{formatRadius(radius)}</Text>
        <TouchableOpacity onPress={handleSave}>
            <Text>Save</Text>
        </TouchableOpacity>


    </View>
    
  );
}