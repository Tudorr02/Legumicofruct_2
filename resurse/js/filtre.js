/**
 * Această funcție schimbă stilul de la checkbox atunci când este bifat sau nu.
 * @param {HTMLInputElement} checkbox - Referința către elementul checkbox.
 */
function toggleCheckbox(checkbox) {
    if (checkbox.checked) {
        var label=checkbox.parentNode;
        label.classList.remove("btn-outline-primary");
        label.classList.add("btn-primary");
      
    } else {
        var label=checkbox.parentNode;
        label.classList.remove("btn-primary");
        label.classList.add("btn-outline-primary");
    }
}

/**
 * Această funcție schimbă stilul tuturor radiobutton-urilor din grup atunci când unul este selectat.
 * @param {HTMLInputElement} radio - Referința către elementul radio care a declanșat schimbarea.
 */
function toggleRadio(radio) {
    
    let vradio=document.getElementsByName("gr_rad");
    for(let r of vradio){
        
        var label=r.parentNode;
        if (r.checked) {
            console.log(r);
            label.classList.remove("btn-outline-primary");
            label.classList.add("btn-primary");
        } else {
            label.classList.remove("btn-primary");
            label.classList.add("btn-outline-primary");
        }
    }
}
