const apiUrl = "https://api.sawatchlabs.com/models/13/2017"
const attributes = ["vehicle_year", "make", "vehicle_model", "displacement", "cylinders", "class"]
const swtTable  =  document.getElementById("swt-table")

document.addEventListener("DOMContentLoaded", () => {
    fetchCarInformation(apiUrl)
        .then(carData => sortCarData(carData))
        .then(sortedCarData => addDataToTable(sortedCarData))
});

const fetchCarInformation = apiUrl => {
    return fetch(apiUrl)
        .then(response => response.json())
        .then(result => [result.data][0])
        .catch(error => console.error(error))
}

const sortCarData = carData => {
    return carData.sort((a, b) => {
        if (a.vehicle_model > b.vehicle_model) {
            return 1;
        } else if (a.vehicle_model < b.vehicle_model) {
            return -1;
        } else {
            return 0
        }
    })
}

const addDataToTable = sortedCarData => {
    sortedCarData.map(carInfo => {
        createRow(carInfo, attributes)  
    })
}

const createRow = (carInfo, attributes) => {
    newRow = document.createElement("tr")
    newRow.className = carInfo.id
    swtTable.appendChild(newRow)
    createDataCells(carInfo, newRow, attributes)
}

const createDataCells = (carInfo, newRow, attributes) => {
    attributes.map(attribute => {
        newCell = document.createElement("td")
        newCell.innerHTML = carInfo[attribute]
        newRow.appendChild(newCell)
    })
}