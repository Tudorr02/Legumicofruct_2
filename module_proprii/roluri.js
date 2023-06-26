
const Drepturi=require('./drepturi.js');

/**
 * Aceasta clasa abstracta definește un rol generic.
 */
class Rol{
    /**
     * Getter pentru tipul de rol.
     */
    static get tip() {return "generic"}
     /**
     * Getter pentru drepturile asociate acestui rol.
     */
    static get drepturi() {return []}
    
    /**
     * Constructorul clasei Rol. Atribuie codul rolului.
     */
    constructor (){
        this.cod=this.constructor.tip;
    }
/**
     * Verifica daca acest rol are un anumit drept.
     * @param {Symbol} drept - Dreptul pe care vrem sa il verificam.
     * @returns {boolean} - True daca rolul are dreptul, false in caz contrar.
     */
    areDreptul(drept){ //drept trebuie sa fie tot Symbol
        console.log("in metoda rol!!!!")
        return this.constructor.drepturi.includes(drept); //pentru ca e admin
    }
}
/**
 * Clasa RolAdmin extinde clasa Rol. Definește un rol de administrator.
 */
class RolAdmin extends Rol{
    
    static get tip() {return "admin"}
    constructor (){
        super();
    }
/**
     * Pentru un administrator, aceasta metoda va returna intotdeauna true,
     * deoarece un administrator are toate drepturile.
     * @returns {boolean} - True, deoarece un admin are toate drepturile.
     */
    areDreptul(){
        return true; //pentru ca e admin
    }
}

/**
 * Clasa RolModerator extinde clasa Rol. Definește un rol de moderator.
 */
class RolModerator extends Rol{
    
    static get tip() {return "moderator"}
    static get drepturi() { return [
        Drepturi.vizualizareUtilizatori,
        Drepturi.stergereUtilizatori
    ] }
    constructor (){
        super()
    }
}

/**
 * Clasa RolClient extinde clasa Rol. Definește un rol de client.
 */
class RolClient extends Rol{
    static get tip() {return "comun"}
    static get drepturi() { return [
        Drepturi.cumparareProduse
    ] }
    constructor (){
        super()
    }
}
/**
 * Clasa RolFactory este o fabrica pentru crearea de roluri.
 */
class RolFactory{
    /**
     * Metoda statica pentru crearea unui rol pe baza tipului specificat.
     * @param {string} tip - Tipul de rol care trebuie creat.
     * @returns {Rol} - O instanta a rolului corespunzator.
     */
    static creeazaRol(tip) {
        switch(tip){
            case RolAdmin.tip : return new RolAdmin();
            case RolModerator.tip : return new RolModerator();
            case RolClient.tip : return new RolClient();
        }
    }
}


module.exports={
    RolFactory:RolFactory,
    RolAdmin:RolAdmin
}