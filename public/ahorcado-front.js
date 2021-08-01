
const url = location.origin + '/api/ahorcado'
const letras = document.querySelector('#letras')
const notificacion = document.querySelector('#notificacion')
const contenedorImagen = document.querySelector('#contenedor-img')
const btnEnviar = document.querySelector('#enviar')
const entrada = document.querySelector('#entrada')
let errores = 0;

new_Game()


btnEnviar.addEventListener('click',()=>{
    enviar_letra(entrada.value)
})
entrada.addEventListener('keydown',(e)=>{
    if(e.key =='Enter'){
        enviar_letra(entrada.value)
    }
})

function new_Game(){
    errores = 0;
    entrada.focus()
    setImagen(0)
    fetch(url + '/newGame')
    .then(response => response.json())
    .then(data => {
        setBoard(data.length)
    })
    
}

function setBoard(num){
    notificacion.textContent = `${num} letras` 
    letras.innerHTML= ''
    for (let i=0;i<num;i++){
        letras.innerHTML += `<input id="i${i}"type="text" maxlength="1" disabled>`
    }
}

function setImagen(num){
    if( num == 0){
        contenedorImagen.innerHTML = null;
    }else{
        contenedorImagen.innerHTML = `<img src="./img/a${num}.png"></img>`
    }
}

function limpiarEntrada() {
    entrada.value = ''
    entrada.focus()
}

function enviar_letra(letra){
    if( letra != '' || letra != null){
        fetch(url + `/check?letra=${letra}`)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => validate(data));
        limpiarEntrada()
    }
}

function validate(data){
    if(data[0]== -1){
        return
    }else{
        if(data.every(e => e == null) ){
            incorrecto()
        }else{
            correcto(data)
            verificarSiGano()
        }    
    }
}

function correcto(data){
    notificacion.textContent = 'Correcto!'
    for (let i=0 ; i < data.length ; i++){
        if (data[i] != null){
            document.querySelector(`#i${i}`).value = data[i]
        }
    }
}

function verificarSiGano() {
    if(Object.values(letras.children).every(e => e.value != '')){
        gameOver('Felicitaciones Ganaste!')
    }    
}


function incorrecto(){
    notificacion.textContent = 'Incorrecto!'
    if(errores < 7 ){
        setImagen(++errores)
    }else{
        gameOver('Has Perdido')
    }
    
}


function gameOver(mensaje) {
    swal({
        title:mensaje,
        text:`Errores: ${errores}`,
        buttons:['Salir','Jugar de nuevo'],
        background:'var(--fondo-secundario)',
        closeOnClickOutside: false,
    }).then((value)=>{
        if(value){
            new_Game()
        }else{
            window.location.href = '/'
        }
        
    })
}