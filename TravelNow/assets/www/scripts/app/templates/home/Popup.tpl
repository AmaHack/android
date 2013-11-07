{Template {
  $classpath : "app.templates.home.Popup",
  $hasScript: true
}}
  {macro main()}
  	{call fb() /}
  	{call ses() /}
  	{call well() /}
  {/macro}

  {macro fb()}
  <div class="fb">
    <div class="header">Inspired by friends <span class="close"></span></div>
    <div class="popUpText">The top three locations where several of your Facebook friends have recently enjoyed visiting, and we’re offering you great deals and offers to try it yourself</div>
    <div class="faceBookPopUp">
      <div class="button">
        <ul>
          <li><span>Paris, </span>France</li>
          <li class="smallFont">visitied by 15 of your friends</li>
          <li class="icon"></li>
        </ul>
      </div>
      <div class="button">
        <ul>
          <li><span>New Delhi, </span>India</li>
          <li class="smallFont">visitied by 10 of your friends</li>
          <li class="icon"></li>
        </ul>
      </div>
      <div class="button">
        <ul>
          <li><span>Nice, </span>France</li>
          <li class="smallFont">visitied by 5 of your friends</li>
          <li class="icon"></li>
        </ul>
      </div>
    </div>
  </div>
  {/macro}

  {macro ses()}
  <div class="ses">
    <div class="header"> Seasonal inspirations<span class="close"></span></div>
    <div class="popUpText">We know it is the time of the year, when you have an opportunity to take a break from your hectic life and escape to an exotic or tranquil places. Here is a great list of offers for such places to visit. </div>
    <div class="seasonalPopUp">
      <div class="button">
        <ul>
          <li><span>Diwali</span></li>
          <li class="smallFont">New Delhi, India</li>
          <li class="icon"></li>
        </ul>
      </div>
      <div class="button">
        <ul>
          <li><span>Holi </span></li>
          <li class="smallFont">Mumbai, India</li>
          <li class="icon"></li>
        </ul>
      </div>
      <div class="button">
        <ul>
          <li><span>Dussera </span></li>
          <li class="smallFont">Mysore, India</li>
          <li class="icon"></li>
        </ul>
      </div>
    </div>
  </div>
  {/macro}

  {macro well()}
  <div class="well">
    <div class="header">Well being inspirations<span class="close"></span></div>
    <div class="popUpText">It seems you are likely to seek holidays with a specific focus, for example, wellbeing/medical tourism, learning/cultural holidays and ethical voyages. Here is a list of such great occasions which you would like to consider. </div>
    <div class="wellbeingPopUp">
      <div class="button">
        <ul>
          <li><span>Kerala Ayurveda</span></li>
          <li class="smallFont">Kerala, India</li>
          <li class="icon"></li>
        </ul>
      </div>
      <div class="button">
        <ul>
          <li><span>Fern Tree Spa </span></li>
          <li class="smallFont">Montego bay, Jamaica</li>
          <li class="icon"></li>
        </ul>
      </div>
      <div class="button">
        <ul>
          <li><span>Spas and thermal baths </span></li>
          <li class="smallFont">Trentino, Italy</li>
          <li class="icon"></li>
        </ul>
      </div>
    </div>
  </div>

  {/macro}
{/Template}