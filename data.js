// CONFIG — Bárbara Regazzoni Pastelería (demo Vigolo Web Studio)
// Todo lo que cambia de un comercio a otro vive acá.
// Precios tomados de las historias de Instagram (lista general "hace 2 días"; budines 6/11; panes 7/10; cookies 11/5).

const P = (id, categoria, nombre, precio, extra = {}) => ({ id, categoria, nombre, opciones: [{ etiqueta: "", precio }], ...extra });
const B = (id, nombre, med, gde, extra = {}) => ({ id, categoria: "Budines", nombre, opciones: [{ etiqueta: "Med.", precio: med }, { etiqueta: "Gde.", precio: gde }], ...extra });

const CONFIG = {
  negocio: {
    nombre: "Bárbara Regazzoni",
    rubro: "Pastelería de autor",
    localidad: "Longchamps",
    eslogan: "Pastelería de autor, hecha por encargo",
    logo: "img/logo.webp",
  },

  contacto: {
    whatsapp: "5491128074105", // PENDIENTE CLIENTE — número de demo (Vigolo). Reemplazar por el de Bárbara: 549 + área + número
    mensajeWhatsapp: "¡Hola Bárbara! Vi tu web y quería consultar...",
    telefono: "", // PENDIENTE CLIENTE
    instagram: "https://instagram.com/barbara.regazzoni.pasteleria",
    instagramUser: "@barbara.regazzoni.pasteleria",
    seguidores: "1.298",
    direccion: "Longchamps, Buenos Aires", // PENDIENTE CLIENTE: confirmar si hay retiro en domicilio
    mapsEmbed: "https://www.google.com/maps?q=Longchamps,+Buenos+Aires&output=embed",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Longchamps,+Buenos+Aires",
  },

  pedidos: {
    anticipacionDias: 2, // PENDIENTE CLIENTE — días mínimos de anticipación para encargos
    envioZona: "Envío gratis por la zona", // PENDIENTE CLIENTE — detallar barrios
    envioFuera: "Envíos a Provincia y CABA con recargo",
    formasDePago: ["Transferencia", "Efectivo", "Mercado Pago"], // PENDIENTE CLIENTE
    tiposEncargo: ["Torta de cumpleaños", "Torta o tarta de la carta", "Mesa dulce / minis", "Budines y panes", "Otra idea"],
  },

  categorias: ["Pastelería individual", "Tortas y tartas", "Budines", "Panes", "Cookies"],

  // Productos con foto real salen en la sección "Imperdibles"
  destacados: ["croissants", "rogel"],

  productos: [
    // Pastelería individual
    P("cinnamon-buns", "Pastelería individual", "Cinnamon buns", 4500, { desc: "Rulos de canela glaseados, con nueces.", foto: "img/gal-cinnamon.webp" }),
    P("croissants", "Pastelería individual", "Croissants", 3800, { desc: "Laminado artesanal, manteca y mucha paciencia.", foto: "img/croissant.webp" }),
    P("pain-au-chocolat", "Pastelería individual", "Pain au chocolat", 4600, { desc: "Hojaldre de manteca con chocolate." }),
    P("medialunas", "Pastelería individual", "Medialunas", 1400, { desc: "Las de siempre, bien hechas." }),
    P("alfajor-pistacho", "Pastelería individual", "Alfajor de pistacho", 4400),
    P("alfajor-nuez", "Pastelería individual", "Alfajor de nuez", 3900, { desc: "Baño de chocolate blanco y nuez." }),

    // Tortas y tartas (precio entero)
    P("brownie-merengue", "Tortas y tartas", "Brownie con dulce de leche y merengue", 48000),
    P("lemon-pie", "Tortas y tartas", "Lemon pie", 43000),
    P("cheesecake", "Tortas y tartas", "Cheesecake", 53000),
    P("nano-cake", "Tortas y tartas", "Nano cake", 51000),
    P("dacquoise", "Tortas y tartas", "Dacquoise de coco y nuez con crema y frutos rojos", 57000, { sinGluten: true }),
    P("brownie-frutos-rojos", "Tortas y tartas", "Brownie con dulce de leche, crema y frutos rojos", 62000, { sinGluten: true }),
    P("rogel", "Tortas y tartas", "Rogel", 46000, { desc: "Capas crocantes, dulce de leche y merengue.", foto: "img/rogel.webp" }),
    P("tarta-ricotta", "Tortas y tartas", "Tarta de ricotta", 35000),
    P("tarta-frolla", "Tortas y tartas", "Tarta frolla", 34000),
    P("tarta-coco-ddl", "Tortas y tartas", "Tarta de coco y dulce de leche", 40000),
    P("streusel-manzana", "Tortas y tartas", "Streusel de manzana", 44000),

    // Budines (mediano / grande)
    B("budin-chocolate", "Budín de chocolate", 21000, 31000),
    B("budin-ciruelas", "Budín de ciruelas", 18000, 26000),
    B("budin-mandarinas", "Budín de mandarinas", 16000, 21000),
    B("budin-zanahoria", "Budín de zanahoria, naranja y nuez", 19000, 28000),
    B("budin-citrico", "Budín cítrico", 18000, 26000),
    B("budin-banana", "Budín saludable de banana", 19000, 29000),

    // Panes
    P("pan-integral-semillas", "Panes", "Pan lactal 100% integral y semillas (grande)", 8000),
    P("pan-integral", "Panes", "Pan lactal 100% integral (grande)", 7400),
    P("pan-lactal-blanco", "Panes", "Pan lactal blanco", 7000, { foto: "img/pan-lactal.webp" }),
    P("pan-campo", "Panes", "Pan de campo", 7300, { foto: "img/pan-campo.webp" }),
    P("pan-pita", "Panes", "Pan pita (c/u)", 850),
    P("pan-brioche", "Panes", "Pan brioche", 9500),
    P("focaccia", "Panes", "Focaccia", 9600),

    // Cookies (precio c/u)
    P("cookie-ny", "Cookies", "New York cookie dos chocolates", 3800),
    P("cookie-coco-lima", "Cookies", "Cookie de coco, lima y chocolate blanco", 3900),
    P("cookie-red-velvet", "Cookies", "Cookie red velvet rellena de cheesecake", 4100),
    P("cookie-frambuesa", "Cookies", "Cookie de frambuesa y chocolate blanco", 4100),
    P("cookie-pistacho", "Cookies", "Cookie de pistacho Dubai y chocolate blanco", 4400),
    P("cookie-dos-choco-sg", "Cookies", "Cookie dos chocolates", 4400, { sinGluten: true }),
    P("cookie-nueces-sg", "Cookies", "Cookie de chocolate con chips y nueces", 4600, { sinGluten: true }),
    P("cookie-red-velvet-sg", "Cookies", "Cookie red velvet", 4500, { sinGluten: true }),
    P("cookie-coco-lima-sg", "Cookies", "Cookie de coco y lima", 4500, { sinGluten: true }),
    P("cookie-proteica", "Cookies", "Cookie proteica saludable", 4400),
  ],

  galeria: [
    { src: "img/gal-minis.webp", w: 900, h: 899, alt: "Caja de mini lemon pies, mini tartas de frutilla con ganache y mini alfajores de chocolate blanco y nuez" },
    { src: "img/gal-brownie.webp", w: 900, h: 899, alt: "Torta de brownie con dulce de leche, crema chantilly, Oreo, Kit Kat y frutillas" },
    { src: "img/gal-alfajores.webp", w: 373, h: 402, alt: "Alfajores de cacao con baño de chocolate y pétalos de rosa" },
    { src: "img/gal-tiramisu.webp", w: 900, h: 899, alt: "Tiramisú con borde de vainillas y cacao" },
    { src: "img/gal-cinnamon.webp", w: 373, h: 420, alt: "Cinnamon buns trenzados con glaseado y nueces" },
    { src: "img/gal-frutos.webp", w: 373, h: 385, alt: "Merengue con crema, frutillas, arándanos y frambuesas" },
    { src: "img/gal-tostada.webp", w: 372, h: 420, alt: "Tostada de brioche con banana, frambuesas y azúcar impalpable" },
    { src: "img/pan-campo.webp", w: 372, h: 394, alt: "Pan de campo artesanal con harina por encima" },
  ],

  seo: {
    titulo: "Pastelería en Longchamps | Bárbara Regazzoni",
    descripcion: "Pastelería de autor en Longchamps: tortas, croissants, cookies y panes por encargo. Armá tu pedido y envialo por WhatsApp. Envío gratis por la zona.",
  },
};
