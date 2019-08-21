window.addEventListener('load', () => {

    const submitButton = window.submit;
    let map = initMap()



    submitButton.addEventListener('click', () => {

        let selectedFile = window.uploadedFile.files[0]
        let selectedFileType = selectedFile.type

        if (selectedFileType == 'text/csv') {
          console.log('correct')

          let data = new FormData();
          data.append('uploadedFile', selectedFile);

          uploadFile('/uploadFile', data).then((response) => {
              let totalCrimes = response.results.length
              console.log(totalCrimes)
              let crimeTypes = response.crime
              console.log(crimeTypes)

              let number = []
              let list = Object.keys(crimeTypes)
              let max = Object.keys(crimeTypes)[0]

              Object.keys(crimeTypes).map((type) => {

                let stats = document.createElement('p')
                stats.textContent = type

                let nm = document.getElementById('statistics')
                nm.appendChild(stats)

                let div = document.createElement('p')
                div.textContent = crimeTypes[type].count
                number.push(div.textContent)
                let nr = document.getElementById('crimeNumbers')
                nr.appendChild(div)


                if (crimeTypes[type].count > crimeTypes[max].count) {
                  max = type
                }
              })
                console.log(max) //max name here
                console.log(crimeTypes[max].count) //value of max

                document.getElementById('total').innerText = totalCrimes
                document.getElementById('popular').innerText = max


              response.results.forEach((item) => {
                  let markerLoc = new google.maps.LatLng(item.lat, item.long);

                  const crimeIcons = {
                      'Anti-social behaviour': {
                          url: 'icons/anti-social.png'
                      },
                      'Other crime': {
                          url: 'icons/other-crime.png'
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
                //dataset graph
                var ctx = document.getElementById('myChart');
                //random bar color plugin.
                var randomColorPlugin = {

                beforeUpdate: function(chart) {
                    var backgroundColor = [];
                    var borderColor = [];

                    for (var i = 0; i < chart.config.data.datasets[0].data.length; i++) {
                    	var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",";
                        backgroundColor.push(color + "1)");
                        borderColor.push(color + "1)");
                    }
                    chart.config.data.datasets[0].backgroundColor = backgroundColor;

                }
              };
              Chart.pluginService.register(randomColorPlugin);

              var ctx = document.getElementById('doughnut-chart').getContext('2d');
              var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                    labels: list,
                    datasets: [
                      {
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                        data: number,
                      }
                    ]
                  },
                  options: {
                    borderWidth: 1,
                    legend: {
                      position: 'bottom'
                    }
                  },
                  })
              });


                //ENABLE DATASET TAB
                let disableQaDataset = document.getElementById('qaDataset')
                disableQaDataset.removeAttribute("disabled");

                let disableDatasetTab = document.getElementById('datasetBtn')
                disableDatasetTab.removeAttribute("disabled")

                //DISABLE UPLOAD
                document.getElementById('qaUploadNew').setAttribute('disabled', true);
                document.getElementById('newDatasetBtn').setAttribute('disabled', true);

                instance2.close();
          }

          else {
              M.toast({html: 'Invalid file type format. Please upload datasets in .csv format only.'})
              instance2.close();
          }
})

    const menuWindows = Array.from(document.querySelectorAll('.menuWindow'))
    const tabs = Array.from(document.querySelectorAll('.tabItem'))
    const mainMenu = window.mainMenu
    const back = window.closeRightNav

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
                window.back.classList.remove('hidden')
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
        center: {lat: 51.5074, lng: 0.1078},
        zoom: 10,
        disableDefaultUI: false
    });

    return map
}

document.addEventListener('DOMContentLoaded', function () {
    var leftBar = document.getElementById('slide-out-left')
    var instance1 = M.Sidenav.init(leftBar);
    var rightBar = document.getElementById('slide-out-right')
    window.instance2 = M.Sidenav.init(rightBar, {edge: 'right'});
    var tooltip = document.querySelectorAll('.tooltipped');
    var instance3 = M.Tooltip.init(tooltip);
    var modal = document.querySelectorAll('.modal');
    var instances4 = M.Modal.init(modal);
});

    let qaAccess = Array.from(document.querySelectorAll('.tabItem'))

    qaAccess.map((qaAccessed) => {
      qaAccessed.addEventListener('click', () => {
        instance2.open();

        const target = qaAccessed.getAttribute('data-target')
        const toShow = document.getElementById(target)
        const menuWindows = Array.from(document.querySelectorAll('.menuWindow'))

        menuWindows.map((window) => {
            window.classList.add('hidden')
        })
})

})
let dremove = document.getElementById('removedata')

dremove.addEventListener('click', () => {
  window.location.reload()
})
