
const { render } = require("ejs");
const express=require("express");
const fs=require('fs');
const path= require('path');
const sharp=require('sharp');
const sass= require('sass');

obGlobal={
    obErori:null,
    obImagini:null,
    folderScss: path.join(__dirname, "resurse/scss", ),
    folderCss: path.join(__dirname, "resurse/css", ),
    folderBackup: path.join(__dirname, "backup")
};

app=express();
console.log("Folder Proiect", __dirname);
console.log("Cale Fisier", __filename);
console.log("Director de lucru", process.cwd());

// vectorFoldere=["temp","temp1","backup"];
// for(let folder of vectorFoldere){
//     // let caleFolder=__dirname+"/"+folder;
//     let caleFolder=path.join(__dirname,folder);
//     if(!fs.existsSync()){
//         fs.mkdirSync(caleFolder)
//     }
// }



function compileazaScss(caleScss, caleCss){
    
    if(!caleCss){
        let vectorCale=caleScss.split("\\")
        let numeFisExt=vectorCale[vectorCale.length-1];
        let numeFis= numeFisExt.split(".")[0];
        caleCss=numeFis+".css";
    }
    if(!path.isAbsolute(caleScss))
        caleScss=path.join(obGlobal.folderScss,caleScss)
    if(!path.isAbsolute(caleCss))
        caleCss=path.join(obGlobal.folderCss,caleCss)

    let vectorCale=caleCss.split("\\");
    let numeFisCss= vectorCale[vectorCale.length-1];
    if (fs.existsSync(caleCss)){
        fs.copyFileSync(caleCss,path.join(obGlobal.folderBackup,numeFisCss))
    }
    rez=sass.compile(caleScss,{"sourceMap":true});
    fs.writeFileSync(caleCss,rez.css)
    console.log("Compilare SCSS",rez);

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
