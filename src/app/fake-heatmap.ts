const LatLng = google.maps.LatLng

export function generateHeatMapData(n:number, lat: number, lng: number, weight:number):
 google.maps.visualization.WeightedLocation[] {
    let res = []
    if (weight < 3) weight += 3 - weight
    const randLat = () => genRandRange(lat,1,5)
    const randLng = () => genRandRange(lng,1,5)
    const randWeight = () => genRandRange(weight,3,1)
    for(let i = 0; i < n; i++) {
        res.push({
            location: new LatLng(randLat(), randLng()),
            weight: randWeight()
        })
    }
    return res
}

function genRandRange(center: number, length: number, digits: number = 3) : number {
    let num = Math.random() * length * 2 + (center - length)
    return Math.round(num * 10^digits)/(10^digits)
}