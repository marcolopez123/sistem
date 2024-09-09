<template>
    <div>
        <AdminTemplate :page="page" :modulo="modulo">
            <div slot="body">
                <!-- Campo de entrada para el nombre del template -->
                <div class="row">
    <!-- Campo de entrada para el nombre del template -->
    <div class="form-group col-md-6">
        <label for="template-name">Nombre del Template:</label>
        <input id="template-name" type="text" v-model="nombre" placeholder="Ingrese el nombre del template"
            class="form-control" />
    </div>

    <!-- Campo para seleccionar el mes -->
    <div class="form-group col-md-6">
        <label for="mese-select">Mes</label>
        <select id="mese-select" class="form-control bg-transparent border-0 text-dark" v-model="tipo_archivo_id">
            <option value="" disabled selected>Seleccione Tipo Archivo</option>
            <option class="text-dark" v-for="m in tarchivos" :value="m.id">{{ m.nombre }}</option>
        </select>
    </div>
</div>

                <!-- Editor de TinyMCE con v-model para el contenido -->
                <Editor api-key="ihddyv6ex5o0135r5q51nzqwrwkida2r28gthjnkmhylnyg6" :init="editorConfig"
                    v-model="contenido" class="editor-custom-size" />

                <!-- Botón para guardar el template -->
                <button @click="Save()" class="btn btn-primary">Guardar</button>
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
            apiUrl: 'templates',
            template: [],
            tarchivos:[],
            tipo_archivo_id:'',
            nombre: '', // v-model para el nombre del template
            contenido: '', // v-model para el contenido del editor
            editorConfig: {
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
            const res = await this.$api.$get(path);
            return res;
        },
        async Save() {
            this.load = true;
            let self = this;
            try {
                const operacion = {
                    nombre: this.nombre,
                    contenido: this.contenido,
                    tipo_archivo_id: this.tipo_archivo_id,
                };
                const res = await this.$api.$post(this.apiUrl, operacion);
                console.log(res);
                this.$swal
                    .fire({
                        title: "Empresa Creada !",
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                    })
                    .then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {

                        }
                    });
            } catch (e) {
                console.log(e);
            } finally {
                this.load = false;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            let user = localStorage.getItem('userAuth');
            this.user = JSON.parse(user);
            this.$nextTick(async () => {
                this.load = true;
                try {
                    await Promise.all([
                        this.GET_DATA('templates'),
                        this.GET_DATA('tipoArchivos'),
                    ]).then((v) => {
                        this.templates = v[0];
                        this.tarchivos = v[1];
                    });
                } catch (e) {
                    // Manejo de errores
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