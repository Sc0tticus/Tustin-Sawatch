const swtTable  =  document.getElementById("swt-table")
const attributes = ["vehicle_year", "vehicle_model", "make", "displacement", "cylinders", "class"]
const api = "https://api.sawatchlabs.com/models/13/2017"

document.addEventListener("DOMContentLoaded", () => {
    fetchApiInformation(api)
        .then(sawatchData => sortSawatchData(sawatchData))
        .then((sortedSawatchData) => addDataToTable(sortedSawatchData))
  });

fetchApiInformation = (api) => {
    return fetch(api) 
            .then(response => response.json())
            .then(result => [result.data][0])
            .catch(error => console.error(error))
}

sortSawatchData = (sawatchData) => {
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

addDataToTable = (sortedSawatchData) => {
    sortedSawatchData.map((carInfo) => {
        createRow(carInfo, attributes)  
    })
}

createRow = (carInfo, attributes) => {
    tableRow = document.createElement("tr")
    tableRow.className = carInfo.id
    swtTable.appendChild(tableRow)
    createDataCells(carInfo, tableRow, attributes)
}

createDataCells = (carInfo, row, attributes) => {
    attributes.forEach((attribute) => {
        newCell = document.createElement("td")
        newCell.innerHTML = carInfo[attribute]
        row.appendChild(newCell)
    })
}



