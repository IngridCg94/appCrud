let listaPedidos = [];
document.addEventListener('DOMContentLoaded', ()=>{
    document.addEventListener('submit', (event)=>{

        event.preventDefault();

        //declaracion de constantes
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;

        const tipo_pastel = document.getElementById('tipo_pastel').value;
        const tamano_pastel = document.getElementById('tamano_pastel').value;
        const niveles_pastel = document.getElementById('niveles_pastel').value;
        const forma_pastel = document.getElementById('forma_pastel').value;
        const sabor_pastel = document.getElementById('sabor_pastel').value;
        const relleno_pastel = document.getElementById('relleno_pastel').value;
        const cobertura_pastel = document.getElementById('cobertura_pastel').value;
        const color_pastel = document.getElementById('color_pastel').value;
        const velas_accesorios = document.getElementById('velas_accesorios').checked ? "Sí" : "No";
        
        const fecha_entrega = document.getElementById("fecha_entrega").value;
        const hora_entrega = document.getElementById("hora_entrega").value;
        const metodo_pago = document.getElementById('metodo_pago').value;


        
        let estadoCheckbox = verificarCheckbox();
        if(estadoCheckbox == "on"){

            estadoCheckbox = "Si";
        }else{
            estadoCheckbox = "No";
        }


        //creacion de objeto
        const nuevoPedido = {
            nombre, email, telefono, direccion,
        tipo_pastel, tamano_pastel, niveles_pastel, forma_pastel,
        sabor_pastel, relleno_pastel, cobertura_pastel, color_pastel,
        velas_accesorios, fecha_entrega, hora_entrega, metodo_pago
        };

        localStorage.setItem('ultimoPedido', JSON.stringify(nuevoPedido));

        // Continuar con el flujo actual
        listaPedidos.push(nuevoPedido);
        agregarPedido(nuevoPedido);
        event.target.reset();
        verificarTabla();
    });
});

//funcion de agregar
function agregarPedido(nuevoPedido){
    //creacion de constantes
    const bodyTablaEmpleados = document.getElementById("bodyTablaEmpleados").innerHTML += `
        <h2>Resumen del Pedido</h2>
        <tr>
            <th>Nombre: </th>
            <td>${nuevoPedido.nombre}</td>
        </tr>
            <th>Correo: </th>
            <td>${nuevoPedido.email}</td>
        </tr>
        <tr>
            <th>Teléfono: </th>
            <td>${nuevoPedido.telefono}</td>
        </tr>
        <tr>
            <th>Dirección: </th>
            <td>${nuevoPedido.direccion}</td>
        </tr>
            <tr>
                <th>Tipo De Pastel: </th>
                <td>${nuevoPedido.tipo_pastel}</td>
            </tr>
            <tr>
                <th>Tamaño De Pastel: </th>
                <td>${nuevoPedido.tamano_pastel}</td>
                <th>Cantidad De Niveles: </th>
                <td>${nuevoPedido.niveles_pastel}</td>
            </tr>
            <tr>
                <th>Forma del Pastel: </th>
                <td>${nuevoPedido.forma_pastel}</td>
            </tr>
            <tr>
                <th>Sabor: </th>
                <td>${nuevoPedido.sabor_pastel}</td>
            </tr>
            <tr>
                <th>Relleno: </th>
                <td>${nuevoPedido.relleno_pastel}</td>
            </tr>
            <tr>
                <th>Cobertura: </th>
                <td>${nuevoPedido.cobertura_pastel}</td>
                <th>Color: </th>
                <td>${nuevoPedido.color_pastel}</td>
            </tr>
            <tr>
                <th>Incluir Velas: </th>
                <td>${nuevoPedido.velas_accesorios}</td>
            </tr>
            <tr>
                <th>Fecha</th>
                <td>${nuevoPedido.fecha_entrega}</td>
                <th>Hora</th>
                <td>${nuevoPedido.hora_entrega}</td>
            </tr>
            <tr>
                <th>Método de Pago: </th>
                <td>${nuevoPedido.metodo_pago}</td>
            </tr>
        `;
}


//funcion confirmar pedido por medio de boton

function verificarTabla(){
    const bodyTablaEmpleados = document.getElementById("bodyTablaEmpleados");
    if (bodyTablaEmpleados.innerHTML.trim() !== "") {
        const bodyTablaEmpleados = document.getElementById("bodyTablaEmpleados");
        const botonConfirmar = document.createElement('button');
        botonConfirmar.textContent = 'Confirmar';
        botonConfirmar.className = 'boton';
        bodyTablaEmpleados.appendChild(botonConfirmar);
        botonConfirmar.addEventListener('click', function() {
            alert('¡Pedido Confirmado!');
            bodyTablaEmpleados.innerHTML = " ";
        });        
    }
}


