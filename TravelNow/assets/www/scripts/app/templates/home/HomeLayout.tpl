{Template {
  $classpath : "app.templates.home.HomeLayout",
  $hasScript: true
}}

  {macro main()}
  <div id="wrapper">
    <div id="scroller">
      <ul id="thelist">
        <li class="img">
         <div class="images"><span class="title">amadeus | <span class="titleName">Travel Now</span></span></div>
        </li>
        <li class="headerTxt"> Inspirations </li>
        <li>
          <span class="facebook" {on click { fn : facebookData} /}>Friends</span>
          <span class="seasonal" {on click { fn : seasonalData} /}>Seasonal</span>
          <span class="wellBeing" {on click { fn : wellbeingData} /}>Well being</span>
        </li>
      </ul>
    </div>
  </div>
  <div id="footer">
    <div class="button">About amadeus</div>
  </div>
  <div class="popUp">
    {call popup() /}
  </div>
  <div class="mask"></div>
  <div class="loading"><img src="img/ajaxloader.gif"></div>
  {/macro}

{macro popup()}
  <div class="dialog">
    {section {
        id : "popuplist",
        macro : {
          name: "popupmacro"
        }
    }/}
  </div>
  {/macro}
  {macro popupmacro()}
    {if this.data.popupData }
    <div class="header">${this.data.popupData.title}<span class="close"></span></div>
    <div class="popUpText">${this.data.popupData.desc}</div>
    <div class="faceBookPopUp">
    {if this.data.popupData.list.length > 0}
      {set lists = this.data.popupData.list /}
      {foreach list inArray lists}
        <div class="button" data="${list.title}" >
          <ul>
            <li>${list.title}</li>
            <li class="smallFont">${list.desc}</li>
            <li class="icon"></li>
          </ul>
        </div>
        {/foreach}
       {else/}
        Sorry! Could not found entries...
      {/if}
    </div>
    {/if}
  {/macro}

{/Template}