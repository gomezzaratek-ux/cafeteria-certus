/*
  CONFIGURACIÓN DEL NEGOCIO: completa estos valores antes de publicar.
  WhatsApp: código de país + número, solo dígitos (Perú = 51 + número).
  QR: URL pública de imagen segura (HTTPS) o ruta relativa,
      por ejemplo assets/yape-qr-oficial.png.
  Redes: URL completa de los perfiles oficiales.
*/
const BUSINESS = {
    whatsappNumber: "51939485459", // Ejemplo de formato: 51987654321 (reemplazar por el número real)
    yape: {
        qrImage: "",
        recipient: "",
        phone: "51939485459"
    },
    socials: {
        instagram: "https://www.instagram.com/trabajocertushd/",
        tiktok: "",
        facebook: "",
        whatsapp: "https://wa.link/w9vs0l"
    }
};

const PRODUCTS = [
    {
        id: "B01",
        category: "Bebidas",
        name: "Café Americano",
        description: "Café de sabor intenso, servido caliente.",
        price: 3.00,
        available: true,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        alt: "Taza de café americano"
    },
    {
        id: "B02",
        category: "Bebidas",
        name: "Chocolate caliente",
        description: "Bebida cremosa preparada con leche y cacao.",
        price: 4.00,
        available: true,
        image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?auto=format&fit=crop&w=800&q=80",
        alt: "Chocolate caliente servido en una taza"
    },
    {
        id: "B03",
        category: "Bebidas",
        name: "Infusión natural",
        description: "Manzanilla, anís o hierba luisa, según elección.",
        price: 2.50,
        available: true,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
        alt: "Taza de infusión caliente"
    },
    {
        id: "S01",
        category: "Sándwiches",
        name: "Sándwich mixto",
        description: "Pan tostado con jamón y queso fundido.",
        price: 4.50,
        available: true,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
        alt: "Sándwich preparado con pan tostado"
    },
    {
        id: "S02",
        category: "Sándwiches",
        name: "Sándwich de pollo",
        description: "Pollo deshilachado, lechuga y crema de la casa.",
        price: 6.00,
        available: true,
        image: "https://images.unsplash.com/photo-1666819604716-7b60a604bb76?auto=format&fit=crop&w=800&q=80",
        alt: "Sándwich de pollo con vegetales"
    },
    {
        id: "S03",
        category: "Sándwiches",
        name: "Sándwich vegetariano",
        description: "Queso, tomate, lechuga y palta en pan integral.",
        price: 5.50,
        available: false,
        image: "https://images.unsplash.com/photo-1666819604716-7b60a604bb76?auto=format&fit=crop&w=800&q=80",
        alt: "Sándwich con vegetales"
    },
    {
        id: "K01",
        category: "Snacks",
        name: "Galleta de avena",
        description: "Galleta horneada con avena y pasas.",
        price: 1.50,
        available: false,
        image: "https://images.unsplash.com/photo-1652282561156-d02574e618f1?auto=format&fit=crop&w=800&q=80",
        alt: "Galletas de avena recién horneadas"
    },
    {
        id: "K02",
        category: "Snacks",
        name: "Barra de cereal",
        description: "Mezcla crocante de cereales y miel.",
        price: 2.50,
        available: true,
        image: "https://images.unsplash.com/photo-1705868454777-4d1d730acee2?auto=format&fit=crop&w=800&q=80",
        alt: "Barras de cereal con frutos secos"
    },
    {
        id: "K03",
        category: "Snacks",
        name: "Fruta de estación",
        description: "Una pieza de fruta fresca seleccionada del día.",
        price: 2.00,
        available: true,
        image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80",
        alt: "Fruta fresca de estación"
    },
    {
        id: "C01",
        category: "Combos",
        name: "Combo Clásico",
        description: "Sándwich mixto más una infusión natural.",
        price: 6.50,
        available: true,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
        alt: "Sándwich servido junto a una bebida caliente",
        badge: "Recomendado"
    },
    {
        id: "C02",
        category: "Combos",
        name: "Combo Energía",
        description: "Sándwich de pollo más café americano.",
        price: 7.50,
        available: true,
        image: "https://images.unsplash.com/photo-1666819604716-7b60a604bb76?auto=format&fit=crop&w=800&q=80",
        alt: "Sándwich de pollo para acompañar con café"
    },
    {
        id: "C03",
        category: "Combos",
        name: "Combo Ligero",
        description: "Fruta de estación más una infusión natural.",
        price: 5.00,
        available: true,
        image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80",
        alt: "Fruta fresca para un combo ligero"
    }
];

const money = amount =>
    new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN"
    }).format(amount);

const $ = selector => document.querySelector(selector);
const grid = $("#product-grid");
const cartDialog = $("#cart-dialog");

