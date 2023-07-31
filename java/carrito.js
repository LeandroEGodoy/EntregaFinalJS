// Carrito de compras
let cart = [];

function agregarAlCarrito(title, price) {
  const product = {
    title: title,
    price: price
  };
  cart.push(product);
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
  mostrarMensajeEmergente(title);
}


function cargarCarritoDesdeLocalStorage() {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
    mostrarCarrito();
  }
}


function guardarCarritoEnLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


cargarCarritoDesdeLocalStorage();

function mostrarMensajeEmergente(productTitle) {
  Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: 'Se agregó al carrito: ' + productTitle,
    timer: 2000,
    showConfirmButton: false
  });
}

function realizarCompra() {
  cart = [];
  guardarCarritoEnLocalStorage();
  mostrarCarrito();

  Swal.fire({
    icon: 'success',
    title: '¡Compra realizada!',
    text: 'La transacción se ha realizado con éxito.',
    showConfirmButton: false,
    timer: 2000
  });
}

function mostrarCarrito() {
  const carritoContainer = document.getElementById("carritoContainer");
  carritoContainer.innerHTML = "";

  const productQuantity = {};

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];

    if (product.title in productQuantity) {
      productQuantity[product.title]++;
    } else {
      productQuantity[product.title] = 1;
    }
  }

    for (const title in productQuantity) {
    const quantity = productQuantity[title];
    const productItem = document.createElement("div");
    productItem.classList.add("carrito-item");

    const productTitle = document.createElement("p");
    productTitle.textContent = title + " (Cantidad: " + quantity + ")";
    productItem.appendChild(productTitle);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => eliminarDelCarrito(title));
    productItem.appendChild(deleteButton);

    carritoContainer.appendChild(productItem);
  }

  mostrarTotal();
}

function mostrarTotal() {
  const totalContainer = document.getElementById("totalContainer");
  const realizarCompraBtn = document.getElementById("realizarCompraBtn");
  const limpiarCarritoBtn = document.getElementById("limpiarCarritoBtn");

  const total = cart.reduce((acc, product) => acc + product.price, 0);
  totalContainer.textContent = "Total: $" + total.toFixed(2);

  if (total > 0) {
    realizarCompraBtn.style.display = "block";
    limpiarCarritoBtn.style.display = "block";
  } else {
    realizarCompraBtn.style.display = "none";
    limpiarCarritoBtn.style.display = "none";
  }
}

function limpiarCarrito() {
  cart = [];
  guardarCarritoEnLocalStorage();
  mostrarCarrito();

  Swal.fire({
    icon: 'success',
    title: '¡Carrito limpiado!',
    text: 'Se ha vaciado el carrito de compras.',
    showConfirmButton: false,
    timer: 2000
  });
}

function eliminarDelCarrito(title) {
  cart = cart.filter(product => product.title !== title);
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
  mostrarMensajeProductoEliminado(title);
}

function mostrarMensajeProductoEliminado(productTitle) {
  Swal.fire({
    icon: 'success',
    title: 'Producto eliminado',
    text: 'Se ha eliminado del carrito: ' + productTitle,
    timer: 2000,
    showConfirmButton: false
  });
}
// Filtro

let products = [];

async function obtenerDatosProductsJSON() {
  try {
    const response = await fetch('../json/products.json');
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error al obtener los datos del archivo products.json:', error);
    return [];
  }
}

async function cargarProductos() {
  try {
    products = await obtenerDatosProductsJSON();
    cargarFiltro();
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

cargarProductos();


function cargarFiltro() {
  const uniqueCategories = [...new Set(products.map(product => product.description))];

  const filtroSelect = document.getElementById("filtro");
  filtroSelect.innerHTML = ""; // Limpiar opciones previas antes de cargar nuevas opciones

  const optionTodos = document.createElement("option");
  optionTodos.value = "all";
  optionTodos.textContent = "Todos";
  filtroSelect.appendChild(optionTodos);

  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filtroSelect.appendChild(option);
  });

  filtroSelect.addEventListener("change", function() {
    const selectedCategory = this.value;
    filterProductsByCategory(selectedCategory);
  });

  filterProductsByCategory("all");
}

function filterProductsByCategory(category) {
  const productsRow = document.getElementById("productsRow");
  const cards = productsRow.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const productCategory = card.querySelector(".card-text").textContent;

    if (category === "all" || productCategory === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}

filterProductsByCategory("all");

// Mostrar mensaje si el carrito está vacío
function mostrarMensajeCarritoVacio() {
  const carritoContainer = document.getElementById("carritoContainer");
  if (cart.length === 0) {
    carritoContainer.innerHTML = "El carrito está vacío.";
  }
}