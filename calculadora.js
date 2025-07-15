document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('huellaForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const botellas = parseInt(document.getElementById('botellas').value) || 0;
      const bolsas = parseInt(document.getElementById('bolsas').value) || 0;
      const envases = parseInt(document.getElementById('envases').value) || 0;

      const totalSemanal = botellas + bolsas + envases;
      const totalAnual = totalSemanal * 52;

      let mensaje = "";

      if (totalAnual > 500) {
        mensaje = "🌍 ¡Cuidado! Tu huella plástica anual es alta: " + totalAnual + " piezas. Reducí tu consumo.";
      } else if (totalAnual > 0) {
        mensaje = "✅ ¡Buen trabajo! Tu huella anual estimada es de " + totalAnual + " piezas plásticas.";
      } else {
        mensaje = "🤔 No ingresaste ningún número válido.";
      }

      alert(mensaje);
      document.getElementById('resultado').textContent = mensaje;
    });
  }
});