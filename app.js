(() => {
  const C = CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Formato argentino manual: toLocaleString('es-AR') no pone el punto en números de 4 cifras ($ 4500)
  const fmt = n => "$ " + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const OV_KEY = "regazzoni_demo_overrides", CART_KEY = "regazzoni_demo_cart";
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch { return d; } };
  const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const wa = text => `https://wa.me/${C.contacto.whatsapp}?text=${encodeURIComponent(text)}`;

  // Productos + cambios hechos desde el panel (demo: se guardan en el navegador)
  const ov = load(OV_KEY, {});
  const productos = C.productos.map(p => {
    const o = ov[p.id] || {};
    return { ...p, nombre: o.nombre || p.nombre, foto: o.foto || p.foto, disponible: o.disponible !== false,
      opciones: p.opciones.map((op, i) => ({ ...op, precio: o.precios && o.precios[i] != null ? o.precios[i] : op.precio })) };
  });
  const byId = Object.fromEntries(productos.map(p => [p.id, p]));
  let cart = load(CART_KEY, {}); // { "id|opcion": cantidad }
  cart = Object.fromEntries(Object.entries(cart).filter(([k]) => byId[k.split("|")[0]]));

  const minDate = () => { const d = new Date(Date.now() + C.pedidos.anticipacionDias * 864e5); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const fechaAR = v => v.split("-").reverse().join("/");

  // ---------- Enlaces generales ----------
  const hello = wa(C.contacto.mensajeWhatsapp);
  ["waHero", "waContact", "waFloat"].forEach(id => ($("#" + id).href = hello));
  $("#igLink").href = $("#igFoot").href = C.contacto.instagram;
  $("#igFoot").textContent = C.contacto.instagramUser;
  $("#mapLink").href = C.contacto.mapsLink;
  $("#mapFrame").src = C.contacto.mapsEmbed;
  $("#year").textContent = new Date().getFullYear();
  $("#anticipo").textContent = `Los encargos necesitan al menos ${C.pedidos.anticipacionDias} días de anticipación.`;

  // ---------- Menú móvil ----------
  const burger = $("#burger"), menu = $("#menu");
  const nav = $(".nav");
  const setMenu = o => { menu.classList.toggle("open", o); nav.classList.toggle("menu-open", o); burger.setAttribute("aria-expanded", o); };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  const onScroll = () => nav.classList.toggle("solid", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  // ---------- Carta ----------
  let cat = C.categorias[0];
  const addBtn = (p, i) => `<button class="add" data-add="${p.id}|${i}" ${p.disponible ? "" : "disabled"} aria-label="Agregar ${esc(p.nombre)} ${esc(p.opciones[i].etiqueta)} al pedido">+</button>`;
  function renderTabs() {
    $("#tabs").innerHTML = C.categorias.map(c => `<button class="tab" role="tab" aria-selected="${c === cat}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  }
  function renderMenu() {
    $("#menuList").innerHTML = productos.filter(p => p.categoria === cat).map(p => `
      <li class="item ${p.disponible ? "" : "off"}">
        ${p.foto ? `<img class="th" src="${esc(p.foto)}" width="84" height="84" alt="${esc(p.nombre)}" loading="lazy">` : ""}
        <div class="item-info">
          <div class="item-name">${esc(p.nombre)}${p.sinGluten ? '<span class="tag">Sin gluten</span>' : ""}${p.disponible ? "" : '<span class="tag">Agotado</span>'}</div>
          ${p.desc ? `<div class="item-desc">${esc(p.desc)}</div>` : ""}
        </div>
        <i class="dots" aria-hidden="true"></i>
        <div class="opts">${p.opciones.map((o, i) => `<div class="opt">${o.etiqueta ? `<span class="lbl">${esc(o.etiqueta)}</span>` : ""}<span class="price">${fmt(o.precio)}</span>${addBtn(p, i)}</div>`).join("")}</div>
      </li>`).join("");
  }
  $("#tabs").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (!b) return; cat = b.dataset.cat; renderTabs(); renderMenu(); });

  // ---------- Imperdibles ----------
  $("#featGrid").innerHTML = C.destacados.map(id => byId[id]).filter(Boolean).map(p => `
    <article class="card rv">
      <div class="ph"><img src="${esc(p.foto)}" width="640" height="640" alt="${esc(p.nombre)}" loading="lazy"></div>
      <div class="card-body"><h3>${esc(p.nombre)}</h3><p>${esc(p.desc || "")}</p>
        <div class="card-foot"><span class="price">${fmt(p.opciones[0].precio)}</span>${addBtn(p, 0)}</div></div>
    </article>`).join("") + `
    <article class="card custom rv">
      <div class="ph"><img src="img/gal-brownie.webp" width="900" height="899" alt="Torta de brownie con frutillas, Oreo y Kit Kat" loading="lazy"></div>
      <div class="card-body"><h3>Tortas a tu medida</h3><p>Brownies, tiramisú, minis y mesas dulces para tu celebración.</p>
        <div class="card-foot"><a class="btn btn-ghost-dark" href="#encargos">Pedir presupuesto</a></div></div>
    </article>`;

  // ---------- Galería ----------
  $("#gallery").innerHTML = C.galeria.map((g, i) => `<button data-i="${i}" aria-label="Ampliar foto: ${esc(g.alt)}"><img src="${esc(g.src)}" width="${g.w}" height="${g.h}" alt="${esc(g.alt)}" loading="lazy"></button>`).join("");
  const lb = $("#lb");
  $("#gallery").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (!b) return; const g = C.galeria[b.dataset.i]; $("img", lb).src = g.src; $("img", lb).alt = g.alt; lb.showModal(); });
  lb.addEventListener("click", () => lb.close());

  // ---------- Carrito ----------
  const cartEl = $("#cart"), scrim = $("#scrim");
  let lastFocus;
  function openCart() { lastFocus = document.activeElement; cartEl.classList.add("open"); cartEl.setAttribute("aria-hidden", "false"); scrim.hidden = false; document.body.style.overflow = "hidden"; $("#cartClose").focus(); }
  function closeCart() { cartEl.classList.remove("open"); cartEl.setAttribute("aria-hidden", "true"); scrim.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }
  $("#cartOpen").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  scrim.addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && cartEl.classList.contains("open")) closeCart(); });

  const lines = () => Object.entries(cart).map(([k, q]) => { const [id, i] = k.split("|"); const p = byId[id], o = p.opciones[+i]; return { k, p, o, q, sub: o.precio * q }; });
  const total = () => lines().reduce((s, l) => s + l.sub, 0);
  const lineName = l => l.p.nombre + (l.o.etiqueta ? ` (${l.o.etiqueta})` : "");

  function renderCart() {
    const ls = lines(), n = ls.reduce((s, l) => s + l.q, 0);
    const badge = $("#cartCount"); badge.hidden = !n; badge.textContent = n;
    $("#cartList").innerHTML = ls.map(l => `
      <li><div class="ci-name">${esc(l.p.nombre)}${l.o.etiqueta ? `<small>${esc(l.o.etiqueta)} · ${fmt(l.o.precio)}</small>` : `<small>${fmt(l.o.precio)} c/u</small>`}</div>
        <div class="qty"><button data-q="${l.k}|-1" aria-label="Quitar uno de ${esc(l.p.nombre)}">−</button><span>${l.q}</span><button data-q="${l.k}|1" aria-label="Sumar uno de ${esc(l.p.nombre)}">+</button></div>
        <div class="ci-sub">${fmt(l.sub)}</div></li>`).join("");
    $("#cartEmpty").hidden = n > 0; $("#ckForm").hidden = !n; $("#cartFoot").hidden = !n;
    $("#cartTotal").textContent = fmt(total());
    store(CART_KEY, cart);
  }
  function add(k, d) { cart[k] = (cart[k] || 0) + d; if (cart[k] <= 0) delete cart[k]; renderCart(); }
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-add]");
    if (a) { add(a.dataset.add, 1); $("#cartOpen").animate([{ transform: "scale(1)" }, { transform: "scale(1.2)" }, { transform: "scale(1)" }], { duration: 320 }); return; }
    const q = e.target.closest("[data-q]");
    if (q) { const [id, i, d] = q.dataset.q.split("|"); add(id + "|" + i, +d); }
  });

  $("#ckPago").innerHTML = C.pedidos.formasDePago.map(f => `<option>${esc(f)}</option>`).join("");
  $("#ckFecha").min = $("#encFecha").min = minDate();
  $("#envioNota").textContent = `${C.pedidos.envioZona}. ${C.pedidos.envioFuera} (se coordina por WhatsApp).`;
  const ck = $("#ckForm");
  ck.addEventListener("change", () => { $("#dirWrap").hidden = ck.entrega.value !== "Envío a domicilio"; });

  const showErr = (el, msg) => { el.textContent = msg; el.hidden = !msg; };
  $("#sendOrder").addEventListener("click", () => {
    const f = ck, err = $("#ckErr");
    const envio = f.entrega.value === "Envío a domicilio";
    if (!f.nombre.value.trim()) { showErr(err, "Decinos tu nombre así sabemos a quién entregarlo."); return f.nombre.focus(); }
    if (envio && !f.direccion.value.trim()) { showErr(err, "Falta la dirección de entrega."); return f.direccion.focus(); }
    if (!f.fecha.value || f.fecha.value < minDate()) { showErr(err, `Elegí una fecha con al menos ${C.pedidos.anticipacionDias} días de anticipación.`); return f.fecha.focus(); }
    showErr(err, "");
    const msg = [
      "¡Hola Bárbara! Quiero hacer este pedido:",
      ...lines().map(l => `• ${l.q}x ${lineName(l)} — ${fmt(l.sub)}`),
      `Total: ${fmt(total())}`,
      `Entrega: ${f.entrega.value}${envio ? ` (${C.pedidos.envioZona.toLowerCase()}; fuera de zona se coordina)` : ""}`,
      envio ? `Dirección: ${f.direccion.value.trim()}` : null,
      `Fecha: ${fechaAR(f.fecha.value)}`,
      `Nombre: ${f.nombre.value.trim()}`,
      `Pago: ${f.pago.value}`,
      f.notas.value.trim() ? `Aclaraciones: ${f.notas.value.trim()}` : null,
    ].filter(Boolean).join("\n");
    window.open(wa(msg), "_blank", "noopener");
  });

  // ---------- Encargos a medida ----------
  $("#encTipo").innerHTML = C.pedidos.tiposEncargo.map(t => `<option>${esc(t)}</option>`).join("");
  $("#encForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, err = $("#encErr");
    if (!f.nombre.value.trim()) { showErr(err, "Decinos tu nombre."); return f.nombre.focus(); }
    if (!f.fecha.value || f.fecha.value < minDate()) { showErr(err, `Elegí una fecha con al menos ${C.pedidos.anticipacionDias} días de anticipación.`); return f.fecha.focus(); }
    showErr(err, "");
    const msg = [
      "¡Hola Bárbara! Quiero pedirte un presupuesto:",
      `• Qué necesito: ${f.tipo.value}`,
      f.porciones.value ? `• Porciones: ${f.porciones.value}` : null,
      `• Fecha del evento: ${fechaAR(f.fecha.value)}`,
      f.sabor.value.trim() ? `• Sabores / relleno: ${f.sabor.value.trim()}` : null,
      f.detalle.value.trim() ? `• Detalles: ${f.detalle.value.trim()}` : null,
      `Nombre: ${f.nombre.value.trim()}`,
    ].filter(Boolean).join("\n");
    window.open(wa(msg), "_blank", "noopener");
  });

  // ---------- Animación de entrada ----------
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 }) : null;
  $$(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));

  renderTabs(); renderMenu(); renderCart();
})();
