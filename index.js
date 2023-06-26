
const { render } = require("ejs");
const express=require("express");
const fs=require('fs');
const path= require('path');
const sharp=require('sharp');
const sass= require('sass');
const ejs=require('ejs');
const {Client}= require('pg');
const e = require("express");
const AccesBD=require("./module_proprii/accesbd.js");

const formidable =require("formidable");
const session=require('express-session');
const {Utilizator}=require("./module_proprii/utilizator.js");
const Drepturi= require("./module_proprii/drepturi.js");

AccesBD.getInstanta().select(
    { tabel: "produse",
     campuri:["nume","pret"],
     conditiiAnd:["pret>2"]},
     function(err,rez){
        console.log(err);
        console.log(rez);
     }
     )

var client= new Client({database:"legumicofruct",
        user:"legumicofruct",
        password:"admin",
        host:"localhost",
        port:5432});
client.connect();
client.query("select * from lab8_16", function(err,rez){
    console.log("eroare:",err);
    console.log("rezultat:",rez);
})


obGlobal={
    obErori:null,
    obImagini:null,
    folderScss: path.join(__dirname, "resurse/scss", ),
    folderCss: path.join(__dirname, "resurse/css", ),
    folderBackup: path.join(__dirname, "backup"),
    optiuniMeniu: []
};

client.query("select * from unnest(enum_range(null::tipuri_produse))",function(err,rezCategorie){
    if(err){
        console.log(err);
    }else{
        
        obGlobal.optiuniMeniu=rezCategorie.rows;
    }
});
app=express();
console.log("Folder Proiect", __dirname);
console.log("Cale Fisier", __filename);
console.log("Director de lucru", process.cwd());

vectorFoldere=["temp","temp1","backup","poze_uploadate"];
for(let folder of vectorFoldere){
    // let caleFolder=__dirname+"/"+folder;
    let caleFolder=path.join(__dirname,folder);
    if(!fs.existsSync(caleFolder)){
        fs.mkdirSync(caleFolder)
    }
}



function compileazaScss(caleScss, caleCss){
    
    if(!caleCss){
        // let vectorCale=caleScss.split("\\")
        // let numeFisExt=vectorCale[vectorCale.length-1];
        let numeFisExt=path.basename(caleScss);
        let numeFis= numeFisExt.split(".")[0];
        caleCss=numeFis+".css";
    }
    if(!path.isAbsolute(caleScss))
        caleScss=path.join(obGlobal.folderScss,caleScss)
    if(!path.isAbsolute(caleCss))
        caleCss=path.join(obGlobal.folderCss,caleCss)

    // let vectorCale=caleCss.split("\\");
    // let numeFisCss= vectorCale[vectorCale.length-1];
    let caleBackup=path.join(obGlobal.folderBackup, "resurse/css");
    if(!fs.existsSync(caleBackup)){
        fs.mkdirSync(caleBackup,{recursive:true});
    }
    let numeFisCss=path.basename(caleCss);
    if (fs.existsSync(caleCss)){
        fs.copyFileSync(caleCss,path.join(obGlobal.folderBackup,"resurse/css",numeFisCss))
    }
    rez=sass.compile(caleScss,{"sourceMap":true});
    fs.writeFileSync(caleCss,rez.css)
    // console.log("Compilare SCSS",rez);

}

fs.watch(obGlobal.folderScss,function(eveniment, numeFis){

    console.log(eveniment,numeFis);
    if(eveniment=="change" || eveniment=="rename"){
        let caleCompleta=path.join(obGlobal.folderScss,numeFis);
        if (fs.existsSync(caleCompleta)){
            compileazaScss(caleCompleta);
        }
    }
})




app.set("view engine","ejs");

app.use("/resurse", express.static(path.join(__dirname,"/resurse")));
app.use("/node_modules", express.static(path.join(__dirname,"/node_modules")));

app.use("/*",function(req,res,next){
    res.locals.optiuniMeniu=obGlobal.optiuniMeniu;
    // res.locals.Drepturi=Drepturi;
    // if (req.session.utilizator){
    //     req.utilizator=res.locals.utilizator=new Utilizator(req.session.utilizator);
    // }    
    next();
});

