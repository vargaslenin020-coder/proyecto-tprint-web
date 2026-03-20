let carrito = [];

function agregarCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    document.getElementById("carritoPanel").classList.add("activo");
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalTxt = document.getElementById("total");
    const contador = document.getElementById("contador");
    
    lista.innerHTML = "";
    let total = 0;
    
    carrito.forEach((item, index) => {
        total += item.precio;
        lista.innerHTML += `
            <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                <div style="text-align: left;">
                    <span style="display: block; font-weight: bold;">${item.nombre}</span>
                    <span style="color: var(--primary);">$${item.precio.toFixed(2)}</span>
                </div>
                <button onclick="eliminarDelCarrito(${index})" style="background: #ffeded; color: #ff4d4d; border: none; padding: 5px 10px; border-radius: 8px; cursor: pointer; font-size: 0.8rem;">
                    <i class="fas fa-trash"></i>
                </button>
            </li>`;
    });
    
    totalTxt.innerText = `$${total.toFixed(2)}`;
    contador.innerText = carrito.length;
}

function toggleCarrito() {
    document.getElementById("carritoPanel").classList.toggle("activo");
}

function toggleModo() {
    document.body.classList.toggle("dark");
}

function enviarWhatsApp() {
    if (carrito.length === 0) return alert("Tu carrito está vacío");
    let msg = "¡Hola TPRINT! 👋 Quisiera realizar el siguiente pedido:%0A%0A";
    let total = 0;
    carrito.forEach(i => {
        msg += `- ${i.nombre} ($${i.precio.toFixed(2)})%0A`;
        total += i.precio;
    });
    msg += `%0A*TOTAL: $${total.toFixed(2)}*`;
    window.open(`https://wa.me/593987752653?text=${encodeURIComponent(msg)}`);
}