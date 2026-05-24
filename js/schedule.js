const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    window.location.href = "index.html";
}

const plants = JSON.parse(localStorage.getItem("plants")) || [];
const userPlants = plants.filter(plant => plant.userId === currentUser.id);

const scheduleTableBody = document.getElementById("scheduleTableBody");

function getStatusClass(status){
    if(status === "Healthy"){
        return "healthy";
    }

    if(status === "Needs Attention"){
        return "attention";
    }

    if(status === "Critical"){
        return "attention";
    }

    if(status === "Archived"){
        return "recovering";
    }

    return "recovering";
}

function getLocationClass(location){
    if(location === "Indoor"){
        return "indoor";
    }

    return "outdoor";
}

if(userPlants.length === 0){
    scheduleTableBody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center py-4">
                No plants added yet. Please add your plants first.
            </td>
        </tr>
    `;
}else{
    userPlants.forEach(plant => {
        scheduleTableBody.innerHTML += `
            <tr>
                <td>
                    <img src="${plant.image}" class="schedule-img" alt="${plant.name}">
                </td>

                <td>
                    <a href="plant_details.html?id=${plant.id}" class="plant-link">
                        ${plant.name}
                    </a>
                </td>

                <td>
                    <span class="location-badge ${getLocationClass(plant.locationType)}">
                        ${plant.locationType}
                    </span>
                </td>

                <td>${plant.sunlight}</td>

                <td>${plant.wateringSchedule}</td>

                <td>
                    <span class="status-badge ${getStatusClass(plant.healthStatus)}">
                        ${plant.healthStatus}
                    </span>
                </td>
            </tr>
        `;
    });
}