<template>
    <div>
        <AdminTemplate :page="page" :modulo="modulo">
            <div slot="body">
                <!-- Mostrar el nombre actual del template -->
                {{ templates.nombre }}
                
                <!-- Campo de entrada para el nombre del template -->
                <div class="form-group">
                    <label for="template-name">Nombre del Template:</label>
                    <input id="template-name" type="text" v-model="nombre" placeholder="Ingrese el nombre del template"
                        class="form-control" />
                </div>

                <!-- Editor de TinyMCE con v-model para el contenido -->
                <Editor api-key="ihddyv6ex5o0135r5q51nzqwrwkida2r28gthjnkmhylnyg6" :init="editorConfig"
                    v-model="contenido" class="editor-custom-size" />

                <!-- Botón para guardar el template -->
                <button @click="Update()" class="btn btn-primary">Guardar</button>
            </div>
        </AdminTemplate>

        <AdminTemplate v-if="user.tipo == 2" :page="page" :modulo="modulo">
            <div slot="body">
                <div v-if="user.tipo == 1" class="row">
                    <!-- Contenido adicional puede ir aquí -->
                </div>
            </div>
        </AdminTemplate>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';

export default {
    name: "IndexPage",
    components: {
        Editor
    },
    head() {
        return {
            title: "Index",
        };
    },
    data() {
        return {
            user: {},
            page: 'Dashboard',
            modulo: 'Dashboard',
            apiUrl: 'templates/id?filtro=',
            templates: [],
            sl: {},
            nombre: '', // v-model para el nombre del template
            contenido: '', // v-model para el contenido del editor
            editorConfig: {
                language: 'es', // Cambiar el idioma a español
                language_url: '/langs/es.js', // URL del archivo de idioma en español
                toolbar_mode: 'sliding',
                plugins: [
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                ],
                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            }
        };
    },
    filters: {
        format_number: function (value) {
            return parseInt(value).toLocaleString("de-DE");
        }
    },
    methods: {
        async GET_DATA(path) {
            try {
                const res = await this.$api.$get(path);
                return res;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async Update() {
      this.load = true
      try {
        const res = await this.$api.$put('templates' + "/" + this.sl.sl_id, {
          'nombre': this.nombre,
          'contenido': this.contenido,
        });
        console.log(res)
        this.$swal.fire({
          title: 'Template Actualizado',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
          }
        })
      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    },
    mounted() {
        this.$nextTick(() => {
            let user = localStorage.getItem('userAuth');
            this.user = JSON.parse(user);
            let sl = localStorage.getItem('selector');
            this.sl = JSON.parse(sl);
            
            this.$nextTick(async () => {
                this.load = true;
                try {
                    const result = await this.GET_DATA(this.apiUrl + this.sl.sl_id);
                    this.templates = result;

                    // Asignar los datos obtenidos a los v-model
                    if (this.templates && this.templates.length > 0) {
                        this.nombre = this.templates[0].nombre;
                        this.contenido = this.templates[0].contenido;
                    }
                } catch (e) {
                    console.log("Error al obtener los datos:", e);
                } finally {
                    this.load = false;
                }
            });
        });
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
}

.btn {
    margin-top: 10px;
}

.editor-custom-size {
  width: 100%; /* Ajusta el ancho según tus necesidades */
  height: 500px; /* Ajusta la altura según tus necesidades */
  max-width: 100%; /* Asegúrate de que el editor no exceda el contenedor */
  max-height: 600px; /* Define una altura máxima para el editor */
  min-height: 300px; /* Define una altura mínima para el editor */
}
</style>
