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
                      @click="[modalIngreso = true]">
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
                    <th class="py-0 px-1">Periodo</th>
                    <th class="py-0 px-1">Rut</th>
                    <th class="py-0 px-1">Acciones</th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.t_periodo.nombre }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <div class="btn-group">
                          <button type="button" @click="modalProcesar = true, libroDetalleProcesar(m.id)"
                            class="btn btn-info btn-sm py-1 px-2">
                            <i class="fas fa-pen"></i>
                          </button>
                          <button v-if="user.rol_id == 1" class="btn btn-success btn-sm py-1 px-2" type="button"
                          @click="updateAllLibros">
                            <i class="fas fa-image"></i>
                          </button>
                          <button type="button" @click="localSelect(m.id), AbrirFicha()"
                            class="btn btn-dark btn-sm py-1 px-2">
                            <i class="fa fa-user"></i>
                          </button>
                          <button type="button" @click="Eliminar(m.id)" class="btn btn-danger btn-sm py-1 px-2">
                            <i class="fas fa-trash"></i>
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
          <div class="modal fade" :class="modalProcesar ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content p-3">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Editar artículo
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalProcesar = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <template>

                  <div class="col-lg-12 col-md-12 py-2 ms-auto">
                    <a v-if="user.rol_id == 1 || user.rol_id == 2" href="javascript:void(0);" class="cta"
                    @click="updateAllLibros">
                      <span>Nuevo</span>
                      <svg width="13px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </a>
                  </div>
                  <div>
                    <div v-if="load" class="progress mt-2">
                      <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
                        {{ Math.round(progress) }}%
                      </div>
                    </div>
                  </div>
                </template>
                <div class="modal-footer">
                  <button type="button" @click="modalProcesar = false"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Cerrar
                  </button>
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
import JcLoader from '../../../components/JcLoader.vue';
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
      modalIngreso: false,
      modalEditar: false,
      modalProcesar: false,
      list: [],
      paises: [],
      regiones: [],
      comunas: [],
      ciudades: [],
      empresas: [],
      sucursales: [],
      sexos: [],
      nacionalidades: [],
      civiles: [],
      dlibros:[],
      nombre: '',
      a_paterno: '',
      a_materno: '',
      id: '',
      rut: '',
      pais_id: '',
      region_id: '',
      comuna_id: '',
      empresa_id: '',
      sucursal_id: '',
      ciudad_id: '',
      t_sexo_id: '',
      t_nacionalidade_id: '',
      t_estado_civile_id: '',
      direccion: '',
      e_personal: '',
      e_institucional: '',
      t_personal: '',
      t_emergencia: '',
      buscar: "",
      apiUrl: 'trabajadors',
      page: 'Configuracion',
      modulo: 'Trabajadores',
      url_ficha: "/configuracion/trabajadores/fichas/id",
      elementosPorPagina: 15,
      datosPaginados: [],
      paginaActual: 1,
      maxPaginasVisibles: 5,
      user: {},
      sl: {},
      isValidRUN: true
    };
  },
  filters: {
    format_number: function (value) {
      return parseInt(value).toLocaleString("de-DE")
    }
  },
  computed: {
    listFilter() {
      let buscar = this.buscar
      if (buscar != '') {
        return this.list.filter((a) => {
          let nombre = a.nombre != null ? a.nombre : ''
          return nombre.toLowerCase().indexOf(buscar.toLowerCase()) != -1
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
    formatRUT(rut) {
      if (!rut) return '';
      rut = rut.replace(/^0+/, '');
      if (rut.length <= 1) return rut;

      const body = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      const dv = rut.slice(-1).toUpperCase();
      return `${body}-${dv}`;
    },
    cleanRUT(rut) {
      return rut.replace(/[^0-9kK]/g, '').toUpperCase();
    },
    validateRUN() {
      const cleanedRUN = this.cleanRUT(this.rut);
      if (cleanedRUN.length < 2) {
        this.isValidRUN = false;
        return;
      }

      const digits = cleanedRUN.slice(0, -1);
      const checkDigit = cleanedRUN.slice(-1);

      if (!/^\d+$/.test(digits)) {
        this.isValidRUN = false;
        return;
      }

      let sum = 0;
      let multiplier = 2;
      for (let i = digits.length - 1; i >= 0; i--) {
        sum += parseInt(digits[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
      }

      const remainder = 11 - (sum % 11);
      const computedCheckDigit = remainder === 11 ? '0' : remainder === 10 ? 'K' : remainder.toString();

      this.isValidRUN = computedCheckDigit === checkDigit;

      // Formatear el RUN
      if (this.isValidRUN) {
        this.rut = this.formatRUT(cleanedRUN);
      }
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
    async Save() {
      this.load = true
      let self = this
      try {
        const operacion = {
          nombre: this.nombre,
        }
        const res = await this.$api.$post(this.apiUrl, operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Trabajador Creado !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.archivoActualizar()
              this.cleanModal()
            }
          });

      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    async Update(dlibros) {
      this.load = true;
      try {
        const res = await this.$api.$put('rDetalleLibros/' + dlibros.id, {
          'sbase': dlibros.sbase,
          's_base': (dlibros.t_periodo_trabajadore.sbase / dlibros.t_periodo_trabajadore.d_mes) * (dlibros.t_periodo_trabajadore.d_mes - dlibros.d_no_trabajados),
          'd_trabajados': dlibros.t_periodo_trabajadore.d_mes - dlibros.d_no_trabajados - dlibros.d_n_t_p,
          'f_grat': dlibros.t_periodo_trabajadore.f_grat,
          'p_p_trab': dlibros.t_periodo_trabajadore.t_p_previsione.p_trab,
          'p_p_adm': dlibros.t_periodo_trabajadore.t_p_previsione.p_adm,
          'sis': dlibros.t_periodo_trabajadore.t_p_previsione.sis,
        });
        console.log(res);
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
    },
    async updateAllLibros() {
      this.load = true;
      this.progress = 0; // Reinicia el progreso
      try {
        const totalLibros = this.dlibros.length;
        for (let i = 0; i < totalLibros; i++) {
          await this.Update(this.dlibros[i]);
          this.progress = ((i + 1) / totalLibros) * 100;
        }
        this.$swal.fire({
          title: 'Proceso Ok',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
        this.progress = 0; // Reinicia el progreso al finalizar
      }
    },
    libroDetalleProcesar(id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('rDetalleLibros/filtro?filtro=' + id)]).then((v) => {
            this.dlibros = v[0];
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
        }
      })
    }

  },
  mounted() {
    let user = localStorage.getItem('userAuth')
    this.user = JSON.parse(user)
    Dropzone.autoDiscover = false;
    let self = this;
    this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA('rLibros/filtro?filtro=' + this.user.empresa_id + "&filtro2=" + this.user.sucursal_id),
                          ]).then((v) => {
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
  components: { JcLoader }
};
</script>
<style>
.showModal {
  visibility: visible;
  display: block;
  opacity: 1 !important;
}
</style>
<style>
.modalPersonalizado {

  margin-top: 10rem;
  
}



</style>

<style>
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
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}

.slide_down:hover {
  box-shadow: inset 0 100px 0 0 #052c65;
  color: #fff;
}

.slide_right:hover {
  box-shadow: inset 400px 0 0 0  #052c65;
  color: #fff;
}

.slide_left:hover {
  box-shadow: inset 0 0 0 50px  #052c65;
  color: #fff;
}

.slide_diagonal:hover {
  box-shadow: inset 400px 50px 0 0  #052c65;
  color: #fff;
}

#outer {
  width: 364px;
  margin: 50px auto 0 auto;
  text-align: center;
}
</style>
