window.addEventListener('load', () => {
  const submitButton = window.submit;
  let map = initMap()

  submitButton.addEventListener('click', () => {
    let selectedFile = window.uploadedFile.files[0]

    console.log(selectedFile.path)

    let data = new FormData();
        data.append('uploadedFile', selectedFile);

        uploadFile('/uploadFile', data).then((response) => {
          console.log(response)
          response.results.forEach((item) => {
            let markerLoc = new google.maps.LatLng(item.lat,item.long);
            console.log(item)

            var marker = new google.maps.Marker({
              position: markerLoc,
              title:item.crime
            });

            marker.setMap(map);

            map.panTo(new google.maps.LatLng(item.lat, item.long))
          })
        })
  })
})

function uploadFile(url, data) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/uploadFile', {
      method: 'POST',
      body: data,
    }).then(function (res) {
      return res.json()
    }).then((data) => {
      resolve(data)
    }).catch(error => {
      reject(error)
    });
  })
}


function initMap() {

  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.5074, lng:0.1078},
    zoom: 10,
    disableDefaultUI: false
  });

  return map
}

document.addEventListener('DOMContentLoaded', function() {
  var leftBar = document.getElementById('slide-out-left')
  var instance1 = M.Sidenav.init(leftBar);
  var rightBar = document.getElementById('slide-out-right')
  var instance2 = M.Sidenav.init(rightBar, {edge:'right'});
});
