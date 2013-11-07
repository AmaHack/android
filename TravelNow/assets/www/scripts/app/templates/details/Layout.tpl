{Template {
  $classpath : "app.templates.details.Layout",
  $hasScript: true
}}

  {macro main()}
   <div id="header">
    <div class="backButton"><a href="index.html"></a></div>
  </div>
  <div id="wrapper" class="detailsWrapper">
    <div id="scroller">
      <ul id="thelist">
    <li id="map-canvas" style="width:100%;height:200px;margin:0px;padding:0px;"></li>
        <li class="placeDetails">
          <div class="container">
            <div class="header">Place details</div>
            <div class="placeDescription">
              <div class="content">
              {section {
                id : "placeblock",
                macro : {
                  name: "placemacro"
                }
              }/}
              </div>
            </div>
          </div>
        </li>
        <li class="placeDetails events">
          <div class="container">
              {section {
                id : "eventblock",
                macro : {
                  name: "eventmacro"
                }
              }/}
          </div>
        </li>
      </ul>
    </div>
  </div>             
  <div id="footer">
     <div class="button"  onClick="window.open('http://m.cleartrip.com/flights/international/results?from=CLE&to=ATL&depart_date=29/01/2014&adults=1&childs=0&infants=0&class=Economy&airline=&carrier=&intl=y&sd=1382640014893&page=loaded', '_blank', 'location=yes, toolbar=yes')">Book</div>
  </div>

  {/macro}
  {macro mapmacro()}
    <iframe  frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=bangalore&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=63.640894,135.263672&amp;ie=UTF8&amp;hq=&amp;hnear=Bangalore,+Bangalore+Urban,+Karnataka,+India&amp;ll=12.971599,77.594563&amp;spn=0.624407,1.056747&amp;t=m&amp;z=11&amp;output=embed"></iframe>
  {/macro}

  {macro placemacro()}
    <img src="https://usercontent.googleapis.com/freebase/v1/image${data.cityDetail.imageID}"> <span><strong>Place:</strong> ${data.cityDetail.name}</span> </span><strong>Description:</strong> ${data.cityDetail.description}</span>
  {/macro}

  {macro eventmacro()}
    <div class="header">Events in ${data.cityDetail.name}</div>
    {foreach eventData in data.events.events}
    <div class="placeDescription">
      <div class="content"> <img src="${eventData.image}"> <span><strong class="name">${eventData.event_name}</strong> </span> <span class="des">${decodeURIComponent(eventData.description).replace("+", " ")}</span> </div>
    </div>
    {/foreach}

  {/macro}

{/Template}