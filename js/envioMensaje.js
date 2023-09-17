const analiza = true;

const debuguear = (analiza,leyenda) => { if (analiza) {console.log(leyenda) }}


const lista = [];
const Personas =  [];
const listaTipoDocumento = [];


class TiposDocumento {
    //? tipo de docuemnto
    constructor(id,nombre){
        this.id         = parseInt(id);
        this.Nombre     = nombre;
    }
}

function CrearTipoDocumento(){
    //? carga tipo de documentos
    listaTipoDocumento.push(new TiposDocumento(1,"D.N.I."));
    listaTipoDocumento.push(new TiposDocumento(2,"PASAPORTE"));
    listaTipoDocumento.push(new TiposDocumento(3,"C.U.I.T."));
    listaTipoDocumento.push(new TiposDocumento(4,"C.U.I.L."));
    listaTipoDocumento.push(new TiposDocumento(5,"DOCUMENTO EXTRANJERO"));
}

function Concatenar(listas){
    //? visualizacion de tipos de documento
    let variable = "\n";
    for (const lista of listas) {
        variable += `${lista.id} ${lista.Nombre} \n`;
    }
    variable += `Ingrese un tipo de documento \n`;
    return variable;
}

function ValidaTipoDocumento(valor){
    //? valor ingresado este en la lista de tipos de documento
    let resultado =  listaTipoDocumento.some(v => v.id === parseInt(valor));
    debuguear(analiza,resultado);
    return resultado;
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
        this.FechaNacimiento= lista[9];
        this.Mensaje        = lista[10];
     }

/*
const productoDos = {
    nombre: 'manzana',
    categoria: 'frutas',
    precio: 1.99,
    nutrientes:{
        carbohidratos: 0.95,
        grasas: 0.3,
        proteina: 0.2
    }
}

*/

}

function  EnMayuscula(palabra){
    return palabra.toUpperCase(); 
}

function  EnMinuscula(palabra){
    return palabra.toLowerCase(); 
}

function EsNumerico(numero){
        // switch (typeof(valor)) {
        //     case "number":
        //         break;
        //     case "string":
        //         break;
        //     case "boolean":
        //         break;
        //     case "object":
        //         break;
        //     default:
        //         break;
        // }
    let valor = parseInt(numero);
    if(typeof(valor) != "number"){
        return 0;
    }
    return valor;
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




alert(Carga());


function Carga() {
     CrearTipoDocumento();
    lista[0]  = IngreseDato("Nombre",lista);
    lista[1]  = IngreseDato("Email",lista);
    lista[2]  = IngreseDato("Nuevamente Email",lista);
    lista[3]  = IngreseDato("Tipo de Documento",lista);
    lista[4]  = IngreseDato("Documento",lista);
    lista[5]  = IngreseDato("Domicilio",lista);
    lista[6]  = IngreseDato("Codigo Postal",lista);
    lista[7]  = IngreseDato("Localidad",lista);
    lista[8]  = IngreseDato("Telefono",lista);
    lista[9]  = IngreseDato("Fecha de Nacimiento DD/MM/YYYY",lista);
    lista[10] = IngreseDato("Mensaje",lista);
    debuguear(analiza,lista);
    Personas.push(new Persona(lista));
    debuguear(analiza,Personas);
    Normalizacion(Personas);
    debuguear(analiza,Personas);
}

function newUYDate(pDate) {
    debuguear(analiza,pDate);
    let dd = pDate.split("/")[0].padStart(2, "0");
    debuguear(analiza,dd);
    let mm = pDate.split("/")[1].padStart(2, "0");
    debuguear(analiza,mm);
    let yyyy = pDate.split("/")[2].split(" ")[0];
    debuguear(analiza,yyyy);
    // let hh = pDate.split("/")[2].split(" ")[1].split(":")[0].padStart(2, "0");
    // let mi = pDate.split("/")[2].split(" ")[1].split(":")[1].padStart(2, "0");
    // let secs = pDate.split("/")[2].split(" ")[1].split(":")[2].padStart(2, "0");
    mm = (parseInt(mm) - 1).toString(); // January is 0
    debuguear(analiza,mm);
    // return new Date(yyyy, mm, dd, hh, mi, secs);
    return new Date(yyyy, mm, dd)
  }


function IngreseDato(leyenda,lista) {
    let variable = "";
    let tipodocumento = "";
    if (leyenda == "Tipo de Documento") tipodocumento = Concatenar(listaTipoDocumento);
    //? hasta que no ingrese bien el dato no pasa al siguiente
    do {
        variable = prompt("Ingrese " + leyenda + tipodocumento)
    } while (!ControlDatos(variable,leyenda,lista));
    return variable;
}


function ControlDatos(variable,leyenda,lista) {
    //? controla cada campo que este cargado
    if (variable === null && variable === undefined) {
        return false;
    }
    switch (leyenda) {
        case "Tipo de Documento":
            if (!ValidaTipoDocumento(variable)) return false;
        break;
        case "Nombre":
            if(variable.length<3) return false;
            break;
        case "Documento":
            let reemplazaCaracter = Reemplazar("");
            variable= reemplazaCaracter(variable,".");
            variable= reemplazaCaracter(variable,",");
            switch (lista[3]) {
                case "1":
                case "3":
                case "4":
                    if(!EsNumerico(variable))  return false;
                    break;
                default:
                    break;
            }
            break;
        case "Fecha de Nacimiento DD/MM/YYYY":
            let fechaActual = new Date(); 
            let fecha = newUYDate(variable);
            const dia = fecha.getDate();
            const mes = fecha.getMonth();
            const ano = fecha.getFullYear();

            if (fechaActual.getFullYear()- ano < 18) return false;
            break;
        case "Email":
            if (!EstadoMail(variable)) return false;
            break;
        case "Nuevamente Email":
            if (!EstadoMail(variable)) return false;
            if (lista[1].toLowerCase() !== variable.toLowerCase()) return false;
            break;
        default:
            break;
    }
    return true;
}

function Reemplazar(CaracterDestino) {
    return (palabra,caracterOrigen) =>   palabra.replace(caracterOrigen,CaracterDestino);
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