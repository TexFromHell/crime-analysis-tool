window.addEventListener('load', () => {
  const submitButton = window.submit;
  let map = initMap()



  submitButton.addEventListener('click', () => {
    let selectedFile = window.uploadedFile.files[0]

    console.log(selectedFile)

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


function initMap() {

  alert('jezeli uzywasz google, pamietaj zeby dodac API_KEY DO google maps w index.html PLACEHOLDER (API_KEY)')

  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.256014, lng:0.967072},
    zoom: 15
  });

  return map
}


function uploadFile(url, data) {
  return new Promise((resolve, reject) => {
    fetch(url, {
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
