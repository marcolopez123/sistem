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
                    <th class="py-0 px-1">Colaborador</th>
                    <th class="py-0 px-1">Fecha</th>
                    <th class="py-0 px-1">Punto Control</th>
                    <th class="py-0 px-1">Latitud</th>
                    <th class="py-0 px-1">Longitud</th>
                    <th class="py-0 px-1">Acciones</th>
                  </thead>
                  <tbody>
                    <tr v-for="(m, i) in datosPaginados" :key="i">
                      <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                      <td data-label="Nombre" class="py-0 px-1">{{ m.trabajador.nombre }}</td>
                      <td data-label="Fecha" class="py-0 px-1">{{ formatearHora(m.fecha_hora) }}</td>
                      <td data-label="Punto Control" class="py-0 px-1">{{ m.s_centro.nombre }}</td>
                      <td data-label="Latitud" class="py-0 px-1">{{ m.latitud }}</td>
                      <td data-label="Longitud" class="py-0 px-1">{{ m.longitud }}</td>
                      <td data-label="Acciones" class="py-0 px-1">
                        <!-- Botón para abrir el modal de mapa -->
                        <button type="button" class="btn btn-info btn-sm py-1 px-2" @click="openMapModal(m.latitud, m.longitud)">
                          <i class="fas fa-map-marker-alt"></i> Ver Mapa
                        </button>
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
          <!-- Modal para Mapa de Geolocalización -->
          <div :class="['modal', showMapModal ? 'show d-block' : 'fade']" tabindex="-1" role="dialog" aria-labelledby="mapModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="mapModalLabel">Mapa de Geolocalización</h5>
                  <button type="button" class="btn-close text-dark" @click="showMapModal = false"
                      data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                  <div id="geoMap" style="height: 400px;"></div>
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
import { BrowserMultiFormatReader } from '@zxing/library';

export default {
  name: "IndexPage",
  data() {
    return {
      load: true,
      buscar: "",
      list: [],
      controles: [],
      latitud: '',
      longitud: '',
      s_centro_id: '',
      asistencia_id: '',
      modalIngreso: false,
      showMapModal: false, // Controla la visibilidad del modal del mapa
      apiUrl: 'sControles',
      page: 'Reporte',
      modulo: 'Seguridad',
      url_documento: "/prevencion/trabajadores/archivos/archivo",
      elementosPorPagina: 15,
      datosPaginados: [],
      paginaActual: 1,
      maxPaginasVisibles: 5,
      user: {},
      map: null,  // Referencia al mapa principal
      geoMap: null, // Referencia al mapa de geolocalización
      codeReader: null,  // Referencia al lector de códigos QR
      stream: null,  // Para detener el stream de la cámara
    };
  },
  filters: {
    format_number(value) {
      return parseInt(value).toLocaleString("de-DE");
    },
    format_decimal(value) {
      return parseInt(value).toLocaleString("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  },
  computed: {
    listFilter() {
      let buscar = this.buscar;
      if (buscar != '') {
        return this.list.filter((a) => {
          let nombre = a.nombre != null ? a.nombre : '';
          let rut = a.rut != null ? a.rut : '';
          return nombre.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || rut.toLowerCase().indexOf(buscar.toLowerCase()) != -1;
        });
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
    }
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
   
    formatearFecha(fecha) {
      if (!fecha) return ''; // Manejo de fechas vacías o no definidas
      const [year, month, day] = fecha.split('-');
      return `${day}-${month}-${year}`;
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
    
    formatearHora() {
      const ahora = new Date();
      const año = ahora.getFullYear();
      const mes = String(ahora.getMonth() + 1).padStart(2, '0');
      const dia = String(ahora.getDate()).padStart(2, '0');
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const segundos = String(ahora.getSeconds()).padStart(2, '0');

      return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    },
    async openMapModal(lat, lng) {
      this.showMapModal = true;
      if (process.client) {
        const L = await import('leaflet');
        this.$nextTick(() => {
          if (this.geoMap) {
            this.geoMap.remove(); // Elimina el mapa anterior si existe
          }
          // Inicializa el mapa centrado en la latitud y longitud proporcionadas
          this.geoMap = L.map('geoMap').setView([lat, lng], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(this.geoMap);
          L.marker([lat, lng]).addTo(this.geoMap);
        });
      }
    },
    closeMapModal() {
      this.showMapModal = false;
    }
  },
  mounted() {
    let user = localStorage.getItem('userAuth')
      this.user = JSON.parse(user)
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('sControles')]).then((v) => {
            this.list = v[0]
            this.controles = v[1]
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

<style scoped>
.modal-backdrop.show {
  opacity: 0.5;
}

#video {
  width: 100%;
  height: auto;
}
</style>