// Asignamos el evento al botón "Lista de Pedidos"
document.getElementById('listaPedidos').addEventListener('click', () => {
    // Aquí deberías obtener el último pedido o el que quieras mostrar
        const nuevoPedido = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        tipo_pastel: document.getElementById('tipo_pastel').value,
        // Puedes añadir más propiedades si lo necesitas
    };

    // Llamamos a la función mostrarPedido con los datos obtenidos
    mostrarPedidos(nuevoPedido);
});

function mostrarPedidos(){

    // Limpiamos el contenido previo del tbody
    const bodyTablaEmpleados = document.getElementById("bodyTablaEmpleados");
    bodyTablaEmpleados.innerHTML = '';

    // Iteramos sobre la lista de pedidos y los mostramos
    listaPedidos.forEach((pedido, index) => {
        bodyTablaEmpleados.innerHTML += `
            <tr>
                <td>
                    <strong>Pedido ${index + 1}</strong>
                    <button onclick="modificarPedido(${index})">Modificar</button>
                    <button onclick="eliminarPedido(${index})">Eliminar</button>
                </td>
            </tr>
            <tr>
                <th>Nombre:</th>
                <td>${pedido.nombre}</td>
                <th>Teléfono:</th>
                <td>${pedido.telefono}</td>
            </tr>
            <tr>
                <th>Tipo de Pastel:</th>
                <td>${pedido.tipo_pastel}</td>
                <th>Tamaño:</th>
                <td>${pedido.tamano_pastel}</td>
            </tr>
            <tr>
                <th>Fecha de Entrega:</th>
                <td>${pedido.fecha_entrega}</td>
                <th>Hora de Entrega:</th>
                <td>${pedido.hora_entrega}</td>
            </tr>
            
        `;
    });
}

function modificarPedido(index) {
    // Obtener el pedido a modificar
    const pedido = listaPedidos[index];

    // Rellenar el formulario con los datos del pedido
    document.getElementById('nombre').value = pedido.nombre;
    document.getElementById('email').value = pedido.email;
    document.getElementById('telefono').value = pedido.telefono;
    document.getElementById('direccion').value = pedido.direccion;
    document.getElementById('tipo_pastel').value = pedido.tipo_pastel;
    document.getElementById('tamano_pastel').value = pedido.tamano_pastel;
    document.getElementById('niveles_pastel').value = pedido.niveles_pastel;
    document.getElementById('forma_pastel').value = pedido.forma_pastel;
    document.getElementById('sabor_pastel').value = pedido.sabor_pastel;
    document.getElementById('relleno_pastel').value = pedido.relleno_pastel;
    document.getElementById('cobertura_pastel').value = pedido.cobertura_pastel;
    document.getElementById('color_pastel').value = pedido.color_pastel;
    document.getElementById('velas_accesorios').value = pedido.velas_accesorios;
    document.getElementById('fecha_entrega').value = pedido.fecha_entrega;
    document.getElementById('hora_entrega').value = pedido.hora_entrega;
    document.getElementById('metodo_pago').value = pedido.metodo_pago;

    // Eliminar el pedido actual de la lista para luego agregar el modificado
    listaPedidos.splice(index, 1);
    
    // Actualizar la tabla de pedidos
    mostrarPedidos();
}


function eliminarPedido(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
        listaPedidos.splice(index, 1); // Elimina el pedido de la lista
        mostrarPedidos(); // Vuelve a mostrar los pedidos para actualizar la tabla
    }
}


//checar checkbox
document.getElementById('check_mensaje').addEventListener('change', function() {
    const checkboxMensaje = document.getElementById('check_mensaje');

    // Verifica si el checkbox está marcado o no
    if (checkboxMensaje.checked) {
        document.getElementById('mensaje_pastel').disabled = false;  // Habilita el input
    } else {
        document.getElementById('mensaje_pastel').disabled = true;  // Deshabilita el input
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('bodyTablaEmpleados');
    if (tabla) {
        tabla.style.overflowX = 'auto'; // Asegurar que sea desplazable en pantallas pequeñas
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    menuToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('active'); // Activa o desactiva el menú desplegable
    });
});

function verificarCheckbox() {
    console.log('entro a la funcion');
    if (velas_accesorios.checked) {
        console.log("entro al si");
        return 'true';
    } else {
        console.log("entro al no");
        return 'false';
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fechaInput = document.getElementById('fecha_entrega');
    
    // Obtener la fecha actual en formato YYYY-MM-DD
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0'); // Asegura que tenga dos dígitos
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
    const ano = hoy.getFullYear();
    
    // Formato correcto para el input de tipo date
    const fechaActual = `${ano}-${mes}-${dia}`;
    
    // Establecer el atributo min del input con la fecha actual
    fechaInput.setAttribute('min', fechaActual);
});


