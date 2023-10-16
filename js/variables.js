let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let email2 = document.getElementById("email2"); 
let TipoDocumento = document.getElementById("TipoDocumento");
let Documento = document.getElementById("Documento"); 
let Domicilio = document.getElementById("Domicilio"); 
let CodigoPostal = document.getElementById("CodigoPostal");
let Localidad = document.getElementById("Localidad"); 
let Telefono = document.getElementById("Telefono");
let saveinfo = document.getElementById("saveinfo");
let sameaddress = document.getElementById("sameaddress");

let message = document.getElementById("message");
let barra = document.getElementById("barra");



const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;



let nombreTit = document.getElementById("nombreTit");
let emailTit = document.getElementById("emailTit");
let email2Tit = document.getElementById("email2Tit");
let TipoDocumentoTit = document.getElementById("TipoDocumentoTit");
let documentoTit = document.getElementById("documentoTit");


let btnconfirmar = document.getElementById("btnconfirmar");
let btncancelar = document.getElementById("btncancelar");


let carrito = {};
const lista = [];
const Personas =  [];
message.style.visibility = "hidden"; 
barra.style.visibility = "hidden"; 


const fragment = document.createDocumentFragment();

class Persona {
    constructor(lista){
        this.Nombre         = lista[0];
        this.EMail          = lista[1];
        this.EMail2         = lista[2];
        this.TipoDocumento  = lista[3];
        this.Documento      = lista[4];
        this.Domicilio      = lista[5];
        this.CodigoPostal   = lista[6];
        this.Localidad      = lista[7];
        this.Telefono       = lista[8];
     }
}

function  EnMayuscula(palabra){
    return palabra.toUpperCase(); 
}