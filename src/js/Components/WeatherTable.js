export class WeatherTable {
    constructor() {
        this.table = document.createElement("table");
    }

    fillWithData(dataRows) {
        this.table.innerHTML = "";

        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const headRow = document.createElement("tr");
        const bodyRow = document.createElement("tr");

        for (const row of dataRows) {
          const th = document.createElement("th");
          const date = new Date(row.dt_txt);
          th.textContent = date.toLocaleDateString();
          const td = document.createElement("td");
          td.textContent = `${Math.round(row.main.temp)} °C`;
          headRow.appendChild(th);
          bodyRow.appendChild(td);
        }

        thead.appendChild(headRow);
        tbody.appendChild(bodyRow);
        this.table.appendChild(thead);
        this.table.appendChild(tbody);
    }
}