app.use(/^\/resurse(\/[a-zA-Z0-9]*)*$/,function(req,res){
    afisareEroare(res,403);
})

app.get("/favicon.ico",function(req,res){
    res.sendFile(path.join(__dirname,"/resurse/ico/favicon.ico"));
})

app.get("/ceva",function(req,res){
    console.log("cale:",req.url);

    res.send("<h1>altceva</h1> ip:"+req.ip);
})

app.get(["/index","/","/home"],function(req,res){
    res.render("pagini/index",{ip:req.ip, imagini: obGlobal.obImagini.imagini});
})

// app.get(["/","/index","/home","/login"], async function(req, res){
//     console.log("ceva");
// })

    
//     let sir=req.session.mesajLogin;
//     req.session.mesajLogin=null;

//     client.query("select username, nume, prenume from utilizatori where id in (select distinct user_id from accesari where now()-data_accesare <= interval '5 minutes')",
//         function(err, rez){
//             let useriOnline=[];
//             if(!err && rez.rowCount!=0)
//                 useriOnline=rez.rows
//             console.log(useriOnline);

//             /////////////// am adaugat aici:
//             var evenimente=[]
//             var locatie="";
            
//             request('https://secure.geobytes.com/GetCityDetails?key=7c756203dbb38590a66e01a5a3e1ad96&fqcn=109.99.96.15', //se inlocuieste cu req.ip; se testeaza doar pe Heroku
//                 function (error, response, body) {
//                     locatie="Nu se poate detecta pentru moment."
//                 if(error) {
                    
//                     console.error('eroare geobytes:', error)
//                 }
//                 else{
//                     var obiectLocatie=JSON.parse(body);
//                     console.log(obiectLocatie);
//                     locatie=obiectLocatie.geobytescountry+" "+obiectLocatie.geobytesregion
//                 }
    
//                 //generare evenimente random pentru calendar 
                
//                 var texteEvenimente=["Eveniment important", "Festivitate", "Prajituri gratis", "Zi cu soare", "Aniversare"];
//                 dataCurenta=new Date();
//                 for(i=0;i<texteEvenimente.length;i++){
//                     evenimente.push({data: new Date(dataCurenta.getFullYear(), dataCurenta.getMonth(), Math.ceil(Math.random()*27) ), text:texteEvenimente[i]});
//                 }
//                 console.log(evenimente)
//                 console.log("inainte",req.session.mesajLogin);

//                 //////sfarsit zona adaugata:
//                 res.render("pagini/index", {ip: req.ip, imagini:obGlobal.obImagini.imagini, mesajLogin:sir, useriOnline:useriOnline, evenimente:evenimente, locatie:locatie});

//         });

//     //adaugat si inchidere functie:
//     });
        
// });

//--------------PRODUSE-----------------
app.get("/produse_legumicofruct",function(req, res){
    //console.log(req.query.tip);
    console.log(res.rows);

    //TO DO query pentru a selecta toate produsele
    //TO DO se adauaga filtrarea dupa tipul produsului
    //TO DO se selecteaza si toate valorile din enum-ul categ_prajitura

    client.query("select * from unnest(enum_range(null::categ_produs))",function(err,rezCategorie){
        if(err){
            console.log(err);
        }else{
                let conditieWhere="";    
                if(req.query.tip)
                conditieWhere=` where tip_produs='${req.query.tip}'`
            
                client.query("select * from produse "+conditieWhere , function( err, rez){
                    console.log(300)
                    if(err){
                        console.log(err);
                        afisareEroare(res, 2);
                    }
                    else{
                        client.query("select MIN(pret) AS min_price , MAX(pret) AS max_price FROM produse",function(err,rezPret){
                            if (err) {
                                console.log(err);
                                afiseazaEroare(res, 2);
                            }else{
                                console.log(rez);
                                
                                res.render("pagini/produse_legumicofruct", {
                                    produse:rez.rows, 
                                    optiuni:rezCategorie.rows,
                                    pret_minim:rezPret.rows[0].min_price,
                                    pret_maxim:rezPret.rows[0].max_price});
                            }
                        });
                        
                    }
                });

            }
    })
    

          


});

