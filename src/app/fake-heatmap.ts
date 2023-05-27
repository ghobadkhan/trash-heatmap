const LatLng = google.maps.LatLng
const locTolerance = 0.003

export function generateHeatMapData(n:number, lat: number, lng: number, weight:number):
 google.maps.visualization.WeightedLocation[] {
    let res = []
    if (weight < 3) weight += 3 - weight
    const randLat = () => genRandRange(lat,locTolerance,4)
    const randLng = () => genRandRange(lng,locTolerance,4)
    const randWeight = () => genRandRange(weight,3,1)
    for(let i = 0; i < n; i++) {
        let tLat = randLat(); let tLng = randLng();  let tWeight = randWeight()
        // console.log(tLat,tLng, tWeight)
        res.push({
            location: new LatLng(tLat,tLng),
            weight: tWeight
        })
    }
    return res
}

export const also = [
    {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
    {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
    {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
    {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
    {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},
    {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
    {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
    {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
    {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
    {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
  ]

function genRandRange(center: number, length: number, digits: number = 3) : number {
    let num = Math.random() * length * 2 + (center - length)
    let coeff = Math.pow(10, digits)
    return Math.round(num * coeff)/(coeff)
}