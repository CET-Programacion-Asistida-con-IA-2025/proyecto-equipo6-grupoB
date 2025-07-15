document.addEventListener('DOMContentLoaded', () => {
  const abrirBtn = document.getElementById('abrirAsistente');
  const cerrarBtn = document.getElementById('cerrarAsistente');
  const chatBox = document.getElementById('asistenteVirtual');
  const chatLog = document.getElementById('chatLog');
  const userInput = document.getElementById('userInput');
  const enviarBtn = document.getElementById('enviarBtn');

  const menu = `
✨ <strong>Hola, soy tu asistente virtual.</strong><br>
☞ Elegí una opción escribiendo su número:<br>
1. ¿Cómo puedo reciclar correctamente en casa?<br>
2. ¿Dónde están los puntos verdes?<br>
3. ¿Qué son las 4 R's de la sostenibilidad?<br>
4. ¿Cómo reducir el uso de plástico?<br>
5. ¿Cómo participar en acciones comunitarias?<br>`;

  const respuestas = {
    1: "⭐ Separá residuos reciclables (plástico, cartón, vidrio, metales) y llevalos limpios y secos a un punto verde o contenedor amarillo.",
    2: "🗺️ Podés ver los puntos verdes en nuestra sección 'Mapa de Puntos Verdes'.",
    3: "♻️ Las 4 R's son: Reducir, Reutilizar, Reciclar y Reparar.",
    4: "🚫 Evitá plásticos de un solo uso como sorbetes, botellas, bolsas. Usá botellas reutilizables, bolsas de tela, etc.",
    5: "👥 Unite a jornadas de limpieza, ferias sustentables o acciones escolares. Consultá a tu municipio."
  };

  function mostrarMensaje(texto, clase) {
    const mensaje = document.createElement('div');
    mensaje.className = clase;
    mensaje.innerHTML = texto;
    chatLog.appendChild(mensaje);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function procesarEntrada(texto) {
    const valor = texto.trim();
    if (respuestas[valor]) {
      mostrarMensaje(respuestas[valor], 'respuesta');
    } else {
      mostrarMensaje('⚠️ Opción no válida. Escribí un número del 1 al 5.', 'respuesta');
    }
  }

  enviarBtn.addEventListener('click', () => {
    const input = userInput.value;
    if (input !== '') {
      mostrarMensaje(input, 'usuario');
      procesarEntrada(input);
      userInput.value = '';
    }
  });

  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      enviarBtn.click();
    }
  });

  abrirBtn.addEventListener('click', () => {
    chatBox.classList.add('abierto');
    chatLog.innerHTML = '';
    mostrarMensaje(menu, 'menu');
  });

  cerrarBtn.addEventListener('click', () => {
    chatBox.classList.remove('abierto');
  });
});
