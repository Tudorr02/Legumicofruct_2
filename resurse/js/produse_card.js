
window.addEventListener("load",function(){



    let iduriProduse=localStorage.getItem("cos_virtual");
    iduriProduse=iduriProduse?iduriProduse.split(","):[];      //["3","1","10","4","2"]

    for(let idp of iduriProduse){
        let ch = document.querySelector(`[value='${idp}'].select-cos`);
        if(ch){
            ch.checked=true;
        }
        else{
            console.log("id cos virtual inexistent:", idp);
        }
    }

    //----------- adaugare date in cosul virtual (din localStorage)
    let checkboxuri= document.getElementsByClassName("select-cos");
    for(let ch of checkboxuri){
        ch.onchange=function(){
            let iduriProduse=localStorage.getItem("cos_virtual");
            iduriProduse=iduriProduse?iduriProduse.split(","):[];

            if( this.checked){
                iduriProduse.push(this.value)
            }
            else{
                let poz= iduriProduse.indexOf(this.value);
                if(poz != -1){
                    iduriProduse.splice(poz,1);
                }
            }

            localStorage.setItem("cos_virtual", iduriProduse.join(","))
        }
        
    }
   
    // document.getElementById("inp-pret").onchange=function(){
    //     document.getElementById("infoRange").innerHTML=`(${this.value})`
        
        
        
    // }
    
   


    // document.getElementById("filtrare").onclick=function(){
    //     let val_nume=document.getElementById("inp-nume").value.toLowerCase();

    //     var produse=document.getElementsByClassName("produs_card");

        
        

    
    //     let radiobuttons= document.getElementsByName("gr_rad");
    //     let val_cal_nutritiva="ABCD";
    //     let val_pret=document.getElementById("inp-pret").value;
    //     let val_categ= document.getElementById("inp-categorie").value;
    //     let vitamine=document.getElementsByName("checkbox_vitamine");
    //     let val_vitamine=[];
    //     let datalist=document.getElementById("dt").value;
    //     let s_multiplu=document.getElementsByClassName("sel_multiplu");
    //     let valori_s_multiplu=[];
        
    //     //Salvare cookie-uri
        
       
    //     for(let qq of s_multiplu[0].options){
    //         if(qq.selected)
    //         valori_s_multiplu.push(qq.value);
            
    //     }
           
    //     let nr_radiobuttons=0;
    //     for( let r of radiobuttons){
    //         if(r.checked){
    //             val_cal_nutritiva=r.value;
    //             nr_radiobuttons++;
    //             if(val_cal_nutritiva=="toate"){
    //             val_cal_nutritiva="ABCD";
    //             console.log(val_cal_nutritiva);
    //             }
    //             break;
    //         }
           
    //     }

    //     for(let c of vitamine){
    //         if(c.checked){
    //             val_vitamine.push(c.value);
    //         }
    //     }

    //         console.log(val_vitamine);

            
    //         let t = 100; // Durata în milisecunde
    //         let index = 0;

            
            
    //     for(let prod of produse){
    //         prod.style.display="none";

    //         let nume=prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();
    //         let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);


    //         let cond_nume= (nume.startsWith(val_nume ));

    //         if(val_nume.match(/\d/)!==null){
    //             let dialog=document.getElementById("custom-dialog_1");
    //             dialog.style.display="flex";

    //             document.getElementById("dialog-ok_1").onclick=function(){
    //                 dialog.style.display="none";
    //                 document.getElementById("inp-nume").value="";
                    
    //             }
                
    //         }

    //         if(!nr_radiobuttons){
    //             let dialog=document.getElementById("custom-dialog_2");
    //             dialog.style.display="flex";
                
    //         }else{
    //             document.getElementById("custom-dialog_2").style.display="none";
    //         }
            
                
    //         let cond_calitate_nutritiva=(val_cal_nutritiva.includes(prod.getElementsByClassName("val-cal_nutritiva")[0].innerHTML));
    //         let cond_pret= ( pret >=val_pret);
    //         let cond_categ= (val_categ=="toate"|| prod.getElementsByClassName("val-categorie")[0].innerHTML==val_categ);
    //         let cond_vit=false; 
    //         let prod_vitamine= [];
    //         let cond_datalist=(datalist.length==0 || prod.getElementsByClassName("val-tip")[0].innerHTML==datalist);
    //         let cond_s_multiplu=(valori_s_multiplu.length==0);

    //         if(valori_s_multiplu.length>0){
    //             let produse_multiplu =prod.getElementsByClassName("val-categorie")[0].innerHTML;
    //             cond_s_multiplu=(valori_s_multiplu.includes(produse_multiplu));
                
    //         }

    //         if(val_vitamine.length==0){
    //             cond_vit=true;
    //         }

    //         if(val_vitamine.length >0){
    //             prod_vitamine=prod.getElementsByClassName("val-vitamine")[0].innerHTML.split(",");

    //             for(let vit of prod_vitamine){
    //                 if(val_vitamine.includes(vit))
    //                     cond_vit=true;
    //             }
    //             //console.log(prod_vitamine);

                
    //         }

        

    //         if(cond_nume && cond_calitate_nutritiva && cond_pret && cond_categ && cond_vit && cond_datalist && cond_s_multiplu){
    //             setTimeout(function() {
                    
    //                 prod.style.display = "block";
                   

    //             }, t * index++);
    //         }
                
    //     }

    //     console.log(pret_min,pret_max);
    // }

    ///FUNCTIE PENTRU DIACRITICE
    function DiacriticeCancel(text) {
        var map = {
            'ă': 'a',
            'â': 'a',
            'î': 'i',
            'ș': 's',
            'ț': 't',
            'ȃ': 'a',
            'ȋ': 'i',
            'ș': 's',
            'ț': 't',
        };
        ///g pentru toate aparitile din text
        return text.replace(/[ăâîșțȃȋșț]/g, function(match) {
            return map[match];
        });
    }
      

    function filtrareAutomata() {
        let val_nume=DiacriticeCancel(document.getElementById("inp-nume").value.toLowerCase());

        var produse=document.getElementsByClassName("produs_card");

    
        let radiobuttons= document.getElementsByName("gr_rad");
        let val_cal_nutritiva="ABCD";
        let val_pret=document.getElementById("inp-pret").value;
        let val_categ= document.getElementById("inp-categorie").value;
        let vitamine=document.getElementsByName("checkbox_vitamine");
        let val_vitamine=[];
        let datalist=document.getElementById("dt").value;
        let s_multiplu=document.getElementsByClassName("sel_multiplu");
        let valori_s_multiplu=[];
        
        ////PT RANGE
        document.getElementById("infoRange").innerHTML = `(${val_pret})`;
        
       
        for(let qq of s_multiplu[0].options){
            if(qq.selected)
            valori_s_multiplu.push(qq.value);
            
        }
           
        let nr_radiobuttons=0;
        for( let r of radiobuttons){
            if(r.checked){
                val_cal_nutritiva=r.value;
                nr_radiobuttons++;
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

            console.log(val_vitamine);

            
            let t = 100; // Durata în milisecunde
            let index = 0;

            
            

            
        for(let prod of produse){
            prod.style.display="none";

            let nume=prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();
            let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);


            let cond_nume= (nume.startsWith(val_nume ));

            if(val_nume.match(/\d/)!==null){
                let dialog=document.getElementById("custom-dialog_1");
                dialog.style.display="flex";

                document.getElementById("dialog-ok_1").onclick=function(){
                    dialog.style.display="none";
                    document.getElementById("inp-nume").value="";
                    
                }
                
            }

            if(!nr_radiobuttons){
                let dialog=document.getElementById("custom-dialog_2");
                dialog.style.display="flex";
                
            }else{
                document.getElementById("custom-dialog_2").style.display="none";
            }
            
                
            let cond_calitate_nutritiva=(val_cal_nutritiva.includes(prod.getElementsByClassName("val-cal_nutritiva")[0].innerHTML));
            let cond_pret= ( pret >=val_pret);
            let cond_categ= (val_categ=="toate"|| prod.getElementsByClassName("val-categorie")[0].innerHTML==val_categ);
            let cond_vit=false; 
            let prod_vitamine= [];
            let cond_datalist=(datalist.length==0 || prod.getElementsByClassName("val-tip")[0].innerHTML==datalist);
            let cond_s_multiplu=(valori_s_multiplu.length==0);

            if(valori_s_multiplu.length>0){
                let produse_multiplu =prod.getElementsByClassName("val-categorie")[0].innerHTML;
                cond_s_multiplu=(valori_s_multiplu.includes(produse_multiplu));
                
            }

            if(val_vitamine.length==0){
                cond_vit=true;
            }

            if(val_vitamine.length >0){
                prod_vitamine=prod.getElementsByClassName("val-vitamine")[0].innerHTML.split(",");

                for(let vit of prod_vitamine){
                    if(val_vitamine.includes(vit))
                        cond_vit=true;
                }
                

                
            }

        

            if(cond_nume && cond_calitate_nutritiva && cond_pret && cond_categ && cond_vit && cond_datalist && cond_s_multiplu){
                setTimeout(function() { //vechea functie
                    
                    prod.style.display = "block";
                   

                }, t * index++);
                
                //prod.style.display = "block";
                
            }
                
        }

        
    }

    
    

    let filtrareInputs = document.querySelectorAll('#inp-nume, #inp-pret,#inp-categorie, [name="gr_rad"],  [name="checkbox_vitamine"], #dt,.sel_multiplu');
        for(let filtru of filtrareInputs) {
            filtru.onchange = filtrareAutomata;
        }

        
    

    


    document.getElementById("resetare").onclick= function(){
        
        let confirmare=confirm("Sunteti sigur ca vreti sa resetati filtrele?");

        if(confirmare){
       
        document.getElementById("inp-nume").value="";
       
        document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
        document.getElementById("inp-categorie").value="toate";
        document.getElementById("i_rad5").checked=true;
        document.getElementById("infoRange").innerHTML="(0)";
        vitamine=document.getElementsByName("checkbox_vitamine");
        document.getElementById("dt").value="";
        let multiplu= document.getElementsByClassName("sel_multiplu")[0];
        document.getElementsByClassName("Mesaj-dinamic")[0].style.display="none";
        document.getElementById("dialog-message_2").style.display="none";

        for(let i=0;i< multiplu.length;i++)
            multiplu.options[i].selected=false;


        let vradio=document.getElementsByName("gr_rad");
        for(let r of vradio){
            var label=r.parentNode;
            label.classList.remove("btn-primary");
            label.classList.add("btn-outline-primary");
          
        }
        document.getElementById("i_rad5").parentNode.classList.remove("btn-outline-primary");
        document.getElementById("i_rad5").parentNode.classList.add("btn-primary");

            
        for(let c of vitamine){
            if(c.checked){
                c.parentNode.classList.remove("btn-primary");
                c.parentNode.classList.add("btn-outline-primary");
                c.checked=false;
            }
        }
        
        var produse=document.getElementsByClassName("produs_card");
        
        
        for (let prod of produse){
            let selectat=prod.getElementsByClassName("select-cos")[0];
            if(selectat.checked)
                selectat.checked=false;
            prod.style.display="block";
        }

        
    }
    }

    
        function sortare(semn){

            var produse=document.getElementsByClassName("produs_card");
            var v_produse= Array.from(produse);

            // v_produse.sort(function(a,b){
            //     let pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            //     let pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
    
            //     if(pret_a==pret_b){
            //         let nume_a=parseFloat(a.getElementsByClassName("val-nume")[0].innerHTML);
            //         let nume_b=parseFloat(b.getElementsByClassName("val-nume")[0].innerHTML);
            //         return nume_a.localeCompare(nume_b);
            //     }
            //     return semn*(pret_a-pret_b);
            // });

            v_produse.sort(function(a,b){
                let subcateg_a=(a.getElementsByClassName("val-categorie")[0].innerHTML);
                let subcateg_b=(b.getElementsByClassName("val-categorie")[0].innerHTML);

                
    
                if(subcateg_a==subcateg_b){
                    let pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
                    let pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);
                    
                    return semn*(pret_a-pret_b);
                }
                return semn*(subcateg_a.localeCompare(subcateg_b));
               
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
    
       
    document.getElementById("suma").onclick= function(){
            let suma=0;
            var produse=document.getElementsByClassName("produs_card");
            
            for(let prod of produse){
                let selectat=prod.getElementsByClassName("select-cos")[0];
                let pret=prod.getElementsByClassName("val-pret")[0].innerHTML;
                if(selectat.checked){
                    suma+=parseFloat(pret);
                    
                }
                
            }
            console.log(suma);
            let mesaj=document.getElementsByClassName("Mesaj-dinamic")[0];
            let suma_mesaj=document.getElementsByClassName("valoare_suma")[0];
            suma_mesaj.innerHTML=suma;
            mesaj.style.display="block";
            
            
            
    }


    /**
 * Aceasta functie se declanseaza la click pe butonul de sortare.
 * Culege valorile selectate de utilizator si apeleaza functia de sortare.
 */

    document.getElementById("btnSortare").onclick = function() {
        var cheie1 = document.getElementById("selectCheie1").value;
        var cheie2 = document.getElementById("selectCheie2").value;
        var ordine = document.getElementById("selectOrdine").value;
    
        var semn = 1;
        if (ordine === "descrescator") {
          semn = -1;
        }
    
        sortare_dinamica(semn, cheie1, cheie2);
      }
    
      /**
         * Aceasta functie sorteaza produsele in functie de criteriile alese de utilizator.
         * @param {number} semn - Semnul ce determina ordinea de sortare (1 pentru crescator, -1 pentru descrescator).
         * @param {string} cheie1 - Primul criteriu de sortare.
         * @param {string} cheie2 - Al doilea criteriu de sortare.
         */
      function sortare_dinamica(semn, cheie1, cheie2) {
        var produse = document.getElementsByClassName("produs_card");
        var v_produse = Array.from(produse);
    
        v_produse.sort(function(a, b) {
          var val_a = a.getElementsByClassName("val-" + cheie1)[0].innerHTML;
          var val_b = b.getElementsByClassName("val-" + cheie1)[0].innerHTML;
    
          if (val_a === val_b) {
            val_a = a.getElementsByClassName("val-" + cheie2)[0].innerHTML;
            val_b = b.getElementsByClassName("val-" + cheie2)[0].innerHTML;
          }
    
          if (cheie1 === "pret" || cheie2 === "pret") {
            val_a = parseFloat(val_a);
            val_b = parseFloat(val_b);
            return(semn*(val_a-val_b))
          }
    
          return semn * (val_a.localeCompare(val_b));
        });
    
        for (var i = 0; i < v_produse.length; i++) {
          v_produse[i].parentElement.appendChild(v_produse[i]);
        }
    }
    
    
    
})