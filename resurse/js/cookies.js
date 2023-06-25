


function setCookie(nume, val, timpExpirare){//timpExpirare in milisecunde
    var d=new Date();
    d.setTime(d.getTime()+timpExpirare)
    document.cookie=`${nume}=${val}; expires=${d.toUTCString()}`;
}

function getCookie(nume){
    var vectorParametri=document.cookie.split(";") // ["a=10","b=ceva"]
    for(let param of vectorParametri){
        if (param.trim().startsWith(nume+"="))
            return param.split("=")[1]
    }
    return null;
}

function deleteCookie(nume){
    console.log(`${nume}; expires=${(new Date()).toUTCString()}`)
    document.cookie=`${nume}=0; expires=${(new Date()).toUTCString()}`;
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        var date = new Date(); 
        date.setTime(date.getTime() - (24 * 60 * 60 * 1000)); // set date to 24 hours ago
        document.cookie = name + "=; expires=" + date.toGMTString() + "; path=/";
    }
}



window.addEventListener("load", function(){
    if (getCookie("acceptat_banner")){
       
        document.getElementsByClassName("banner")[0].style.display="none";
    }

    var lastPage=null;
    if(getCookie("ultimaPagina")){
        console.log('Last accessed page:', lastPage);
        lastPage=document.referrer;
        setCookie("ultimaPagina",lastPage,60000);
        document.getElementsByClassName("last_page")[0].style.display="block";
        document.getElementById("link_last_page").setAttribute('href',lastPage);
        console.log('Last accessed page:', lastPage);
    }else{
        lastPage=document.referrer;
        setCookie("ultimaPagina",lastPage,60000);
    }

    this.document.getElementById("ok_cookies").onclick=function(){
        setCookie("acceptat_banner",true,60000);
       // deleteAllCookies();
        document.getElementsByClassName("banner")[0].style.display="none"
    }
})

