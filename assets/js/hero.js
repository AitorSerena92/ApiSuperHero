var allHero = [];
var heroSelect = [];

const search = document.getElementById("searchHeroButton");

search.addEventListener("click", (e) => {
  let dataHero = document.getElementById("searchHeroInput").value;
  // console.log("dataHero", dataHero);
  optionAxios("searchHeroName", dataHero);
  // optionAxios("searchHeroId", dataHero)
});

function optionAxios(action, name) {
  let url = "";
  let token = 1002826200546163;

  if (action === "searchHeroName") {
    url = `https://superheroapi.com/api/${token}/search/${name}`;
    axiosUrl(action, url);
    console.log(action, name, null);
  }
}

function axiosUrl(action, url) {
  axios
    .get(url, { responseType: "json" })
    .then((response) => {
      res = response.data.results;
      // console.log("res",res);

      if (action === "searchHeroName") {
        showHero(response, "searchHeroName");
      }
    })
    .catch((error) => {
      showError(error);
    });
}

function showHero(response, action) {
  if (action === "searchHeroName") {
    res = response.data.results;
    let x = document.getElementById("allInfoHero");
    // console.log("res", res);
    allHero.push(res);

    console.log("allHero.concat", allHero);
    for (i = 0; i < res.length; i++) {
      let hero = res[i];
      //   console.log("hero", hero);
      x.innerHTML += `
                <section id= "allContainerHero">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="infoHero">
                                    <div class="imgHero">
                                    <img src="${hero.image.url}">
                                    </div>
                                    <div class="row identifyHero">
                                        <div class="col-6"><h5>Name:  ${hero.name}</h5></div>
                                        <div class="col-6"><h5>Id:  ${hero.id}</h5></div>
                                        <hr>
                                    </div>
                                    <div class="biographyHero">
                                        <p>Biography:</p>
                                        <p>Aliases: ${hero.biography.aliases[0]}</p>
                                        <p>alignment: ${hero.biography.alignment}</p>
                                        <p>Publisher: ${hero.biography.publisher}</p>

                                        
                                        
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-8">
                                <div id="resultHeroRight">
                                    <div class="row">
                                        <div class="col-md-4">
                                        <h4>Powerstats:</h4>
                                        <p>Combat: ${hero.powerstats.combat}</p>
                                        <p>Durability: ${hero.powerstats.durability}</p>
                                        <p>Intelligence: ${hero.powerstats.intelligence}</p>
                                        <p>Power: ${hero.powerstats.power}</p>
                                        <p>Speed: ${hero.powerstats.speed}</p>
                                        <p>Strength: ${hero.powerstats.strength}</p>
                                        </div>
                                        <div class="col-md-4">
                                        <h4>Appearance</h4>
                                        <p>Gender: ${hero.appearance.gender}</p>
                                        <p>Height: ${hero.appearance.height[1]}</p>
                                        <p>Race: ${hero.appearance.race}</p>
                                        <p>Weight: ${hero.appearance.weight[1]}</p>
                                    
                                        </div>
                                        <div class="col-md-4">
                                        <h4>Work:</h4>
                                        <p>Base: ${hero.work.base}</p>

                                        <p>Occupation: ${hero.work.occupation}</p>
                                        </div>
                                        <div class="col-md-12">
                                        <h4>Connections:</h4>
                                        <p>Relatives: ${hero.connections.relatives}</p>
                                        </div>
                                        <div class="buttonCompare col-md-12" id="buttonCompare">
                                        <button onclick="compareHero(${hero.id})" class="btn btn-warning" id="compareHero" ">COMPARE HERO</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                    `;
                      }
                    }
                  }

function showError(error) {
  let a = document.getElementById("allInfoHero");
  a.innerHTML = ` 
    <section id= "allContainerHero">
    <h3>We couldn't find the Hero you are looking for.</h3>
    </section>`;
  console.log("error", error);
}

function compareHero(idHero) {

  // console.log("allHero.lenght", allHero.length);

  for (let i = 0; i < allHero.length; i++) {

    // console.log("allHero", allHero[i]);
      allHero[i].find((hero) => {
        if(hero.id == idHero) {
          if(heroSelect.length < 2){
          heroSelect.push(hero);
          console.log("eeee", heroSelect.length)
        } else if (heroSelect.length == 2){
          heroSelect.length = 1;
        }
          // console.log("hero", hero);
          resultHeroCompare (hero);
          calcular(hero);
          // restColum();
          
          }}
      )}
}  
        
