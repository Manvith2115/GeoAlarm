const toRadians = (degrees) =>{
    return degrees * (Math.PI/180)
};

export const getDistance = (coord1,coord2)=>{
    const R = 6317000;

    const lat1 = toRadians(coord1.latitude);
    const lat2 = toRadians(coord2.latitude);

    const deltaLat = toRadians(coord2.latitude - coord1.latitude)
    const deltaLng = toRadians(coord2.longitude - coord1.longitude)

    const a = 
    Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLng/2) * Math.sin(deltaLng/2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R*c;

    return distance;
}