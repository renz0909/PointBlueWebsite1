document.getElementById("myDiv").style.display = "block";
var link = "https://script.google.com/macros/s/AKfycbwJBV4pb6-X70ZJEtPnLOCTXXlmKsFO1frwnlk8E0WvclMOKDs2RY4EINb7QcSboN2dTQ/exec";
    
fetch(link).then(res => res.json())
    .then((data) => {
        console.log(data);
        var cat = "";
        var a = 0;
        jQuery.each(data, function (id) {
       
             cat += "<h3 class='mb-30'>"+data[id].faq_title+"</h3>";
             cat += "<div class='accordion unstyled rounded' data-toggle-icon data-toggle-multiple><ul>";
             jQuery.each(data[id].content, function (content_id) {
                 var group_id = id+1;
                 var cont_id = content_id+1;
                 var question = data[id].content[content_id].question;
                 question = question.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
                 var answer = data[id].content[content_id].answer;
                 answer = answer.replace(/(\r\n|\n\r|\r|\n)/g, '<br>');
                 var image = data[id].content[content_id].image;
                     var b_id =data[id].content[content_id].id;
                 if(a == 0)
                 {
                cat += " <li class='active' >";
                 }
                 else
                 {
                    cat += " <li class='active'>";
                 }
                cat += "<a  onclick='myFunction("+b_id+")' ><span id='b-"+b_id+"' class='icon-plus' ></span>"+question+"</a>";
                cat += "<div id='"+b_id+"' class='w3-container w3-hide'>";
                cat += "<div class='accordion-content>'";
                cat += "<p align='justify'>"+answer+"</p>";
                
                    if(image != "")
                    {
                        cat += " <div class=accordion-content>";
                        cat += "<img alt=paymentterms src='https://www.pointblue.ph/images/FAQs/Lease%20Terms.png'>";
                        cat += "</div>";
                    }
                 cat += "</div></div>";
                cat += "</li>";
                a = a+1;

             });
             cat += "</ul></div>";
            
        });
        // console.log(cat);
        
        $('#category').append(cat);
        document.getElementById("myDiv").style.display = "none";
    })
    .catch(err => { throw err });

