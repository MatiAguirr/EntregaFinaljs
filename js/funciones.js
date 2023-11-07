let productos = [
    {id:"01", nombre: "Libro de vuelo de cuero negro", imagen:"https://argentinapilotshop.com.ar/2101-large_default/libro-de-vuelo.jpg", precio:15000, categoria:{nombre: "Piloto", id: "Piloto"}},
    {id:"02", nombre: "Valija de vuelo T-Bag", imagen:"https://argentinapilotshop.com.ar/1811-large_default/bolso.jpg", precio:25000, categoria:{nombre: "Piloto", id: "Piloto"}},
    {id:"03", nombre: "Headset Bose A20 ANR con bluetooth", imagen:"https://d22fxaf9t8d39k.cloudfront.net/4162057ae088abbe1780a3a54cc4d46c7e5e48024fc9fe24ef833412ac3831d148024.png", precio:700000, categoria:{nombre: "Piloto", id: "Piloto"}},
    {id:"04", nombre: "Fuel test cup", imagen:"https://argentinapilotshop.com.ar/1595-large_default/fuel-tester-cup-asa-.jpg", precio:20000, categoria:{nombre: "Avion", id: "Avion"}},
    {id:"05", nombre: "Calzas para ruedas", imagen:"https://argentinapilotshop.com.ar/1830-large_default/calzas-.jpg", precio:35000, categoria:{nombre: "Avion", id: "Avion"}},
    {id:"06", nombre: "Capota IFR ASA JiffyHood", imagen:"https://argentinapilotshop.com.ar/1828-large_default/gafas-anteojos-capota.jpg", precio:60000, categoria:{nombre: "Avion", id: "Avion"}},
];
    
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos)

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;

const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}   

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}