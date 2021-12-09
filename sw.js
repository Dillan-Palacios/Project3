self.addEventListener('push', event=>{
    console.log(event)
    let titulo = "HAZ RECIBIDO UNA NOTIFICACION"
    let cuerpo = {
        body: 'Aqui va el texto de la notificación',
        icon:'icono.png'
    }

    self.registration.showNotification(titulo,cuerpo)
})

self.addEventListener('notificationclick',event=>{
    event.notification.close()

    event.waitUntil(
        clients.openWindow('https://www.utags.edu.mx')
    )
})