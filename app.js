const api = "https://api.sawatchlabs.com/models/13/2017"
const attributes = ["vehicle_year", "make", "vehicle_model", "displacement", "cylinders", "class"]
const swtTable  =  document.getElementById("swt-table")

document.addEventListener("DOMContentLoaded", () => {
    fetchApiInformation(api)
        .then(sawatchData => sortSawatchData(sawatchData))
        .then((sortedSawatchData) => addDataToTable(sortedSawatchData))
  });

fetchApiInformation = api => {
    return fetch(api)
        .then(response => response.json())
        .then(result => [result.data][0])
        .catch(error => console.error(error))
}

sortSawatchData = sawatchData => {
    sortedSawatchData = sawatchData.sort((a, b) => {
        if(a.vehicle_model > b.vehicle_model) {
            return 1;
        } else if (a.vehicle_model < b.vehicle_model) {
            return -1;
        } else {
            return 0
        }
    })
    return sortedSawatchData
}

addDataToTable = sortedSawatchData => {
    sortedSawatchData.map((carInfo) => {
        createRow(carInfo, attributes)  
    })
}

createRow = (carInfo, attributes) => {
    newRow = document.createElement("tr")
    newRow.className = carInfo.id
    swtTable.appendChild(newRow)
    createDataCells(carInfo, newRow, attributes)
}

createDataCells = (carInfo, newRow, attributes) => {
    attributes.map((attribute) => {
        newCell = document.createElement("td")
        newCell.innerHTML = carInfo[attribute]
        newRow.appendChild(newCell)
    })
}