export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target:'server',
  head: {
    title: 'Digital Conect',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favico.ico' },
      { rel: 'stylesheet', href: '/assets/css/nucleo-icons.css' },
      { rel: 'stylesheet', href: '/assets/css/nucleo-svg.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.datatables.net/2.0.8/css/dataTables.bootstrap5.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css' },
      { rel: 'stylesheet', href: '/assets/css/soft-ui-dashboard.min.css' },
      { rel: 'stylesheet', href: '/assets/css/tabla.css' },
      { rel: 'stylesheet', href: '/assets/css/propios.css' },
     
     
      
      
    ],

    script:[
      { src: "https://kit.fontawesome.com/5030de370b.js" },
      { src: "https://use.fontawesome.com/releases/v5.0.8/js/brands.js" },
      { src: "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" },
      { src: "/assets/js/core/popper.min.js" },
      { src: "/assets/js/core/bootstrap.min.js" },
      { src: "/assets/js/plugins/perfect-scrollbar.min.js" },
      { src: "/assets/js/plugins/smooth-scrollbar.min.js" },
      { src: "/assets/js/plugins/dragula/dragula.min.js" },
      { src: "/assets/js/plugins/jkanban/jkanban.js" },
      { src: "/assets/js/plugins/chartjs.min.js" },
      { src: "/assets/js/soft-ui-dashboard.min.js" },
      {src:"/assets/js/plugins/dropzone.min.js"},
      {src:"/assets/js/plugins/datatables.min.js"}, 
      {src:"/assets/js/sesion.js"},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios','vue-sweetalert2/nuxt'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
