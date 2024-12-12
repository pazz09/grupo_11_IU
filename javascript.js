//TIENDA

const prevButton1 = document.querySelector('.btn-carousel.prev');
const nextButton1 = document.querySelector('.btn-carousel.next');
const productos = document.querySelector('.productos');

// Al hacer clic en la flecha izquierda
prevButton1.addEventListener('click', () => {
  productos.scrollBy({ left: -200, behavior: 'smooth' });
});

// Al hacer clic en la flecha derecha
nextButton1.addEventListener('click', () => {
  productos.scrollBy({ left: 200, behavior: 'smooth' });
});

// Variables globales
let carrito = [];
let historial = [];

// Función para actualizar el carrito
function actualizarCarrito() {
  const carritoDiv = document.querySelector('.items-carrito');
  const totalDiv = document.querySelector('#total');
  carritoDiv.innerHTML = '';

  let total = 0;
  carrito.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
      <span>${item.name} - ${item.quantity} x ${item.price} €</span>
      <button class="remove-item" data-id="${item.id}">Eliminar</button>
    `;
    carritoDiv.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalDiv.textContent = total;

  // Event listeners para eliminar productos
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      carrito = carrito.filter(item => item.id !== parseInt(id));
      actualizarCarrito();
    });
  });
}

// Función para agregar al carrito
function agregarAlCarrito(event) {
  const producto = event.target.closest('.producto');
  const id = parseInt(producto.getAttribute('data-id'));
  const name = producto.getAttribute('data-name');
  const price = parseInt(producto.getAttribute('data-price'));

  const itemExistente = carrito.find(item => item.id === id);
  if (itemExistente) {
    itemExistente.quantity++;
  } else {
    carrito.push({ id, name, price, quantity: 1 });
  }

  actualizarCarrito();
}

// Función para actualizar el historial
function actualizarHistorial() {
  const historialDiv = document.querySelector('.items-historial');
  historialDiv.innerHTML = '';
  historial.forEach((compra, index) => {
    const compraDiv = document.createElement('div');
    compraDiv.classList.add('item');
    compraDiv.innerHTML = `
      <p>Compra #${index + 1}</p>
      <ul>
        ${compra
          .map(
            item =>
              `<li>${item.name} - ${item.quantity} x ${item.price} €</li>`
          )
          .join('')}
      </ul>
    `;
    historialDiv.appendChild(compraDiv);
  });
}

// Mostrar el modal al finalizar compra
const finalizarCompraBtn = document.querySelector('#finalizar-compra');
const modal = document.querySelector('#modal-pago');
const closeModal = document.querySelector('.close');
const formPago = document.querySelector('#form-pago');
const medioPagoSelect = document.querySelector('#medio-pago');
const datosTarjetaDiv = document.querySelector('#datos-tarjeta');

// Mostrar el modal al finalizar compra
finalizarCompraBtn.addEventListener('click', () => {
  if (carrito.length > 0) {
    modal.style.display = 'block';
  } else {
    alert('El carrito está vacío');
  }
});

// Cerrar el modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Mostrar campos de tarjeta si se selecciona el medio de pago "tarjeta"
medioPagoSelect.addEventListener('change', () => {
  if (medioPagoSelect.value === 'tarjeta') {
    datosTarjetaDiv.style.display = 'block';
  } else {
    datosTarjetaDiv.style.display = 'none';
  }
});

// Manejar el envío del formulario de pago
formPago.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita el envío normal del formulario

  const medioPago = medioPagoSelect.value;

  // Validar los datos de la tarjeta si el medio de pago es tarjeta
  if (medioPago === 'tarjeta') {
    const numeroTarjeta = document.querySelector('#numero-tarjeta').value;
    const fechaExpiracion = document.querySelector('#fecha-expiracion').value;
    const cvv = document.querySelector('#cvv').value;

    if (!numeroTarjeta || !fechaExpiracion || !cvv) {
      alert('Por favor, completa los datos de la tarjeta');
      return;
    }
  }

  // Procesa la compra y cierra el modal
  historial.push([...carrito]); // Agrega el carrito actual al historial
  carrito = []; // Limpia el carrito
  actualizarCarrito();
  actualizarHistorial();
  alert(`Compra realizada con éxito mediante ${medioPago.toUpperCase()}`);
  modal.style.display = 'none'; // Cierra el modal
});

// Event listeners para botones "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', agregarAlCarrito);
});

// Funciones para el carrusel (productos)
const prevButton2 = document.querySelector('.btn-carousel.prev');
const nextButton2 = document.querySelector('.btn-carousel.next');

// Al hacer clic en la flecha izquierda
prevButton2.addEventListener('click', () => {
  productos.scrollBy({ left: -200, behavior: 'smooth' });
});

// Al hacer clic en la flecha derecha
nextButton2.addEventListener('click', () => {
  productos.scrollBy({ left: 200, behavior: 'smooth' });
});



// Cuentos
const stories = [  // Array of stories
    {
      title: "El milagro del muñeco de nieve",
      content: `
        <p>Era la víspera de Navidad en un pequeño pueblo cubierto de nieve. Mateo, un niño curioso y alegre, había construido un muñeco de nieve en su jardín. Lo adornó con una bufanda roja, un sombrero de copa y dos botones grandes como ojos. Esa noche, antes de ir a dormir, Mateo le pidió un deseo al muñeco: que todos en el pueblo pasaran una Navidad llena de alegría.</p>
        <p>Al amanecer, algo mágico ocurrió. El muñeco de nieve había cobrado vida y comenzó a repartir dulces y sonrisas a los vecinos. La alegría llenó cada rincón del pueblo, y los habitantes salieron a celebrar juntos. La Navidad fue un verdadero milagro, y Mateo nunca olvidó aquel muñeco que hizo realidad su deseo.</p>
        <p>Desde entonces, cada Navidad, la magia y la bondad iluminaban su hogar y los corazones de todos en el pueblo.</p>
      `,
    },
    {
      title: "Una noche en el Polo Norte",
      content: `
        <p>En lo más remoto del Polo Norte, un grupo de duendes trabajaba incansablemente para preparar los regalos de Navidad. Una noche, uno de los duendes descubrió que faltaban los renos mágicos.</p>
        <p>Con ayuda de una estrella brillante, Papá Noel y sus duendes iniciaron una mágica aventura para encontrar a los renos. En el camino, aprendieron el verdadero valor del trabajo en equipo y la amistad.</p>
        <p>Finalmente, encontraron a los renos y lograron salvar la Navidad, repartiendo felicidad a todos los hogares.</p>
      `,
    },
    {
      title: "La estrella mágica de Navidad",
      content: `
        <p>Había una vez una estrella mágica que iluminaba el cielo en la noche de Navidad. Todos en el pueblo la esperaban con ansias, pues traía consigo alegría y esperanza.</p>
        <p>Una niña llamada Sofía, llena de curiosidad, decidió seguir la luz de la estrella para descubrir su secreto. La estrella la llevó a un lugar mágico donde los sueños se hacían realidad.</p>
        <p>Sofía regresó al pueblo con un corazón lleno de esperanza, compartiendo su experiencia con todos y recordándoles que la magia de la Navidad vive en los corazones de quienes creen.</p>
      `,
    },
  ];
  
  
  let currentIndex = 0;
  function updateStory() { //update
    const storyTitleElement = document.querySelector('.storytitle');
    const storyContentElement = document.querySelector('.stories span');
  
    storyTitleElement.innerHTML = stories[currentIndex].title;
    storyContentElement.innerHTML = stories[currentIndex].content;
  }
  
  function nextStory() {
    currentIndex = (currentIndex + 1) % stories.length; 
    updateStory();
  }
  function previousStory() {
    currentIndex = (currentIndex - 1 + stories.length) % stories.length; 
    updateStory();
  }
  updateStory();
  
//Biblioteca cartas
const images = [
  "images/carta1.jpg",
  "images/carta2.jpg",
  "images/carta 3.jpg"
];

let carouselIndex = 0; 
const currentImage = document.getElementById("current-img");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function updateImage() {
  currentImage.src = images[currentIndex];
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Volver al último si es necesario
  updateImage();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length; // Ir al inicio si es necesario
  updateImage();
}

prevButton.addEventListener("click", showPrevImage);
nextButton.addEventListener("click", showNextImage);

//Juegos

let gift = Math.floor(Math.random() * 3) + 1; 
function checkGift(treeNumber) { 
  let result = document.getElementById("result"); 
  if (treeNumber === gift) { 
    result.textContent = "¡Felicidades! Encontraste el regalo oculto."; 
    result.style.color = "green"; 
  } 
  else { 
    result.textContent = "Sigue buscando... ¡No te rindas!"; 
    result.style.color = "red"; 
  } 
  result.style.display = 'block';
  setTimeout(clearResult, 2000);
}

function clearResult() { 
  let result = document.getElementById("result"); 
  result.style.display = 'none';
}

let score = 0; 
let gameArea = document.getElementById('gameArea'); 
let snowflake = document.getElementById('snowflake'); 
let scoreDisplay = document.getElementById('score'); 
let startButton = document.getElementById('startButton'); 
let finalMessage = document.getElementById('finalMessage');

startButton.addEventListener('click', startGame); 

function startGame() { 
  score = 0; 
  scoreDisplay.textContent = 'Puntuación: ' + score; 
  finalMessage.classList.add('hidden');
  startButton.style.display = 'none'; 
  moveSnowflake(); 
  setTimeout(endGame, 30000); 
}
function moveSnowflake() {
  let x = Math.floor(Math.random() * (gameArea.clientWidth - snowflake.clientWidth)); 
  let y = Math.floor(Math.random() * (gameArea.clientHeight - snowflake.clientHeight)); 
  snowflake.style.left = x + 'px'; 
  snowflake.style.top = y + 'px'; 
  snowflake.addEventListener('click', clickSnowflake); 
} 
function clickSnowflake() { 
  score++; scoreDisplay.textContent = 'Puntuación: ' + score; 
  moveSnowflake(); 
} 

function endGame() { 
  snowflake.removeEventListener('click', clickSnowflake); 
  startButton.style.display = 'block'; 
  finalMessage.textContent = '¡Juego terminado! Puntuación final: ' + score; 
  finalMessage.classList.remove('hidden');
}

//Cartas

function mostrarFormulario() { 
  document.getElementById('formulario').classList.remove('hidden'); 
} 

function ocultarFormulario() { 
  document.getElementById('formulario').classList.add('hidden'); 
}