////PENTRU INREGISTRARE UTILIZATOR
app.post("/inregistrare",function(req, res){
    var username;
    var poza;
    console.log("ceva");
    var formular= new formidable.IncomingForm()
    formular.parse(req, function(err, campuriText, campuriFisier ){//4
        console.log("Inregistrare:",campuriText);

        console.log(campuriFisier);
        var eroare="";

        var utilizNou=new Utilizator();
        try{
            utilizNou.setareNume=campuriText.nume;
            utilizNou.setareUsername=campuriText.username;
            utilizNou.email=campuriText.email
            utilizNou.prenume=campuriText.prenume
            utilizNou.an_nastere=campuriText.an_nastere
            utilizNou.reintroducere_parola=campuriText.reintroducere_parola
            utilizNou.parola=campuriText.parola;
            utilizNou.culoare_chat=campuriText.culoare_chat;
            utilizNou.poza= poza;
            Utilizator.getUtilizDupaUsername(campuriText.username, {}, function(u, parametru ,eroareUser ){
                if (eroareUser==-1){//nu exista username-ul in BD
                    utilizNou.salvareUtilizator();
                    console.log("se salveaza utilizatoru");
                }
                else{
                    eroare+="Mai exista username-ul";
                }

                if(!eroare){
                    res.render("pagini/inregistrare", {raspuns:"Inregistrare cu succes!"})
                    
                }
                else
                    res.render("pagini/inregistrare", {err: "Eroare: "+eroare});
            })
            

        }
        catch(e){ 
            console.log(e);
            eroare+= "Eroare site; reveniti mai tarziu";
            console.log(eroare);
            res.render("pagini/inregistrare", {err: "Eroare: "+eroare})
        }
    



    });
    formular.on("field", function(nume,val){  // 1 
	
        console.log(`--- ${nume}=${val}`);
		
        if(nume=="username")
            username=val;
    }) 
    formular.on("fileBegin", function(nume,fisier){ //2
        console.log("fileBegin");
		
        console.log("FILE BEIN->NUME: ",nume);
        console.log("FILE BEGIN->FISIER:",fisier);
		//TO DO in folderul poze_uploadate facem folder cu numele utilizatorului
        let folderUser=path.join(__dirname, "poze_uploadate",username);
        //folderUser=__dirname+"/poze_uploadate/"+username
        console.log("folder User" ,folderUser);
        if (!fs.existsSync(folderUser))
            fs.mkdirSync(folderUser);
        fisier.filepath=path.join(folderUser, fisier.originalFilename)

        console.log("FISIER.FILEPATH->",fisier.filepath);
        poza=fisier.originalFilename;
        console.log("poza",poza);
        //fisier.filepath=folderUser+"/"+fisier.originalFilename

    })    
    formular.on("file", function(nume,fisier){//3
        console.log("file");
        console.log(nume,fisier);
    }); 
});



app.get("/produs/:id",function(req, res){
    console.log(req.params);
    
   
    client.query(`select * from produse where id=${req.params.id}`, function( err, rezultat){
        if(err){
            console.log(err);
            afisareEroare(res, 2);
        }
        else
            res.render("pagini/produs", {prod:rezultat.rows[0]});
            
    });
});

app.get("/logout", function(req, res){
    req.session.destroy();
    res.locals.utilizator=null;
    res.render("pagini/logout");
});


app.get("/cod/:username/:token",function(req,res){
    console.log(req.params);
    try {
        Utilizator.getUtilizDupaUsername(req.params.username,{res:res,token:req.params.token} ,function(u,obparam){
            AccesBD.getInstanta().update(
                {tabel:"utilizatori",
                campuri:{confirmat_mail:'true'}, 
                conditiiAnd:[`cod='${obparam.token}'`]}, 
                function (err, rezUpdate){
                    if(err || rezUpdate.rowCount==0){
                        console.log("Cod:", err);
                        afisareEroare(res,3);
                    }
                    else{
                        res.render("pagini/confirmare.ejs");
                    }
                })
        })
    }
    catch (e){
        console.log(e);
        renderError(res,2);
    }
})


app.get("/*.ejs",function(req,res){
    afisareEroare(res,400);
})

