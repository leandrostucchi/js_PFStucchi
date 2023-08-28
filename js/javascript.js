const analiza = true;
const cantidadMails = 3;
const debuguear = (analiza,leyenda) => { if (analiza) {console.log(leyenda) }}

alert(CargaMail());

function CargaMail() {

    let email1;
    let email2;
    for (let index = 1; index < cantidadMails; index++){
        switch (index) {
            case 1:
                email1 = IngreseMail();
                break;
            case 2:
                email2 = IngreseMail();
                break;
            default:
                break;
        }
    }
    debuguear(analiza,email1);
    debuguear(analiza,email2);
    let mensajeValidado = ValidaMail(email1,email2);
    debuguear(analiza,mensajeValidado);
    return mensajeValidado;
}

function IngreseMail() {
    return prompt("Ingrese email");
}



 function ValidaMail(email1,email2) {
    //? Valida que los mails ingresados sean iguales y esten bien escrito
    let mensaje = "Ambos Mails son identicos "+  email1;
    debuguear(analiza,mensaje);
     if (email1 !== email2) {
        mensaje = "Los emails no son iguales";
        debuguear(analiza,mensaje);
    }
     if (!EstadoMail(email1) || !EstadoMail(email2)) {
        mensaje = "Uno de los email ingresado no cumple con los requisitos  @ y punto";
        debuguear(analiza,mensaje);
     } 
     return mensaje;
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