let category = "Todos";
let cart = loadCart();
let toastTimer;

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem("certus-cart-v1") || "{}");

        return Object.fromEntries(
            Object.entries(saved).filter(([id, qty]) =>
                PRODUCTS.some(product => product.id === id && product.available) &&
                Number.isInteger(qty) &&
                qty > 0
            )
        );
    } catch {
        return {};
    }
}

function saveCart() {
    localStorage.setItem("certus-cart-v1", JSON.stringify(cart));
}

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2300);
}

function productCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";

    const image = document.createElement("div");
    image.className = "product-image";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener(
        "error",
        () => image.classList.add("image-error"),
        { once: true }
    );

    const fallback = document.createElement("span");
    fallback.className = "image-fallback";
    fallback.setAttribute("aria-hidden", "true");
    fallback.textContent =
        product.category === "Bebidas" ? "☕" :
            product.category === "Sándwiches" ? "🥪" :
                product.category === "Snacks" ? "🍪" : "✨";

    image.append(img, fallback);

    const status = document.createElement("span");
    status.className = `availability${product.available ? "" : " sold"}`;
    status.textContent = product.available ? "Disponible" : "Agotado";
    image.append(status);

    const body = document.createElement("div");
    body.className = "product-body";
    body.innerHTML = `
    <span class="product-meta"></span>
    <h3></h3>
    <p></p>
    <div class="product-bottom">
      <span class="price"></span>
      <button class="add-button" type="button"></button>
    </div>
  `;

    body.querySelector(".product-meta").textContent = product.badge || product.category;
    body.querySelector("h3").textContent = product.name;
    body.querySelector("p").textContent = product.description;
    body.querySelector(".price").textContent = money(product.price);

    const button = body.querySelector(".add-button");
    button.disabled = !product.available;
    button.textContent = product.available ? "+ Agregar" : "Agotado";
    button.setAttribute(
        "aria-label",
        product.available
            ? `Agregar ${product.name} al pedido`
            : `${product.name}, agotado`
    );

    button.addEventListener("click", () => {
        cart[product.id] = (cart[product.id] || 0) + 1;
        saveCart();
        renderCart();
        showToast(`${product.name} agregado al pedido`);
    });

    article.append(image, body);
    return article;
}

