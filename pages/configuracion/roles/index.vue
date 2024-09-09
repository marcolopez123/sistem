<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-end">
          <div class="col-12">
            <div class="card bg-gradient-dark">
              <div class="card-header bg-transparent py-1 px-3">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-12">
                    <div class="input-group input-group-lg">
                      <span class="input-group-text text-white bg-transparent border-0">
                        <i class="ni ni-archive-2 text-lg" aria-hidden="true"></i>
                      </span>
                      <input type="text" class="form-control bg-transparent border-0 text-white" placeholder="Buscar..."
                        v-model="buscar" @keyup="getDataPagina(1)" />
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-2 py-2 ms-auto">
                    <a v-if="user.rol_id == 1 || user.rol_id == 2" href="javascript:void(0);" class="cta"
                      @click="abrirCrear()">
                      <span>Nuevo</span>
                      <svg width="13px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Tabla -->
          <div id="tabla" class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <thead>
                    <th class="py-0 px-1">#</th>
                    <th class="py-0 px-1">Nombre</th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados" :key="m.id">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.nombre }} {{ m.a_paterno }} {{ m.a_materno }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button type="button" @click="abrirEditar(m)" class="btn btn-info btn-sm py-1 px-2">
                            <i class="fas fa-pen"></i>
                          </button>
                          <button v-if="user.rol_id == 1" class="btn btn-success btn-sm py-1 px-2" type="button"
                            @click="abrirPermisos(m.id), permisoRoles(m.id)">
                            <i class="fa-solid fa-gear"></i>
                          </button>
                          <button type="button" @click="Eliminar(m.id)" class="btn btn-danger btn-sm py-1 px-2">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
               <!-- Paginador -->
               <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: paginaActual === 1 }">
                      <a class="page-link" href="javascript:void(0);" @click="irAPagina(1)">
                        <i class="fas fa-angle-double-left"></i>
                      </a>
                    </li>
                    <li class="page-item" :class="{ disabled: paginaActual === 1 }">
                      <a class="page-link" href="javascript:void(0);" @click="getPreviousPage()">
                        <i class="fas fa-angle-left"></i>
                      </a>
                    </li>

                    <li v-for="pagina in paginasVisibles" :key="pagina" :class="{ active: pagina === paginaActual }" class="page-item">
                      <a class="page-link" href="javascript:void(0);" @click="irAPagina(pagina)">
                        {{ pagina }}
                      </a>
                    </li>

                    <li class="page-item" :class="{ disabled: paginaActual === totalPaginas }">
                      <a class="page-link" href="javascript:void(0);" @click="getNextPage()">
                        <i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                    <li class="page-item" :class="{ disabled: paginaActual === totalPaginas }">
                      <a class="page-link" href="javascript:void(0);" @click="irAPagina(totalPaginas)">
                        <i class="fas fa-angle-double-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          <!-- Modal Ingreso -->
          <div class="modal fade" :class="modalIngreso ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">{{ titulo }}</h5>
                  <button type="button" class="btn-close text-dark" @click="cleanModal()" data-bs-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div slot="body" class="row">
                  <div class="form-group">
                    <label for="centro_id">Nombre</label>
                    <input type="text" v-model="nombre" class="form-control" id="centro_id">
                  </div>
                  <div class="modal-footer">
                    <button v-if="crear == 1" type="button" @click="modalIngreso = false; Save()"
                      class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                      Guardar
                    </button>
                    <button v-if="editar == 1" type="button" @click="modalIngreso = false; Update()"
                      class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Menu -->
          <div class="modal fade" :class="modalMenu ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">{{ titulo }}</h5>
                  <button type="button" class="btn-close text-dark" @click="modalMenu = false" data-bs-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="col-12">
                  <div class="card bg-gradient-dark">
                    <div class="card-header bg-transparent py-1 px-3">
                      <div class="row">
                        <div class="col-lg-7 col-md-7 col-7 d-flex align-items-center">
                          <div class="input-group input-group-lg">
                            <span class="input-group-text text-white bg-transparent border-0">
                              <i class="ni ni-archive-2 text-lg" aria-hidden="true"></i>
                            </span>
                            <input type="text" class="form-control bg-transparent border-0 text-white"
                              placeholder="Buscar..." v-model="buscar1" @keyup="getDataPagina2(1)" />
                          </div>
                        </div>
                        <div class="col-lg-5 col-md-5 col-5 d-flex align-items-center justify-content-end">
                          <a v-if="user.rol_id == 1 || user.rol_id == 2" href="javascript:void(0);" class="cta"
                            @click="abrirCrearMenu(); selectMenu()">
                            <span>Nuevo</span>
                            <svg width="5px" height="5px" viewBox="0 0 10 10">
                              <path d="M1,5 L11,5"></path>
                              <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="tabla" class="col-12">
                  <div class="card">
                    <div class="card-body">
                      <table class="table">
                        <thead>
                          <th class="py-0 px-1">#</th>
                          <th class="py-0 px-1">Nombre</th>
                        </thead>
                        <tbody>
                          <tr v-for="(m, i) in datosPaginados2" :key="m.id">
                            <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                            <td data-label="Nombre" class="py-0 px-1">{{ m.menu.nombre }}</td>
                            <td data-label="Acciones" class="py-0 px-1">
                              <div class="btn-group">
                                <button v-if="m.activo == 1" type="button" @click="Desactivar(m.id)" class="btn btn-success btn-sm py-1 px-2">
                                  Activo
                                </button>
                                <button v-if="m.activo == 0" type="button" @click="Activar(m.id)" class="btn btn-danger btn-sm py-1 px-2">
                                  Desactivado
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: paginaActual2 === 1 }">
                      <a class="page-link" href="javascript:void(0);" @click="irAPagina2(1)">
                        <i class="fas fa-angle-double-left"></i>
                      </a>
                    </li>
                    <li class="page-item" :class="{ disabled: paginaActual2 === 1 }">
                      <a class="page-link" href="javascript:void(0);" @click="getPreviousPage2()">
                        <i class="fas fa-angle-left"></i>
                      </a>
                    </li>
                    <li v-for="pagina in paginasVisibles2" :key="pagina" :class="{ active: pagina === paginaActual2 }" class="page-item">
                      <a class="page-link" href="javascript:void(0);" @click="irAPagina2(pagina)">
                        {{ pagina }}
                      </a>
                    </li>
                    <li class="page-item" :class="{ disabled: paginaActual2 === totalPaginas2 }">
                      <a class="page-link" href="javascript:void(0);" @click="getNextPage2()">
                        <i class="fas fa-angle-right"></i>
                      </a>
                    </li>
                    <li class="page-item" :class="{ disabled: paginaActual2 === totalPaginas2 }">
                      <a class="page-link" href="javascript:void(0);" @click="irAPagina2(totalPaginas2)">
                        <i class="fas fa-angle-double-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Selección -->
          <div class="modal fade" :class="modalSeleccion ? 'showModal' : ''" id="AjusteModal" tabindex="-1"
            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">{{ titulo }}</h5>
                  <button type="button" class="btn-close text-dark" @click="modalSeleccion = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div slot="body" class="row">
                  <div class="form-group col-6">
                    <label for="">Menu</label>
                    <v-select :options="menus" label="nombre" :reduce="menu => menu.id" v-model="menu_id"
                      class="form-control" placeholder="Buscar menú...">
                    </v-select>
                  </div>
                  <div class="modal-footer">
                    <button type="button" @click="modalSeleccion = false; SavePermiso()"
                      class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminTemplate>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import JcLoader from '../../../components/JcLoader.vue';

