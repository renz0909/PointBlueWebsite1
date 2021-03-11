const params = new URLSearchParams(document.location.search);
var id = params.get("id")

document.getElementById("myDiv").style.display = "block";
var link = "https://script.google.com/a/macros/pointblue.ph/s/AKfycbxJU30J22K1z3Yld39OeTPzI5gfTyI3_7aZ5-lNaoCnCErGVtkAJKIfFQ/exec?id="+id;

fetch(link).then(res => res.json())
.then((data) => {
    console.log(data);
    var inclusions = data.inclusions;
    inclusions = inclusions.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
    var neareast_landmark = data.neareast_landmark;
    neareast_landmark = neareast_landmark.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
    var security = data.security_information;
    security = security.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');

      document.getElementById("building_name").innerHTML = data.building_name;
      document.getElementById("address").innerHTML = data.building_address;
      document.getElementById("inclusions").innerHTML = inclusions;
      document.getElementById("accessibility").innerHTML = neareast_landmark;
      document.getElementById("security").innerHTML = security;
      document.getElementById("address_loc").innerHTML = data.building_address;
      document.getElementById("address_loc_href").href = data.google_map;
    //   document.getElementById("vicinity_map").href = data.google_map;
    myMap(data.lat,data.long)



    var mapD;
    function myMap(lat, lang) {
        var iconbase = 'images/assets/map-marker-mini.png';
      
            var latD = lat;
            var lngD = lang;
            var mapCanvasD = document.getElementById("mapD");
            var mapOptionsD = {
                center: new google.maps.LatLng(latD, lngD),
                zoom: 17,
                scrollwheel: false
            };
             mapD = new google.maps.Map(mapCanvasD, mapOptionsD);
            var markerD = new google.maps.Marker({
                position: new google.maps.LatLng(latD, lngD),
                map: mapD,
            });
        

    }


    var tm = 'js/jquery.tm.avalanche.js';
    $.getScript(tm);
    var timber = 'js/timber.master.min.js';
    $.getScript(timber);



      var slideshow = '<div class="slideshow-container" >';

          jQuery.each(data.images, function (id) {
            slideshow += '<div class="mySlides fade">';
            slideshow += '<img src="'+data.images[id]+'" style="width:100%">';
            slideshow += '</div>';

        });
        slideshow += '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>';
        slideshow += '<a class="next" id="next" onclick="plusSlides(1)">&#10095;</a>';
        slideshow += '</div>';
        
    slideshow += '<div style="text-align:center">';
    jQuery.each(data.images, function (id) {
      image_id = id+1;
      slideshow += '<span class="dot" onclick="currentSlide('+image_id+')"></span>';
    });
      slideshow += '</div>';
      slideshow += '</div>';


          
              
              $('#loc').append(slideshow);
        
            
              var slideIndex = 1;
              showSlides(slideIndex);
              
              // Next/previous controls
              function plusSlides(n) {
                showSlides(slideIndex += n);
              }
              // Thumbnail image controls
              function currentSlide(n) {
                showSlides(slideIndex = n);
              }
              function showSlides(n) {
                var i;
                var slides = document.getElementsByClassName("mySlides");
                var dots = document.getElementsByClassName("dot");
                if (n > slides.length) {slideIndex = 1}
                if (n < 1) {slideIndex = slides.length}
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }
                slides[slideIndex-1].style.display = "block";
                dots[slideIndex-1].className += " active";
              }

              
    if(data.virtual_tour_link)
    {
      document.getElementById("footer_buttons_header").style.display = "none";
      document.getElementById("virtual_tour_link").style.display = "block";
      document.getElementById("link_virtual_tour").src = data.virtual_tour_link;
    }
   
    document.getElementById("myDiv").style.display = "none";
})
.catch(err => { throw err });
var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}





function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

var iteration = true;
var time = new Date();
var delay = 5000; // 5 secondes

while(iteration) {
    if(time.getTime() + 5000 < new Date().getTime()) {
         iteration = false;
    }
}

setInterval(click, 5000);

function click()
{
  $("#next").click();
}
