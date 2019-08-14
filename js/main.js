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

          const crimeIcons = {
            'Anti-social behaviour': {
              url: 'icons/anti-social.png'
            },
            'Other crime': {
              url:'icons/other-crime.png'
            },
            'Vehicle crime': {
              url: 'icons/vehicle.png'
            },
            'Violence and sexual offences': {
              url: 'icons/rape.png'
            },
            'Public order': {
              url: 'icons/public-order.png'
            },
            'Other theft': {
              url: 'icons/other-theft.png'
            },
            'Criminal damage and arson': {
              url: 'icons/fire.png'
            },
            'Drugs': {
              url: 'icons/drug.png'
            },
            'Possession of weapons': {
              url: 'icons/shooting.png'
            },
            'Theft from the person': {
              url: 'icons/theft.png'
            },
            'Robbery': {
              url: 'icons/robbery.png'
            },
            'Shoplifting': {
              url: 'icons/shop.png'
            },
            'Bicycle theft': {
              url: 'icons/bicycle.png'
            },
            'Burglary': {
              url: 'icons/burglary.png'
            }
          }

            var marker = new google.maps.Marker({
              position: markerLoc,
              title: item.crime,
              icon: crimeIcons[item.crime]
            });
            marker.setMap(map);
            map.panTo(new google.maps.LatLng(item.lat, item.long))
          })
        })
  })

  const menuWindows = Array.from(document.querySelectorAll('.menuWindow'))

  const tabs = Array.from(document.querySelectorAll('.tabItem'))

  const mainMenu = window.mainMenu

  mainMenu.addEventListener('click', () => {
    window.tabs.classList.remove('hidden') // show the tabs again

    menuWindows.map((window) => {
      window.classList.add('hidden') //hide all current opened windows
    })
  })

  tabs.map((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target')
        const toShow = document.getElementById(target)

        if (toShow) {
          toShow.classList.remove('hidden')
        }
        
        window.tabs.classList.add('hidden')

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


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
