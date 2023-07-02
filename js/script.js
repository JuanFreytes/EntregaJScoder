// DECLARO LAS CONSTANTES PARA QUE OBTENGA LOS ELEMENTOS DEL FORMULARIO EN EL INDEX 

const ingresocapacidad = document.getElementById('capacidad');
const ingresoprecio = document.getElementById('precio');
const ingresocantidad = document.getElementById('cantidad');
const ingresomarca = document.getElementById('marca');
const addButton = document.getElementById('agregarboton');
const filtrocapacidad = document.getElementById('filtrocapacidad');
const filtromarca = document.getElementById('filtromarca');
const tablainventario = document.getElementById('tablainventario');
const itemsinventario = document.getElementById('itemsinventario');
const borrarlocal = document.getElementById('borrarlocal');

// DECLARO LA VARIANTE INVENTARIO PARA QUE ME LO TRAIGA DEL LOCALSTORAGE O ME CREE UN ARRAY VACÍO
// USANDO EL OR 
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];


// CREO LA FUNCIÓN MOSTRARINVENTARIO 
function mostrarinventario() {
  itemsinventario.innerHTML = '';//ESTABLECE EL CONTENIDO EN UN STRING VACÍO



  const itemsfiltrados = inventario.filter(item =>  //DECLARO LA VARIABLE "ITEMS FILTRADOS" PARA ALMACENAR  EL RESULTADO
  //LA FUNCION FILTER LA USO EN EL ARRAY INVENTARIO PARA QUE ME CREE UN NUEVO ARRAY QUE CUMPLAN LAS CONDICIONES
  // DE CAPACIDAD Y MARCA
    {
      const capacidadencontrada = item.capacidad === parseInt(filtrocapacidad.value);
      const marcaencontrada = item.marca.toLowerCase().includes(filtromarca.value.toLowerCase());

      return (!filtrocapacidad.value || capacidadencontrada) && (!filtromarca.value || marcaencontrada);
    });



  itemsfiltrados.forEach(item => {  //USO DE METODO FOREACH EN EL ARRAY DE ITEMS FILTRADOS
    const row = document.createElement('tr'); //CREA UN ELEMENTO HTML CON LA FUNCION CREATEELEMENT
    row.innerHTML = ` 
      <td>${item.capacidad}</td>
      <td>$${item.precio}</td>
      <td>${item.cantidad}</td>
      <td>${item.marca}</td>
      <td>${item.fecha}</td>`;

    itemsinventario.appendChild(row); //SE AGREGA COMO HIJO DEL ELEMENTO "ITEMINVENTARIO"
  });
}



// DEFINO LA FUNCION DE AGREGARAIRE 
//OBTIENEN EL VALOR DEL ELEMENTO HTML
function agregaraire() {
  const capacidad = parseInt(ingresocapacidad.value);
  const precio = parseFloat(ingresoprecio.value);
  const cantidad = parseInt(ingresocantidad.value);
  const marca = ingresomarca.value;

  if (capacidad && precio && cantidad && marca) {  //ESTE IF VERIFICA QUE TODAS LAS VARIABLES SEAN VALIDAS, 
    //CON UN VALOR DIFERENTE DE NULL, UNDEFINED O STRING VACIO

    const nuevoaire = {
      capacidad: capacidad,
      precio: precio,
      cantidad: cantidad,
      marca: marca,
      fecha: obtenerFechaActual() 
    };


    inventario.push(nuevoaire); //SE AGREGA AL INVENTARIO MEDIANTE EL PUSH
    localStorage.setItem('inventario', JSON.stringify(inventario));//TRANSFORMA EL ARRAY INVENTARIO AL FORMATO JSON CON EL STRINGIFY Y LO GUARDA EN EL LOCALSTORAGE
    mostrarinventario();


  //AL MOSTRAR EL INVENTARIO BORRA LOS ELEMENTOS PARA LIMPIAR LOS CAMPOS DE ELEMENTO
    ingresocapacidad.value = '';
    ingresoprecio.value = '';
    ingresocantidad.value = '';
    ingresomarca.value = '';
  }
}


//CREO LA FUNCIÓN OBTENERFECHAACTUAL PARA QUE ME DEVUELVA LA FECHA INGRESADA, CON EL PADSTART VERIFICO QUE AL MENOS TENGA DOS DIGITOS
function obtenerFechaActual() {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${año}-${mes}-${dia}`;
}


// USO DE LA FUNCION CLEARLOCALSTORAGE PARA CON EL REMOTEITEM ELEIMINAR DEL LOCALSTORAGE EL INVENTARIO
// USO DE lA LIBRERIA DE SWEET ALERT PARA DISPARAR LA CONFIRMACIÓN O NO DE LA ACCIÓN
function clearLocalStorage() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Al confirmar esta acción se eliminará todo el inventario, ¿Confirmas? ',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, lo voy a eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('inventario');
      inventario = [];
      mostrarinventario();
      Swal.fire(
        '¡Eliminado!',
        'El inventario se eliminó.',
        'success'
      );
    }
  });
}


//AGREGO LOS EVENT LISTENER PARA REALIZAR LAS ACCIONES

addButton.addEventListener('click', agregaraire);
filtrocapacidad.addEventListener('input', mostrarinventario);
filtromarca.addEventListener('input', mostrarinventario);
borrarlocal.addEventListener('click', clearLocalStorage);
const exportButton = document.getElementById('exportarinventario');



//USO DEL EXPORTBUTTON PARA VERIFICAR SI EL INVENTARIO NO ESTA VACÍO
exportButton.addEventListener('click', () => {
  if (inventario.length === 0) {
    Swal.fire(
      'Inventario vacío',
      'El inventario está vacío.',
      'info'
    );
    return;
  }



  // USO DE LA FUNCION PARA CONVERTIR EL INVENTARIO EN UNA CADENA JSON
  const inventarioJSON = JSON.stringify(inventario, null, 2);
  const blob = new Blob([inventarioJSON], { type: 'application/json' });



  // CREA UN ENLACE DE DESCARGA , Y ACTIVARLA PARA BAJAR EL ARCHIVO JSON CREADO A PARTIR DEL BLOB DE LA LINEA ANTERIOR
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'inventario.json';
  a.click();



  // LINEA PARA LIBERAR RECURSOS DESPUES DE USAR LA URL GENERADA
  URL.revokeObjectURL(url);


  Swal.fire(
    'Exportado exitosamente',
    'El inventario se descargó en formato .JSON',
    'success'
  );
});


mostrarinventario();
