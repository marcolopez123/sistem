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
                        @click="modalIngreso = true">
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
                      <tr>
                        <th class="py-0 px-1">#</th>
                        <th class="py-0 px-1">Nombre</th>
                        <th class="py-0 px-1">Acciones</th>
                        <th class="py-0 px-1"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(m, i) in datosPaginados" :key="i">
                        <td data-label="N" class="py-0 px-1">{{ i + 1 }}</td>
                        <td data-label="Nombre" class="py-0 px-1">{{ m.sucursal.nombre }}</td>
                        <td data-label="Nombre" class="py-0 px-1">{{ m.nombre }}</td>
                        <td data-label="Acciones" class="py-0 px-1">
                          <div class="btn-group">
                            <button type="button" @click="EliminarItem(m.id)" class="btn btn-danger btn-sm py-1 px-2">
                              <i class="fas fa-trash"></i>
                            </button>
                            <button type="button" @click="openQrModal(m.id)" class="btn btn-primary btn-sm py-1 px-2">
                              <i class="fas fa-qrcode"></i> Generar QR
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
            <!-- Modal para crear un nuevo item -->
            <div class="modal fade" :class="modalIngreso ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
              aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Crear
                    </h5>
                    <button type="button" class="btn-close text-dark" @click="modalIngreso = false; cleanModal()"
                      data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body row">
                    <div class="form-group col-6">
                      <label for="">Empresa</label>
                      <select name="" id="" class="form-control" v-model="empresa_id" @change="sucursal(empresa_id)">
                        <option v-for="m in empresas" :value="m.id" :key="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>    
                  <div class="modal-body row">
                    <div class="form-group col-6">
                      <label for="">Sucursales</label>
                      <select name="" id="" class="form-control" v-model="sucursal_id">
                        <option v-for="m in sucursales" :value="m.id" :key="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="centro_id">Nombre punto</label>
                      <input type="text" v-model="nombre" class="form-control" id="centro_id">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" @click="modalIngreso = false; Save()" class="btn bg-gradient-secondary w-100"
                      data-bs-dismiss="modal">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Modal para Generar QR Code -->
            <div class="modal fade" :class="{ showModal: qrModal }" id="qrModal" tabindex="-1" role="dialog"
              aria-labelledby="qrModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="qrModalLabel">Código QR del Item</h5>
                    <button type="button" class="btn-close text-dark" @click="qrModal = false; cleanModal()"
                      data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body text-center">
                    <!-- Imagen del Código QR generado -->
                    <img :src="qrCodeImage" alt="Código QR" v-if="qrCodeImage">
                    <!-- Botón para descargar el código QR -->
                    <button v-if="qrCodeImage" @click="downloadQRCode" class="btn btn-success mt-3">
                      Descargar QR como JPG
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
  import QRCode from 'qrcode'; // Importa la biblioteca QRCode
  
  export default {
    name: "IndexPage",
    data() {
      return {
        load: true,
        modalIngreso: false,
        qrModal: false, // Controla la visibilidad del modal de QR
        qrCodeValue: '', // Almacena el valor del QR
        qrCodeImage: '', // Almacena la URL de datos del QR generado
        buscar: "",
        list: [],
        empresas: [],
        nombre: '',
        sucursales: [],
        user_id: '',
        empresa_id: '',
        sucursal_id: '',
        apiUrl: 'sCentros',
        apiUrlSelect: 'sCentros',
        page: 'Usuarios',
        modulo: 'Usuarios Empresa',
        elementosPorPagina: 15,
      datosPaginados: [],
      paginaActual: 1,
      maxPaginasVisibles: 5,
        sl: {},
        user: {}
      };
    },
    filters: {
      format_number(value) {
        return parseInt(value).toLocaleString("de-DE");
      },
      format_decimal(value) {
        return parseFloat(value).toLocaleString("de-DE", {
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
            let mes_id = a.mes_id != null ? a.mes_id : '';
            let ano_id = a.ano_id != null ? a.ano_id : '';
            return mes_id.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || ano_id.toLowerCase().indexOf(buscar.toLowerCase()) != -1;
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
      sucursal(empresa_id){
      this.$nextTick(async () => {
      try {
        await Promise.all([this.GET_DATA('/sucursal/empresa?empresa=' + empresa_id)]).then((v) => {
          this.sucursales = v[0];
          
         
        });

      } catch (e) {
        console.log(e);
      } finally {
        this.load=false

      }
    });
    
    },
      async EliminarItem(id) {
        this.load = true;
        try {
          const res = await this.$api.$delete(this.apiUrl + "/" + id);
          console.log(res);
          const updatedData = await this.GET_DATA(this.apiUrl);
          this.list = updatedData;
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false;
        }
      },
      async AbrirLink(url) {
        window.open(url, '_blank');
      },
      async Save() {
        this.load = true;
        try {
          const operacion = {
            empresa_id: this.empresa_id,
            sucursal_id: this.sucursal_id,
            nombre: this.nombre,
          };
          const res = await this.$api.$post(this.apiUrl, operacion);
          console.log(res);
          this.$swal.fire({
            title: "Ingreso Registrado!",
            confirmButtonText: "Ok",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.archivoActualizar()
              this.cerrarModal()
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
            const [listData] = await Promise.all([this.GET_DATA(this.apiUrl)]);
            this.list = listData;
          } catch (e) {
            console.log(e);
          } finally {
            this.load = false;
          }
          this.getDataPagina(1);
        });
      },
      cleanModal() {
        this.empresa_id = '';
        this.sucursal_id = '';
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
      },
      async openQrModal(id) {
        this.qrCodeValue = id;
        this.qrModal = true;
  
        // Generar el QR Code como imagen
        try {
          this.qrCodeImage = await QRCode.toDataURL(this.qrCodeValue.toString(), {
            type: 'image/jpeg', // Especifica que sea JPG
            quality: 0.92, // Calidad del JPG
            width: 200 // Tamaño del código QR
          });
          console.log("Código QR generado:", this.qrCodeImage);
        } catch (error) {
          console.error('Error generando el código QR:', error);
        }
      },
      closeQrModal() {
        this.qrModal = false;
        this.qrCodeImage = ''; // Limpia la imagen cuando se cierra el modal
      },
      downloadQRCode() {
        // Crear un enlace temporal para descargar la imagen
        const link = document.createElement('a');
        link.href = this.qrCodeImage;
        link.download = 'qr-code.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    },
    mounted() {
      let user = localStorage.getItem('userAuth');
      this.user = JSON.parse(user);
      let sl = localStorage.getItem('selector');
      this.sl = JSON.parse(sl);
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA(this.apiUrl),this.GET_DATA('empresas?usuario=' + this.user.empresa_id)]).then((v) => {
            this.list = v[0]
            this.empresas = v[1]
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
  
  <style>
  .showModal {
    visibility: visible;
    display: block;
    opacity: 1 !important;
  }
  </style>
  