function renderProducts() {
    const query = $("#search").value.trim().toLocaleLowerCase("es");

    const filtered = PRODUCTS.filter(product => {
        const matchesCategory = category === "Todos" || product.category === category;
        const searchableText =
            `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase("es");

        return matchesCategory && searchableText.includes(query);
    });

    grid.replaceChildren(...filtered.map(productCard));

    $("#result-count").textContent =
        `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`;

    if (filtered.length === 0) {
        const message = document.createElement("p");
        message.className = "notice";
        message.textContent = "No encontramos productos con esa búsqueda.";
        grid.append(message);
    }
}

function cartEntries() {
    return Object.entries(cart)
        .map(([id, qty]) => ({
            product: PRODUCTS.find(product => product.id === id),
            qty
        }))
        .filter(entry => entry.product);
}

function cartTotal() {
    return cartEntries().reduce(
        (sum, { product, qty }) => sum + product.price * qty,
        0
    );
}

function renderCart() {
    const entries = cartEntries();
    const items = $("#cart-items");
    items.replaceChildren();

    for (const { product, qty } of entries) {
        const row = document.createElement("div");
        row.className = "cart-row";

        const info = document.createElement("div");
        const title = document.createElement("h3");
        const sub = document.createElement("small");

        title.textContent = product.name;
        sub.textContent = `${money(product.price)} c/u · ${money(product.price * qty)}`;
        info.append(title, sub);

        const controls = document.createElement("div");
        controls.className = "quantity";

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.setAttribute("aria-label", `Quitar una unidad de ${product.name}`);

        const output = document.createElement("output");
        output.textContent = qty;

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.setAttribute("aria-label", `Agregar una unidad de ${product.name}`);

        minus.addEventListener("click", () => changeQuantity(product.id, -1));
        plus.addEventListener("click", () => changeQuantity(product.id, 1));

        controls.append(minus, output, plus);
        row.append(info, controls);
        items.append(row);
    }

    const empty = entries.length === 0;
    $("#cart-empty").hidden = !empty;
    $("#order-form").hidden = empty;
    $("#cart-total").textContent = money(cartTotal());
    $("#cart-count").textContent = entries.reduce((sum, entry) => sum + entry.qty, 0);
}

function changeQuantity(id, delta) {
    cart[id] = (cart[id] || 0) + delta;

    if (cart[id] <= 0) {
        delete cart[id];
    }

    saveCart();
    renderCart();
}

function renderYape() {
    const qr = BUSINESS.yape.qrImage.trim();

    if (!qr) return;

    const img = document.createElement("img");
    img.className = "yape-qr";
    img.src = qr;
    img.alt = "Código QR oficial de Yape de la Cafetería CERTUS";

    img.addEventListener("error", () => {
        img.remove();
        $("#yape-details").hidden = true;
        $("#qr-placeholder").hidden = false;
        showToast("No se pudo cargar el QR. Revisa la dirección configurada.");
    }, { once: true });

    const details = $("#yape-details");
    details.hidden = false;
    details.append(img);

    if (BUSINESS.yape.recipient) {
        const name = document.createElement("strong");
        name.textContent = BUSINESS.yape.recipient;
        details.append(name);
    }

    if (BUSINESS.yape.phone) {
        const phone = document.createElement("span");
        phone.textContent = `Yape: ${BUSINESS.yape.phone}`;
        details.append(phone);
    }

    $("#qr-placeholder").hidden = true;
}

const SOCIALS = {
    instagram: {
        label: "Instagram",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"/></svg>'
    },
    facebook: {
        label: "Facebook",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8.8h3l.45-3.45H13.5V7.55c0-1 .28-1.68 1.72-1.68h1.84V2.78A24 24 0 0 0 14.38 2c-2.66 0-4.48 1.62-4.48 4.6v3.15H6.9v3.45h3V22h3.6z"/></svg>'
    },
    tiktok: {
        label: "TikTok",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 6.3a5.8 5.8 0 0 1-3.5-1.2v8.1a6.3 6.3 0 1 1-5.4-6.25v3.25a3.1 3.1 0 1 0 2.15 2.96V2h3.25a5.8 5.8 0 0 0 3.5 3.1V6.3z"/></svg>'
    },
    whatsapp: {
        label: "WhatsApp",
        icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.8 9.8 0 0 0-8.43 14.8L2.3 22l5.34-1.22A9.9 9.9 0 1 0 12 2zm0 17.8a8 8 0 0 1-4.08-1.12l-.3-.18-3.16.72.75-3.08-.2-.32A7.9 7.9 0 1 1 12 19.8zm4.35-5.93c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.24 1.02.39 1.37.5.58.19 1.1.16 1.5.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/></svg>'
    }
};

function renderSocials() {
    const container = $("#social-links");
    let count = 0;

    for (const [key, url] of Object.entries(BUSINESS.socials)) {
        if (!url || !/^https:\/\//i.test(url)) continue;

        const link = document.createElement("a");
        link.className = "social-link";
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute(
            "aria-label",
            `Visitar ${SOCIALS[key].label} de Cafetería CERTUS`
        );
        link.title = SOCIALS[key].label;
        link.innerHTML = SOCIALS[key].icon;
        container.append(link);
        count++;
    }

    if (count) {
        $("#social-hint").hidden = true;
    }
}

function buildOrderMessage(name, note) {
    const lines = [
        "Hola, Cafetería CERTUS. Quiero realizar este pedido:",
        "",
        ...cartEntries().map(({ product, qty }) =>
            `• ${qty} × ${product.name} — ${money(product.price * qty)}`
        ),
        "",
        `Total: ${money(cartTotal())}`,
        `Nombre: ${name}`
    ];

    if (note) {
        lines.push(`Nota: ${note}`);
    }

    lines.push(
        "",
        "Realizaré el pago por Yape y enviaré la constancia. Entiendo que el pago queda pendiente hasta su verificación."
    );

    return lines.join("\n");
}

$("#filters").addEventListener("click", event => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;

    category = button.dataset.category;

    document.querySelectorAll(".filter").forEach(filterButton => {
        const active = filterButton === button;
        filterButton.classList.toggle("active", active);
        filterButton.setAttribute("aria-pressed", String(active));
    });

    renderProducts();
});

$("#search").addEventListener("input", renderProducts);

$("#open-cart").addEventListener("click", () => {
    renderCart();
    cartDialog.showModal();
});

$("#close-cart").addEventListener("click", () => cartDialog.close());
$("#back-to-menu").addEventListener("click", () => cartDialog.close());

$("#new-order").addEventListener("click", () => {
    cart = {};
    saveCart();
    renderCart();
    cartDialog.close();
    $("#order-success").hidden = true;
    $("#cart-view").hidden = false;
    document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
});

$("#order-form").addEventListener("submit", event => {
    event.preventDefault();

    if (!cartEntries().length) return;

    const number = BUSINESS.whatsappNumber.replace(/\D/g, "");

    if (!/^51\d{9}$/.test(number)) {
        showToast("Configura el WhatsApp oficial en js/app.js antes de enviar pedidos.");
        $("#order-hint").textContent =
            "Falta configurar el número oficial de WhatsApp del negocio en js/app.js (formato Perú: 51 y 9 dígitos).";
        return;
    }

    const name = $("#customer-name").value.trim();

    if (!name) {
        $("#customer-name").focus();
        return;
    }

    const note = $("#order-note").value.trim();
    const url =
        `https://wa.me/${number}?text=${encodeURIComponent(buildOrderMessage(name, note))}`;

    $("#whatsapp-link").href = url;
    $("#cart-view").hidden = true;
    $("#order-success").hidden = false;
});

$("#year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
renderYape();
renderSocials();
