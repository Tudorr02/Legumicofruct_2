 window.onload= function(){
    var formular=document.getElementById("form_inreg");
    if(formular){
    formular.onsubmit= function(){
            if(document.getElementById("parl").value!=document.getElementById("rparl").value){
                alert("Nu ati introdus acelasi sir pentru campurile \"parola\" si \"reintroducere parola\".");
                return false;
            }

            return true;
        }
    }

   
 }

 window.addEventListener=function(){
    alternatives=null;
 }

//  document.getElementById("inregistrare_trimite").onclick=function(){
//     function checkAlternatives(alternative) {
//         mesaj=document.getElementsByClassName("recomandare_username")[0];

//         if (alternative.length > 0) {
//         }
//       }
      
//  }