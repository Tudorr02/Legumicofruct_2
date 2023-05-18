window.onload=function(){

    document.getElementById("inp-pret").onchange=function(){
        document.getElementById("infoRange").innerHTML=`(${this.value})`
    }
    document.getElementById("filtrare").onclick=function(){
        let val_nume=document.getElementById("inp-nume").value.toLowerCase();

        var produse=document.getElementsByClassName("produs");
        let radiobuttons= document.getElementsByName("gr_rad");
        let val_cal_nutritiva="ABCD";
        let val_pret=document.getElementById("inp-pret").value;
        let val_categ= document.getElementById("inp-categorie").value;
        let vitamine=document.getElementsByName("checkbox_vitamine");
        let val_vitamine=[];
        let datalist=document.getElementById("dt").value;
        let s_multiplu=document.getElementsByClassName("sel_multiplu");
        
        
        
        for(let qq of s_multiplu)
            console.log(qq.value);

        for( let r of radiobuttons){
            if(r.checked){
                val_cal_nutritiva=r.value;
                
                if(val_cal_nutritiva=="toate"){
                val_cal_nutritiva="ABCD";
                console.log(val_cal_nutritiva);
                }
                break;
            }
           
        }

        for(let c of vitamine){
            if(c.checked){
                val_vitamine.push(c.value);
            }
        }

        //console.log(val_vitamine);



        for(let prod of produse){
                prod.style.display="none";

                let nume=prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();
                let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);

                let cond_nume= (nume.startsWith(val_nume ));
                let cond_calitate_nutritiva=(val_cal_nutritiva.includes(prod.getElementsByClassName("val-cal_nutritiva")[0].innerHTML));
                let cond_pret= ( pret >=val_pret);
                let cond_categ= (val_categ=="toate"|| prod.getElementsByClassName("val-categorie")[0].innerHTML==val_categ);
                let cond_vit=false;
                let prod_vitamine= [];
                let cond_datalist=(datalist.length==0 || prod.getElementsByClassName("val-tip")[0].innerHTML==datalist);
                
                if(val_vitamine.length==0){
                    cond_vit=true;
                }

                if(val_vitamine.length >0){
                    prod_vitamine=prod.getElementsByClassName("val-vitamine")[0].innerHTML.split(",");

                    for(let vit of prod_vitamine){
                        if(val_vitamine.includes(vit))
                            cond_vit=true;
                    }
                    //console.log(prod_vitamine);

                    
                }

            

                if(cond_nume && cond_calitate_nutritiva && cond_pret && cond_categ && cond_vit && cond_datalist ){
                    prod.style.display="block";
                }
                
        }
    }

    document.getElementById("resetare").onclick= function(){
       
        document.getElementById("inp-nume").value="";
       
        document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
        document.getElementById("inp-categorie").value="toate";
        document.getElementById("i_rad5").checked=true;
        document.getElementById("infoRange").innerHTML="(0)";
        vitamine=document.getElementsByName("checkbox_vitamine");
        document.getElementById("dt").value="";
        for(let c of vitamine){
            if(c.checked){
                c.checked=false;
            }
        }
        
        var produse=document.getElementsByClassName("produs");
 
        for (let prod of produse){
            prod.style.display="block";
        }
    }

    
        function sortare(semn){

            var produse=document.getElementsByClassName("produs");
            var v_produse= Array.from(produse);
            v_produse.sort(function(a,b){
                let pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
                let pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
    
                if(pret_a==pret_b){
                    let nume_a=parseFloat(a.getElementsByClassName("val-nume")[0].innerHTML);
                    let nume_b=parseFloat(b.getElementsByClassName("val-nume")[0].innerHTML);
                    return nume_a.localeCompare(nume_b);
                }
                return semn*(pret_a-pret_b);
            });
    
            for(let prod of v_produse){
                prod.parentElement.appendChild(prod);
            }

            

        }

        document.getElementById("sortCrescNume").onclick=function(){
            sortare(1);
        }

        document.getElementById("sortDescrescNume").onclick=function(){
            sortare(-1);
        }
    
    
    
    
}