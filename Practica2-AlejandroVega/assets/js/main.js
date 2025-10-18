const estudiantes = [
    { nombre: 'Emma', apellido: 'Frost', nota: 85 },
    { nombre: 'Luna', apellido: 'Snow', nota: 92 },
    { nombre: 'Johnny', apellido: 'Blaze', nota: 78 },
    { nombre: 'Tony', apellido: 'Stark', nota: 100 },
    { nombre: 'Wade', apellido: 'Wilson', nota: 68 }
];

const calcularCargasSociales = () => {
    const inputSalario = document.querySelector('#inputSalario');
    const salarioBruto = parseFloat(inputSalario.value);

    if (!salarioBruto || salarioBruto <= 0) {
        alert('Por favor digite un salario válido');
        return;
    }

    const cargasSociales = salarioBruto * 0.1034;
    let impuestoRenta = 0;
    if (salarioBruto > 929000) {
        const exceso = salarioBruto - 929000;
        if (exceso <= 396000) {
            impuestoRenta = exceso * 0.10;
        } else if (exceso <= 792000) {
            impuestoRenta = 396000 * 0.10 + (exceso - 396000) * 0.15;
        } else {
            impuestoRenta = 396000 * 0.10 + 396000 * 0.15 + (exceso - 792000) * 0.20;
        }
    }

    const salarioNeto = salarioBruto - cargasSociales - impuestoRenta;

    // Mostrar resultados
    document.querySelector('#montoCargasSociales').textContent = cargasSociales.toFixed(2);
    document.querySelector('#montoImpuestoRenta').textContent = impuestoRenta.toFixed(2);
    document.querySelector('#salarioNeto').textContent = salarioNeto.toFixed(2);
    
    const resultadoDiv = document.querySelector('#resultadoSalario');
    resultadoDiv.style.display = 'block';
}

const cambiarTextoParrafo = () => {
    const parrafo = document.getElementById('parrafoCambio');
    
    const textos = [
        { texto: 'THE MOON TORMENTS YOU', clase: 'alert alert-danger' },
        { texto: 'CHAOS WILL BREAK OUT', clase: 'alert alert-warning' },
        { texto: 'MAXIMUS PULSE', clase: 'alert alert-success' }
    ];
    
    let indiceActual = parseInt(parrafo.getAttribute('data-indice') || '0');
    indiceActual = (indiceActual + 1) % textos.length;
    
    parrafo.textContent = textos[indiceActual].texto;
    parrafo.className = textos[indiceActual].clase;
    parrafo.setAttribute('data-indice', indiceActual);
}

const verificarEdad = () => {
    const inputEdad = document.querySelector('#inputEdad');
    const edad = parseInt(inputEdad.value);
    const mensajeDiv = document.querySelector('#mensajeEdad');

    if (!edad || edad < 0) {
        mensajeDiv.innerHTML = '<div class="alert alert-danger">Por favor ingrese una edad válida</div>';
        return;
    }

    let mensaje = '';
    let tipoAlerta = '';

    if (edad > 18) {
        mensaje = 'Eres mayor de edad.';
        tipoAlerta = 'alert-success';
    } else {
        mensaje = 'Eres menor de edad.';
        tipoAlerta = 'alert-danger';
    }

    mensajeDiv.innerHTML = `<div class="alert ${tipoAlerta}">${mensaje}</div>`;
}

// EJERCICIO 4: Función para mostrar estudiantes
const mostrarEstudiantes = () => {
    const listaDiv = document.querySelector('#listaEstudiantes');
    let contenidoHTML = '<h5>Lista de Estudiantes:</h5>';

    let sumaNotas = 0;

    estudiantes.forEach(estudiante => {
        contenidoHTML += `<div class="card mb-2">
                            <div class="card-body">
                                <strong>${estudiante.nombre} ${estudiante.apellido}</strong> - Nota: ${estudiante.nota}
                            </div>
                          </div>`;
        
        sumaNotas += estudiante.nota;
    });

    const promedio = sumaNotas / estudiantes.length;

    contenidoHTML += `<div class="alert alert-primary mt-3">
                        <strong>Promedio general: ${promedio.toFixed(2)}</strong>
                      </div>`;

    listaDiv.innerHTML = contenidoHTML;
}

document.getElementById('btnCalcularSalario').onclick = calcularCargasSociales;
document.getElementById('btnCambiarTexto').onclick = cambiarTextoParrafo;
document.getElementById('btnVerificarEdad').onclick = verificarEdad;
document.getElementById('btnMostrarEstudiantes').onclick = mostrarEstudiantes;