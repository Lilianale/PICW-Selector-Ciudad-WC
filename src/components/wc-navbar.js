class WcNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --bg: #0b76ef;
          --bg-light: #e8f2ff;
          --text: #fff;
          --text-dark: #333;
          --radius: 6px;
          display: block;
          font-family: Arial, Helvetica, sans-serif;
        }

        nav {
          background: var(--bg);
          padding: 12px 18px;
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .link {
          color: var(--text);
          cursor: pointer;
          position: relative;
          font-size: 1rem;
          user-select: none;
        }

        .dropdown {
          position: absolute;
          top: 35px;
          left: 0;
          background: var(--text);
          color: var(--text-dark);
          min-width: 160px;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          padding: 6px 0;
          display: none;
          z-index: 1000;
        }

        .dropdown.open {
          display: block;
        }

        .dropdown-item {
          padding: 10px 15px;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background: var(--bg-light);
        }
      </style>

      <nav>
        <div class="link" data-dropdown="menu1">Menú 1 ▾
          <div class="dropdown" id="menu1">
            <div class="dropdown-item">Opción 1 A</div>
            <div class="dropdown-item">Opción 1 B</div>
            <div class="dropdown-item">Opción 1 C</div>
          </div>
        </div>

        <div class="link" data-dropdown="menu2">Menú 2 ▾
          <div class="dropdown" id="menu2">
            <div class="dropdown-item">Opción 2 A</div>
            <div class="dropdown-item">Opción 2 B</div>
          </div>
        </div>

        <div class="link" data-dropdown="menu3">Menú 3 ▾
          <div class="dropdown" id="menu3">
            <div class="dropdown-item">Opción 3 A</div>
            <div class="dropdown-item">Opción 3 B</div>
            <div class="dropdown-item">Opción 3 C</div>
          </div>
        </div>
      </nav>
    `;
  }

  connectedCallback() {
    const links = this.shadowRoot.querySelectorAll(".link");

    links.forEach(link => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("data-dropdown");
        const menu = this.shadowRoot.getElementById(id);

        // cerrar otros
        this.shadowRoot.querySelectorAll(".dropdown").forEach(d => {
          if (d !== menu) d.classList.remove("open");
        });

        // toggle
        menu.classList.toggle("open");
      });
    });

    // cerrar al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        this.shadowRoot.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
      }
    });
  }
}

customElements.define("wc-navbar", WcNavbar);
