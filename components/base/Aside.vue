<template>
  <aside 
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 hide-on-small-only"
    id="sidenav-main"
  >
    <!-- Mostrar permisos cargados para depuración -->
    <div v-if="isUserAuthorized">
      <div class="sidenav-header">
        <i
          class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          @click="hideSideNav()"
          id="iconSidenav"
        ></i>
        <div class="d-flex justify-content-center">
          <img src="/assets/img/Logo.png" alt="image" style="width: 100px; height: 50px;" />
        </div>
      </div>
      <hr class="horizontal dark mt-0" />
      <div class="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
        <ul class="navbar-nav">
          <!-- Usamos filteredMenuOptionsByPermissions para mostrar solo los menús y submenús permitidos -->
          <li v-for="menu in filteredMenuOptionsByPermissions" :key="menu.label" class="nav-item">
            <div v-if="menu.title">
              
            </div>
            <a :data-bs-toggle="menu.submenu ? 'collapse' : ''" :href="menu.href" class="nav-link" :aria-controls="menu.id" role="button" aria-expanded="false">
              <div class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center me-2">
                <svg width="12px" height="12px" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                  <title>{{ menu.iconTitle }}</title>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                      <g transform="translate(1716.000000, 291.000000)">
                        <g id="office" transform="translate(153.000000, 2.000000)">
                          <path class="color-background" d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z" opacity="0.6"></path>
                          <path class="color-background" d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span class="nav-link-text ms-1">{{ menu.title }}</span>
            </a>
            <div v-if="menu.submenu" class="collapse" :id="menu.id">
              <ul class="nav ms-4 ps-3">
                <!-- Filtramos los submenús permitidos -->
                <li class="nav-item" v-for="sub in filteredSubMenuOptions(menu.submenu)" :key="sub.href">
                  <nuxtLink class="nav-link" :to="sub.href">
                    <span class="sidenav-mini-icon">{{ sub.icon }}</span>
                    <span class="sidenav-normal">{{ sub.tittle }}</span>
                  </nuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>



