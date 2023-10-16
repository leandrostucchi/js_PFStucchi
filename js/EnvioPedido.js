
btnconfirmar.addEventListener('click', Ventana);
btncancelar.addEventListener("click",Limpiar);

function Ventana(e){
    debuguear(analiza,"Envio Pedido");
    e.preventDefault();
    Swal.fire({
        title: 'Desea guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`,
      }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
            let numero = Carga(e);
            Swal.fire('Registro Guardado!' , 'Pedido Nro ' + numero, 'success');
        } else if (result.isDenied) {
          Swal.fire('Los cambios no fueron guardado', '', 'info')
        }
      })
}


