//Inicio sesion--------------------------------------------------

function validar() {
    let dni = document.getElementById("numero_dni");
    let mensaje = document.getElementById("mensaje");

    usuariosStorage = JSON.parse(localStorage.getItem("Clientes"));
    console.log (usuariosStorage);
        if (usuariosStorage && usuariosStorage.some((u) => u.dni == dni.value)) {
        let parrafo = document.createElement("p");
        parrafo.innerText = "Bienvenido al Prestamos Easy Way, comunicate al 0800-111-0000 y reclamá un regalo especial";
        mensaje.append(parrafo);
    } else {
        document.body.innerHTML = `<h2> Usuario no registrado. Por favor recarga la página y registrate </h2>
                            <p> Usuario no encontrado: ${dni.value}</p>
                            `;
    }
}


class Cliente {
    constructor(nombre, apellido, dni, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.edad = edad;
    }
}



// FETCH - consumir API clima -----------------------------------------------------
let divclima = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&lang=es&units=metric&appid=fe23868ce2f6ef3d0bdc173d5caf1d88")
    .then(response => response.json())
    .then (data => {    
        divclima.innerHTML = `<span> Ciudad: ${data.name} -</span>
                            <span>  Temperatura actual: ${data.main.temp} ºC - </span>
                            <span> Temperatura máxima: ${data.main.temp_max} ºC - </span>`;
})



// Registro de Usuario---------------------------------------

let lista_clientes = [];

function obtenerDatos() {
    let datosCliente = {
        nombre: document.getElementById("name").value,
        apellido: document.getElementById("last_name").value,
        dni: document.getElementById("dni").value,
        edad: document.getElementById("age").value,
    };

    return datosCliente;

}


//control mayoria de edad--------------------------------------------
//operador lógico && 
//Librerías Tostify y Sweet Alert
//Spread Operator


function mayoria() {

    const Style = {
        background: 'rgb(225, 61, 225)',
        fontFamily: 'Alice',
        color: 'white',
        fontSize: '15px',
    }
    

    let mayor_edad = parseInt(document.getElementById("age").value);

    if (mayor_edad >= 18 && mayor_edad < 65) {
        Toastify({
            text: "Eres mayor de edad, tu prestamo está mas cerca que nunca.",
            style:{...Style },
            duration: 3000,        
        }).showToast();

        document.getElementById("name").removeAttribute('disabled');
        document.getElementById("last_name").removeAttribute('disabled');
        document.getElementById("dni").removeAttribute('disabled');
        document.getElementById("money").removeAttribute('disabled');
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Lo sentimos, por tu edad no calificas para un préstamo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })

    }}





//Registrarse----------------------------------------------

function registrarse() {
    let datos = obtenerDatos();

    let new_client = new Cliente(
        datos.nombre,
        datos.apellido,
        datos.dni,
        datos.edad
    );

    lista_clientes.push(new_client);
    localStorage.setItem("Clientes", JSON.stringify(lista_clientes));


    //Desestructuración

    let {nombre, apellido, dni, edad} = new_client;
    let msj_reg = `Gracias por registrarte <strong>${nombre}</strong>`;
    document.getElementById("desestructurado").innerHTML = msj_reg;

};




//Prestamo-----------------------------------------

function send() {
    let monto = parseInt(document.getElementById("money").value);
    let cuotas = parseInt(document.getElementById("cuotas").value);

    let prestamo = ((cuotas / 12) * 0.5 * monto + monto) / cuotas;

    let msj = `Gracias por elegirnos, de aprobarse deberás devolver un total de: <strong> $${prestamo * cuotas
        } </strong>, en <strong>${cuotas}</strong> cuotas de <strong>$${prestamo}</strong>.`;

    document.getElementById("parrafo").innerHTML = msj;


    //Spread - objeto final conteniendo datos personales y del prestamo
let prestamoFinal = {
    dinero: monto,
    cuotas: cuotas,

}

cliente_Finale = {
    ...lista_clientes,
    ...prestamoFinal,
}

console.log(cliente_Finale);

}

document.getElementById("cuotas").addEventListener("change", (event) => {
    const parrafo = document.getElementById("cuotas-seleccionada");
    parrafo.innerText = `Tu prestamo será en ${event.target.value} cuotas`;
});

// boton clear ------------------------------------------------------

function limpiarPrestamo() {
    document.getElementById("parrafo").innerHTML = "";
};



