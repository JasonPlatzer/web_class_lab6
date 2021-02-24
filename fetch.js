let url = 'https://api.wheretheiss.at/v1/satellites/25544'
let issLat = document.querySelector('#iss_lat')
let issLong = document.querySelector('#iss_long')
let timeIssLocationFetched = document.querySelector('#time')
let update = 10000
let maxFailedAttemps = 3
let issMarker
let icon =L.icon({
    iconUrl: 'noun_iss_956251.png',
    iconSize: [50, 50],
    iconAnchor: [25,25]
})
let map = L.map('iss-map').setView([0, 0], 1)  // Center at 0, 0 and max zoom out

// Add the tile layer - roads, streets etc. Without this, nothing to see 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',    
}).addTo(map)

iss(maxFailedAttemps)
//setInterval(iss, update)  //10 seconds set interval calls function every 10 seconds

function iss(attemps){
    if (attemps <= 0){
        alert('Attempted to contact server')
        return
    }
fetch(url).then((res) => {
    return res.json()

}).then( (issData) => {
    console.log(issData)
    let lat = issData.latitude
    let long = issData.longitude
    issLat.innerHTML = lat
    issLong.innerHTML = long

    if (!issMarker){
        issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
    }else{
        issMarker.setLatLng([lat, long])

    }
    let now =  Date()
    timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`
}).catch((err)=> {
    attemps--
    console.log('ERROR!', err)
}).finally(() => {
    setTimeout(iss, update, attemps)

})
}