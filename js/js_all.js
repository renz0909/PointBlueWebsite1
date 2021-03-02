// document.getElementById("myDiv").style.display = "block";
var linka = "https://script.google.com/macros/s/AKfycbwHt-rHa-_pclj1q_tptwTOuvQr4G6GGTOLJE5weNB8pXRDq78Iw6AA/exec";

fetch(linka).then(res => res.json())
    .then((data) => {
        console.log(data);
        var a = '<ul class="sub-menu" id="loc_sub_menu">';
            a += '<li><a href="bgc.html">BGC<span class="icon-right"></span></a></li>';
            a += '</ul>';
            document.getElementById("myDiv").style.display = "none";
            $('#loc_locations').append(a);    
            var core_min = 'css/core.min.css';
            var core = 'css/skin.min.css';
            $.getScript(core_min);
            $.getScript(core);
    })
    .catch(err => { throw err });