const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    window.location.href = "index.html";
}

document.getElementById("userName").textContent = currentUser.fullname;

const plants = JSON.parse(localStorage.getItem("plants")) || [];

const userPlants = plants.filter(plant => plant.userId === currentUser.id);

const totalPlants = userPlants.length;
const indoorPlants = userPlants.filter(plant => plant.locationType === "Indoor").length;
const outdoorPlants = userPlants.filter(plant => plant.locationType === "Outdoor").length;
const healthyPlants = userPlants.filter(plant => plant.healthStatus === "Healthy").length;

document.getElementById("totalPlants").textContent = totalPlants;
document.getElementById("indoorPlants").textContent = indoorPlants;
document.getElementById("outdoorPlants").textContent = outdoorPlants;
document.getElementById("healthyPlants").textContent = healthyPlants;

document.getElementById("summaryTotal").textContent = totalPlants;
document.getElementById("summaryIndoor").textContent = indoorPlants;
document.getElementById("summaryOutdoor").textContent = outdoorPlants;
document.getElementById("summaryHealthy").textContent = healthyPlants;

const ctx = document.getElementById("plantChart");

new Chart(ctx, {
    type: "doughnut",
    data: {
        labels: ["Indoor Plants", "Outdoor Plants"],
        datasets: [{
            data: [indoorPlants, outdoorPlants],
            backgroundColor: ["#a8c4a2", "#556b2f"],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }
});