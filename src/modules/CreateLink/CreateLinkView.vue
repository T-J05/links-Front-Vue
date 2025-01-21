<template>
  <div>
    <h1>Formulario de ejemplo</h1>
    <form @submit.prevent="procesarFormulario">
      <!-- Campo de texto -->
      <div>
        <label for="titulo">Titulo:</label><br>
        <input type="text" id="titulo" v-model="formulario.titulo" required />
      </div>

      <!-- Campo de correo -->
      <div>
        <label for="url">Url </label><br>
        <input type="url" id="url" v-model="formulario.url" required />
      </div>

      <div>
        <label for="descripcion">Descripcion</label><br>
        <textarea rows="3" cols="15" id="descripcion" v-model="formulario.descripcion" required ></textarea>
      </div>

      <!-- Campo de selección -->
      <div>
        <label for="opcion">Etiqueta:</label>
          <select id="opcion" v-model="formulario.etiquetas.nombre">
            <option v-for="etiqueta in etiquetas.etiquetas" :key="etiqueta.id" :value="etiqueta.nombre">
              {{ etiqueta.nombre }}
            </option>
          </select>
      </div>

      <button type="submit">Enviar</button>
    </form>

    <!-- Mostrar los datos enviados -->
    <div v-if="datosEnviados">
      <h2>Datos enviados:</h2>
      <pre>{{ formulario }}</pre>
    </div>
  </div>
</template>

<script>
import { fetchTag, fetchLinkSend } from '../../services/apiFechs';

export default {
  data() {
    return {
      etiquetas : [],
      formulario: {
        titulo: "",
        url: "",
        descripcion: '',
        etiquetas: {nombre: ''},
      },
      datosEnviados: false, // Para mostrar los datos enviados
    };
  },
  methods: {
   async procesarFormulario() {
       try {
        let res = await fetchLinkSend(this.formulario)
        console.log('res',res)
        alert("Enlace Creado con Exito")
        setTimeout(()=>{
          this.$router.push({ name: 'Home'});
        },1500)
        // this.datosEnviados = true; en desarrollo activar para depuracion
       } catch (error) {
        console.error('Error al crear el formulario')
        alert("Error al crear el enlace")
       }
        
        console.log("Formulario enviado:", this.formulario);
    },
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
form {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

form div{
  display: flex;
  flex-direction: column;
  
}
label {
  font-weight: bold;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
