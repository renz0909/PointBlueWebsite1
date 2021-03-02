document.getElementById("myDiv").style.display = "block";
var link = "https://script.google.com/macros/s/AKfycbwItSIa1juRCbPG2gf1ro_FaJVpqKMlzb33AZ04TRVJqdgtw1qai6aE/exec";

fetch(link).then(res => res.json())
.then((data) => {
    // console.log(data);
    jQuery.each(data, function (id) {
        
        if((data[id].status === false) && (data[id].start_of_operation != ''))
        {
            console.log(data[id]);

            var nearest_landmark = data[id].neareast_landmark;
             nearest_landmark = nearest_landmark.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');

            var section = '<section>';
                section +='<div class="section-block " id='+id+'>';
                section +='<div class="row">';
                section +='<div class="column width-6">';
                section +='<div class="hero-content split-hero-content">';
                section +='<div class="hero-content-inner center" data-animate-in="preset:turnInLeft;duration:1000ms;" data-threshold="0.7">';
                section +='<h2 class="mb-20">'+data[id].building_name+'</h2>';
                section +='<p class="lead font-alt-2 ">'+data[id].building_address+'</p>';
                section +='<p class="lead font-alt-2 ">Nearest Landmarks:';
                section +='<p>'+nearest_landmark;
                section +='</p>';
                section +='</p> ';
                section +='<p>Completion <b>'+data[id].start_of_operation+'</b></p>';
                section +='</div>';
                section +='</div>';
                section +='</div>';
                section +='<div class="column width-6">';
                section +='<div id="map_'+id+'" style="height:375px;"></div>';
                section +='</div>';
                section +='</div>';
                section +='</div>';
                section +='</section>';
                $('#section').append(section);
                var iconbase = 'images/assets/map-marker-mini.png';
                var lat = parseFloat(data[id].lat);
                var lng = parseFloat(data[id].long);
                var mapCanvas = document.getElementById("map_"+id);
                var mapOptions = {
                    center: new google.maps.LatLng(lat, lng),
                    zoom: 16,
                    scrollwheel: false
                };
                var map = new google.maps.Map(mapCanvas, mapOptions);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map,
                });

               
        
        }

    });
    var timber = 'js/timber.master.min.js';
    $.getScript(timber);
    document.getElementById("myDiv").style.display = "none";

})
.catch(err => { throw err });