<template>
  <div>
    <h1>Enlaces Filtrados</h1>
    <p>ID del ítem: {{ id }}</p>
    <!-- Mostrar enlaces si se cargan -->
    <div v-if="enlaces.length">
      <h2>Enlaces:</h2>
      <ul>
        <div v-for="enlace in enlaces" :key="enlace.id">
            <a :href="enlace.url" target="_blank"><strong>Url: </strong> {{ enlace.url }}</a><br>
            <p><strong>Etiqueta</strong> {{ enlace.etiquetas[0]? enlace.etiquetas[0].nombre: "sin etiqueta" }}</p>
            <button @click="details(enlace.id)">Ver Detalles</button>
        </div>
        
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchLinkTag } from "../../services/apiFechs";

export default {
  data() {
    return {
      id: null, // Inicializamos id
      enlaces: [], // Inicializamos enlaces como un array vacío
    };
  },
  methods: {
    async fetchFilter(id) {
      try {
        const res = await fetchLinkTag(id); // Espera la respuesta de la API
        this.enlaces = res ? res.enlaces : []; // Asigna los enlaces a la variable
        console.log(res, "res");
      } catch (error) {
        console.error(error, "error al filtrar datos");
      }
    },
    details(Enlaceid) {
      this.$router.push({ name: "details", params: { id: Enlaceid } });
    },
  },
  created() {
    this.id = this.$route.params.id; // Asignamos el ID de los parámetros de la ruta
    this.fetchFilter(this.id); // Llamamos a la función fetchFilter
  },
  watch: {
    "$route.params.id"(nuevoId) {
      this.id = nuevoId; // Actualiza el ID cuando cambia la ruta
      this.fetchFilter(this.id); // Vuelve a obtener los enlaces cuando cambia el ID
    },
  },
};
</script>
