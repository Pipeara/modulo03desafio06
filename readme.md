# Conversor de Monedas desafio 06 del modulo 03

Este desafio ; es un conversor de monedas que permite convertir un monto en pesos chilenos a otra moneda seleccionada por el usuario. Además, muestra un gráfico con el historial de la moneda seleccionada en los últimos 10 días.


fetchData(currency): Esta función obtiene información sobre el valor de una moneda desde una API. Recibe como parámetro la moneda que se desea consultar y devuelve el último valor y todos los valores históricos de esa moneda.

convertCurrency(): Esta función se ejecuta cuando se hace clic en el botón "Convertir". Verifica que se haya ingresado un monto en pesos chilenos y se haya seleccionado una moneda. Despues se realiza la conversión del monto ingresado a la moneda seleccionada y muestra el resultado. También genera un gráfico actualizado.

createChart(data): Esta función se encarga de crear un gráfico utilizando la biblioteca Chart.js. Utiliza los datos históricos de una moneda para generar las etiquetas (fechas) y los valores necesarios para mostrar el gráfico. Luego se crea un gráfico de línea con esos datos.




















