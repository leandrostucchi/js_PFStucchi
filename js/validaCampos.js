nombre.addEventListener("change",ValidaNombre);
email2.addEventListener("change",ValidaMail);
TipoDocumento.addEventListener("change",ValidaTipoDocumento);
Documento.addEventListener("change",ValidaDocumento);



function ValidaNombre() {
    let resultado = "";
    // debuguear(analiza,nombre.value);
    // debuguear(analiza,nombre.value.length);
    if(nombre.value.length<3) resultado = `Tiene menos de 3 letras`;
    MensajeError(resultado,nombreTit);
    return resultado;
}

function ValidaMail() {
    let resultado = "";
    if (!EstadoMail(email.value)) resultado = "Mail incorrecto";
    if (!EstadoMail(email2.value)) resultado = "Mail incorrecto";
    if(resultado == ""){
        if (email.value.toLowerCase() !== email2.value.toLowerCase()) resultado = "Mail distintos";
    }
    MensajeError(resultado,email2Tit);
    return resultado;
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
    

    MensajeError(resultado,TipoDocumentoTit);
    return resultado;
}



function ValidaDocumento() {
    let resultado = "";
    let variable = Documento.value;
    let reemplazaCaracter = Reemplazar("");
    variable= reemplazaCaracter(variable,".");
    variable= reemplazaCaracter(variable,",");
    debuguear(analiza,Documento.value);
    debuguear(analiza,TipoDocumento.value);
    switch (TipoDocumento.value) {
        case "1":
        case "3":
        case "4":
            if(!EsNumerico(variable))  resultado = "Documento Invalido";
            break;
        default:
            break;
    }
    MensajeError(resultado,documentoTit);
    return resultado;
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
    //debuguear(analiza,lista);
    ValidacionPrevia();
    Personas.push(new Persona(lista));
    //debuguear(analiza,Personas);
     Normalizacion(Personas);
     debuguear(analiza,Personas);
     GuardarInfo();
     GuardarMail();
     let numero = EnviarDatos();
     return numero;
}

function ValidacionPrevia(){
    let valida = ValidaNombre();
    if (valida!= "") MensajeError(valida,titulo);
    valida =  ValidaMail();
    if (valida!= "") MensajeError(valida,titulo);    
    valida =  ValidaTipoDocumento();
    if (valida!= "") MensajeError(valida,titulo);
    valida =  ValidaDocumento();
    if (valida!= "") MensajeError(valida,titulo);

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

function EnviarDatos() {
    message.innerHTML="";
    debuguear(analiza,"EnviarDatos");
    let messageBody = document.createElement("div");
    let registros = Object.values(carrito);
    const sumaTotal = registros.reduce((acumula,registro)=> acumula + registro.precio * registro.cantidad,0);
    debuguear(analiza,"sumaTotal");
    let numeroOrden = Math.ceil(Math.random()*10000);
    
    messageBody.innerHTML = `<p>Gracias por su compra ${Personas[0].Nombre}. Se enviara a ${Personas[0].EMail} el comprobante por un total de $ ${sumaTotal}\n Numero de Pedido ${numeroOrden} </p>`;
    message.append(messageBody);
    for(const registro of registros){
        debuguear(analiza,registro);
        let firstDiv = document.createElement("div");
        firstDiv.className="col";
        let secondDiv = document.createElement("div");
        let precioporproducto = registro.precio * registro.cantidad;
        secondDiv.innerHTML = `<p>Producto ${registro.title} a $${registro.precio} cantidad ${registro.cantidad}  => ${precioporproducto} </p>`;
        firstDiv.append(secondDiv);
        message.append(firstDiv)
   }
    message.className="alert alert-success visible";
    return numeroOrden;
}

function EsperaEnvio() {
    debuguear(analiza,"EsperaEnvio");
    let firstDiv = document.createElement("div");
    firstDiv.className="cargar";
    barra.append(firstDiv)
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