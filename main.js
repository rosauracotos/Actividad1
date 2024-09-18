
let palabraIngles = document.getElementById('palabra');
let botonPalabra = document.getElementById('enviarPalabra');

botonPalabra.addEventListener('click', () => {
    let  palabra = palabraIngles.value;
    enviarPalabra(palabra);
    palabraIngles.value="";
});


function enviarPalabra(palabra){

    let url = `https://tv99vdhm1m.execute-api.us-east-1.amazonaws.com/dev/pronunciation?word=${encodeURIComponent(palabra)}`;

    fetch(url, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => mostrarDatos(data))
      .catch((error) =>  mostrarError(error));
}


function mostrarDatos(data){

    let pronunciacion = document.getElementById('resultado');
    let audio = document.getElementById('resultadoAudio');

    pronunciacion.innerHTML = 
    ` <h1>RESULTADO </h1>
      <p> Pronunciacion : ${data.pronunciation_ipa}</p>`;
    audio.innerHTML = 
    `<p> Audio :
    <br>
     <audio controls  src="${data.sound}"></audio>    `;

    console.log(data);
}

function mostrarError(error){
    console.log(error);

    let mensajeError = document.getElementById('error');
    mensajeError.innerHTML = 
    ` <h1>Escribir una palabra valida </h1>`;


}
