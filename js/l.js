// document.getElementById("myDiv").style.display = "block";
            var link = "https://script.google.com/macros/s/AKfycbxd5jOfCofEO9Sh3YJxyPoLa_wh8LC-zvJyAYhTTl7ZertXMrsXZYQYhuZpoKg5DPlU/exec";
    
            fetch(link).then(res => res.json())
                .then((data) => {
                    console.log(data);
                    // document.getElementById("myDiv").style.display = "none";
                    jQuery.each(data, function (id) {

                        var loc = '<li><a href="group.html?id='+data[id].group_id+'">'+data[id].group+'<span class="icon-right"></span></a>';
                        loc += '<ul class="sub-menu">';
                        jQuery.each(data[id].locations, function (id_loc) {
                           
                            loc+='<li><a href="location.html?id='+data[id].locations[id_loc].id+'">'+data[id].locations[id_loc].building_name;
                            loc += '</a></li>';
                        });
                        
                        loc+= '</ul</li>';

                        // console.log(loc);
                        
                        $('#location_request').append(loc);
                    });
    
                    // document.getElementById("myDiv").style.display = "none";
                })
                .catch(err => { throw err });
               