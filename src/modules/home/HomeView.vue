<template>
  <div>
    <h2>Links</h2>
    <div v-for="enlace in enlaces.enlaces" :key="enlace.id">
      <h3>{{ enlace.titulo }}</h3>
      <p>
        {{ enlace.etiquetas && enlace.etiquetas[0] && enlace.etiquetas[0].etiqueta ? enlace.etiquetas[0].etiqueta.nombre : "Sin etiquetas" }}
      </p>
      <a :href="enlace.url" target="_blank"><strong>Url: </strong> {{ enlace.url }}</a><br>
      <button @click="details(enlace.id)">Ver Detalles</button>
    </div>
  </div>
</template>

<script>

import { fetchLink } from "../../services/apiFechs";

export default {
  name: "HomeView",
  data() {
    return {
      enlaces: [],
    };
  },
  methods: {
    async getLinks() {
      try{
      const data = await fetchLink();
      console.log({'josr': data });
      this.enlaces = data;
    }
      catch(error){
        console.error(error,'error al obtener los enlaces')
      }
    },
    details(Enlaceid) {
      this.$router.push({ name: "details", params: { id: Enlaceid } });
    },
  },
  mounted() {
    // Carga las etiquetas automáticamente cuando el componente se monta
    this.getLinks();
  },
};
</script>