<script>
export default {
  data() {
    return {
      image: 0,
      user: {},
      permroles: [],
      menuOptions: [
        {
          title: "Dashboard",
          iconTitle: "office",
          label: "Dashboard",
          href: "#dashboard",
          id: "dashboard",
          roles: [1, 2],
          submenu: [
            { href: "/inicio", label: "Dashboard",tittle: "Dashboard", icon: "D" },
          ],
        },
        {
          title: "Empresas",
          iconTitle: "EMPRESAS",
          label: "Menu-Empresas",
          href: "#empresas",
          id: "empresas",
          roles: [1, 2],
          submenu: [
            { href: "/empresas/empresa", label: "Empresas-empresa",tittle: "Empresa", icon: "E" },
            { href: "/configuracion/sucursales", label: "Empresas-Sucursal",tittle: "Sucursal", icon: "S" },
            { href: "/empresas/representante", label: "Empresas-Representante",tittle: "Representantes", icon: "R" },
            { href: "/empresas/socio", label: "Empresas-Socio",tittle: "Socios", icon: "S" },
            { href: "/empresas/archivos/formulario29", label: "Empresas-Formulario-29",tittle: "Formulario 29", icon: "F" },
            { href: "/empresas/archivos/formulario22", label: "Empresas-Formulario-22",tittle: "Formulario 22", icon: "F" },
            { href: "/empresas/archivos/estatutos", label: "Empresas-Estatutos",tittle: "Estatutos", icon: "E" },
            { href: "/empresas/archivos/carpeta_tributaria", label: "Empresas-Carpeta-Tributaria",tittle: "Carpeta Tributaria", icon: "C" },
            { href: "/empresas/archivos/balance", label: "Empresas-Balances",tittle: "Balances", icon: "B" },
          ],
        },
        {
          title: "Clientes",
          iconTitle: "CLIENTES",
          label: "Menu-Clientes",
          href: "#clientes",
          id: "clientes",
          roles: [1, 2],
          submenu: [
            { href: "/clientes/cliente", label: "Clientes-Cliente",tittle: "Cliente", icon: "C" },
            { href: "/clientes/archivos/facturacion", label: "Clientes-Ventas",tittle: "Ventas", icon: "V" },
          ],
        },
        {
          title: "Prevención",
          iconTitle: "EMPRESAS",
          label: "Menu-Prevencion",
          href: "#prevencion",
          id: "prevencion",
          roles: [1, 2],
          submenu: [
            { href: "/prevencion/empleador/archivo", label: "Prevencion-Empleador",tittle: "Empleador", icon: "E" },
            { href: "/prevencion/trabajadores/", label: "Prevencion-Trabajadores",tittle: "Trabajadores", icon: "T" },
          ],
        },
        {
          title: "Trabajadores",
          iconTitle: "TRABAJADORES",
          label: "Menu-Trabajadores",
          href: "#trabajadores",
          id: "trabajadores",
          roles: [1, 2],
          submenu: [
            { href: "/configuracion/trabajadores", label: "Trabajadores-Trabajador",tittle: "Trabajador", icon: "T" },
            { href: "/configuracion/trabajadores/fichas/ficha", label: "Trabajadores-Ficha",tittle: "Ficha", icon: "F" },
          ],
        },
        {
          title: "Remuneraciones",
          iconTitle: "REMUNERACIONES",
          label: "Menu-Remuneraciones",
          href: "#remuneraciones",
          id: "remuneraciones",
          roles: [1, 2],
          submenu: [
            { href: "/remuneraciones", label: "Remuneraciones-Trabajador",tittle: "Trabajador", icon: "T" },
            { href: "/remuneraciones/ficha", label: "Remuneraciones-Ficha",tittle: "Ficha", icon: "F" },
            { href: "/remuneraciones/procesos", label: "Remuneraciones-Procesos",tittle: "Procesos", icon: "P" },
            { href: "/remuneraciones/archivos/", label: "Remuneraciones-Template",tittle: "Template", icon: "T" },
          ],
        },
        {
          title: "Asistencia",
          iconTitle: "ASISTENCIA",
          label: "Menu-Asistencia",
          href: "#asistencias",
          id: "asistencias",
          roles: [1, 2, 3],
          submenu: [
            { href: "/asistencia", label: "Asistencia-Control",tittle: "Control", icon: "C" },
            { href: "/asistencia", label: "Asistencia-Reporte",tittle: "Reporte", icon: "R" },
          ],
        },
        {
          title: "Control Guardias",
          iconTitle: "CONTROL GUARDIAS",
          label: "Menu-Control-Guardias",
          href: "#marcacion",
          id: "marcacion",
          roles: [1, 2, 3],
          submenu: [
            { href: "/marcacion", label: "Control-Guardias-Marcación",tittle: "Marcación", icon: "M" },
            { href: "/marcacion/reporte", label: "Control-Guardias-Reportes",tittle: "Reportes", icon: "R" },
            { href: "/marcacion/scentro", label: "Control-Guardias-Centros",tittle: "Centros", icon: "C" },
          ],
        },
        {
          title: "Gestión del Contador",
          iconTitle: "GESTION DEL CONTADOR",
          label: "Menu-Gestion-Contador",
          href: "#gcontador",
          id: "gcontador",
          roles: [1, 2, 3],
          submenu: [
            { href: "/gcontador/gremu", label: "Gestion-Contador-Remuneraciones",tittle: "Remuneraciones", icon: "R" },
            { href: "/gcontador/honorario", label: "Gestion-Contador-Honorario",tittle: "Honorarios", icon: "H" },
            { href: "/gcontador/ingreso", label: "Gestion-Contador-Ingreso",tittle: "Ingresos", icon: "I" },
            { href: "/gcontador/pimpuesto", label: "Gestion-Contador-Impuesto",tittle: "impuestos", icon: "i" },
          ],
        },
        {
          title: "Administración",
          iconTitle: "office",
          label: "Menu-Configuración",
          href: "#configuracion",
          id: "configuracion",
          roles: [1, 2],
          submenu: [
            { href: "/usuarios/usuario", label: "Configuración-Usuarios",tittle: "Usuarios", icon: "U" },
            { href: "/configuracion/roles", label: "Configuración-Roles",tittle: "Roles", icon: "R" },
            { href: "/configuracion/periodo", label: "Configuración-Periodo",tittle: "Periodos", icon: "R" },
          ],
        }
      ],
    };
  },
  computed: {
    isUserAuthorized() {
      return this.user.rol_id === 1 || this.user.rol_id === 2 || this.user.tipo === 1;
    },
    filteredMenuOptionsByPermissions() {
      return this.menuOptions.filter(option => {
        const perm = this.permroles.find(role => role.menu.nombre === option.label);
        return perm && perm.activo === 1 && option.roles.includes(this.user.rol_id);
      });
    }
  },
  methods: {
    filteredSubMenuOptions(submenu) {
      // Filtra los submenús basándose en los permisos
      return submenu.filter(sub => {
        const perm = this.permroles.find(role => role.menu.nombre === sub.label);
        return perm && perm.activo === 1;
      });
    },
    async GET_DATA(path) {
      const res = await this.$api.$get(path);
      return res;
    },
    hideSideNav() {
      let side = document.getElementById('sidenav-main');
      side.classList.toggle("d-none");
      document.getElementById('sidenav-main').classList.toggle(this.theme === 'dark-version' ? 'bg-dark' : 'bg-white');
    },
  },
  mounted() {
    let user = localStorage.getItem('userAuth');
    this.user = JSON.parse(user);

    this.$nextTick(async () => {
      try {
        const response = await this.GET_DATA('tPermRoles/filtro?filtro=' + this.user.rol_id);
        this.permroles = response;
        console.log("Permisos cargados:", this.permroles);
      } catch (e) {
        console.error("Error al cargar permisos:", e);
      }
    });
  },
}
</script>
