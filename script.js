// Lógica del Carrusel de Fondo (Hero Section)
const carouselItems = document.querySelectorAll('.carousel-item');
let currentItemIndex = 0;

function nextCarouselItem() {
    // Quitamos la clase active de la imagen actual
    carouselItems[currentItemIndex].classList.remove('active');
    
    // Calculamos el índice de la siguiente imagen
    currentItemIndex = (currentItemIndex + 1) % carouselItems.length;
    
    // Añadimos la clase active a la nueva imagen
    carouselItems[currentItemIndex].classList.add('active');
}

// Cambiar de imagen cada 5 segundos
setInterval(nextCarouselItem, 4000);

// Lógica del Carrito
let carrito = [];
const panel = document.getElementById('carritoPanel');
const listaUI = document.getElementById('listaCarrito');
const totalUI = document.getElementById('totalPedido');
const contadorUI = document.getElementById('contador');

function toggleCarrito() {
    panel.classList.toggle('activo');
}

function agregarAlCarrito(nombre, precio) {
    if (isNaN(precio)) return; // No agregar si es "Cotizar"

    const item = { id: Date.now(), nombre, precio };
    carrito.push(item);
    actualizarInterfaz();
    
    // Animación visual del contador en el nav
    contadorUI.style.transform = 'scale(1.4)';
    setTimeout(() => contadorUI.style.transform = 'scale(1)', 200);

    // Abre el carrito automáticamente si está cerrado
    if (!panel.classList.contains('activo')) toggleCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarInterfaz();
}

function actualizarInterfaz() {
    listaUI.innerHTML = ''; // Limpiar lista
    let total = 0;
    
    if (carrito.length === 0) {
        listaUI.innerHTML = `
            <div style="text-align:center; margin-top:60px; opacity:0.5;">
                <i class="fas fa-shopping-basket" style="font-size:3rem; margin-bottom:15px; color:var(--primary);"></i>
                <p style="font-size:0.9rem; font-weight:600;">Aún no tienes productos<br>en tu pedido.</p>
            </div>`;
    }

    carrito.forEach(item => {
        total += item.precio;
        const div = document.createElement('div');
        div.className = 'item-carrito';
        div.innerHTML = `
            <div>
                <span style="display:block; font-weight:700; color:var(--dark); font-size:0.9rem;">${item.nombre}</span>
                <span style="color:var(--primary); font-weight:600; font-size:0.85rem;">$${item.precio.toFixed(2)}</span>
            </div>
            <button onclick="eliminarDelCarrito(${item.id})" style="background:#fee2e2; border:none; color:#ef4444; width:32px; height:32px; border-radius:10px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:0.2s;">
                <i class="fas fa-trash-alt" style="font-size:0.8rem;"></i>
            </button>
        `;
        listaUI.appendChild(div);
    });
    
    totalUI.innerText = `$${total.toFixed(2)}`;
    contadorUI.innerText = carrito.length;
}

function enviarWhatsApp() {
    if (carrito.length === 0) return alert("¡Ups! El carrito está vacío.");
    
    let msg = "¡Hola TPrint! Quisiera realizar un pedido:%0A%0A";
    carrito.forEach((i, index) => msg += `${index+1}. *${i.nombre}* ($${i.precio.toFixed(2)})%0A`);
    msg += `%0A*Total estimado: ${totalUI.innerText}*%0A%0A¿Cuáles son los pasos para el diseño? `;
    
    window.open(`https://wa.me/593987752653?text=${msg}`, '_blank');
}

// Asegurar que el body aparezca después de cargar (opcional)
window.onload = () => { document.body.style.opacity = '1'; };
// Seleccionamos todos los enlaces del menú y las secciones
const secciones = document.querySelectorAll('section');
const linksNav = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6 // 60% de la sección debe estar visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Quitamos la clase active de todos los links
            linksNav.forEach((link) => {
                link.classList.remove('active');
                // Si el href del link coincide con el id de la sección visible
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Le decimos al observador que vigile cada sección
secciones.forEach((seccion) => {
    observer.observe(seccion);
});