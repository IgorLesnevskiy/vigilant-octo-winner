import APIBuilder from "./_api";

const API_URL = process.env.REACT_APP_GATEWAY;

class UsersApi extends APIBuilder {
    constructor() {
        super({
            baseURL: API_URL,
        });
    }

    getUserById(id) {
        return this.get("/data/users.json")
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                const user = users.find((u) => u.id === id);

                return { data: user ?? null };
            })
            .catch((e) => {
                throw new Error(e);
            });
    }

    updateUserById(id, data = {}) {
        console.log(id, data);

        return Promise.resolve();
    }

    getUsersList() {
        return this.get("/data/users.json")
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                return { data: users ?? null };
            })
            .catch((e) => {
                throw new Error(e);
            });
    }
}

export default new UsersApi();
