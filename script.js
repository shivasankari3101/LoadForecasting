const files = ["nextDayPredictions.json", "nextWeekPredictions.json", "nextMonthPredictions.json"];
const nodes = [
    {
        name: "Node1",
        ip: "192.168.0.104:5500"
    },
    {
        name: "Node2",
        ip: "192.168.0.104:5500"
    },
    {
        name: "Node3",
        ip: "192.168.0.104:5500"
    },
];
const results = [];




    async function generateResults(){
        for(const node of nodes){
            const ipAddress = node.ip;
            const obj = {};
            obj.name = node.name;
            obj.node = node.ip;
            for(const file of files){        
                const fileURL = `http://${ipAddress}/${node.name}/Predictions/${file}`; 
                const data = await readFile(fileURL);
                Object.assign(obj, data);
            }
            results.push(obj); 
        }

        document.querySelector("#chartSelector").style.display = "block";
        displayChart();
    }

    async function readFile(fileURL){   
        try{
            const response = await fetch(fileURL);
            const data= await response.json();
            const jsonData = JSON.parse(data);
            return jsonData;
        }catch(error){
            console.log(`Error in ${node.name}:`, error);
        }
    }

    generateResults();



