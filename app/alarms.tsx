import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Switch, Text, TouchableOpacity, View } from 'react-native';
import { deleteAlarm, getAlarms, updateAlarm } from '../utils/storage';

function AlarmCard({ alarm, onToggle, onEdit, onDelete }) {


    const formatRadius = (value) =>{
        if(value >= 1000)
            return `${(value/1000).toFixed(1)}km`;
        else
            return `${Math.round(value)}m`;
    };
    return(
        <View>
            <Text>{alarm.name}</Text>
            <Text>{formatRadius(alarm.radius)}</Text>
            <Switch
                value = {alarm.isActive}
                onValueChange={(value)=>onToggle(value)}
            />
            <TouchableOpacity onPress = {onEdit}>
                <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {onDelete}>
                <Text>🗑️</Text>
            </TouchableOpacity>
        </View>
    )
  // show alarm.name, alarm.radius formatted, Switch, edit button, delete button
}

export default function Alarms() {


    const [alarms,setAlarms] = useState([]);
    const [loading,setLoading] = useState(true);

    useFocusEffect(
    useCallback(() => {
        const load = async () => {
        const ala = await getAlarms();
        console.log('loaded alarms:', ala);
        setAlarms(ala);
        setLoading(false);
        };
        load();
  }, [])
);

    function handleToggle(id,value){
        const updated = alarms.map(a=>a.id === id? {...a,isActive : value} : a);
        updateAlarm(id,{isActive : value});
        setAlarms(updated);
    }
    function handleDelete(id){
        const updated =  alarms.filter(a=> a.id !== id)
        deleteAlarm(id);
        setAlarms(updated);
    }
    
    if(loading === true)
    {
        return( <View><Text>...Loading</Text></View>)
    }
    else
    {
        return(
            <View>
                <Text>GeoAlarm</Text>
                <FlatList
                    data={alarms}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item })=>(
                        <AlarmCard 
                        alarm={item}
                        onToggle={(value)=>{handleToggle(item.id,value)}}
                        onEdit={()=>router.push(`/setup?id=${item.id}`)}
                        onDelete={()=>handleDelete(item.id)}
                        />
                    )}
                />

                <TouchableOpacity onPress={()=>router.push('/setup')}>
                    <Text>➕</Text>
                </TouchableOpacity>
            </View>
        )
    }

}