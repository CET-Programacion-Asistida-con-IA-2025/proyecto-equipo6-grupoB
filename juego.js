document.addEventListener('DOMContentLoaded', () => {
  const preguntas = [
    {
      texto: "Una botella de plástico vacía va en...",
      opciones: ["Contenedor orgánico", "Contenedor reciclable", "Basura común"],
      correcta: 1
    },
    {
      texto: "¿Qué color suele representar el contenedor de reciclables?",
      opciones: ["Verde", "Azul", "Rojo"],
      correcta: 1
    },
    {
      texto: "¿Cuál de estos materiales es compostable?",
      opciones: ["Cáscara de banana", "Vaso de telgopor", "Botella de vidrio"],
      correcta: 0
    },
    {
      texto: "¿Qué significa reducir en las 4R?",
      opciones: ["Separar la basura", "Consumir menos", "Reutilizar envases"],
      correcta: 1
    },
    {
      texto: "¿Qué acción es un ejemplo de reutilizar?",
      opciones: ["Tirar una botella", "Usar una bolsa de tela", "Comprar botellas nuevas"],
      correcta: 1
    },
    {
      texto: "¿Qué se debe hacer con las pilas usadas?",
      opciones: ["Tirarlas con la basura", "Llevarlas a un punto limpio", "Enterrarlas"],
      correcta: 1
    },
    {
      texto: "¿Qué es la huella de carbono?",
      opciones: ["Un tipo de residuo", "Un indicador de contaminación", "Una marca de zapato"],
      correcta: 1
    },
    {
      texto: "¿Cuál es una energía renovable?",
      opciones: ["Petróleo", "Carbón", "Solar"],
      correcta: 2
    },
    {
      texto: "¿Qué producto contamina más?",
      opciones: ["Botella de vidrio", "Bolsa plástica", "Papel reciclado"],
      correcta: 1
    },
    {
      texto: "¿Cuál es una acción sostenible?",
      opciones: ["Usar productos descartables", "Separar residuos", "Comprar sin medir"],
      correcta: 1
    }
  ];

  let preguntaActual = 0;
  let puntaje = 0;

  const preguntaElem = document.getElementById('pregunta');
  const botones = document.querySelectorAll('.opciones button');
  const resultado = document.getElementById('resultadoJuego');

  function mostrarPregunta() {
    const p = preguntas[preguntaActual];
    preguntaElem.textContent = p.texto;
    botones.forEach((btn, i) => {
      btn.textContent = p.opciones[i];
      btn.setAttribute('data-respuesta', i);
    });
    resultado.textContent = '';
  }

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const seleccion = parseInt(boton.getAttribute('data-respuesta'));
      const correcta = preguntas[preguntaActual].correcta;
      if (seleccion === correcta) {
        resultado.textContent = '✅ ¡Correcto!';
        resultado.style.color = '#4CAF50';
        puntaje++;
      } else {
        resultado.textContent = '❌ Incorrecto';
        resultado.style.color = '#D32F2F';
      }

      setTimeout(() => {
        preguntaActual++;
        if (preguntaActual < preguntas.length) {
          mostrarPregunta();
        } else {
          alert(`Juego terminado. Tu puntaje fue: ${puntaje}/${preguntas.length}`);
          location.reload();
        }
      }, 1200);
    });
  });

  mostrarPregunta();
});
