Aria.tplScriptDefinition({
    $classpath : "app.templates.details.LayoutScript",
	$constructor: function(){
		var myScroll;
                         var jsonData = {};
	},    
	$prototype : {

        $displayReady: function(){
                         
                         
            myScroll = new iScroll('wrapper');
            
             var cityData = JSON.parse(window.localStorage.getItem("clickedCityDetails"));
             var eventsData = JSON.parse(window.localStorage.getItem(cityData.cityName));

            this.initialize(eventsData.airport.lat, eventsData.airport.lng);

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
        },
         $dataReady: function(){
         
         //     var cityData = JSON.parse(window.localStorage.getItem("clickedCityDetails"));
         //     alert("cityData " + cityData);
         //
         //     alert(cityData.cityName);
         //
         //     var eventsData = JSON.parse(window.localStorage.getItem(cityData.cityName));
         //     alert("CityName " + eventsData.name);
         //
         //     alert("airport.airport.name " + eventsData.airport.name);
         //     alert("airport.airport.name " + eventsData.airport.lat);
         //     alert("airport.airport.name " + eventsData.airport.lng);
         //
         //
         //     alert("eventsData.airport.name " + eventsData.events[0].event_name);
         //     alert("eventsData.airport.name " + eventsData.events[0].image);
         //     alert("eventsData.airport.name " + eventsData.events[0].description);
         //
         //     alert(cityData.desc);
         //     alert(cityData.imageID);
         
         
         
         //JSON Data
         var cityData = JSON.parse(window.localStorage.getItem("clickedCityDetails"));
         var eventsData = JSON.parse(window.localStorage.getItem(cityData.cityName));
         
         var placeDetailsJson = {};
         placeDetailsJson.cityDetail = {};
         
         placeDetailsJson.cityDetail.name = eventsData.name;
         placeDetailsJson.cityDetail.description = cityData.desc;
         placeDetailsJson.cityDetail.imageID = cityData.imageID;
         
         placeDetailsJson.events = eventsData;
         this.data = placeDetailsJson;
         
         //this.initialize(eventsData.airport.lat, eventsData.airport.lng);

         },
                         
         initialize : function (lat, lng) {
         var myLatlng = new google.maps.LatLng(lat,lng);
         var mapOptions = {
         zoom: 4,
         center: myLatlng,
         mapTypeId: google.maps.MapTypeId.ROADMAP
         };
         
         var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
         
         var contentString = '<div id="content">'+
         '<div id="siteNotice">'+
         '</div>'+
         '<h1 id="firstHeading" class="firstHeading">Deals</h1>'+
         '<div id="bodyContent">'+
         '<p>Description of deals ' +
         '<p><button onclick="javascript:bookButtonClicked()">Book</button> ' +
         
         '</div>'+
         '</div>';
         var that = this;
         var infowindow = new google.maps.InfoWindow({
                                                     content: contentString
                                                     });
         
         var marker = new google.maps.Marker({
                                             position: myLatlng,
                                             map: map,
                                             title: 'Deals'
                                             });
         google.maps.event.addListener(marker, 'click', function() {
                                       infowindow.open(map,marker);
                                       });
         },
                         
                         bookingAction: function ()
                         {
//window.open('http://m.cleartrip.com/flights/international/results?from=CLE&to=ATL&depart_date=29/01/2014&adults=1&childs=0&infants=0&class=Economy&airline=&carrier=&intl=y&sd=1382640014893&page=loaded', '_blank', 'location=yes, toolbar=yes')

                         var originAptCode = window.localStorage.getItem("gpsCityCode");
                         var destinationAptCode = "LHR";
                         
                         var bookingUrl = "http://cleartrip.com/flights/international/results?from=" + originAptCode + "&to=" + destinationAptCode + "&depart_date=XXXXXXXX&adults=1&childs=0&infants=0&class=Economy&airline=&carrier=&intl=y&sd=1382640014893&page=loaded";
                         
                         window.open(bookingUrl, '_blank', 'location=yes');
                         }
                         

    }
                         
});