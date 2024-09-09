<template>
  <div>
    <JcLoader :load="load"></JcLoader>
    <AdminTemplate :page="page" :modulo="modulo">
      <div slot="body">
        <div class="row justify-content-end">
          <div class="col-12 col-sm-7">
            <div class="row py-2 px-3s">
              <div class="col-12">
                <div class="card bg-gradient-dark">
                  <div class="card-header bg-transparent py-1 px-3">
                    <div class="row">
                      <div class="col-10">
                        <div class="card-body pt-0 p-1">
                          <div class="z-index-1 position-relative">
                            <h6 class="text-white">Ficha Colaborador</h6>
                          </div>
                        </div>
                      </div>
                      <div class="col-2">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-sm-12 p-2 m-0">
                <div class="card bg-gradient-dark p-4 m-0" style="min-height: 25vh;max-height: 25vh;overflow-y:">
                  <div class="card-header bg-transparent p-0 m-0">
                    <div class="card-body pt-0 p-0 m-0">
                      <template v-for="m in trabajadores">
                        <div class="col-12 p-0 m-0">
                          <div class="form-group col-12 d-flex justify-content-center p-0 m-0">
                            <div class="form-group p-0 m-0">
                              <img :src="m.image.url" alt="image" class=""
                                style="width: 150px; height: 150px; border-radius: 75px; border-color: white;" />
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-9 col-sm-12 py-2">
                <div class="card cardPersonalizado"
                  style="min-height: 25vh;max-height: 25vh;overflow-y: scroll;overflow-x: hidden;">
                  <div class="card-body pt-1 p-0">
                    <template v-for="m in trabajadores">
                      <div class="col-12 py-2">
                        <div slot="body" class="row p-2">
                          <div class="col-md-6 col-sm-12" style="color: black;">
                            <div class="form-group d-flex align-items-center">
                              <label for="" class="labelPersonalizado mr-2">Nombre</label>
                              <span class="mr-2 spamPersonalizado">{{ m.nombre }} {{ m.a_paterno }} {{ m.a_materno
                                }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center">
                              <label for="" class="labelPersonalizado mr-2">Rut</label>
                              <span class="mr-2 spamPersonalizado">{{ formatRUT(m.rut) }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center">
                              <label for="" class="labelPersonalizado mr-2">Direccion</label>
                              <span class="mr-2 spamPersonalizado">{{ m.direccion }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center">
                              <label for="" class="labelPersonalizado mr-2">Ciudad</label>
                              <span class="mr-2 spamPersonalizado">{{ m.ciudad.nombre }}</span>
                            </div>
                          </div>
                          <div class="col-md-6 col-sm-12" style="color: black;">
                            <div class="form-group d-flex align-items-center">
                              <label for="" class="labelPersonalizado mr-2">Telefono</label>
                              <span class="mr-2 spamPersonalizado">{{ m.t_personal }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center">
                              <label for="" class="labelPersonalizado mr-2">T Emerg</label>
                              <span class="mr-2 spamPersonalizado">{{ m.t_emergencia }}</span>
                            </div>
                            <div class="form-group d-flex align-items-center">
                              <label for="" class="labelPersonalizado mr-2">Email</label>
                              <span class="mr-2 spamPersonalizado">{{ m.e_personal }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="card card-pricing">
                  <div class="card-header bg-gradient-dark text-center pt-3 pb-0 position-relative">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs">
                      <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" href="#home">Datos Contrato</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#menu1">Asistencia</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#menu2">Contratos</a>
                      </li>
                    </ul>
                  </div>
                  <!-- Tab panes -->
                  <div class="tab-content">
                    <div class="tab-pane container active" id="home">
                      <div class="card-body p-0">
                        <div class="table-responsive"
                          style="min-height: 40vh;max-height: 40vh;overflow-y: scroll;overflow-x: hidden;">
                          <div class="card-body  pt-1 p-0">
                            <div class="col-12 d-flex justify-content-end align-items-center">
                              <button type="button" @click="[modalPrevision = true, abrirEditVariables(v_contratos)]"
                                class="btn btn-primary btn-sm py-1 px-2">
                                <i class="fas fa-search"></i>
                              </button>
                            </div>
                            <template>
                              <div class="col-12 ">
                                <div slot="body" class="row">
                                  <div class="col-md-3 col-sm-12" style="color: black;">
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label for="" class="labelPersonalizado2">Previsión</label>
                                        <span class="spamPersonalizado zf">{{ nombre_prevision }}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3 col-sm-12" style="color: black;">
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label for="" class="labelPersonalizado2">Salud</label>
                                        <span class="spamPersonalizado zf">{{ nombre_salud }}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3 col-sm-12" style="color: black;">
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label for="" class="labelPersonalizado2">Tipo Contrato</label>
                                        <span class="spamPersonalizado zf">{{ nombre_tipo_contrato
                                          }}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3 col-sm-12" style="color: black;">
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label for="" class="labelPersonalizado2">Sueldo Base</label>
                                        <span class="spamPersonalizado zf">{{ sbase | format_number }}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3 col-sm-12" style="color: black;">
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label for="" class="labelPersonalizado2">Fecha Inicio</label>
                                        <span class="spamPersonalizado zf">{{ f_inicio }}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-3 col-sm-12" style="color: black;">
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label for="" class="labelPersonalizado2">Fecha Termino</label>
                                        <span class="spamPersonalizado zf">{{ f_termino }}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Tabla Inasistencia-->
                    <div class="tab-pane container fade" id="menu1">
                      <div class="card-body p-0">
                        <div class="table-responsive"
                          style="min-height: 40vh; max-height: 40vh; overflow-y: scroll; overflow-x: hidden;">
                          <div id="tabla">
                            <table class="table align-items-start justify-content-start mb-0">
                              <thead>
                                <tr>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Desde
                                  </th>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Hasta
                                  </th>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Cantidad
                                  </th>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Acciones
                                  </th>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder ps-2 text-start">
                                    <div class="d-flex flex-column justify-content-between" style="height: 100%;">

                                      <button type="button" @click="[modalInasistencia = true]"
                                        class="btn btn-success btn-sm py-1 px-2 align-self-end">
                                        <i class="fa-solid fa-file"></i>
                                      </button>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(m, i) in datosPaginados3" :key="i">
                                  <td data-label="Año" class="py-0 px-1">{{ m.f_desde }}</td>
                                  <td data-label="Mes" class="py-0 px-1">{{ m.r_tipo_inasistencia.nombre }}</td>
                                  <td data-label="Mes" class="py-0 px-1">{{ m.f_hasta }}</td>
                                  <td data-label="Mes" class="py-0 px-1">{{ m.cantidad }}</td>
                                  <td data-label="Comentario" class="py-0 px-1">
                                    <button v-if="user.rol_id == 1 && boton1 == 1"
                                      class="btn btn-success btn-sm py-1 px-2" type="button" @click="liq(m.id), drop()">
                                      <i class="fas fa-image"></i>
                                    </button>
                                    <button v-if="user.rol_id == 1 && boton1 == 2"
                                      class="btn btn-success btn-sm py-1 px-2" type="button" @click="liq(m.id), drop()">
                                      <i class="fas fa-image"></i>
                                    </button>
                                    <button v-if="m.documento !== null" type="button"
                                      @click="AbrirLink(m.documento.url)" class="btn btn-primary btn-sm py-1 px-2">
                                      <i class="fas fa-search"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center my-2">
                              <li class="page-item"><a class="page-link" v-on:click="getPreviousPage3()"
                                  href="#">Pre</a>
                              </li>
                              <li class="page-item"><a class="page-link" v-on:click="getNextPage3()" href="#">Next</a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane container fade" id="menu2">
                      <div class="card-body p-0">
                        <div class="table-responsive"
                          style="min-height: 40vh;max-height: 40vh;overflow-y: scroll;overflow-x: hidden;">
                          <div id="tabla">
                            <table class="table align-items-start justify-content-start mb-0">
                              <thead>
                                <tr>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Fech Incio
                                  </th>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Fecha Termino
                                  </th>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Tipo Contrato
                                  </th>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Sueldo Base
                                  </th>
                                  <th
                                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                    Acciones
                                  </th>
                                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder ps-2 text-start">
                                    <div class="d-flex flex-column justify-content-between" style="height: 100%;">

                                      <button type="button" @click="modalContrato()"
                                        class="btn btn-success btn-sm py-1 px-2 align-self-end">
                                        <i class="fa-solid fa-file"></i>
                                      </button>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(m, i) in datosPaginados4">
                                  <td data-label="F Inicio" class="py-0 px-1">{{ m.f_inicio }}</td>
                                  <td data-label="F Inicio" class="py-0 px-1">{{ m.f_termino }}</td>
                                  <td data-label="T Contrato" class="py-0 px-1">{{ m.r_tipo_contrato.nombre }}</td>
                                  <td data-label="S Base" class="py-0 px-1">{{ m.s_base | format_number }}</td>
                                  <td data-label="Comentario" class="py-0 px-1">
                                    <button v-if="user.rol_id == 1, boton1 == 1"
                                      class="btn btn-success btn-sm py-1 px-2" type="button" @click="liq(m.id), drop()">
                                      <i class="fas fa-image"></i>
                                    </button>
                                    <button v-if="user.rol_id == 1, boton1 == 2"
                                      class="btn btn-success btn-sm py-1 px-2" type="button" @click="liq(m.id), drop()">
                                      <i class="fas fa-image"></i>
                                    </button>
                                    <button v-if="m.documento !== null" type="button"
                                      @click="AbrirLink(m.documento.url)" class="btn btn-primary btn-sm py-1 px-2">
                                      <i class="fas fa-search"></i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                              <li class="page-item"><a class="page-link" v-on:click="getPreviousPage4()" href="#">Pre</a>
                              </li>
                              <li class="page-item"><a class="page-link" v-on:click="getNextPage4()" href="#">Next</a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-5">
            <div class="card card-pricing">
              <div class="card-header bg-gradient-dark text-center pt-4 pb-5 position-relative">
                <div class="z-index-1 position-relative">
                  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                        aria-selected="true">Liquidaciones</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                        aria-selected="false">Contrato y anexos</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                        data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                        aria-selected="false">Registros</button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="position-relative mt-n5" style="height: 50px">
                <div class="position-absolute w-100">
                  <svg class="waves waves-sm" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 40" preserveAspectRatio="none"
                    shape-rendering="auto">
                    <defs>
                      <path id="card-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
                      </path>
                    </defs>
                    <g class="moving-waves">
                      <use xlink:href="#card-wave" x="48" y="-1" fill="rgba(255,255,255,0.30"></use>
                      <use xlink:href="#card-wave" x="48" y="3" fill="rgba(255,255,255,0.35)"></use>
                      <use xlink:href="#card-wave" x="48" y="5" fill="rgba(255,255,255,0.25)"></use>
                      <use xlink:href="#card-wave" x="48" y="8" fill="rgba(255,255,255,0.20)"></use>
                      <use xlink:href="#card-wave" x="48" y="13" fill="rgba(255,255,255,0.15)"></use>
                      <use xlink:href="#card-wave" x="48" y="16" fill="rgba(255,255,255,0.99)"></use>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="card-body p-3">
                <div class="table-responsive p-0"
                  style="min-height: 60vh;max-height: 45vh;overflow-y: scroll;overflow-x: none;">
                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                      aria-labelledby="pills-home-tab">
                      <h6>Liquidaciones</h6>
                      <div class="col-12 py-2">
                        <div slot="body" class="row">
                          <div class="form-group col-md-4">
                            <div class="form-group">
                              <a href="javascript:void(0);" class="cta black" @click="[modalLiquidacion = true]">
                                <span>Nuevo</span>
                                <svg width="13px" height="10px" viewBox="0 0 13 10">
                                  <path d="M1,5 L11,5"></path>
                                  <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div class="form-group col-md-6" style="color: white; ">
                            <div class="card bg-gradient-dark">
                              <div class="input-group input-group-lg">
                                <span class="input-group-text text-white bg-transparent border-0">
                                  <i class="ni ni-archive-2 text-lg" aria-hidden="true"></i>
                                </span>
                                <input type="text" class="form-control bg-transparent border-0 text-white"
                                  placeholder="Buscar..." v-model="buscar" v-on:keyup="getDataPagina(1)" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="tabla">
                        <table class="table align-items-start justify-content-start mb-0">
                          <thead>
                            <tr>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Periodo
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Sueldo Liquido
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(m, i) in datosPaginados">
                              <td data-label="Año" class="py-0 px-1">{{ m.t_periodo.nombre }}</td>
                              <td data-label="Mes" class="py-0 px-1">{{ m.s_liquido | format_number }}</td>
                              <td data-label="Comentario" class="py-0 px-1">
                                <button v-if="user.rol_id == 1, boton1 == 1" class="btn btn-success btn-sm py-1 px-2"
                                  type="button" @click="liq(m.id), drop()">
                                  <i class="fas fa-image"></i>
                                </button>
                                <button v-if="user.rol_id == 1, boton1 == 2" class="btn btn-success btn-sm py-1 px-2"
                                  type="button" @click="liq(m.id), drop()">
                                  <i class="fas fa-image"></i>
                                </button>
                                <button v-if="m.documento !== null" type="button" @click="AbrirLink(m.documento.url)"
                                  class="btn btn-primary btn-sm py-1 px-2">
                                  <i class="fas fa-search"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                          <li class="page-item"><a class="page-link" v-on:click="getPreviousPage()" href="#">Pre</a>
                          </li>
                          <li class="page-item"><a class="page-link" v-on:click="getNextPage()" href="#">Next</a></li>
                        </ul>
                      </nav>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                      <h6>Contratos y Anexos</h6>
                      <div class="col-12 py-2">
                        <div slot="body" class="row">
                          <div class="form-group col-md-4">
                            <div class="form-group">
                              <a href="javascript:void(0);" class="cta black" @click="[modalDocumento = true]">
                                <span>Nuevo</span>
                                <svg width="13px" height="10px" viewBox="0 0 13 10">
                                  <path d="M1,5 L11,5"></path>
                                  <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div class="form-group col-md-6" style="color: white; ">
                            <div class="card bg-gradient-dark">
                              <div class="input-group input-group-lg">
                                <span class="input-group-text text-white bg-transparent border-0">
                                  <i class="ni ni-archive-2 text-lg" aria-hidden="true"></i>
                                </span>
                                <input type="text" class="form-control bg-transparent border-0 text-white"
                                  placeholder="Buscar..." v-model="buscar1" v-on:keyup="getDataPagina1(1)" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="tabla">
                        <table class="table align-items-start justify-content-start mb-0">
                          <thead>
                            <tr>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Tipo Documento
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Comentario
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(m, i) in datosPaginados1">
                            <td data-label="Nombre" class="py-0 px-1">{{ m.tipo_archivo.nombre }}</td>
                            <td data-label="Comentario" class="py-0 px-1">{{ m.comentario }}</td>
                            <td data-label="Comentario" class="py-0 px-1"><button v-if="user.rol_id == 1" class="btn btn-success btn-sm py-1 px-2" type="button"
                                @click="archivo(m.id), drop()">
                                <i class="fas fa-image"></i>
                              </button>
                              <button v-if="m.documento !== null" type="button" @click="AbrirLink(m.documento.url)"
                                class="btn btn-primary btn-sm py-1 px-2">
                                <i class="fas fa-search"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        </table>
                      </div>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                          <li class="page-item"><a class="page-link" v-on:click="getPreviousPage1()" href="#">Pre</a>
                          </li>
                          <li class="page-item"><a class="page-link" v-on:click="getNextPage1()" href="#">Next</a></li>
                        </ul>
                      </nav>
                    </div>
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                      <h6>Registros</h6>
                      <div class="col-12 py-2">
                        <div slot="body" class="row">
                          <div class="form-group col-md-4">
                            <div class="form-group">
                              <a href="javascript:void(0);" class="cta black" @click="[modalDocumento = true]">
                                <span>Nuevo</span>
                                <svg width="13px" height="10px" viewBox="0 0 13 10">
                                  <path d="M1,5 L11,5"></path>
                                  <polyline points="8 1 12 5 8 9"></polyline>
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div class="form-group col-md-6" style="color: white; ">
                            <div class="card bg-gradient-dark">
                              <div class="input-group input-group-lg">
                                <span class="input-group-text text-white bg-transparent border-0">
                                  <i class="ni ni-archive-2 text-lg" aria-hidden="true"></i>
                                </span>
                                <input type="text" class="form-control bg-transparent border-0 text-white"
                                  placeholder="Buscar..." v-model="buscar2" v-on:keyup="getDataPagina2(1)" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="tabla">
                        <table class="table align-items-start justify-content-start mb-0">
                          <thead>
                            <tr>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Tipo Documento
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Comentario
                              </th>
                              <th
                                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-start">
                                Acciones
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(m, i) in datosPaginados2">
                              <td data-label="Nombre" class="py-0 px-1">{{ m.tipo_archivo.nombre }}</td>
                              <td data-label="Comentario" class="py-0 px-1">{{ m.comentario }}</td>
                              <td data-label="Acciones" class="py-0 px-1"><button v-if="user.rol_id == 1"
                                  class="btn btn-success btn-sm py-1 px-2" type="button" @click="archivo(m.id), drop()">
                                  <i class="fas fa-image"></i>
                                </button>
                                <button v-if="m.documento !== null" type="button" @click="AbrirLink(m.documento.url)"
                                  class="btn btn-primary btn-sm py-1 px-2">
                                  <i class="fas fa-search"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                          <li class="page-item"><a class="page-link" v-on:click="getPreviousPage2()" href="#">Pre</a>
                          </li>
                          <li class="page-item"><a class="page-link" v-on:click="getNextPage2()" href="#">Next</a></li>
                        </ul>
                      </nav>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <!-- Modal Liquidacion-->
          <div class="modal fade" :class="modalLiquidacion ? 'showModal' : ''" id="DatosModal" tabindex="-1"
            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Nueva Liquidacion
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalLiquidacion = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Año</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark" v-model="ano_id">
                          <option value="all" class="text-dark">
                            Seleccion Año
                          </option>
                          <option class="text-dark" v-for="m in anos1" :value="m.id">{{ m.nro }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Mes</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark" v-model="mese_id">
                          <option value="all" class="text-dark">
                            Seleccion Mes
                          </option>
                          <option class="text-dark" v-for="m in meses1" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="Save(), [modalLiquidacion = false]"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Documento-->
          <div class="modal fade" :class="modalDocumento ? 'showModal' : ''" id="DatosModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Nuevo Documento
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalDocumento = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Tipo Archivo</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                          v-model="tipo_archivo_id" @change="selectTemplate(tipo_archivo_id)">
                          <option value="all" class="text-dark">
                            Tipo Archivo
                          </option>
                          <option class="text-dark" v-for="m in tipo_archivos" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="form-group has-success">
                        <label for="">Tipo Archivo</label>
                        <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                          v-model="template_id">
                          <option value="all" class="text-dark">
                            Tipo Archivo
                          </option>
                          <option class="text-dark" v-for="m in sTemplates" :value="m.id">{{ m.nombre }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group col-6">
                      <div class="form-group">
                        <label for="">Comentario</label>
                        <input type="text" name="" v-model="comentario" class="form-control" id="">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="SaveDocumento(), [modalDocumento = false]"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Liquidacion Documento -->
          <div class="modal fade" :class="modalArchivos ? 'showModal' : ''" id="AjusteModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Editar artículo
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalArchivos = false, desdrop()"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="card-body">
                  <div class="form-control dropzone" id="fileDrop">
                    <div class="fallback">
                      <input name="file" type="file" multiple />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="modalArchivos = false, desdrop()"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Inasistencia Crear -->
          <div class="modal fade" :class="modalInasistencia ? 'showModal' : ''" id="AjusteModal" tabindex="-1"
            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content p-2">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Ingresar Inasistencia
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalInasistencia = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group d-flex align-items-center">
                    <div class="form-group has-success flex-grow-1 me-2">
                      <label for="">Tipo Inasistencia</label>
                      <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                        v-model="r_tipo_inasistencia_id" @change="selectInasistencia(r_tipo_inasistencia_id)">
                        <option value="" disabled selected>Seleccione tipo Inasistencia</option>
                        <option class="text-dark" v-for="m in tInasistencias" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group d-flex align-items-center">
                    <div class="form-group has-success flex-grow-1 me-2">
                      <div class="input-group input-group-lg">
                        <date-picker v-model="f_desde" name="fecha1" valueType="format" lang="es"
                          placeholder="Selecciona una fecha"></date-picker>
                      </div>
                    </div>
                    <div class="form-group has-success flex-grow-1 me-2">
                      <div class="input-group input-group-lg">
                        <date-picker v-model="f_hasta" name="fecha2" valueType="format" lang="es"
                          placeholder="Selecciona una fecha"></date-picker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group d-flex align-items-center">
                    <div class="form-group has-success flex-grow-1 me-2">
                      <label for="">Cantidad</label>
                      <input type="text" name="" v-model="cantidad" class="form-control" id="" readonly>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group d-flex align-items-center">
                    <div class="form-group has-success flex-grow-1 me-2">
                      <label for="">Comentario</label>
                      <input type="text" name="" v-model="comentario" class="form-control" id="">
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" @click="modalInasistencia = false, saveInasistencia()"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalPrevision ? 'showModal' : ''" id="AjusteModal" tabindex="-1"
            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content p-2">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Ingresar Inasistencia
                  </h5>
                  <button type="button" class="btn-close text-dark" @click="modalPrevision = false"
                    data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group d-flex align-items-center">
                    <div class="form-group has-success flex-grow-1 me-2">
                      <label for="">Tipo Inasistencia</label>
                      <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                        v-model="t_previsione_id">
                        <option value="" disabled selected>Seleccione PREVISION</option>
                        <option class="text-dark" v-for="m in previsiones" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group d-flex align-items-center">
                    <div class="form-group has-success flex-grow-1 me-2">
                      <label for="">Tipo Salud</label>
                      <select name="" id="" class="form-control bg-transparent border-0 text-dark"
                        v-model="t_salude_id">
                        <option value="" disabled selected>Seleccione Salud</option>
                        <option class="text-dark" v-for="m in saludes" :value="m.id">{{ m.nombre }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group d-flex align-items-center">
                    <div class="form-group has-success flex-grow-1 me-2">

                      <label for="">Cantidad</label>
                      <input type="text" name="" v-model="cantidad" class="form-control" id="">
                    </div>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12">
                  <div class="form-group d-flex align-items-center">
                    <div class="form-group has-success flex-grow-1 me-2">

                      <label for="">Comentario</label>
                      <input type="text" name="" v-model="comentario" class="form-control" id="">
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button v-if="v_contratos.length === 0" type="button"
                    @click="modalPrevision = false, savePrevision()" class="btn bg-gradient-secondary w-100"
                    data-bs-dismiss="modal">
                    Guardar
                  </button>
                  <button v-if="v_contratos.length > 0" type="button" @click="modalPrevision = false, updatePrevision()"
                    class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" :class="modalContrato ? 'showModal' : ''" id="AjusteModal" tabindex="-1"
    role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content p-2">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          Ingresar Contrato
        </h5>
        <button type="button" class="btn-close text-dark" @click="modalContrato = false" data-bs-dismiss="modal"
          aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <!-- Select para r_doc_contrato_id -->
      <div class="modal-body">
        <div class="form-group mb-3">
          <label for="r_doc_contrato_id">Documento de Contrato</label>
          <select class="form-control" v-model="r_doc_contrato_id">
            <option disabled value="">Selecciona un documento de contrato</option>
            <option v-for="doc in doccontratos" :key="doc.id" :value="doc.id">{{ doc.nombre }}</option>
          </select>
        </div>

        <!-- Select para r_tipo_contrato_id -->
        <div class="form-group mb-3">
          <label for="r_tipo_contrato_id">Tipo de Contrato</label>
          <select class="form-control" v-model="r_tipo_contrato_id">
            <option disabled value="">Selecciona un tipo de contrato</option>
            <option v-for="tipo in tiposContratos" :key="tipo.id" :value="tipo.id">{{ tipo.nombre }}</option>
          </select>
        </div>

        <!-- Input para s_base -->
        <div class="form-group mb-3">
          <label for="s_base">Salario Base</label>
          <input type="number" class="form-control" v-model="s_base" placeholder="Ingresa el salario base">
        </div>

        <!-- Selector de fecha para f_inicio -->
        <div class="form-group mb-3">
          <label for="f_inicio">Fecha de Inicio</label>
          <input type="date" class="form-control" v-model="f_inicio">
        </div>

        <!-- Selector de fecha para f_termino -->
        <div class="form-group mb-3">
          <label for="f_termino">Fecha de Término</label>
          <input type="date" class="form-control" v-model="f_termino">
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" @click="modalContrato = false, saveContratos()"
          class="btn bg-gradient-secondary w-100" data-bs-dismiss="modal">
          Guardar
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  head() {
    return {
      title: this.modulo,
    };
  },

  data() {
    return {
      modulo: "Ficha Personal",
      page: "Trabajador",
      trabajado_id: '',
      pais_id: '',
      nombre: '',
      tipo_archivo_id: '',
      comentario: '',
      doc: "",
      ano_id: '',
      n_ano: '',
      mese_id: '',
      n_mes: '',
      docid: '',
      template_id:'',
      r_doc_contrato_id:'',
      item_liq: '',
      load: false,
      buscar: "",
      buscar1: "",
      buscar2: "",
      buscar3: "",
      buscar4: "",
      boton1: "1",
      list: [],
      list1: [],
      list2: [],
      trabajadores: [],
      doccontratos: [],
      tiposContratos:[],
      sTemplates:[],
      liquidaciones: [],
      registros: [],
      archivos: [],
      tipo_archivos: [],
      tInasistencias: [],
      previsiones: [],
      saludes: [],
      f_desde: '',
      f_hasta: '',
      cantidad: '',
      remunerado: '',
      t_previsione_id: '',
      t_salude_id:'',
      r_tipo_inasistencia_id: '',
      r_tipo_contrato_id:'',
      v_contratos: [],
      contratos: [],
      paises: [],
      anos1: [],
      meses1: [],
      arrayurl: [],
      stin: [],
      inasistencias: [],
      modalLiquidacion: false,
      modalArchivos: false,
      modalPrevision: false,
      modalDocumento: false,
      modalArchivos2: false,
      modalInasistencia: false,
      modalContrato: false,
      url_liquidacionDoc: "/configuracion/trabajadores/liquidaciones/liquidacion/",
      elementosPorPagina: 5,
      datosPaginados: [],
      paginaActual: 1,
      elementosPorPagina1: 5,
      datosPaginados1: [],
      paginaActual1: 1,
      elementosPorPagina2: 5,
      datosPaginados2: [],
      paginaActual2: 1,
      elementosPorPagina3: 5,
      datosPaginados3: [],
      paginaActual3: 1,
      elementosPorPagina4: 5,
      datosPaginados4: [],
      paginaActual4: 1,
      item: {
        liquidaciones: {
          id: '',
          nombre: ''
        },
      },
      user: {},
      sl: {}
    };
  },
  components: {
    DatePicker
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
  watch: {
    diferenciaDias(newVal) {
      this.cantidad = newVal;
    }
  },
  computed: {
    diferenciaDias() {
      if (this.f_desde && this.f_hasta) {
        const fechaDesde = new Date(this.f_desde);
        const fechaHasta = new Date(this.f_hasta);
        const diferenciaTiempo = fechaHasta - fechaDesde;
        const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
        return diferenciaDias;
      }
      return '';
    },
    listFilter() {
      let buscar = this.buscar
      if (buscar != '') {
        return this.list.filter((a) => {
          let n_ano = a.ano.nro != null ? a.ano.nro : ''
          let n_mes = a.mese.nombre != null ? a.mese.nombre : ''
          return n_ano.toLowerCase().indexOf(buscar.toLowerCase()) != -1 || n_mes.toLowerCase().indexOf(buscar.toLowerCase()) != -1
        })
      }
      return this.list
    },
    listFilter1() {
      let buscar1 = this.buscar1
      if (buscar1 != '') {
        return this.list1.filter((a) => {
          let tipo_archivo = a.tipo_archivo.nombre != null ? a.tipo_archivo.nombre : ''
          let comentario = a.comentario != null ? a.comentario : ''
          return tipo_archivo.toLowerCase().indexOf(buscar1.toLowerCase()) != -1 || comentario.toLowerCase().indexOf(buscar1.toLowerCase()) != -1
        })
      }
      return this.list1
    },
    listFilter2() {
      let buscar2 = this.buscar2
      if (buscar2 != '') {
        return this.list2.filter((a) => {
          let tipo_archivo = a.tipo_archivo.nombre != null ? a.tipo_archivo.nombre : ''
          let comentario = a.comentario != null ? a.comentario : ''
          return tipo_archivo.toLowerCase().indexOf(buscar2.toLowerCase()) != -1 || comentario.toLowerCase().indexOf(buscar2.toLowerCase()) != -1
        })
      }
      return this.list2
    },
    listFilter4() {
      let buscar4 = this.buscar4
      if (buscar4 != '') {
        return this.contratos.filter((a) => {
          let f_inicio = a.f_inicio != null ? a.f_inicio : ''
          return f_inicio.toLowerCase().indexOf(buscar4.toLowerCase()) != -1
        })
      }
      return this.contratos
    },

    listFilterInasitencia() {
      let buscar3 = this.buscar3
      if (buscar3 != '') {
        return this.inasistencias.filter((a) => {
          let f_desde = a.f_desde != null ? a.f_desde : ''
          return f_desde.toLowerCase().indexOf(buscar3.toLowerCase()) != -1
        })
      }
      return this.inasistencias
    },
  },
  methods: {
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
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
      return rut.replace(/[^\dK]/gi, '');
    },

    totalPaginas() {
      return Math.ceil(this.listFilter.length / this.elementosPorPagina)
    },
    getDataPagina(noPagina) {
      this.paginaActual = noPagina;
      this.datosPaginados = [];
      let ini = (noPagina * this.elementosPorPagina) - this.elementosPorPagina;
      let fin = (noPagina * this.elementosPorPagina);
      this.datosPaginados = this.listFilter.slice(ini, fin);
    },
    getPreviousPage() {
      if (this.paginaActual > 1) {
        this.paginaActual--;
      }
      this.getDataPagina(this.paginaActual);
    },
    getNextPage() {
      if (this.paginaActual < this.totalPaginas()) {
        this.paginaActual++;
      }
      this.getDataPagina(this.paginaActual);
    },
    isActive(noPagina) {
      return noPagina == this.paginaActual ? 'active' : ''
    },
    totalPaginas1() {
      return Math.ceil(this.listFilter1.length / this.elementosPorPagina1)
    },
    getDataPagina1(noPagina1) {
      this.paginaActual1 = noPagina1;
      this.datosPaginados1 = [];
      let ini1 = (noPagina1 * this.elementosPorPagina1) - this.elementosPorPagina1;
      let fin1 = (noPagina1 * this.elementosPorPagina1);
      this.datosPaginados1 = this.listFilter1.slice(ini1, fin1);
    },
    getPreviousPage1() {
      if (this.paginaActual1 > 1) {
        this.paginaActual1--;
      }
      this.getDataPagina1(this.paginaActual1);
    },
    getNextPage1() {
      if (this.paginaActual1 < this.totalPaginas1()) {
        this.paginaActual1++;
      }
      this.getDataPagina1(this.paginaActual1);
    },
    isActive1(noPagina1) {
      return noPagina1 == this.paginaActual1 ? 'active' : ''
    },
    totalPaginas2() {
      return Math.ceil(this.listFilter2.length / this.elementosPorPagina2)
    },
    getDataPagina2(noPagina2) {
      this.paginaActual2 = noPagina2;
      this.datosPaginados2 = [];
      let ini2 = (noPagina2 * this.elementosPorPagina2) - this.elementosPorPagina2;
      let fin2 = (noPagina2 * this.elementosPorPagina2);
      this.datosPaginados2 = this.listFilter2.slice(ini2, fin2);
    },
    getPreviousPage2() {
      if (this.paginaActual2 > 1) {
        this.paginaActual2--;
      }
      this.getDataPagina2(this.paginaActual2);
    },
    getNextPage2() {
      if (this.paginaActual2 < this.totalPaginas2()) {
        this.paginaActual2++;
      }
      this.getDataPagina2(this.paginaActual2);
    },
    isActive2(noPagina2) {
      return noPagina2 == this.paginaActual2 ? 'active' : ''
    },
    //Filtro Paginacion Inasistencia
    totalPaginas3() {
      return Math.ceil(this.listFilterInasitencia.length / this.elementosPorPagina3)
    },
    getDataPagina3(noPagina3) {
      this.paginaActual3 = noPagina3;
      this.datosPaginados3 = [];
      let ini3 = (noPagina3 * this.elementosPorPagina3) - this.elementosPorPagina3;
      let fin3 = (noPagina3 * this.elementosPorPagina3);
      this.datosPaginados3 = this.listFilterInasitencia.slice(ini3, fin3);
    },
    getPreviousPage3() {
      if (this.paginaActual3 > 1) {
        this.paginaActual3--;
      }
      this.getDataPagina3(this.paginaActual3);
    },
    getNextPage3() {
      if (this.paginaActual3 < this.totalPaginas3()) {
        this.paginaActual3++;
      }
      this.getDataPagina3(this.paginaActual3);
    },
    isActive3(noPagina3) {
      return noPagina3 == this.paginaActual3 ? 'active' : ''
    },
    //paginador Contratos
    totalPaginas4() {
      return Math.ceil(this.listFilter4.length / this.elementosPorPagina4)
    },
    getDataPagina4(noPagina4) {
      this.paginaActual4 = noPagina4;
      this.datosPaginados4 = [];
      let ini4 = (noPagina4 * this.elementosPorPagina4) - this.elementosPorPagina4;
      let fin4 = (noPagina4 * this.elementosPorPagina4);
      this.datosPaginados4 = this.listFilter4.slice(ini4, fin4);
    },
    getPreviousPage4() {
      if (this.paginaActual4 > 1) {
        this.paginaActual4--;
      }
      this.getDataPagina4(this.paginaActual4);
    },
    getNextPage4() {
      if (this.paginaActual4 < this.totalPaginas4()) {
        this.paginaActual4++;
      }
      this.getDataPagina4(this.paginaActual4);
    },
    isActive4(noPagina4) {
      return noPagina4 == this.paginaActual4 ? 'active' : ''
    },
    //fin Paginador contratos
    async Datos(path) {
      try {
        await Promise.all([this.GET_DATA('trabajadores'), this.GET_DATA('liquidaciones/liquidacion?trabajador=' + this.sl.sl_id)]).then((v) => {
          this.trabajadores = v[0];
          this.liquidaciones = v[1];
        });
      } catch (e) {
        console.log(e);
      }
    },
    async AbrirLink(url) {
      window.open(url, '_blank');
    },
    async Save() {
      this.load = true
      let self = this
      try {
        const operacion = {
          trabajador_id: this.sl.sl_id,
          ano_id: this.ano_id,
          mese_id: this.mese_id,
        }
        const res = await this.$api.$post('liquidaciones', operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Liquidacion Guardada !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.liquidacionActualizar()
            }
          });
      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    async saveInasistencia() {
      this.load = true
      let self = this
      try {
        const operacion = {
          trabajador_id: this.sl.sl_id,
          t_periodo_id: this.user.t_periodo_id,
          r_tipo_inasistencia_id: this.r_tipo_inasistencia_id,
          f_desde: this.f_desde,
          f_hasta: this.f_hasta,
          remunerado: this.stin.remunerado,
          cantidad: this.cantidad,
          comentario: this.comentario,
        }
        const res = await this.$api.$post('rInasistencias', operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Inasistencia Ingresada!",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.actualizarInasistencia()
            }
          });
      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    async SaveDocumento() {
      this.load = true
      let self = this
      try {
        const operacion = {
          trabajador_id: this.sl.sl_id,
          template_id: this.template_id,
          area_id: 1,
          periodo_id: this.user.t_periodo_id,
          tipo_archivo_id: this.tipo_archivo_id,
          comentario: this.comentario,
        }
        const res = await this.$api.$post('template', operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Documento Guardado !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.archivoActualizar()
            }
          });
      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    async savePrevision() {
      this.load = true
      let self = this
      try {
        const operacion = {
          trabajador_id: this.sl.sl_id,
          t_periodo_id: this.user.t_periodo_id,
          t_previsione_id: this.t_previsione_id,
          t_salude_id: this.t_salude_id,
        }
        const res = await this.$api.$post('tPeriodoTrabajadores', operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Documento Guardado !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.archivoActualizar()
            }
          });
      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    async updatePrevision() {
      {
        this.load = true
        try {
          const res = await this.$api.$put("tPeriodoTrabajadores/" + this.periodo_t_id, {
            't_previsione_id': this.t_previsione_id,
            'id': this.periodo_t_id,
          });
          console.log(res)
          this.$swal.fire({
            title: 'Prevision Actualizada',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'Ok',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.actualizarPrevisiones()
            }
          })
        } catch (e) {
          console.log(e)
        } finally {
          this.load = false
        };
      }
    },
    
    async saveContratos() {
      this.load = true
      let self = this
      try {
        const operacion = {
          trabajador_id: this.sl.sl_id,
          r_doc_contrato_id: this.r_doc_contrato_id,
          t_periodo_id: this.user.t_periodo_id,
          sucursal_id: this.user.sucursal_id,
          empresa_id: this.user.empresa_id,
          r_tipo_contrato_id: this.r_tipo_contrato_id,
          s_base: this.s_base,
          f_inicio: this.f_inicio,
          f_termico: this.f_termico,
        }
        const res = await this.$api.$post('rContratos', operacion);
        console.log(res);
        this.$swal
          .fire({
            title: "Documento Guardado !",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Ok",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.archivoActualizar()
            }
          });
      } catch (e) {
        console.log(e)
      } finally {
        this.load = false
      };
    },
    Clean() {
      return this.liquidacionActualizar
    },
    drop() {
      Dropzone.autoDiscover = false;
      let self = this;
      let url =
        this.$api.url + this.doc + this.docid;

      new Dropzone("div#fileDrop", {
        url: url,
        headers: {
          Authorization: '',
          // remove Cache-Control and X-Requested-With
          // to be sent along with the request
          "Cache-Control": null,
          "X-Requested-With": null,
        },
      }).on("complete", async function (file) {
        this.removeFile(file);
        this.desdrop();

      });
    },
    desdrop() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach(bz => bz.destroy());
    },
    desdrop() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach(bz => bz.destroy());
      this.liquidacionActualizar()
      this.archivoActualizar()
    },
    liquidacionActualizar() {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('liquidaciones/liquidacion?trabajador=' + this.sl.sl_id)]).then((v) => {
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
    actualizarInasistencia() {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('rInasistencias/filtro?filtro=' + this.sl.sl_id + "&filtro2=" + this.user.t_periodo_id)]).then((v) => {
            this.inasistencias = v[0];
          });

        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
        this.getDataPagina3(1);
        this.cleanModalInasistencia();
      });
    },
    selectTemplate(tipo_archivo_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('templates/filtro?filtro=' + tipo_archivo_id)]).then((v) => {
            this.sTemplates = v[0];
          });

        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    actualizarPrevisiones() {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('tPeriodoTrabajadore/filtro?filtro=' + this.sl.sl_id + "&filtro2=" + this.user.t_periodo_id)]).then((v) => {
            this.v_contratos = v[0];
          });

        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    archivoActualizar() {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('archivos/contrato?trabajador=' + this.sl.sl_id), this.GET_DATA('archivos/registro?trabajador=' + this.sl.sl_id)]).then((v) => {
            this.list1 = v[0];
            this.list2 = v[1];
          });

        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
        this.getDataPagina1(1);
        this.getDataPagina2(1);
      });
    },
    Clean1() {
      this.archivos = []
      return this.archivoActualizar
    },
    Clean2() {
      this.registros = []
      return this.registroActualizar
    },
    cleanModalInasistencia() {
      this.r_tipo_inasistencia_id = ''
      this.f_desde = ''
      this.f_hasta = ''
      this.remunerado = ''
      this.cantidad = ''
      this.comentario = ''
    },
    Borrar() {
      this.ano_id = ""
      this.mese_id = ""
    },
    Borrar() {
      this.tipo_archivo_id = ""
      this.comentario = ""
    },
    docClean() {
      this.docid = '',
        this.doc = '',
        this.modalArchivos = false
    },
    amodalContrato() {
        this.modalContrato = true
    },
    liq(id) {
      this.modalArchivos = true,
        this.doc = "liquidacionDoct/liquidacion/",
        this.docid = id
    },
    archivo(id) {
      this.modalArchivos = true,
        this.doc = "archivoDoctos/archivo/",
        this.docid = id
    },
    selectInasistencia(r_tipo_inasistencia_id) {
      this.$nextTick(async () => {
        try {
          await Promise.all([this.GET_DATA('rTipoInasistencias/' + r_tipo_inasistencia_id)]).then((v) => {
            this.stin = v[0];
          });
        } catch (e) {
          console.log(e);
        } finally {
          this.load = false
        }
      });
    },
    abrirEditVariables(v_contratos) {
      if (Array.isArray(v_contratos) && v_contratos.length > 0) {
        // Acceder al primer elemento del array
        this.periodo_t_id = v_contratos[0].id;
        this.t_previsione_id = v_contratos[0].t_previsione_id;
        this.t_salude_id = v_contratos[0].t_salude_id;
        this.cantidad = v_contratos[0].id;

        // Si necesitas acceder a otros elementos, ajusta los índices
        // Ejemplo: para el segundo elemento
        // this.periodo_t_id = v_contratos[1].id;
      } else {
        console.error('El argumento v_contratos no es un array o está vacío.');
      }
    },
    variableTrabajador(v_contratos) {
      if (Array.isArray(v_contratos) && v_contratos.length > 0) {
        // Acceder al primer elemento del array
        this.nombre_prevision = v_contratos[0].t_previsione.nombre;
        this.nombre_salud = v_contratos[0].t_salude.nombre;
        this.nombre_tipo_contrato = v_contratos[0].r_contrato.r_tipo_contrato.nombre;
        this.sbase = v_contratos[0].sbase;
        this.f_inicio = v_contratos[0].r_contrato.f_inicio;
        this.f_termino = v_contratos[0].r_contrato.f_termino;

        // Si necesitas acceder a otros elementos, ajusta los índices
        // Ejemplo: para el segundo elemento
        // this.periodo_t_id = v_contratos[1].id;
      } else {
        console.error('El argumento v_contratos no es un array o está vacío.');
      }
    },
  },

  mounted() {
    let user = localStorage.getItem('userAuth')
    this.user = JSON.parse(user)
    let sl = localStorage.getItem('selector')
    this.sl = JSON.parse(sl)
    this.$nextTick(async () => {
      Dropzone.autoDiscover = false;
      let self = this;
      try {
        await Promise.all([this.GET_DATA('rDetalleLibros/liquidacion?filtro=' + this.sl.sl_id),
        this.GET_DATA('trabajadors/trabajador?filtro=' + this.sl.sl_id),
        this.GET_DATA('archivos/contrato?trabajador=' + this.sl.sl_id),
        this.GET_DATA('archivos/registro?trabajador=' + this.sl.sl_id),
        this.GET_DATA('paises'),
        this.GET_DATA('anos'),
        this.GET_DATA('meses'),
        this.GET_DATA('tipoArchivos'),
        this.GET_DATA('tPeriodoTrabajadore/filtro?filtro=' + this.sl.sl_id + "&filtro2=" + this.user.t_periodo_id),
        this.GET_DATA('rContrato/filtro?filtro=' + this.sl.sl_id),
        this.GET_DATA('rInasistencias/filtro?filtro=' + this.sl.sl_id + "&filtro2=" + this.user.t_periodo_id),
        this.GET_DATA('rTipoInasistencias'),
        this.GET_DATA('tPrevisiones'),
        this.GET_DATA('tSaludes'),
        this.GET_DATA('rdoccontratos'),
        this.GET_DATA('rtipocontratos'),
        ]).then((v) => {
          this.list = v[0]
          this.trabajadores = v[1]
          this.list1 = v[2]
          this.list2 = v[3]
          this.paises = v[4]
          this.anos1 = v[5]
          this.meses1 = v[6]
          this.tipo_archivos = v[7]
          this.v_contratos = v[8]
          this.contratos = v[9]
          this.inasistencias = v[10]
          this.tInasistencias = v[11]
          this.previsiones = v[12]
          this.saludes = v[13]
          this.doccontratos = v[14]
          this.tiposContratos = v[15]
          this.variableTrabajador(this.v_contratos);
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.load = false;
      }
      this.getDataPagina(1);
      this.getDataPagina1(1);
      this.getDataPagina2(1);
      this.getDataPagina3(1);
      this.getDataPagina4(1);
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
<style>
.showModal {
  visibility: visible;
  display: block;
  opacity: 1 !important;
}
</style>

<style>
.cardPersonalizado {
  box-shadow: 0 6px 12px rgba(36, 37, 39, .14), 0 16px 24px rgba(36, 37, 39, .08);
}
</style>
<style>
.spamPersonalizado {
  font-size: 0.8rem;
  font-weight: 600;
  color: #344767;
}

.labelPersonalizado {
  font-size: 1rem;
  margin-bottom: 0rem;
  width: 5.5rem;
}

.labelPersonalizado2 {
  font-size: 1rem;
  margin-bottom: 0rem;
  width: 8rem;
}

.nav-link {
  color: white;
  --bs-nav-link-hover-color: white;

}

.zf {
  font-size: 1rem;
}
</style>
<style></style>