export default {
  name: "IndexPage",
  components: {
    JcLoader,
    'v-select': vSelect,
  },
  data() {
    return {
      load: true,
      modalIngreso: false,
      modalMenu: false,
      modalSeleccion: false,
      menus: [],
      list: [],
      list1: [],
      paises: [],
      regiones: [],
      comunas: [],
      ciudades: [],
      empresas: [],
      sucursales: [],
      sexos: [],
      nacionalidades: [],
      civiles: [],
      titulo: '',
      nombre: '',
      crear: '',
      editar: '',
      buscar: "",
      buscar1: "",
      apiUrl: 'roles',
      page: 'Configuracion',
      modulo: 'Trabajadores',
      url_ficha: "/configuracion/trabajadores/fichas/id",
      elementosPorPagina: 15,
      datosPaginados: [],
      paginaActual: 1,
      maxPaginasVisibles: 5,
      elementosPorPagina2: 5,
      datosPaginados2: [],
      paginaActual2: 1,
      maxPaginasVisibles2: 5,
      user: {},
      sl: {},
      isValidRUN: true
    };
  },
  filters: {
    format_number(value) {
      return parseInt(value).toLocaleString("de-DE")
    }
  },
  computed: {
    listFilter() {
      let buscar = this.buscar;
      if (buscar !== '') {
        return this.list.filter(a => a.nombre.toLowerCase().includes(buscar.toLowerCase()));
      }
      return this.list;
    },
    totalPaginas() {
      return Math.ceil(this.listFilter.length / this.elementosPorPagina);
    },
    paginasVisibles() {
      let inicio = Math.max(this.paginaActual - Math.floor(this.maxPaginasVisibles / 2), 1);
      let fin = Math.min(inicio + this.maxPaginasVisibles - 1, this.totalPaginas);

      if (fin - inicio < this.maxPaginasVisibles - 1) {
        inicio = Math.max(fin - this.maxPaginasVisibles + 1, 1);
      }

      let paginas = [];
      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }
      return paginas;
    },
    listFilter2() {
      let buscar1 = this.buscar1;
      if (buscar1 !== '') {
        return this.list1.filter(a => a.menu.nombre.toLowerCase().includes(buscar1.toLowerCase()));
      }
      return this.list1;
    },
    totalPaginas2() {
      return Math.ceil(this.listFilter2.length / this.elementosPorPagina2);
    },
    paginasVisibles2() {
      let inicio2 = Math.max(this.paginaActual2 - Math.floor(this.maxPaginasVisibles2 / 2), 1);
      let fin2 = Math.min(inicio2 + this.maxPaginasVisibles2 - 1, this.totalPaginas2);

      if (fin2 - inicio2 < this.maxPaginasVisibles2 - 1) {
        inicio2 = Math.max(fin2 - this.maxPaginasVisibles2 + 1, 1);
      }

      let paginas2 = [];
      for (let i = inicio2; i <= fin2; i++) {
        paginas2.push(i);
      }
      return paginas2;
    },
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    localSelect(id) {
      let dataStorage = JSON.parse(localStorage.getItem("selector")) || {};
      dataStorage.sl_id = id;
      localStorage.setItem("selector", JSON.stringify(dataStorage));
    },
    getDataPagina(noPagina) {
      this.paginaActual = noPagina;
      this.datosPaginados = [];
      let ini = (noPagina - 1) * this.elementosPorPagina;
      let fin = noPagina * this.elementosPorPagina;
      this.datosPaginados = this.listFilter.slice(ini, fin);
    },
    getPreviousPage() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
      this.getDataPagina(this.paginaActual);
    },
    getNextPage() {
      if (this.paginaActual < this.totalPaginas) {
        this.paginaActual++;
      }
      this.getDataPagina(this.paginaActual);
    },
    irAPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.getDataPagina(pagina);
      }
    },
    getDataPagina2(noPagina2) {
      this.paginaActual2 = noPagina2;
      this.datosPaginados2 = [];
      let ini2 = (noPagina2 - 1) * this.elementosPorPagina2;
      let fin2 = noPagina2 * this.elementosPorPagina2;
      this.datosPaginados2 = this.listFilter2.slice(ini2, fin2);
    },
    getPreviousPage2() {
      if (this.paginaActual2 > 1) {
        this.paginaActual2--;
      }
      this.getDataPagina2(this.paginaActual2);
    },
    getNextPage2() {
      if (this.paginaActual2 < this.totalPaginas2) {
        this.paginaActual2++;
      }
      this.getDataPagina2(this.paginaActual2);
    },
    irAPagina2(pagina2) {
      if (pagina2 >= 1 && pagina2 <= this.totalPaginas2) {
        this.getDataPagina2(pagina2);
      }
    },
    async EliminarItem(id) {
      this.load = true;
      try {
        await this.$api.$delete(this.apiUrl + "/" + id);
        this.archivoActualizar();
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    abrirCrear() {
      this.modalIngreso = true;
      this.titulo = 'Crear Rol';
      this.crear = 1;
      this.editar = 0;
    },
    abrirPermisos(id) {
      this.modalMenu = true;
      this.titulo = 'Crear Rol';
      this.id = id;
      this.editar = 0;
    },
    async Save() {
      this.load = true;
      try {
        const operacion = { nombre: this.nombre };
        await this.$api.$post(this.apiUrl, operacion);
        this.$swal.fire({
          title: "Trabajador Creado!",
          confirmButtonText: "Ok",
        }).then(result => {
          if (result.isConfirmed) {
            this.archivoActualizar();
            this.cleanModal();
          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    async SavePermiso() {
      this.load = true;
      try {
        const operacion = { role_id: this.id, menu_id: this.menu_id, activo: 1 };
        await this.$api.$post('tPermRoles', operacion);
        this.$swal.fire({
          title: "Menú agregado!",
          confirmButtonText: "Ok",
        }).then(result => {
          if (result.isConfirmed) {
            this.permisoRoles(this.id);
          }
        });
      } catch (e) {
        console.error(e); // Imprimir el error completo para revisar en la consola

        if (e.response && e.response.data) {
          const errorMessage = e.response.data.message || 'Elemento ya existe';
          if (e.response.status === 409) {
            // Error de entrada duplicada
            this.$swal.fire({
              title: "Elemento ya existe",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "Ok"
            });
          } else {
            // Mostrar otros mensajes de error si no es "Duplicate entry"
            this.$swal.fire({
              title: "Error",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "Ok"
            });
          }
        } else {
          // Error inesperado o de red
          this.$swal.fire({
            title: "Error",
            text: "Ocurrió un error inesperado al agregar el menú.",
            icon: "error",
            confirmButtonText: "Ok"
          });
        }
      } finally {
        this.load = false;
      }
    },
    abrirCrearMenu(m) {
      this.modalSeleccion = true;
      this.nombre = this.id
    },
    abrirEditar(m) {
      this.modalIngreso = true;
      this.titulo = 'Actualizar Rol';
      this.id = m.id;
      this.nombre = m.nombre;
      this.crear = 0;
      this.editar = 1;
    },
    async Update() {
      this.load = true;
      try {
        await this.$api.$put(this.apiUrl + "/" + this.id, {
          nombre: this.nombre,
          id: this.id,
        });
        this.$swal.fire({
          title: 'Trabajador Actualizado',
          confirmButtonText: 'Ok',
        }).then(result => {
          if (result.isConfirmed) {
            this.archivoActualizar();
            this.cleanModal();
          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    async Desactivar(id) {
      this.load = true;
      try {
        await this.$api.$put('tPermRoles' + "/" + id, {
          activo: 0,
          id: id,
        });
        this.$swal.fire({
          title: 'Menú Desactivado',
          confirmButtonText: 'Ok',
        }).then(result => {
          if (result.isConfirmed) {
            this.permisoRoles(this.id);

          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    async Activar(id) {
      this.load = true;
      try {
        await this.$api.$put('tPermRoles' + "/" + id, {
          activo: 1,
          id: id,
        });
        this.$swal.fire({
          title: 'Menú Activado',
          confirmButtonText: 'Ok',
        }).then(result => {
          if (result.isConfirmed) {
            this.permisoRoles(this.id);

          }
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    archivoActualizar() {
      this.$nextTick(async () => {
        try {
          const response = await this.GET_DATA('roles');
          this.list = response;
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false;
        }
        this.getDataPagina(1);
      });
    },
    permisoRoles(id) {
      this.$nextTick(async () => {
        try {
          const response = await this.GET_DATA(`tPermRoles/filtro?filtro=${id}`);
          this.list1 = response;
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false;
        }
        this.getDataPagina2(1);
      });
    },
    selectMenu() {
      this.$nextTick(async () => {
        try {
          const response = await this.GET_DATA('menus');
          this.menus = response;
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false;
        }
      });
    },
    cleanModal() {
      this.modalIngreso = false;
      this.id = '';
      this.nombre = '';
    },
    Eliminar(id) {
      this.$swal.fire({
        title: 'Deseas Eliminar?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.EliminarItem(id);
        }
      });
    }
  },
  mounted() {
    let user = localStorage.getItem('userAuth');
    this.user = JSON.parse(user);
    this.selectMenu();  // Asegúrate de cargar el menú aquí
    this.$nextTick(async () => {
      try {
        const response = await this.GET_DATA('roles');
        this.list = response;
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
      this.getDataPagina(1);
    });
  }
};
</script>

<style>
.showModal {
  visibility: visible;
  display: block;
  opacity: 1 !important;
}

.modalPersonalizado {
  margin-top: 10rem;
}

.button_slide {
  color: #052c65;
  border: 2px solid #052c65;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px 20px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #052c65;
  transition: ease-out 0.4s;
}

.slide_down:hover {
  box-shadow: inset 0 100px 0 0 #052c65;
  color: #fff;
}

.slide_right:hover {
  box-shadow: inset 400px 0 0 0 #052c65;
  color: #fff;
}

.slide_left:hover {
  box-shadow: inset 0 0 0 50px #052c65;
  color: #fff;
}

.slide_diagonal:hover {
  box-shadow: inset 400px 50px 0 0 #052c65;
  color: #fff;
}

#outer {
  width: 364px;
  margin: 50px auto 0 auto;
  text-align: center;
}
</style>
