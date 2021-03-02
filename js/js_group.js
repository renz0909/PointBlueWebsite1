const params = new URLSearchParams(document.location.search);
var id = params.get("id")

document.getElementById("myDiv").style.display = "block";
var link = "https://script.google.com/macros/s/AKfycbwHt-rHa-_pclj1q_tptwTOuvQr4G6GGTOLJE5weNB8pXRDq78Iw6AA/exec?id="+id;


fetch(link).then(res => res.json())
.then((data) => {
    console.log(data);
    
    document.getElementById("group_name").innerHTML = data.group;
    document.getElementById("group_name_a").innerHTML = data.group;
    var l = data.locations[id].id;
    var iconbase = 'images/assets/map-marker-mini.png';
    var mapCanvasD = document.getElementById("mapD");
    var mapOptionsD = {
        center: new google.maps.LatLng(data.lat, data.lng),
        zoom: 16,
        scrollwheel: false
    };
     mapD = new google.maps.Map(mapCanvasD, mapOptionsD);
    mapD = new google.maps.Map(mapCanvasD, mapOptionsD);
    jQuery.each(data.locations, function (id) {

        var b = '<div class="row flex pb-40 w3-animate-left " >';
            b += '<div class="column width-1 v-align-middle">';
            b += '<div>';
            b += '<h4 class="mb-0">&nbsp;</h4>';
            b += '</div>';
            b += '</div>';
            b += '<div class="column width-6 v-align-middle">';
            b += '<div>';
            b += '<a href="#" id="'+data.locations[id].building_name+'" onclick="letMap('+data.locations[id].lat+','+data.locations[id].long+','+l+','+data.locations[id].id+')"> <h4 class="mb-0">'+data.locations[id].building_name+'</h4></a>';
            b += '<div id="image_'+data.locations[id].id+'" class="w3-animate-left images" style="display: none;">';
            b += '<br>';
            b += ' <img   src="'+data.locations[id].images[0]+'" style="width:100%;">';
            b += '</div>  ';
            b += '</div>';
            b += '</div>';
            b += '</div>';
            $('#groups_locations').append(b);
           
            var markerD = new google.maps.Marker({
                position: new google.maps.LatLng(data.locations[id].lat, data.locations[id].long),
                map: mapD,
            });

            var slideshow = '<div class="slideshow-container" >';
            jQuery.each(data.locations[id].images, function (image_id) {
                // alert(image_id);
                slideshow += '<div class="mySlides fade">';
                slideshow += '<img src="'+data.locations[id].images[image_id]+'" style="height:100px">';
                slideshow += '</div>';
                
            });

            slideshow += '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>';
            slideshow += '<a class="next" onclick="plusSlides(1)">&#10095;</a>';
            slideshow += '</div>';
                
            slideshow += '<div style="text-align:center">';
            jQuery.each(data.locations[id].images, function (image_id) {
            img_id = image_id+1;
            slideshow += '<span class="dot" onclick="currentSlide('+img_id+')"></span>';
            });
            slideshow += '</div>';
            slideshow += '</div>';

            // $('#image_'+data.locations[id].id).append(slideshow);
            });
    document.getElementById("myDiv").style.display = "none";
})


var mapD;
            
function centerMap(latD,lngD)
{
    mapD.panTo({"lat":latD,"lng":lngD});
}
function letMap(lat, lang,location,id) 
{
    var iconbase = 'images/assets/map-marker-mini.png';
    if (lat) {
        var latD = lat;
        var lngD = lang;
        // var mapCanvasD = document.getElementById("mapD");
        centerMap(latD,lngD);
        // var mapOptionsD = {
        //     center: new google.maps.LatLng(latD, lngD),
        //     zoom: 18,
        //     scrollwheel: false
        // };
        // var mapD = new google.maps.Map(mapCanvasD, mapOptionsD);
        // var markerD = new google.maps.Marker({
        //     position: new google.maps.LatLng(latD, lngD),
        //     map: mapD,
        // });
        document.getElementById("view_more").href="location.html?id="+location; 
        document.getElementById("view_more").style.display = "block";
        $(".images").css("display", "none");
        $("#image_"+id).css("display", "block");
    }

  

}

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