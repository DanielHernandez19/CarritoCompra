/**Asignacion de variable */
const carrito = document.getElementById('carrito');
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.getElementById('vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');

let arregloCarrito = [];

/**Metodo */
cargarEventos();

function cargarEventos() {
    /** agregar
     * eliminar
     * vaciar
     */
    //Indicamos que en la seccion de los cursos va a realizar lo que tengamos en el metodo
    listaCurso.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);

    //Reseteando el arreglo para vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        arregloCarrito = [];
        limpiarTabla();
    });
}

function agregarCurso(event) {
    //Evitando que el hipervinculo no redireccione
    event.preventDefault();
    //Validar si la clase 'agregarcarrito' existe, si la clase existe que mande los elementos del curso
    if (event.target.classList.contains('agregar-carrito')) {
        //Si la clase existe devuelve los elementos del contenedor
        const cursoSeleccionado = event.target.parentElement.parentElement;
        //console.log(cursoSeleccionado);
        leerCurso(cursoSeleccionado);
    }
}

//metodo para convertir el curso en objeto y enviarlo a un arreglo

function leerCurso(curso) {
    //console.log(curso);
    const objetoCurso = {
        //asignando atributo y valor
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h5').textContent,
        precio: curso.querySelector('.precio').textContent,
        cantidad: 1,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    console.log(objetoCurso);
    /**Haciendo Copia del objeto para enviarlo a un arreglo 
     * spread => (...) => Operador que genera copia de un arreglo
    */

    /**Validando si el curso ya existe en el arreglo, actualizar la cantidad del curso y no crear nueva posicion
     * some() => metodo de arreglo en base a una condicion devuelve true si coinciden
     */
    const existe_curso = arregloCarrito.some(curso => curso.id === objetoCurso.id);
    if (existe_curso) {
        const curso_actualizado = arregloCarrito.map(curso => {
            if (curso.id === objetoCurso.id) {
                curso.cantidad += 1;
                return curso;
            }
            return curso;
        });

        arregloCarrito = [...curso_actualizado];
    } else {
        arregloCarrito = [...arregloCarrito, objetoCurso];
    }
    //console.table(arregloCarrito);
    dibujarTabla();
}

/**Metodo para iterar el arreglo carrito e imprimirlo en la tabla html */

/** metodo para iterar el arregloCarrito e imprimirlo en la tabla html */
function dibujarTabla() {
    limpiarTabla();
    arregloCarrito.map(curso => {
        //creando un elemento de html (<tr>)
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <img src=${curso.imagen} width="100">
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        //agregando el elemento fila al html
        contenedorCarrito.appendChild(fila);
    })
}

function limpiarTabla() {
    //eliminando hijos del html
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//metodo para eliminar un curso en base a su ID
function eliminarCurso(event) {
    if (event.target.classList.contains('borrar-curso')) {
        const cursoId = event.target.getAttribute('data-id'); //5 //guardando los id de los cursos seleccionado en la tabla
        console.log(cursoId);
        /**
         * filter => filtra elementos de un arreglo para generar uno nuevo
         */

        arregloCarrito = arregloCarrito.filter(curso => curso.id != cursoId);
        dibujarTabla();
        console.log(arregloCarrito);
    }
}