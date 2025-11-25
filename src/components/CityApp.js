export class CityApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <city-selector id="cs" placeholder="Ingresa ciudad"></city-selector>
      <div id="cards-container">
      </div>
      <city-info id="city-info-placeholder"></city-info> 
    `;
    // 1. Estado Interno: Lista de ciudades seleccionadas
    this._selectedCities = [];
    this.$cardsContainer = this.shadowRoot.querySelector('#cards-container');

    // 3. Escuchar el evento de eliminación aquí (es más limpio)
    this.shadowRoot.addEventListener('city-removed', this._handleCityRemoved.bind(this));
  }

  connectedCallback() {
    // Datos DEMO CitySelector
    requestAnimationFrame(() => {
      this._inicializarComponentes();
    });

  }

  _inicializarComponentes() {
    const cities = [
      // Añadimos datos más ricos para probar CityInfo
      {
        name: 'Manta',
        country: 'Ecuador',
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/MANTA_%2817427130779%29.jpg', // Ejemplo de URL de imagen
        tag: 'Costa',
        description: 'Principal puerto pesquero y destino turístico de playa. Conocida como la puerta del Pacífico.',
        population: 250, // en miles
        altitude: 6, // en metros
        temperature: '24-30' // en °C
      },
      {
        name: 'Quito',
        country: 'Ecuador',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Quito_desde_el_Panecillo_2018-02-18.jpg/1200px-Quito_desde_el_Panecillo_2018-02-18.jpg',
        tag: 'Sierra',
        description: 'Capital de Ecuador, conocida por su centro histórico colonial.',
        population: 1800,
        altitude: 2850,
        temperature: '10-25'
      },
      {
        name: 'Guayaquil',
        country: 'Ecuador',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Guayaquil_-_Ecuador_-_panoramio_%287%29.jpg/1200px-Guayaquil_-_Ecuador_-_panoramio_%287%29.jpg',
        tag: 'Costa',
        description: 'La ciudad más grande y poblada de Ecuador, un importante centro comercial.',
        population: 2800,
        altitude: 4,
        temperature: '25-31'
      },
      // ... otros
      'Ambato', 'Loja', 'Salinas',
      { name: 'New York', country: 'USA', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_York_City_by_David_Shankbone.jpg/1200px-New_York_City_by_David_Shankbone.jpg', tag: 'Metrópolis', description: 'Una de las ciudades más importantes del mundo.', population: 8400, altitude: 10, temperature: '0-30' },
      { name: 'Madrid', country: 'Spain', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Puerta_del_Sol_%28Madrid%29_01.jpg/1200px-Puerta_del_Sol_%28Madrid%29_01.jpg', tag: 'Capital', description: 'Capital de España, famosa por su vida cultural y museos.', population: 3300, altitude: 667, temperature: '5-35' }
    ];

    // 2. OBTENER EL ELEMENTO HIJO USANDO shadowRoot
    const citySelector = this.shadowRoot.querySelector('#cs');
    const cityInfo = this.shadowRoot.querySelector('city-info');

    // a) Pasar la lista de ciudades
    if (citySelector) {
      citySelector.cities = cities; // Asignamos la propiedad pública 'cities'

      // b) Escuchar el evento 'city-selected' (Lógica Principal)
      citySelector.addEventListener('city-selected', (ev) => {
        console.log('Ciudad Seleccionada desde CityApp:', ev.detail.name);
        const dataAEnviar = ev.detail.original || ev.detail.name;

        // Usamos el setter que definimos en CityInfo.js
        cityInfo.nombreCiudad = dataAEnviar;

        // El CitySelector debería emitir ev.detail.original con el objeto completo.
        if (ev.detail.original) {
          cityInfo.cityData = ev.detail.original;
        }
        else if (typeof ev.detail.name === 'string') {
          // En caso de que solo llegue el nombre (ej. si el item original era un string simple)
          // Se podría buscar la información completa en 'cities' o una API.
          // Por ahora, simplemente pasar el nombre.
          cityInfo.cityData = { name: ev.detail.name };
        }
        // Evitar duplicados (opcional, basado en 'name')
        if (cityData && !this._selectedCities.some(c => c.name === cityData.name)) {

          // 1. Agregar a la listita interna
          this._selectedCities.push(cityData);

          // 2. Volver a renderizar
          this._renderCards();
        }
      });

      // c) Escuchar 'city-typing' (Opcional)
      citySelector.addEventListener('city-typing', (e) => {
        // Lógica para búsqueda remota si la lista fuera muy grande
        console.log('El usuario está escribiendo:', e.detail.query);
      });
    }
  }
  _renderCards() {
    // 1. Limpiamos el contenido anterior
    this.$cardsContainer.innerHTML = '';

    // 2. Iteramos sobre el estado y creamos los componentes
    this._selectedCities.forEach((city) => {
      const card = document.createElement('city-info');

      // Asignamos los datos a la nueva instancia
      card.cityData = city;

      // 3. Añadimos el componente al contenedor
      this.$cardsContainer.appendChild(card);
    });
  }
  // CityApp.js - Método _handleCityRemoved()
  // Añadir este método después de _renderCards()

  _handleCityRemoved(e) {
    // El evento viene del Shadow Root, contiene el nombre a eliminar
    const cityName = e.detail.cityName;

    // 1. Filtramos el array, dejando solo las ciudades que NO coinciden con el nombre
    this._selectedCities = this._selectedCities.filter(c => c.name !== cityName);

    // 2. Volvemos a renderizar toda la lista con el nuevo estado
    this._renderCards();
  }

}

customElements.define('city-app', CityApp);
