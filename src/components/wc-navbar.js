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
          box-shadow: 0 4px 12px
