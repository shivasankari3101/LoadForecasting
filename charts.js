let chart;
function drawChart(param, desc, num){
  if(chart){
    chart.destroy();
  }
    chart = new Chart(
        document.getElementById("chart"),
        {
          type: 'line',
          data: {
            labels: Array.from({ length: num }, (_, index) => index + 1),
            datasets: [
              {
                label: `Predictions for the ${desc} for Node1`,
                data: results[0][param + "Predictions"].map( val => Number(val) || 0),
                borderColor: "#609966",
                backgroundColor: "#609966"
              },
              {
                label: `Predictions for the  ${desc} for Node2`,
                data: results[1][param + "Predictions"].map( val => Number(val) || 0),
                borderColor: "#B2B2B2",
                backgroundColor: "#B2B2B2"
              },
              {
                label: `Predictions for the  ${desc} for Node3`,
                data: results[2][param + "Predictions"].map( val => Number(val) || 0),
                borderColor:"#36f301",
                backgroundColor:"#36f301"
              }
            ]
          }
        }
    );
}

function displayChart(){
   const param = document.getElementById("chartSelector").value;
   switch(param){
    case 'nextDay':  drawChart("nextDay", "next day", 25);
                    break;
    case 'nextWeek':  drawChart("nextWeek", "next week", 175);
                    break;
    case 'nextMonth': drawChart("nextMonth", "next month", 720);
   }
}

