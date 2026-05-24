const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    window.location.href = "index.html";
}

const plantForm = document.getElementById("plantForm");
const plantCollection = document.getElementById("plantCollection");

function getPlants(){
    return JSON.parse(localStorage.getItem("plants")) || [];
}

function savePlants(plants){
    localStorage.setItem("plants", JSON.stringify(plants));
}

function displayPlants(){
    const plants = getPlants();
    const userPlants = plants.filter(plant => plant.userId === currentUser.id);

    plantCollection.innerHTML = "";

    if(userPlants.length === 0){
        plantCollection.innerHTML = `
            <div class="col-12">
                <div class="alert alert-success">
                    No plants added yet. Add your first plant above 🌿
                </div>
            </div>
        `;
        return;
    }

    userPlants.forEach(plant => {
        plantCollection.innerHTML += `
            <div class="col-md-4">
                <div class="saved-plant-card shadow-sm">
                    <img src="${plant.image}" class="saved-plant-img" alt="${plant.name}">
                    <div class="p-4">
                        <h5>${plant.name}</h5>
                        <p><strong>Type:</strong> ${plant.type}</p>
                        <p><strong>Location:</strong> ${plant.locationType}</p>
                        <p><strong>Sunlight:</strong> ${plant.sunlight}</p>
                        <p><strong>Watering:</strong> ${plant.wateringSchedule}</p>
                        <span class="health-badge">${plant.healthStatus}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

if(plantForm){
    plantForm.addEventListener("submit", function(e){
        e.preventDefault();

        const imageFile = document.getElementById("plantImage").files[0];

        const reader = new FileReader();

        reader.onload = function(){
            const plants = getPlants();

            plants.push({
                id: Date.now(),
                userId: currentUser.id,
                name: document.getElementById("plantName").value,
                type: document.getElementById("plantType").value,
                locationType: document.getElementById("locationType").value,
                sunlight: document.getElementById("sunlight").value,
                wateringSchedule: document.getElementById("wateringSchedule").value,
                healthStatus: document.getElementById("healthStatus").value,
                image: reader.result
            });

            savePlants(plants);

            alert("Plant added successfully!");

            plantForm.reset();

            displayPlants();
        };

        reader.readAsDataURL(imageFile);
    });
}

displayPlants();