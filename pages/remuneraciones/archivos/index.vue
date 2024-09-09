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
                        v-model="buscar" v-on:keyup="getDataPagina(1)" />
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-2 py-2 ms-auto">
                    <a v-if="user.rol_id == 1 || user.rol_id == 2" href="javascript:void(0);" class="cta"
                      @click="AbrirNuevo()">
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
          <div id="tabla" class="col-12">
            <div class="card">
              <div class="card-body">
                <table class="table">
                  <thead>
                    <th class="py-0 px-1">#</th>
                    <th class="py-0 px-1">Nombre</th>
                    <th class="py-0 px-1">Tipo Documento</th>
                    <th class="py-0 px-1"></th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.nombre }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.tipo_archivo.nombre }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button type="button" @click="localSelect(m.id), AbrirEditar()"
                          class="btn btn-success btn-sm py-1 px-2">
                          <i class="fa fa-archive"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
        </div>
      </div>
    </AdminTemplate>
  </div>
</template>

<script>

export default {
  name: "IndexPage",
  head() {
    return {
      title: this.apiUrl,
    };
  },
  data() {
    return {
      load: true,
      buscar: "",
      list: [],
      apiUrl: 'trabajadors',
      page: 'Configuracion',
      modulo: 'Trabajadores',
      url_documento: "/remuneraciones/archivos/template_edit",
      url_documento_new: "/remuneraciones/archivos/template_new",
      elementosPorPagina: 15,
      datosPaginados: [],
      paginaActual: 1,
      maxPaginasVisibles: 5,
      user: {}

    };
  },
  filters: {
    format_number: function (value) {
      return parseInt(value).toLocaleString("de-DE")

    },
    format_decimal: function (value) {
      return parseInt(value).toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

    }
  },
  computed: {
    listFilter() {
      let buscar = this.buscar
      if (buscar != '') {
        return this.list.filter((a) => {
          let nombre = a.nombre != null ? a.nombre : ''
          let rut = a.rut != null ? a.rut : ''
          return nombre.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || rut.toLowerCase().indexOf(buscar.toLowerCase()) != -1
        })

      }
      return this.list
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
    }
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res
    },
    localSelect(id) {
      if (!localStorage.getItem("selector")) {
        id = { sl_id: id };
        localStorage.setItem("selector", JSON.stringify(id));
        let dataStorage = JSON.parse(localStorage.getItem("selector"));
        localStorage.setItem("selector", JSON.stringify(dataStorage));
      } else {
        let dataStorage = JSON.parse(localStorage.getItem("selector"));
        dataStorage.sl_id = id;
        localStorage.setItem("selector", JSON.stringify(dataStorage));
      }
    },
    async AbrirEditar() {
      window.open(this.url_documento, "_self");
    },
    async AbrirNuevo() {
      window.open(this.url_documento_new, "_self");
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
    async EliminarItem(id) {
      this.load = true
      try {
        const res = await this.$api.$delete(this.apiUrl + "/" + id);
        console.log(res)
        await Promise.all([this.GET_DATA(this.apiUrl)]).then((v) => {
          this.list = v[0]
        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    trabajadorActualizar() {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('trabajadors/empresa?filtro=' + this.user.empresa_id + "&sucursal=" + this.user.sucursal_id)]).then((v) => {
            this.list = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
        this.getDataPagina(1);
      });
    },
    Eliminar(id) {
      let self = this
      this.$swal.fire({
        title: 'Deseas Eliminar?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: `Cancelar`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await self.EliminarItem(id)
          this.trabajadorActualizar()
          
        }
      })
    }
  },
  mounted() {
    let user = localStorage.getItem('userAuth')
    this.user = JSON.parse(user)
    this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA('templates/empresa?filtro=' + this.user.empresa_id)]).then((v) => {
          this.list = v[0]
        })
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
      this.getDataPagina(1);
    });
  },

};
</script>