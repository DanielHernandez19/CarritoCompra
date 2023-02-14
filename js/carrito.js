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
    listaCurso.addEventListener('click', agregarCurso)
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
    } else {

    }
}


//metodo para convertir el curso en objeto y enviarlo a un arreglo

function leerCurso(curso) {
    console.log(curso);

    const objetoCurso = {
        //asignando atributo y valor
        image: curso.querySelector('img').src,
        titulo: curso.querySelector('h5').textContent,
        precio: curso.querySelector('precio').textContent,
        cantidad: 1,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    console.log(objetoCurso);
}