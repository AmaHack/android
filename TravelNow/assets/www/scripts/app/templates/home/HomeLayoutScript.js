Aria.tplScriptDefinition({
    $classpath : "app.templates.home.HomeLayoutScript",
	$constructor: function(){
		var myScroll;
	},
	$prototype : {

        $displayReady: function(){
        	$(".mask, .dialog, .popUp").hide();
			
			$(".close").click(function(){
				$(".mask, .dialog, .popUp").hide();
			});			

			myScroll = new iScroll('wrapper');
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
		},
     facebookData: function(){
     
     $(".loading, .mask").show();
     
     //                         fbeventful.locationEvent();
     
     this.facebookLogin();
     },
     facebookLogin : function(){
     
     if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
     if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
     if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
                         var that = this;
     
     var AccessTokenByFB;
     FB.login(
              function(response)
              {
              
              //Getting SELF information from FB
              FB.api('/me', function(response)
                     {
                     
                     //Successful response
                     if (response.authResponse != null)
                     {
                     var access_token =   FB.getAuthResponse()['accessToken'];
                     AccessTokenByFB = access_token;
                     }
                     
                     alert("Good to see you, " + response.name + ".")

                     //facebook CurrentLocation (ex: Bangalore, India)
                     facebookCurrentLocation = response.location.name;
                     var re = /\s*, \s*/;
                     facebookCurrentCity = facebookCurrentLocation.split(re);

//                     alert("facebookCurrentCity " + facebookCurrentCity[0]);
                     window.localStorage.setItem("facebookCurrentCity", facebookCurrentCity[0]);

                     that.getFriendCheckinList();
                     });
              },
              { scope: "user_location, user_events friends_activities, friends_groups, friends_interests, friends_likes, friends_location, friends_events, friends_photos, friends_status, friends_groups, friends_likes, user_friends, user_interests, user_photo_video_tags, friends_photo_video_tags"}
              );
     },
     getFriendCheckinList : function(){
//     alert("Inside getFriendsCheckins");
     
     var friendIDs = new Array();
     var fdata;
     
     var friendsCount = 0;
     var count = 0;
     var one = 1;
     
     var arrOfPlaces = new Array();

     var that = this;
                         
     //Getting the friends data
     FB.api('/me/friends', { fields: 'id, name'},  function(response)
            {
            if (response.error)
            {
            }
            else
            {
            var data = document.getElementById('data');
            fdata=response.data;
            
            //Total friends' count from FB
            friendsCount = fdata.length;
//            alert("friendsCount original -- " + friendsCount);
            
            //Addding the friends' ID to array
            for(var x = 0; x < 100; x++)
            {
            friendIDs.push(fdata[x].id);
            }
            
            //Pushing an empty friend ID
            friendIDs.push("");
//            alert("friendIDs count after -- " + friendIDs.length);
            
//            alert("friendIDs " + friendIDs);
            
            //Getting the checkin result for 25 of the friends
            for (var i = 0; i < friendIDs.length; i++)
            {
//            alert('/' + friendIDs[i] + '?fields=checkins.since(1351063053).limit(10).fields(message,place)');
            //FB.api QUERY
            FB.api('/' + friendIDs[i] + '?fields=checkins.since(1351063053).limit(10).fields(message,place)', function (result)
                   {
                   //In case of no response or error from FB
                   if(!result || result.error)
                   {
                   //Invalid
                   if(result.error.code == "100")
                   {
                   //Calculate & display the most visited places
//                   alert(" CALL displayMostCheckedInresult");
                   that.displayMostCheckedInPlacesResult(arrOfPlaces);
                   }
                   
                   }
                   else
                   {
//                   alert(JSON.stringify(result.checkins.data));
                   
                   //Get the checkin results
                   var checkinElement = result.checkins.data;
                   var checkinElementCount = result.checkins.data.length;
//                   alert("checkinElementCount " + checkinElementCount);
                   
                   for(var j = 0; j < checkinElementCount; j++)
                   {
                   if(checkinElement[j].place != null)
                   {
                   //Getting the place details
                   var placeName = checkinElement[j].place.name;
//                   alert("placeName " + placeName);
                   var locationDetails = checkinElement[j].place.location;
//                   alert("locationDetails " + locationDetails);
                   
                   var locationCity;// = checkinElement[j].place.location.city;
                   if(checkinElement[j].place.location.city != null)
                   {
                   locationCity = checkinElement[j].place.location.city;
//                   alert("locationCity " + locationCity);
                   
                   arrOfPlaces.push(locationCity);
//                   alert("that.arrOfPlaces " + arrOfPlaces);
                   }
                   else
                   {
                   continue;
                   }
                   var locationState = checkinElement[j].place.location.state;
                   var locationCountry = checkinElement[j].place.location.country;
                   
                   //Adding the cities into an array list
//                   arrOfPlaces.push(locationCity);
                   }
                   else
                   {
                   continue;
                   }
                   
                   }
                   }
                   });
            }
            
            }
            });
     },
     displayMostCheckedInPlacesResult: function(placesArray){
                         
//     alert("Inside displayMostCheckedInresult");
//                         alert("placesArray " + placesArray);
                         
     placesArray.sort();
//     alert("Sorted array list " + placesArray);

     var frequency = {};  // array of frequency.
     var max = 0;  // holds the max frequency.
     var result;   // holds the max frequency element.
     
     var MostVisitedPlaceResult;
     var MostVisitedPlaceResultCount;
     
     for(var v in placesArray)
     {
     frequency[placesArray[v]]=(frequency[placesArray[v]] || 0)+1; // increment frequency.
     
     if(frequency[placesArray[v]] > max)
     {
     // is this frequency > max so far ?
     max = frequency[placesArray[v]];  // update max.
     result = placesArray[v];          // update result.
     }
     }
     
     var arrPlacesWithElementCount = this.array_count_max_values(placesArray);
     
     var dataArray = [];
     for (cityName in arrPlacesWithElementCount) {
     var count = arrPlacesWithElementCount[cityName];
     dataArray.push({cityName: cityName, count: count});
     }
     
     dataArray.sort(function(a, b){
                    if (a.count > b.count) return -1;
                    if (b.count > a.count) return 1;
                    return 0;
                    });
     
     var mostVisitedCity = dataArray[0].cityName;
     var mostVisitedCityCount = dataArray[0].count;
     window.localStorage.setItem("mostVisitedCity", mostVisitedCity);
     window.localStorage.setItem("mostVisitedCityCount", mostVisitedCityCount);
//     alert("Most visited city " + dataArray[0].cityName + " - " + dataArray[0].count + " friends.");

     var secondmostVisitedCity = dataArray[1].cityName;
     var secondmostVisitedCityCount = dataArray[1].count;
     window.localStorage.setItem("secondMostVisitedCity", secondmostVisitedCity);
     window.localStorage.setItem("secondMostVisitedCityCount", secondmostVisitedCityCount);
//                         alert("secondMostVisitedCity " + dataArray[1].cityName + " - " + dataArray[1].count + " friends.");

     var thirdmostVisitedCity = dataArray[2].cityName;
     var thirdmostVisitedCityCount = dataArray[2].count;
     window.localStorage.setItem("thirdMostVisitedCity", thirdmostVisitedCity);
     window.localStorage.setItem("thirdMostVisitedCityCount", thirdmostVisitedCityCount);
//                         alert("thirdMostVisitedCity " + dataArray[2].cityName + " - " + dataArray[2].count + " friends.");

                         this.displayPopUpResult();

//     var facebookCity = window.localStorage.getItem("facebookCurrentCity");
//     var gpsCurrentCity = window.localStorage.getItem("currentCityName");
                         
//                         if(mostVisitedCity == facebookCurrentCity[0])
//                         {
//                         if(secondmostVisitedCity == currentCityName)
//                         {
//                         MostVisitedPlaceResult = dataArray[2].cityName;
//                         MostVisitedPlaceResultCount = dataArray[2].count;
//                         }
//                         else
//                         {
//                         MostVisitedPlaceResult = dataArray[1].cityName;
//                         MostVisitedPlaceResultCount = dataArray[1].count;
//                         }
//                         }
//                         else if (currentCityName == mostVisitedCity)
//                         {
//                         MostVisitedPlaceResult = dataArray[1].cityName;
//                         MostVisitedPlaceResultCount = dataArray[1].count;
//                         }
//                         else
//                         {
//                         MostVisitedPlaceResult = dataArray[0].cityName;
//                         MostVisitedPlaceResultCount = dataArray[0].count;
//                         }

     },
     array_count_max_values: function(array){
                         
     // http://kevin.vanzonneveld.net
     // +   original by: Ates Goral (http://magnetiq.com)
     // + namespaced by: Michael White (http://getsprink.com)
     // +      input by: sankai
     // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
     // +   input by: Shingo
     // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
     // *     example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
     // *     returns 1: {3:2, 5:1, "foo":2, "bar":1}
     // *     example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
     // *     returns 2: {3:2, 5:1, "foo":2, "bar":1}
     // *     example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
     // *     returns 3: {42:1, "fubar":1}
     var tmp_arr = {},
     key = '',
     t = '';
     
     var __getType = function (obj) {
     // Objects are php associative arrays.
     var t = typeof obj;
     t = t.toLowerCase();
     if (t === "object") {
     t = "array";
     }
     return t;
     };
     
     var __countValue = function (value) {
     switch (typeof value) {
     case "number":
     if (Math.floor(value) !== value) {
     return;
     }
     // Fall-through
     case "string":
     if (value in this && this.hasOwnProperty(value)) {
     ++this[value];
     } else {
     this[value] = 1;
     }
     }
     };
     
     t = __getType(array);
     if (t === 'array') {
     for (key in array) {
     if (array.hasOwnProperty(key)) {
     __countValue.call(tmp_arr, array[key]);
     }
     }
     }
     console.log("tmp_arr " + JSON.stringify(tmp_arr));
     return tmp_arr;
     },
    displayPopUpResult: function(){
                         
//                         alert("Inside displayPopUpResult ");
    var mostVisitedPlace = window.localStorage.getItem("mostVisitedCity");
    var mostVisitedPlaceCount = window.localStorage.getItem("mostVisitedCityCount");

    var secondMostVisitedPlace = window.localStorage.getItem("secondMostVisitedCity");
    var secondMostVisitedPlaceCount = window.localStorage.getItem("secondMostVisitedCityCount");

    var thirdMostVisitedPlace = window.localStorage.getItem("thirdMostVisitedCity");
    var thirdMostVisitedPlaceCount = window.localStorage.getItem("thirdMostVisitedCityCount");

    var myData = {};
    myData.title = "Inspired by friends";
    myData.desc = "The top three locations where several of your Facebook friends have recently enjoyed visiting, and we’re offering you great deals and offers to try it yourself";
    myData.list = new Array();
    myData.list[0] = {};
    myData.list[0].title = mostVisitedPlace;
    myData.list[0].desc = "visitied by " + mostVisitedPlaceCount + " of your friends";

    myData.list[1] = {};
    myData.list[1].title = secondMostVisitedPlace;
    myData.list[1].desc = "visitied by " + secondMostVisitedPlaceCount + " of your friends";

    myData.list[2] = {};
    myData.list[2].title = thirdMostVisitedPlace;
    myData.list[2].desc = "visitied by " + thirdMostVisitedPlaceCount + " of your friends";

    this.$json.setValue(this.data,"popupData",myData);
                         
     this.$refresh({
                   outputSection: "popuplist"
                   });
     var btn = $(".button");
     var that = this
     btn.click(function(){
               //alert(this);
                                   var clickedCity = this.getAttribute("data");
                                   alert("facebook clickedCity " + clickedCity);
               
                                   that.getCityEvents(clickedCity);
               })

    $(".loading, .mask").show();
    $(".loading").hide();
    $(".popUp, .dialog").show();
                         
    },
                         getCityEvents: function(clickedCity)
                         {
                         $(".loading, .mask").show();
                         
                         var that = this;
                         
                         var url = "http://1.glassy-song-375.appspot.com/GetTopEvents?date=December&page_size=100&location=" + clickedCity + "&sort_order=popularity&sort_order=ascending&max_cities=1&lat=" + window.localStorage.getItem("lat") + "&lng=" + window.localStorage.getItem("lng") + "&max_events=10";
                         
                         
                         //                         if(window.localStorage.getItem("seasonalPopUpData") == null)
                         //                         {
                         $.ajax({
                                url: url,
                                cache: false,
                                type: "POST",
                                processData: false,
                                dataType:"json",
                                crossDomain:"true",
                                complete: function (responseData, textStatus, jqXHR)
                                {
                                
                                if(textStatus == "success")
                                {
                                //Response data
                                var resp = JSON.parse(responseData.responseText);
                                
                                
                                var currentGPSCityName = resp.city.name;
                                window.localStorage.setItem("gpsCityName", currentGPSCityName);
                                var currentGPSCityAPTCode = resp.city.code;
                                window.localStorage.setItem("gpsCityCode", currentGPSCityAPTCode);
                                
                                //Name of the cities
                                var cityValues = new Array();
                                cityValues = Object.keys(resp.deals);
                                
                                try
                                {
                                //1st City
                                var cityName = cityValues[0];
                                var regionName = resp.deals[cityName].events[0].region_name;
                                var countryName = resp.deals[cityName].events[0].country_name;
                                
                                var keyCityName = cityName.replace(" ","_");
                                keyCityName = keyCityName.toLowerCase();
                                resp.deals[cityName].name = cityName;
                                window.localStorage.setItem(keyCityName, JSON.stringify(resp.deals[cityName]));
                                
                                that.getDetails(keyCityName);
                                
                                }
                                catch(e)
                                {
                                alert(e.message);
                                }
                                }
                                },
                                error: function (responseData, textStatus, errorThrown)
                                {
                                console.log('POST failed.');
                                alert("FAILEDS API CALL");
                                }
                                });
                         },
                         
    seasonalData: function(){
                         
         this.seasonalPlaces();
                         
    },
    wellbeingData: function(){
                         
         this.wellbeingPlaces();
    },
     getDetails: function(cityName){
                         
                         var that = this;
//     alert("Inside getDetails");
                         $(".popUp, .dialog").hide();
                         $(".loading, .mask").show();

                         //City Description
                         var cityDescriptionUrl = "https://www.googleapis.com/freebase/v1/text/en/" + cityName;
                         
                         $.ajax({
                                url: cityDescriptionUrl,
                                cache: true,
                                type: "GET",
                                processData: false,
                                dataType:"json",
                                crossDomain:"true",
                                complete: function (responseData, textStatus, jqXHR)
                                {
                                
                                if(textStatus == "success")
                                {
                                var data = JSON.parse(responseData.responseText);
                                
                                var cityDescription = data.result;
//                                alert("cityDescription " + cityDescription);
                                
                                
                                //City Image URL
                                var imageIDUrl = "https://www.googleapis.com/freebase/v1/topic/en/" + cityName + "?filter=/image&limit=1";
                                
                                $.ajax({
                                       url: imageIDUrl,
                                       cache: true,
                                       type: "GET",
                                       processData: false,
                                       dataType:"json",
                                       crossDomain:"true",
                                       complete: function (responseData, textStatus, jqXHR)
                                       {
                                       
                                       if(textStatus == "success")
                                       {
                                       var imageData = JSON.parse(responseData.responseText);
                                       var cityImageID = imageData.id;
//                                       alert("cityImageID " + cityImageID);
                                    
                                        //City information for DETAILS page
                                       var cityData = {};
                                       cityData.cityName = cityName;
                                       cityData.desc = cityDescription;
                                       cityData.imageID = cityImageID;
                                       
                                       window.localStorage.setItem("clickedCityDetails", JSON.stringify(cityData));

//                                       alert("cityData " + JSON.stringify(cityData));
                                       
                                       $(".loading, .mask").hide();

                                       //Navigation data for TPL
                                       that.moduleCtrl.data = cityData;
                                       pageEngine.navigate({'pageId':'DETAILS'});

                                       }
                                       },
                                       error: function (responseData, textStatus, errorThrown)
                                       {
                                       console.log('POST failed.');
                                       alert("FAILEDS API CALL");
                                       }
                                       });
                                }
                                },
                                error: function (responseData, textStatus, errorThrown)
                                {
                                console.log('POST failed.');
                                alert("FAILEDS API CALL");
                                }

                                });
                         
                         
     },
                         
     seasonalPlaces: function()
     {
                         
     $(".loading, .mask").show();
     
     var that = this;
     var url = "http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&keywords=(Festivals || Holiday)&sort_order=popularity&sort_order=ascending&max_cities=3&lat=" + window.localStorage.getItem("lat") + "&lng=" + window.localStorage.getItem("lng") + "&max_events=10";
     
//                         if(window.localStorage.getItem("seasonalPopUpData") == null)
//                         {
     $.ajax({
            url: url,
            cache: false,
            type: "POST",
            processData: false,
            dataType:"json",
            crossDomain:"true",
            complete: function (responseData, textStatus, jqXHR)
            {
            
            if(textStatus == "success")
            {
            //Response data
            var resp = JSON.parse(responseData.responseText);

            
            var currentGPSCityName = resp.city.name;
            window.localStorage.setItem("gpsCityName", currentGPSCityName);
            var currentGPSCityAPTCode = resp.city.code;
            window.localStorage.setItem("gpsCityCode", currentGPSCityAPTCode);
            
            //Name of the cities
            var cityValues = new Array();
            cityValues = Object.keys(resp.deals);
            
            try
            {
            //1st City
            var cityName = cityValues[0];
            var regionName = resp.deals[cityName].events[0].region_name;
            var countryName = resp.deals[cityName].events[0].country_name;
            
            var keyCityName = cityName.replace(" ","_");
            keyCityName = keyCityName.toLowerCase();
            resp.deals[cityName].name = cityName;
            window.localStorage.setItem(keyCityName, JSON.stringify(resp.deals[cityName]));
            
            var myData = {};
            myData.title = "Seasonal inspirations";
            myData.desc = "We know it is the time of the year, when you have an opportunity to take a break from your hectic life and escape to an exotic or tranquil places. Here is a great list of offers for such places to visit.";
            myData.list = new Array();
            
            myData.list[0] = {};
            myData.list[0].title = cityName;
            myData.list[0].key = keyCityName;
            myData.list[0].desc = regionName + ", " + countryName;
            
            //2nd City
            cityName = cityValues[1];
            regionName = resp.deals[cityName].events[0].region_name;
            countryName = resp.deals[cityName].events[0].country_name;

            keyCityName = cityName.replace(" ","_");
            keyCityName = keyCityName.toLowerCase();
            resp.deals[cityName].name = cityName;
            window.localStorage.setItem(keyCityName, JSON.stringify(resp.deals[cityName]));
            
            myData.list[1] = {};
            myData.list[1].title = cityName;
            myData.list[1].key = keyCityName;
            myData.list[1].desc = regionName + ", " + countryName;

            //3rd City
            cityName = cityValues[2];
            regionName = resp.deals[cityName].events[0].region_name;
            countryName = resp.deals[cityName].events[0].country_name;
            
            keyCityName = cityName.replace(" ","_");
            keyCityName = keyCityName.toLowerCase();
            resp.deals[cityName].name = cityName;
            window.localStorage.setItem(keyCityName, JSON.stringify(resp.deals[cityName]));
            
            myData.list[2] = {};
            myData.list[2].title = cityName;
            myData.list[2].key = keyCityName;
            myData.list[2].desc = regionName + ", " + countryName;

            //Local Storage
//            window.localStorage.setItem("seasonalPopUpData", JSON.stringify(myData));
            
            }catch(e)
            {
            alert("Error " + e.message);
            }
            
            //Call DisplayPopUp
            that.displaySeasonalPopUp(myData);
            }
            else
            {
            alert("FAILED IF");
            }
            },
            error: function (responseData, textStatus, errorThrown)
            {
            console.log('POST failed.');
            alert("FAILEDS API CALL");
            }
            });
//                         }
//                         else
//                         {
//                         try{
//                         var myData = window.localStorage.getItem("seasonalPopUpData");
//                         that.displaySeasonalPopUp(JSON.parse(myData));
//                         }
//                         catch(e)
//                         {
//                         alert("Message else " + e.message);
//                         }
//                         }
     
     },
     displaySeasonalPopUp: function(seasonalData){
                         
                         this.$json.setValue(this.data,"popupData",seasonalData);
                        
                         this.$refresh({
                                       outputSection: "popuplist"
                                       });
                         var btn = $(".button");
                         var that = this
                         btn.click(function(){
                                   //alert(this);
                                   var clickedCity = this.getAttribute("data");
                                   
                                   clickedCity = clickedCity.toLowerCase();
                                   clickedCity = clickedCity.replace(" ", "_");
                                   
//                                   alert(clickedCity);
                                   that.getDetails(clickedCity);
                                   })
                         $(".loading, .mask").show();
                         $(".loading").hide();
                         $(".popUp, .dialog").show();
                         
     },
     wellbeingPlaces: function (){
               
     $(".loading, .mask").show();
     
     var that = this;
                         
// http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&keywords=(Health%20&%20Wellness%20||%20Religion%20&%20Spirituality)&sort_order=popularity&sort_order=ascending&max_cities=3&lat=12.9667&lng=77.5667&max_events=5
                         var url = "http://1.glassy-song-375.appspot.com/GetTopEvents?date=FutureDate&page_size=100&keywords=(Health%20&%20Wellness%20||%20Religion%20&%20Spirituality)&sort_order=popularity&sort_order=ascending&max_cities=3&lat=" + window.localStorage.getItem("lat") + "&lng=" + window.localStorage.getItem("lng") + "&max_events=10";
                        
                         //                         if(window.localStorage.getItem("seasonalPopUpData") == null)
                         //                         {
        
                         $.ajax({
                                url: url,
                                cache: false,
                                type: "POST",
                                processData: false,
                                dataType:"json",
                                crossDomain:"true",
                                complete: function (responseData, textStatus, jqXHR)
                                {
                                if(textStatus == "success")
                                {
                                //Response data
                                var resp = JSON.parse(responseData.responseText);
                                
                                var currentGPSCityName = resp.city.name;
                                window.localStorage.setItem("gpsCityName", currentGPSCityName);
                                var currentGPSCityAPTCode = resp.city.code;
                                window.localStorage.setItem("gpsCityCode", currentGPSCityAPTCode);

                                //Name of the cities
                                var cityValues = new Array();
                                cityValues = Object.keys(resp.deals);

                                try
                                {
                                //1st City
                                var cityName = cityValues[0];
                                var regionName = resp.deals[cityName].events[0].region_name;
                                var countryName = resp.deals[cityName].events[0].country_name;
                                
                                var keyCityName = cityName.replace(" ","_");
                                keyCityName = keyCityName.toLowerCase();
                                resp.deals[cityName].name = cityName;
                                window.localStorage.setItem(keyCityName, JSON.stringify(resp.deals[cityName]));
                                
                                var myData = {};
                                myData.title = "Seasonal inspirations";
                                myData.desc = "We know it is the time of the year, when you have an opportunity to take a break from your hectic life and escape to an exotic or tranquil places. Here is a great list of offers for such places to visit.";
                                myData.list = new Array();
                                
                                myData.list[0] = {};
                                myData.list[0].title = cityName;
                                myData.list[0].key = keyCityName;
                                myData.list[0].desc = regionName + ", " + countryName;
                                
                                //2nd City
                                cityName = cityValues[1];
                                regionName = resp.deals[cityName].events[0].region_name;
                                countryName = resp.deals[cityName].events[0].country_name;
                                
                                keyCityName = cityName.replace(" ","_");
                                keyCityName = keyCityName.toLowerCase();
                                resp.deals[cityName].name = cityName;
                                window.localStorage.setItem(keyCityName, JSON.stringify(resp.deals[cityName]));
                                
                                myData.list[1] = {};
                                myData.list[1].title = cityName;
                                myData.list[1].key = keyCityName;
                                myData.list[1].desc = regionName + ", " + countryName;
                                
                                //3rd City
                                cityName = cityValues[2];
                                regionName = resp.deals[cityName].events[0].region_name;
                                countryName = resp.deals[cityName].events[0].country_name;
                                
                                keyCityName = cityName.replace(" ","_");
                                keyCityName = keyCityName.toLowerCase();
                                resp.deals[cityName].name = cityName;
                                window.localStorage.setItem(keyCityName, JSON.stringify(resp.deals[cityName]));
                                
                                myData.list[2] = {};
                                myData.list[2].title = cityName;
                                myData.list[2].key = keyCityName;
                                myData.list[2].desc = regionName + ", " + countryName;
                                
                                //Local Storage
                                //            window.localStorage.setItem("seasonalPopUpData", JSON.stringify(myData));
                                
                                }catch(e)
                                {
                                alert("Error " + e.message);
                                }

                                //Call DisplayPopUp
                                that.displayWellbeingPopUp(myData);

                                }
                                else
                                {
                                alert("FAILED IF");
                                }
                                },
                                error: function (responseData, textStatus, errorThrown)
                                {
                                console.log('POST failed.');
                                alert("FAILEDS API CALL");
                                }
                                });
                         //                         }
                         //                         else
                         //                         {
                         //                         try{
                         //                         var myData = window.localStorage.getItem("seasonalPopUpData");
                         //                         that.displaySeasonalPopUp(JSON.parse(myData));
                         //                         }
                         //                         catch(e)
                         //                         {
                         //                         alert("Message else " + e.message);
                         //                         }
                         //                         }
     },
     displayWellbeingPopUp: function (wellbeingData){
                         
                         this.$json.setValue(this.data,"popupData",wellbeingData);
                         
                         this.$refresh({
                                       outputSection: "popuplist"
                                       });
                         var btn = $(".button");
                         var that = this
                         btn.click(function(){
                                   //alert(this);
                                   var clickedCity = this.getAttribute("data");
                                   
                                   clickedCity = clickedCity.toLowerCase();
                                   clickedCity = clickedCity.replace(" ", "_");

                                   //                                   alert(clickedCity);
                                   that.getDetails(clickedCity);
                                   })
                         $(".loading, .mask").show();
                         $(".loading").hide();
                         $(".popUp, .dialog").show();

     }
                         

    }

});