// Declarar las variables iniciales
const currencySelectedElement = document.querySelector("#currencySelected");
const amountInPesosChilenosElement = document.querySelector("#amountInPesosChilenos");
const currencyChartElement = document.querySelector("#currencyChart");
const resultElement = document.querySelector("#result");

// Buscar indicador en API
const fetchData = async (currency) => {
    try {
        const response = await fetch(`https://mindicador.cl/api/${currency}`);
        const { serie: data } = await response.json();
        // Dividir en un objeto para realizar una llamada
        return { lastValue: data[0].valor, allValue: data };
    } catch (error) {
        console.log(error);
    }
};

// Calcular valor ingresado y mostrarlo
const convertCurrency = async () => {
    try {
        // Comprobar campos sin valores
        if (!amountInPesosChilenosElement.value) { alert("Ingrese el monto en CLP"); return; }
        if (!currencySelectedElement.value) { alert("Seleccione moneda"); return; }
        // Comprobar que el monto sea mayor que cero
        const amount = parseFloat(amountInPesosChilenosElement.value);
        if (isNaN(amount) || amount <= 0) { alert("Ingrese un monto válido mayor que cero"); return; }
        // Calcular con valores ingresados
        const dataCurrency = await fetchData(currencySelectedElement.value);
        // Insertar valor obtenido en resultado
        resultElement.innerHTML = `Resultado: $${(amount / dataCurrency.lastValue).toFixed(2)}`;
        // Rehacer grafico con valores ingresados
        createChart(dataCurrency.allValue);
    } catch (error) {
        console.log(error);
    }
};

// Crear gráfico sin data
let chart = new Chart(currencyChartElement, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Historial últimos 10 días', data: [], borderWidth: 1 }] },
    options: { scales: { y: { beginAtZero: false } } }
});
const createChart = async (data) => {
    try {
      // Eliminar gráfico anterior
      chart.destroy();
      // Rescatar datos para mostrar en gráfico
      const labels = await data.map((label) =>
        new Intl.DateTimeFormat("es-CL").format(new Date(label.fecha))
      );
      const chartData = await data.map((data) => data.valor);
      // Obtener los primeros 10 elementos
      const firstTenLabels = labels.slice(0, 10).reverse();
      const firstTenData = chartData.slice(0, 10).reverse();
      // Crear nuevo gráfico con datos rescatados
      chart = new Chart(currencyChartElement, {
        type: "line",
        data: {
          labels: firstTenLabels,
          datasets: [
            {
              label: "Historial primeros 10 días",
              data: firstTenData,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  document.getElementById("btnConvert").addEventListener("click", convertCurrency);
  



