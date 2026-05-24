const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    window.location.href = "index.html";
}

const urlParams = new URLSearchParams(window.location.search);
const plantId = Number(urlParams.get("id"));

let plants = JSON.parse(localStorage.getItem("plants")) || [];
let careLogs = JSON.parse(localStorage.getItem("careLogs")) || [];

let plant = plants.find(item => item.id === plantId && item.userId === currentUser.id);

if(!plant){
    window.location.href = "schedule.html";
}

function savePlants(){
    localStorage.setItem("plants", JSON.stringify(plants));
}

function saveCareLogs(){
    localStorage.setItem("careLogs", JSON.stringify(careLogs));
}

function calculateProgress(){
    const plantLogs = careLogs.filter(log => log.plantId === plant.id && log.userId === currentUser.id);
    const totalActivities = plantLogs.length;

    let progress = 0;
    let note = "";

    if(plant.healthStatus === "Healthy"){
        progress = 100;
        note = "Your plant is healthy and stable.";
    }else if(plant.healthStatus === "Recovering"){
        progress = Math.min(70, totalActivities * 10);
        note = "Your plant is recovering. Keep tracking care activities.";
    }else if(plant.healthStatus === "Needs Attention"){
        progress = Math.min(45, totalActivities * 8);
        note = "Your plant needs attention. Follow the care schedule closely.";
    }else if(plant.healthStatus === "Critical"){
        progress = Math.min(20, totalActivities * 5);
        note = "Your plant is in critical condition. Extra care is needed.";
    }else{
        progress = 0;
        note = "This plant is archived and no longer actively tracked.";
    }

    document.getElementById("progressText").textContent = progress + "%";
    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressNote").textContent = note;
}

function displayPlantDetails(){
    document.getElementById("plantImage").src = plant.image;
    document.getElementById("plantName").textContent = plant.name;
    document.getElementById("plantType").textContent = plant.type;
    document.getElementById("plantLocation").textContent = plant.locationType;
    document.getElementById("plantSunlight").textContent = plant.sunlight;
    document.getElementById("plantWatering").textContent = plant.wateringSchedule;
    document.getElementById("plantStatus").textContent = plant.healthStatus;

    document.getElementById("wateringReminder").textContent = "💧 Follow your watering schedule: " + plant.wateringSchedule;
    document.getElementById("sunlightReminder").textContent = "☀️ Sunlight need: " + plant.sunlight;
    document.getElementById("conditionReminder").textContent = "🌱 Current plant condition: " + plant.healthStatus;

    document.getElementById("newStatus").value = plant.healthStatus;

    calculateProgress();
}

function displayCalendar(){
    const calendarGrid = document.getElementById("calendarGrid");
    calendarGrid.innerHTML = "";

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for(let i = 0; i < firstDay; i++){
        calendarGrid.innerHTML += `<div class="calendar-cell empty"></div>`;
    }

    for(let day = 1; day <= totalDays; day++){
        const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const logsForDay = careLogs.filter(log =>
            log.userId === currentUser.id &&
            log.plantId === plant.id &&
            log.careDate === dateString
        );

        let dots = "";

        logsForDay.forEach(log => {
            dots += `<span class="task-dot ${log.taskType}"></span>`;
        });

        calendarGrid.innerHTML += `
            <div class="calendar-cell">
                <strong>${day}</strong>
                <div class="task-dots">${dots}</div>
            </div>
        `;
    }
}

document.getElementById("careLogForm").addEventListener("submit", function(e){
    e.preventDefault();

    careLogs.push({
        id: Date.now(),
        userId: currentUser.id,
        plantId: plant.id,
        careDate: document.getElementById("careDate").value,
        taskType: document.getElementById("taskType").value
    });

    saveCareLogs();

    alert("Care activity saved successfully!");

    document.getElementById("careLogForm").reset();

    displayCalendar();
    calculateProgress();
});

document.getElementById("statusForm").addEventListener("submit", function(e){
    e.preventDefault();

    plant.healthStatus = document.getElementById("newStatus").value;

    plants = plants.map(item => {
        if(item.id === plant.id && item.userId === currentUser.id){
            return plant;
        }

        return item;
    });

    savePlants();

    alert("Plant condition updated!");

    displayPlantDetails();
});

displayPlantDetails();
displayCalendar();