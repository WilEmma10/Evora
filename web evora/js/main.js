/* ==========================================================================
   ÉVORA - SISTEMA DE INTERACTIVIDAD & EXPERIENCIA VIP (JavaScript)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. EFECTO EN BARRA DE NAVEGACIÓN (STICKY NAVBAR SCROLL)
       ---------------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.style.padding = '14px 64px';
                navbar.style.background = 'rgba(250, 248, 244, 0.98)';
                navbar.style.boxShadow = '0 10px 35px rgba(11, 19, 32, 0.12)';
            } else {
                navbar.style.padding = '22px 64px';
                navbar.style.background = 'rgba(250, 248, 244, 0.96)';
                navbar.style.boxShadow = '0 8px 32px rgba(11, 19, 32, 0.08)';
            }
        });
    }

    /* ----------------------------------------------------------------------
       2. ANIMACIÓN DE APARICIÓN SUAVE AL HACER SCROLL (SCROLL REVEAL)
       ---------------------------------------------------------------------- */
    const elementosAnimados = document.querySelectorAll(
        '.tarjeta-caracteristica, .tarjeta-servicio, .seccion-hero, .encabezado-seccion, .imagen-tarjeta'
    );

    const observadorOpciones = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observador = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animación ejecutada una sola vez
            }
        });
    }, observadorOpciones);

    elementosAnimados.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(35px)';
        el.style.transition = 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)';
        observador.observe(el);
    });

    /* ----------------------------------------------------------------------
       3. FILTRO INTERACTIVO PARA LA GALERÍA Y PORTAFOLIO
       ---------------------------------------------------------------------- */
    const botonesFiltro = document.querySelectorAll('.boton-filtro, [data-filtro]');
    const tarjetasGaleria = document.querySelectorAll('.tarjeta-servicio');

    if (botonesFiltro.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', () => {
                // Remover clase activa de todos los botones
                botonesFiltro.forEach(b => b.classList.remove('activo'));
                boton.classList.add('activo');

                const categoria = boton.getAttribute('data-filtro');

                tarjetasGaleria.forEach(tarjeta => {
                    const categoriaTarjeta = tarjeta.getAttribute('data-categoria');

                    if (categoria === 'todos' || categoriaTarjeta === categoria) {
                        tarjeta.style.display = 'block';
                        setTimeout(() => {
                            tarjeta.style.opacity = '1';
                            tarjeta.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        tarjeta.style.opacity = '0';
                        tarjeta.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            tarjeta.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /* ----------------------------------------------------------------------
       4. MODAL VIP DE SOLICITUD DE COTIZACIÓN
       ---------------------------------------------------------------------- */
    // Crear el modal dinámicamente en el DOM
    const crearModalCotizacion = () => {
        const modalHTML = `
            <div id="modalCotizacion" style="
                display: none;
                position: fixed;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background: rgba(11, 19, 32, 0.85);
                backdrop-filter: blur(12px);
                z-index: 10000;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 400ms ease;
            ">
                <div style="
                    background: #FAF8F4;
                    border: 2px solid #D4B483;
                    border-radius: 20px;
                    padding: 48px;
                    max-width: 520px;
                    width: 90%;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.4);
                    position: relative;
                    font-family: 'Inter', sans-serif;
                ">
                    <button id="cerrarModal" style="
                        position: absolute;
                        top: 20px; right: 24px;
                        background: none;
                        border: none;
                        font-size: 28px;
                        color: #0B1320;
                        cursor: pointer;
                    ">&times;</button>
                    
                    <span style="
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        letter-spacing: 4px;
                        color: #C09D66;
                        font-weight: 700;
                        display: block;
                        text-align: center;
                        margin-bottom: 8px;
                    ">ÉVORA Concierge VIP</span>

                    <h3 style="
                        font-family: 'Cormorant Garamond', serif;
                        font-size: 2.4rem;
                        color: #0B1320;
                        text-align: center;
                        margin-bottom: 24px;
                    ">Diseñemos Tu Evento</h3>

                    <form id="formCotizacion" onsubmit="event.preventDefault(); procesarCotizacion();">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #1E293B; margin-bottom: 6px;">Nombre Completo</label>
                            <input type="text" required placeholder="Tu nombre..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1.5px solid #D4B483; outline: none;">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #1E293B; margin-bottom: 6px;">Correo Electrónico</label>
                            <input type="email" required placeholder="correo@ejemplo.com" style="width: 100%; padding: 12px; border-radius: 8px; border: 1.5px solid #D4B483; outline: none;">
                        </div>
                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #1E293B; margin-bottom: 6px;">Tipo de Celebración</label>
                            <select style="width: 100%; padding: 12px; border-radius: 8px; border: 1.5px solid #D4B483; outline: none; background: #fff;">
                                <option>Boda de Destino</option>
                                <option>Boda Exclusiva</option>
                                <option>Gala / Evento Corporativo</option>
                                <option>Celebración Privada</option>
                            </select>
                        </div>
                        <button type="submit" class="boton-primario" style="width: 100%; border: none; font-size: 0.9rem;">
                            SOLICITAR ASESORÍA VIP
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    };

    crearModalCotizacion();

    // Abrir modal con los botones principales
    const modal = document.getElementById('modalCotizacion');
    const botonesCotizar = document.querySelectorAll('.boton-primario, .boton-secundario');

    botonesCotizar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const textoBtn = boton.textContent.toLowerCase();
            // Abrir modal si el botón dice cotizar o reservar
            if (textoBtn.includes('cotizar') || textoBtn.includes('solicitar') || textoBtn.includes('paquetes')) {
                e.preventDefault();
                modal.style.display = 'flex';
                setTimeout(() => { modal.style.opacity = '1'; }, 10);
            }
        });
    });

    // Cerrar modal
    document.getElementById('cerrarModal')?.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => { modal.style.display = 'none'; }, 400);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => { modal.style.display = 'none'; }, 400);
        }
    });

});

// Función de confirmación al enviar
function procesarCotizacion() {
    const modal = document.getElementById('modalCotizacion');
    alert('✨ ¡Gracias por confiar en ÉVORA! Un Planner Concierge se pondrá en contacto contigo muy pronto.');
    modal.style.opacity = '0';
    setTimeout(() => { modal.style.display = 'none'; }, 400);
}