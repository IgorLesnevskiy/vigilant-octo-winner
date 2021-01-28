import APIBuilder from "./_api";

const API_URL = process.env.REACT_APP_GATEWAY;

class CitiesApi extends APIBuilder {
    constructor() {
        super({
            baseURL: API_URL,
        });
    }

    getCityById(id) {
        return this.get("/data/cities.json")
            .then((response) => {
                return response.json();
            })
            .then((cities) => {
                const city = cities.find((u) => u.id === id);

                return { data: city ?? null };
            })
            .catch((e) => {
                throw new Error(e);
            });
    }

    getCitiesList() {
        return this.get("/data/cities.json")
            .then((response) => {
                return response.json();
            })
            .then((cities) => {
                return { data: cities ?? null };
            })
            .catch((e) => {
                throw new Error(e);
            });
    }
}

export default new CitiesApi();
