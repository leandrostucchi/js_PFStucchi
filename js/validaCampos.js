const analiza = true;

const debuguear = (analiza,leyenda) => { if (analiza) {console.log(leyenda) }}
//localStorage.clear();

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




let nombreTit = document.getElementById("nombreTit");
let emailTit = document.getElementById("emailTit");
let email2Tit = document.getElementById("email2Tit");
let TipoDocumentoTit = document.getElementById("TipoDocumentoTit");
let documentoTit = document.getElementById("documentoTit");





const lista = [];
const Personas =  [];
email2Tit.style.visibility = "hidden"; 


let btnconfirmar = document.getElementById("btnconfirmar");
let btncancelar = document.getElementById("btncancelar");

//saveinfo.addEventListener("input",GuardarInfo);

nombre.addEventListener("input",ValidaNombre);
email.addEventListener("input",AgregoMailConfirmacion);
email2.addEventListener("input",ValidaMail);
TipoDocumento.addEventListener("input",ValidaTipoDocumento);
Documento.addEventListener("input",ValidaDocumento);

btnconfirmar.addEventListener("click",Carga);
btncancelar.addEventListener("click",Limpiar);

function ValidaNombre() {
    let resultado = "";
    debuguear(analiza,nombre.value);
    debuguear(analiza,nombre.value.length);
    if(nombre.value.length<3) resultado = `tiene menos de 3 letras`;
    MensajeError(resultado,nombreTit,nombre.name);
    debuguear(analiza,nombreTit.innerHTML);
    debuguear(analiza,nombreTit.innerText);
    debuguear(analiza,nombre.name);
    
}

function MensajeError(resultado,titulo,nameError) {
    debuguear(analiza,resultado);
    let borrar = document.getElementById("error"+ nameError);        
    if (borrar != null) {
        debuguear(analiza,borrar);
        borrar.remove(); 
    }
    debuguear(analiza,titulo);
    if (resultado != "") {
        let mensaje = document.createElement("div");
        const att = document.createAttribute("class");
        mensaje.id = "error"+ nameError;
        att.value = "div";
        debuguear(analiza,att);
        mensaje.setAttributeNode(att);
        // debuguear(analiza,mensaje.innerHTML);
        // debuguear(analiza,mensaje.innerText);
        mensaje.innerHTML = resultado;
        titulo.appendChild(mensaje);
    }

    
}

function AgregoMailConfirmacion() {
    let resultado = "";
    if(email.vaule != null || email.value != ""){
        MensajeError(resultado,email2Tit,email2.name);
        email2Tit.style.visibility = "visible"; 
    }
    
}
function ValidaMail() {
    let resultado = "";
    if (!EstadoMail(email.value)) resultado = "Mail incorrecto";
    if (!EstadoMail(email2.value)) resultado = "Mail incorrecto";
    if(resultado == ""){
        if (email.value.toLowerCase() !== email2.value.toLowerCase()) resultado = "Mail distintos";
    }
    MensajeError(resultado,email2Tit,email2.name);
    debuguear(analiza,email.value);
    debuguear(analiza,email2.value);
    debuguear(analiza,resultado);
}

function ValidaTipoDocumento() {
    let resultado = "";
    const listaTipoDocumento = ["1","2","3","4","5"];
    let existe =  listaTipoDocumento.find((x)=> x == TipoDocumento.value)? true:false;
    if(!existe) resultado = "Tipo de documento Invalido";
    debuguear(analiza,resultado);
    debuguear(analiza,listaTipoDocumento);
    debuguear(analiza,TipoDocumento.name);
    debuguear(analiza,listaTipoDocumento.find((x)=> x == TipoDocumento.value));
    

    MensajeError(resultado,TipoDocumentoTit,TipoDocumento.name);
}



function ValidaDocumento() {
    let resultado = "";
    let variable = Documento.value;
    let reemplazaCaracter = Reemplazar("");
    variable= reemplazaCaracter(variable,".");
    variable= reemplazaCaracter(variable,",");
    switch (TipoDocumento.value) {
        case "1":
        case "3":
        case "4":
            if(!EsNumerico(variable))  resultado = "Documento Invalido";
            break;
        default:
            break;
    }
    MensajeError(resultado,documentoTit,Documento.name);
}


function Carga(e) {
    e.preventDefault(); // evitamos el refrescamiento del formulario.
    lista[0]  = nombre.value;
    lista[1]  = email.value;
    lista[2]  = email2.value;
    lista[3]  = TipoDocumento.value;
    lista[4]  = Documento.value;
    lista[5]  = Domicilio.value;
    lista[6]  = CodigoPostal.value;
    lista[7]  = Localidad.value;
    lista[8]  = Telefono.value;
    debuguear(analiza,lista);
    Personas.push(new Persona(lista));
    debuguear(analiza,Personas);
     Normalizacion(Personas);
     debuguear(analiza,Personas);
     GuardarInfo();
     GuardarMail();
}

function Limpiar() {
    localStorage.clear();
}

function GuardarInfo() {
    debuguear(analiza,saveinfo.checked);
    if(Personas!= null){
        if(saveinfo.checked == true){
            debuguear(analiza,Personas);
            const JPersonas = JSON.stringify(Personas);
            localStorage.setItem("Persona",JPersonas);
        }
        if(saveinfo.checked == false){
            debuguear(analiza,Personas);
            localStorage.removeItem("Persona");
        }
    }
}

function GuardarMail() {
    debuguear(analiza,"GuardarMail");
    debuguear(analiza,saveinfo.checked);
    const PersonaMail = []
    if(Personas!= null){
        if(sameaddress.checked == true){
            debuguear(analiza,Personas);
            debuguear(analiza,Personas[0].Nombre);
            debuguear(analiza,Personas[0].EMail);
            PersonaMail[0] = Personas[0].Nombre;
            PersonaMail[1] = Personas[0].EMail;
            debuguear(analiza,PersonaMail);
            localStorage.setItem("PersonaMail",PersonaMail);
        }
        if(sameaddress.checked == false){
            debuguear(analiza,PersonaMail);
            localStorage.removeItem("PersonaMail");
        }
    }
}


function Reemplazar(CaracterDestino) {
    return (palabra,caracterOrigen) =>   palabra.replace(caracterOrigen,CaracterDestino);
}

function EsNumerico(numero){
    let valor = parseInt(numero);
    if(typeof(valor) != "number"){
        return 0;
    }
    return valor;
}



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



function EstadoMail(email) {
    //? Chequea que el mail tenga @ y punto
    let tienearroba= email.includes("@");
    let tienepunto=  email.indexOf(".",email.indexOf("@"));
    debuguear(analiza,tienepunto + " " + email.indexOf("@"));
    debuguear(analiza,email);
     if (tienearroba && tienepunto!= -1) {
        debuguear(analiza,"cumple");
        return true;        
     }
     debuguear(analiza,"NO cumple");
     return false;
}

function Normalizacion(personas) {
    //? emprolija los campos
    let reemplazaCaracter = Reemplazar("");
    for (const persona of personas) {
        persona.Documento= reemplazaCaracter(persona.Documento,".");
        persona.Documento= reemplazaCaracter(persona.Documento,",");
        persona.Nombre = EnMayuscula(persona.Nombre);
    }
}