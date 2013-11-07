/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function()
    {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id)
    {
        //navigator.notification.alert("Cordova is working")
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        window.localStorage.setItem("lat", "12.95");
        window.localStorage.setItem("lng", "77.70");

        function onSuccess(position)
        {
            currLat = position.coords.latitude;
            window.localStorage.setItem("lat", currLat);
            currLong = position.coords.longitude;
            window.localStorage.setItem("lng", currLong);
            currAlt = position.coords.altitude;
            
            app.codeLatLng();
        }
        
        function onError(error) {
            cosole.log('code: '    + error.code    + '\n' +
                       'message: ' + error.message + '\n');
        }
        
        try {
            FB.init({ appId: "642248459160399", nativeInterface: CDV.FB, useCachedDialogs: false });
        } catch (e) {
            alert(e);
        }
    },

    codeLatLng: function()
    {
        var geocoder;
        geocoder = new google.maps.Geocoder();

        var lat = window.localStorage.getItem("lat");
        var lng = window.localStorage.getItem("lng");
        
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status)
                         {
                         
                         if (status == google.maps.GeocoderStatus.OK)
                         {
                         
                         if (results[1])
                         {
                         var locationLength = results[1].address_components.length;

                         for(var j = 0; j < locationLength; j++)
                         {
                         if(results[1].address_components[j].types[0] == "locality")
                         {
                         window.localStorage.setItem("currentCityName", results[1].address_components[j].long_name);
                         }
                         }
                         
                         }
                         else
                         {
                         alert('No results found');
                         }
                         
                         }
                         else
                         {
                         alert('Geocoder failed due to: ' + status);
                         }
                         
                         });
    }
};