app.get("/*",function(req ,res){
    try{
        res.render(path.join("pagini",req.url), function(err, rezRandare){
            if(err){
                console.log(err);
                if(err.message.startsWith("Failed to lookup view")){
                
                    afisareEroare(res,404);
                }
                else
                afisareEroare(res);
            }
            else{
                
                res.send(rezRandare);
            }
        });
    }
    catch(err){
        if(err.message.startsWith("Cannot find module"))
            afisareEroare(res,404);
            else
            afisareEroare(res);
    }
})

function initErori(){
   var continut= fs.readFileSync(path.join(__dirname,"/resurse/json/erori.json")).toString("utf-8");
   console.log(continut);
   obGlobal.obErori= JSON.parse(continut);
   let vErori=obGlobal.obErori.info_erori;
    //    for(let i=0;i<vErori.length;i++){

    //    }

    for(let eroare of vErori){
        eroare.imagine=path.join("/",obGlobal.obErori.cale_baza,eroare.imagine);
               console.log(eroare.imagine);

    }
}

initErori();


/////////////////////////////////////////////////////

function initImagini(){
    var continut= fs.readFileSync(path.join(__dirname,"/resurse/json/galerie.json")).toString("utf-8");
    
    obGlobal.obImagini= JSON.parse(continut);
    let vImagini=obGlobal.obImagini.imagini;
     
    let caleAbs=path.join(__dirname,obGlobal.obImagini.cale_galerie);
    let caleAbsMediu=path.join(__dirname,obGlobal.obImagini.cale_galerie,"mediu");
    let caleAbsMic=path.join(__dirname,obGlobal.obImagini.cale_galerie,"mic");
    

    if(!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu)

    if(!fs.existsSync(caleAbsMic))
        fs.mkdirSync(caleAbsMic)
    
 
    for(let imag of vImagini){
         //eroare.imagine=path.join("/",obGlobal.obErori.cale_baza,eroare.imagine);

        //  [numeFis,ext]=imag.fisier.split(".");
        //  let caleFisAbs=path.join(caleAbs,imag.fisier);
        //  let caleFisMediuAbs=path.join(caleAbsMediu,numeFis+".webp");
        //  let caleFisMicAbs=path.join(caleAbsMic,numeFis+".webp");

            [numeFis,ext]=imag.cale_imagine.split(".");
            let caleFisAbs=path.join(caleAbs,imag.cale_imagine);
            let caleFisMediuAbs=path.join(caleAbsMediu,numeFis+".webp");
            let caleFisMicAbs=path.join(caleAbsMic,numeFis+".webp");

         sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs);
         sharp(caleFisAbs).resize(250).toFile(caleFisMicAbs);

         
         imag.cale_imagine_mic=path.join("/",obGlobal.obImagini.cale_galerie,"mic",numeFis+".webp")
         imag.cale_imagine_mediu=path.join("/",obGlobal.obImagini.cale_galerie,"mediu",numeFis+".webp")
         imag.cale_imagine=path.join("/",obGlobal.obImagini.cale_galerie,imag.cale_imagine)
         console.log(imag.cale_imagine);
                
 
     }
 }
 
 initImagini();

function afisareEroare(res,_identificator,_titlu,_text,_imagine){
    let vErori= obGlobal.obErori.info_erori;
    let eroare=vErori.find(function(elem){
        return elem.identificator==_identificator;
    })
   
    

    if(eroare){

        let titlu1=_titlu || eroare.titlu;
        let text1= _text || eroare.text;
        let imagine1= _imagine || eroare.imagine;
        if(eroare.status){
            
           res.status(eroare.identificator).render("pagini/eroare",{titlu:titlu1,text:text1,imagine:imagine1});

        }else{
    
        res.render("pagini/eroare",{titlu:titlu1,text:text1,imagine:imagine1});
        
        }
    }
    else
    {

        let errDef=obGlobal.obErori.eroare_default;
        res.render("pagini/eroare",{titlu:errDef.titlu,text:errDef.text,imagine:path.join(obGlobal.obErori.cale_baza,"/",errDef.imagine)});
    }

}

   

app.listen(8080);
console.log("Server on");
