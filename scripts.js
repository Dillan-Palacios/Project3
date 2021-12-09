let boton = document.getElementById('pushActivator')
let sWorker = null

const publicKey = "BLIpK31w96SSxmSn7wChUSBnUaiHfvTfQJh04J5fRQ-R9T0ehVK29eS4ne97UJiSqJxFEHWj41YM5v27_aRxahI"
let usuarioSuscrito = null

if('serviceWorker' in navigator && 'PushManager' in window){
    navigator.serviceWorker.register('sw.js').then(swor=>{
        sWorker = swor
        console.log(sWorker)
        inicializarUI()
    }).catch(err=>{
        console.log('El service worker no se pudo registrar')
    })
}else{
    boton.textContent="Notificaciones Push No Soportadas"
}


function inicializarUI(){
    sWorker.pushManager.getSubscription().then(suscripcion=>{
        if(suscripcion !== null){
            usuarioSuscrito = true
            console.log("Suscrito")
            mostrarConfiguracionSuscripcion(suscripcion)
        }else{
            usuarioSuscrito = false
            console.log("No Suscrito")
        }
        actualizarBoton()
    })
}

function actualizarBoton(){
    if(usuarioSuscrito){
        boton.textContent="Cancelar Suscripcion"
    }else{
        boton.textContent="Suscribirme a Push"
    }

    boton.disabled = false
}

boton.addEventListener('click',()=>{
    console.log('Dió click', usuarioSuscrito)
    if(usuarioSuscrito){
        ///Eliminar la suscripcion
    }else{
        ///Activar la suscripcion
        suscribirUsuario()
    }
})


function suscribirUsuario(){
    const serverKey = urlB64ToUint8Array(publicKey)
    sWorker.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:serverKey
    }).then(suscripcion=>{
        mostrarConfiguracionSuscripcion(suscripcion)
        usuarioSuscrito = true
        actualizarBoton()
    })
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function mostrarConfiguracionSuscripcion(suscripcion){
    let susc = document.getElementById('suscripcion')
    if(suscripcion){
        susc.textContent= JSON.stringify(suscripcion)
    }
  }