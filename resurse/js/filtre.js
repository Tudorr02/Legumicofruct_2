function toggleCheckbox(checkbox) {
    if (checkbox.checked) {
        var label=checkbox.parentNode;
        label.classList.remove("btn-outline-primary");
        label.classList.add("btn-primary");
      
  }
}

function toggleRadio(radio) {
    
    let vradio=document.getElementsByName("gr_rad");
    for(let r of vradio){
        
        var label=r.parentNode;
        if (r.checked) {
            console.log(r);
            label.classList.remove("btn-outline-primary");
            label.classList.add("btn-primary");
        }
        else{
            label.classList.remove("btn-primary");
            label.classList.add("btn-outline-primary");
            
        }
    }

}

  
  
  
  
  
  