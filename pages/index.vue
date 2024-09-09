<template>
    <div>
        <main class="main-content main-content-bg mt-0 ps">
      
            <section>
                <div class="page-header min-vh-75">
                    <div class="contenedor">
                        <div class="formulario">
                          <form action="#">
           
                                  
                                        <img src="/assets/img/Logo.png" alt="image" class=""
                                        style="width: 300px; height: 100px;" />
                                        <h2>
                                            Bienvenido
                                        </h2>
                                        <p class="mb-0">Ingresa tu usuario y tu password para iniciar.</p>
                            
                               
                                        <div class="input-conainer">
                                           
                                            <i class="fa-solid fa-envelope fa-personalizado"></i>
                                                <input type="text" v-model="model.username" required>
                                                <label for="#">Usuario </label>
                                        </div>
                                                    <div role="form" class="input-conainer">
                                            <i class="fa-solid fa-lock fa-personalizado"></i>
                                                <input type="password" v-model="model.password" required>
                                                    <label for="#">Password</label>
                                        </div>
                                        <div class="text-center">
                                                <button type="button"
                                                    class="button-personalizado"
                                                    @click="Login">
                                                    Ingresar
                                                </button>
                                            </div>
                                    </form>
                                </div>
                                
                            </div>
                      
                  
                 
                </div>
            </section>
            <div class="ps__rail-x" style="left: 0px; bottom: 0px">
                <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px"></div>
            </div>
            <div class="ps__rail-y" style="top: 0px; right: 0px">
                <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px"></div>
            </div>
        </main>
    </div>
  </template>
  <script>
  export default {
    data() {
        return {
            model: {
                username: '',
                password: ''
            }
  
        }
    },
    methods: {
        async Login() {
            try {
                const res = await this.$api.$post('login',this.model);
                let user = res
                if(user.hasOwnProperty('errors')){
                    this.$swal
                    .fire({
                    title: "Credenciales no validas",
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
  
                  
                })
                    
                }else{
                    localStorage.setItem('userAuth',JSON.stringify(user))
                    this.$router.push('inicio')
                }
  
                
            } catch (e) {
                console.log(e)
                this.$swal.fire({
                    title: "No se puede iniciar sesion",
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'Ok',
                })
  
            }
        }
    }
  }
  </script>
  
<style>
*{
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
}
section{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(rgba(5, 5, 12, 0.75), rgba(5, 5, 12, 0.75)),
     url(/assets/img/fondo.jpg) no-repeat;
    background-position: center;
    background-size: cover;
}

.contenedor{
    position: relative;
    width: 400px;
    border: 2px solid rgba(255, 255, 255, .6);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.contenedor h2{
    font-size: 2.3rem;
    color: white;
    text-align: center;
}
.contenedor p{
    font-size: 1    rem;
    color: white;
    text-align: center;
}
.input-conainer{
    position: relative;
    margin: 30px 0;
    width: 300px;
    border-bottom: 2px solid white;
}
.input-conainer label{
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: white;
    font-size: 1rem;
    pointer-events: none;
    transition: .6s;
    font-weight: bold;
}

input:focus ~ label,
input:valid ~ label{
    top: -5px;
}

.input-conainer input{
    width: 100%;
    height: 50px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: - 35px 0 5px;
    color: white;
}

.fa-personalizado{
    position: absolute;
    color: white;
    font-size: 1.6rem;
    top: 19px;
    right: 8px;
}

.olvicar{
    margin: -15px 0 15px;
    font-size: .9em;
    color: white;
    display: flex;
    justify-content: center;
}

.button-personalizado{
    width: 100%;
    height: 45px;
    border-radius: 40px;
    background-color: white;
    border: none;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    font-size: 1rem;
    transition: .4s;
}

.button-personalizado:hover{
    opacity: .9;
}


</style>