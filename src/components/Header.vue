<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/createLink">Crear Enlace</router-link></li>
      </ul>
    </nav>


    <!-- Mostrar las etiquetas cargadas -->
    <nav>
      <h3>Etiquetas:</h3>
      <ul>
        
        <li v-for="etiqueta in etiquetas.etiquetas" :key="etiqueta.id">
          <button @click="redirigirFilter(etiqueta.id)">{{ etiqueta.nombre }}</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { fetchTag } from "../services/apiFechs.js"; // Asegúrate de que esta función exista y funcione correctamente

export default {
  data() {
    return {
      etiquetas: [], // Aquí almacenaremos las etiquetas de la API
    };
  },
  methods: {
    // Redirige a la ruta con el ID de la etiqueta
    redirigirFilter(id) {
      this.$router.push({ name: 'filter', params: { id: id } });
    },

    // Función para cargar etiquetas desde la API
    async cargarEtiquetas() {
      try {
        const datos = await fetchTag(); // Llama a la función para traer las etiquetas
        this.etiquetas = datos; // Guarda los datos en el estado
      } catch (error) {
        console.error("Error al traer las etiquetas:", error);
      }
    },
  },

  mounted() {
    // Carga las etiquetas automáticamente cuando el componente se monta
    this.cargarEtiquetas();
  },
};
</script>

<style>
header {
  background-color: #f4f4f4;
  padding: 1em;
}
nav ul {
  display: flex;
  gap: 1em;
  list-style: none;
  padding: 0;
}
</style>
