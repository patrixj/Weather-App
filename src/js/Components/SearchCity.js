export class SearchCity {
    constructor() {
        this.jsonUrl = "city.list.json";
        this.container = document.createElement("div");
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Search(min 3 characters)"
        this.input.addEventListener("input", this.filterCities.bind(this));
        this.input.addEventListener("keyup", this.onEnter.bind(this));
        this.whisperer = document.createElement("div");
        this.whisperer.classList.add("whisperer");
        this.container.appendChild(this.input);
        this.container.appendChild(this.whisperer);
    }

    async init(onRowClick) {
        this.data = await (await fetch(this.jsonUrl)).json();
        this.onRowClick = onRowClick;
    }

    filterCities(event) {
        const value = event.target.value;
        this.whisperer.innerHTML = "";

        if (!value || value.length < 3)
            return;

        const matched = this.data.filter(d => d.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()))
            .sort((d1, d2) => d1.name.length - d2.name.length);
        for (const match of matched) {
            const row = document.createElement("div");
            row.textContent = match.name + `(${match.country})`;
            this.whisperer.appendChild(row);
            row.addEventListener("click", e => {
                const prev = this.whisperer.querySelector(".selected");
                if (prev)
                    prev.classList.remove("selected");
                row.classList.add("selected");
                this.input.value = row.textContent;
                this.onRowClick(match);
            });
        }
    }

    onEnter(event) {
        if (event.key == "Enter" && this.input.value && this.whisperer.childNodes.length > 0) {
            this.whisperer.childNodes[0].click();
        }
    }
}