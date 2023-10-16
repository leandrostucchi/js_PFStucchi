const analiza = false;
const debuguear = (analiza,leyenda) => { if (analiza) {console.log(leyenda) }}


function MensajeError(resultado,titulo) {
    debuguear(analiza,resultado);
    debuguear(analiza,titulo);
    if (resultado != "") {
        Swal.fire({
            title: titulo.innerText,
            text: resultado,
            icon: 'error',
            confirmButtonText: 'Cancel'
          })
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
