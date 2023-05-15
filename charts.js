function drawChart(param, desc, num){
    new Chart(
        document.getElementById(param),
        {
          type: 'line',
          data: {
            labels: Array.from({ length: num }, (_, index) => index + 1),
            datasets: [
              {
                label: `Predictions for the ${desc} for Node1`,
                data: nodes[0][param + "Predictions"].map( val => Number(val) || 0),
                borderColor: "#609966",
                backgroundColor: "#609966"
              },
              {
                label: `Predictions for the  ${desc} for Node2`,
                data: nodes[1][param + "Predictions"].map( val => Number(val) || 0),
                borderColor: "#B2B2B2",
                backgroundColor: "#B2B2B2"
              },
              {
                label: `Predictions for the  ${desc} for Node3`,
                data: nodes[2][param + "Predictions"].map( val => Number(val) || 0),
                borderColor:"#36f301",
                backgroundColor:"#36f301"
              }
            ]
          }
        }
    );
}