function resultHeroCompare (hero) {
  
  var table = document.getElementById("TableBodyHero");
  console.log("hero", hero)
  table.innerHTML +=`
  <tr>
  <td>${hero.name}</td>
  <td>${hero.powerstats.combat}</td>
  <td>${hero.powerstats.durability}</td>
  <td>${hero.powerstats.intelligence}</td>
  <td>${hero.powerstats.power}</td>
  <td>${hero.powerstats.speed}</td>
  <td>${hero.powerstats.strength}</td>
  <td><span id="ResultTotal${heroSelect.length}"></span></td>
  <td> 
  <button onclick="deleteHero(this)" class="ButtonDelete id="ButtonDelete">Delete</button>
  </td>
  </tr>
  `
}

function deleteHero(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);

      document.getElementById("combat").innerHTML=``
      document.getElementById("durability").innerHTML=``
      document.getElementById("inteligence").innerHTML=``
      document.getElementById("power").innerHTML=``
      document.getElementById("speed").innerHTML=``
      document.getElementById("strength").innerHTML=``
      document.getElementById("total").innerHTML=``

      let butt = document.querySelectorAll("#buttonCompare");
      console.log("button", butt.length);
      for( i = 0; i <= butt.length; i++){
        butt[i].classList.remove("hidden"); 
        butt[i].className = 'buttonCompare'; 
      }
}


    // SUMMARY TABLE
  /** SUMAMOS LAS FILAS **/

    function calcular() { 
      var totalHero1 = parseInt(heroSelect[0].powerstats.combat) + parseInt(heroSelect[0].powerstats.durability) + parseInt(heroSelect[0].powerstats.intelligence)+ parseInt(heroSelect[0].powerstats.power)+ parseInt(heroSelect[0].powerstats.speed)+ parseInt(heroSelect[0].powerstats.strength);
      var totalHero2 = parseInt(heroSelect[1].powerstats.combat) + parseInt(heroSelect[1].powerstats.durability) + parseInt(heroSelect[1].powerstats.intelligence)+ parseInt(heroSelect[1].powerstats.power)+ parseInt(heroSelect[1].powerstats.speed)+ parseInt(heroSelect[1].powerstats.strength);
      var totalHeroRest = parseInt(totalHero1 - totalHero2);
      document.getElementById("ResultTotal1").innerHTML=`${totalHero1}`
      document.getElementById("ResultTotal2").innerHTML=`${totalHero2}`
      document.getElementById("total").innerHTML=`${totalHeroRest}`

      console.log("heroSelect", heroSelect.length)

     if( heroSelect.length <= 2 ){

      const resCombat = (heroSelect[0].powerstats.combat - heroSelect[1].powerstats.combat);
      
      const resDurability = (heroSelect[0].powerstats.durability - heroSelect[1].powerstats.durability);
      
      const resIntelligence = (heroSelect[0].powerstats.intelligence - heroSelect[1].powerstats.intelligence);
     
      const resPower = (heroSelect[0].powerstats.power - heroSelect[1].powerstats.power);
     
      const resSpeed = (heroSelect[0].powerstats.speed - heroSelect[1].powerstats.speed);
      
      const resStrength = (heroSelect[0].powerstats.strength - heroSelect[1].powerstats.strength);
     
      document.getElementById("combat").innerHTML=`${resCombat}`
      document.getElementById("durability").innerHTML=`${resDurability}`
      document.getElementById("inteligence").innerHTML=`${resIntelligence}`
      document.getElementById("power").innerHTML=`${resPower}`
      document.getElementById("speed").innerHTML=`${resSpeed}`
      document.getElementById("strength").innerHTML=`${resStrength}`

      let butt = document.querySelectorAll("#buttonCompare");
      console.log("button", butt.length);
      for( i = 0; i <= butt.length; i++){
        butt[i].className = 'hidden'; 
        
      } 
    }else if ( heroSelect.length === 3 ) {
      heroSelect.length = 1;
      document.getElementById("TableBodyHero").innerHTML=``
      document.getElementById("combat").innerHTML=``
      document.getElementById("durability").innerHTML=``
      document.getElementById("inteligence").innerHTML=``
      document.getElementById("power").innerHTML=``
      document.getElementById("speed").innerHTML=``
      document.getElementById("strength").innerHTML=``
      document.getElementById("total").innerHTML=``
      
    }
}







// EVENT SCROLL SEARCHER

var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
  // Hacer algo con la posición del scroll
}

window.addEventListener("scroll", function (e) {
  // console.log("scroll");

  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});

// AUTOMATIC CAROUSEL METHOD

var myCarousel = document.querySelector("#carouselHero");
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2500,
  ride: true,
});
