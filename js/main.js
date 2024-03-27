//Preentrega 3
let carrito = [];

//Funcion para que funcione el local Storage
function mostrarProductos(){
  const cardInstrumento = document.getElementById("card-instrument-tienda")
  cardInstrumento.innerHTML = "";
  crearHtml(instrumentos);
}

   // Local Storage
//Verificar si hay un producto en el carrito
if (localStorage.getItem('carrito')) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
 mostrarCarrito();  // Actualizar el HTML del carrito
} 

const instrumentos = [
    {id:1, nombre: "Yamaha RDP0F5 HOR Batería acústica Rydeen, Hot Red", precio: 37252.12, descripcion: "Juego de batería de 5 tambores. Color rojo candente" ,img: "bateriaAcustica1.jpg"  },
    {id:2, nombre: "RDP2F5 PB Batería acústica Rydeen, Plateado brillante Bombo 22", precio: 39524.41, descripcion: "Juego de batería de 5 tambores. Color plateado escarchado" , img: "bateriaAcustica2.jpg"  },
    {id:3, nombre: "DTX452K Bateria electrónica", precio: 70538.32, descripcion: "DTX452K Bateria electrónica" , img: "bateriaElectrica1.jpg"  },
    {id:4, nombre: "VAD103 Bateria electroacústica DESING KIT", precio: 203522.86, descripcion: "VAD103 Bateria electrónica" , img: "bateriaElectrica2.jpg"  },
    {id:5, nombre: "CCDU141620 Classics custom dual set", precio: 44174.93, descripcion: "Meinl Juegos de platillos" , img: "platillos1.jpg"  },
    {id:6, nombre: "CC-141620+18 Set de platillos Custom Classic (5)", precio: 43204.41, descripcion: "Meinl Custom Juegos de platillos" , img: "platillos2.jpg"  },
    {id:7, nombre: "TXR5AW Bolillos Forward 5A RAW", precio: 932.20, descripcion: "Bolillos y Brochas" , img: "accesorios1.png"  },
    {id:8, nombre: "MDH DRUM Almohadillas amortiguadoras de Miel", descripcion: "Apagadores DRUM HONEY DAMPER PADS" , precio: 710.81, img: "accesorios2.jpg"  },
] ;

// Agregar productos al carrito
function btnCarrito(id) {
  // Buscar el producto en el array de instrumentos
  const producto = instrumentos.find(item => item.id === id);

  //verificamos y actualizamos al carrito
  if (producto) {

      carrito.push(producto);

      // Guardar el carrito en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();
  } else {
      console.error("Producto no encontrado");
  }
}

//Funcion para quitar un producto del carrito.
function opcionEliminar(id) {
  carrito = carrito.filter(producto => producto.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito(); 
}

//Para mostrar los productos del carrito en el html
function mostrarCarrito() {
  const carritoContenedor = document.getElementById("carritoContenedor");
  carritoContenedor.innerHTML = "";
  const totalCarritoElement = document.getElementById("totalCarrito");
  totalCarritoElement.textContent = `Total: RD$${totalCarrito().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  carrito.forEach(producto => {
      const { img, nombre, precio, id } = producto;

      const html = `
          <div class="carrito-item">
              <img src="././assets/img/${img}" alt="${nombre}" />
              <h4>${nombre}</h4>
              <p>RD$${precio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <button class="btn btn-primary" id="btneliminar" onclick="opcionEliminar(${id})">Eliminar</button>
          </div>
      `;

      carritoContenedor.innerHTML += html;
  });
}

//Para Ver el total en el HTML
function mostrarTotalCarrito() {
  const totalCarritoElement = document.getElementById("totalCarrito");
  totalCarritoElement.textContent = `Total: RD$${totalCarrito().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

//Para hacer la sumatoria total
function totalCarrito() {
  let total = 0;

  carrito.forEach(producto => {
      total += producto.precio;
  });

  return total;
}

// Función para crear estructura html
function crearHtml(arr) {
    const cardInstrumento = document.getElementById("card-instrument-tienda")
    cardInstrumento.innerHTML = "";
    //validar qué pasa cuando no recibo ningun array
    let html;
    for (const el of arr) {
      const { img, nombre, precio, id, descripcion } = el;
  
      html = `<div  class="card-instrument-tienda" data-aos="fade-right"
      data-aos-offset="200"
      data-aos-duration="1500"
      data-aos-easing="ease-in-sine">
        <img src="././assets/img/${img}" alt="${nombre}"/>
          <h3>${nombre}</h3>
          <p>
          ${descripcion}
          </p>
          <p><strong>RD$${precio.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></p>
          <div class="logo-button-shopp">
          <button class="btn btn-primary button-instrument-tienda logo-button-shopp" id="button-instrument-tienda" onclick="btnCarrito(${id})">Agregar al carrito <img src="./../assets/img/${img}" alt="logo-shopping"></button>
          </div>
      </div>`;
      //se la agrego al contenedor
      cardInstrumento.innerHTML += html;
    }
  }

// Llamar a la función mostrarProductos al cargar la página
mostrarProductos();


const inputs =  document.querySelectorAll('input')
const inputSearch = inputs [0];
//Funciones de búsqueda
function buscarInstrumento(arr, filtro) {
  const encontrado = arr.find((el) => {
    return el.nombre.includes(filtro);
  });
  return encontrado;
}
function filtrarInstrumento(arr, filtro) {
  const filtrado = arr.filter((el) => {
    return el.nombre.toLowerCase().includes(filtro.toLowerCase());
  });
  return filtrado;
}

//buscador de servicios por barra de busqueda de la pagina
inputSearch.addEventListener('keyup', ()=>{

  const encontrado = filtrarInstrumento(instrumentos, inputSearch.value)
  crearHtml(encontrado)
})