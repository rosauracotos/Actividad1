
let palabraIngles = document.getElementById('palabra');
let botonPalabra = document.getElementById('enviarPalabra');
let idContador = 0 ;

const palabrasPronunciacion = document.getElementById('guardar');

botonPalabra.addEventListener('click', () => {
    let  palabra = palabraIngles.value.trim();
    
    if(palabra===""){
        alert("Por favor, ingresa una palabra antes de continuar");
        return;
    }

    enviarPalabra(palabra);
    palabraIngles.value="";
});

function addPalabra (data,palabra){

    const nuevoResultado = document.createElement('div');
          nuevoResultado.innerHTML = `
           <hr>
          <h3>PALABRA : ${palabra}</h3>
          <p>Pronunciación: ${data.pronunciation_ipa}</p>
          <audio controls src="${data.sound}"></audio>
          </br>
      `;
      palabrasPronunciacion.prepend(nuevoResultado);
}


function enviarPalabra(palabra){

    let url = `https://tv99vdhm1m.execute-api.us-east-1.amazonaws.com/dev/pronunciation?word=${encodeURIComponent(palabra)}`;

    fetch(url, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
        addPalabra(data,palabra);
      })
      .catch((error) =>  mostrarError(error));
}


function mostrarError(error){
    console.log(error);
    alert('Escribir una palabra valida' );

}
