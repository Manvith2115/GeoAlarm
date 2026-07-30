import AsyncStorage from '@react-native-async-storage/async-storage';

const ALARMS_KEY = 'geoalarm_alarms';
const ACTIVE_ALARM_KEY = 'geoalarm_active'; 


//To get all the saved alarms once we open the app ig
export const getAlarms = async () => {
    try{
        
        const data = await AsyncStorage.getItem(ALARMS_KEY);
        return data ? JSON.parse(data) : [];
    }
    catch(error){
        console.log("Getting alarm has error : ",error);
        return [];
    }
};

// To save a new alarm

export const saveAlarm = async(alarm)=>{
    try{
            const alarms = await getAlarms();
            const newAlarm = {
                ...alarm,
                id : Date.now().toString(),
                createdAt : Date().toString(),
                isActive : false,
                status : 'idle',
            };
            const updated = [...alarms, newAlarm];
            await AsyncStorage.setItem(ALARMS_KEY,JSON.stringify(updated));
            return newAlarm;
    }
    catch(error)
    {
        console.log("Error at save Alarm : ",error)
    }
};

//Update or edit and existing Alaram

export const updateAlarm = async (id,updates) =>{
   try{
    const alarms = await getAlarms();
    const updated = alarms.map(alarm => alarm.id === id ? {...alarm,...updates} : alarm);
    await AsyncStorage.setItem(ALARMS_KEY,JSON.stringify(updated));
    return updated;
   }
   catch(error)
   {
    console.log("Error in updating alarm : ",error);
   }
};

export const deleteAlarm = async(id) => {
   try{
    const alarms = await getAlarms();
    const updated = alarms.filter(alarm => alarm.id !== id)
    await AsyncStorage.setItem(ALARMS_KEY,JSON.stringify(updated));
    return updated;
   }
   catch(error)
   {
    console.log("Error in deleting alarm : ",error);
   }
};

export const setActiveAlarm = async(alarm) =>{
    try {
    await AsyncStorage.setItem(ACTIVE_ALARM_KEY, JSON.stringify(alarm));
  } catch (error) {
    console.log('Error setting active alarm:', error);
  }
};

export const getActiveAlarm = async()=>{
    try {
    const data = await AsyncStorage.getItem(ACTIVE_ALARM_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Error getting active alarm:', error);
    return null;
  }
};

export const clearActiveAlarm = async()=>{
   try {
    await AsyncStorage.removeItem(ACTIVE_ALARM_KEY);
  } catch (error) {
    console.log('Error clearing active alarm:', error);
  }
};
