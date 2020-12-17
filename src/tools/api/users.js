import APIBuilder from "./_api";

// TODO cra по умолчанию поддерживает env-конфигы
// TODO чтобы задать свою env-переменную, нужно прописать ее с REACT_APP_
// TODO если задавать homepage, то public url во всех режимах работы будет смотреть на homepage
// TODO public url можно задавтаь через env-конфигруации
// TODO если не задать public url, то по умолчанию все ресурсы будут с урлом "/", что недопустимо, если мы деплоимся в каталог
// TODO GATEWAY лучше пробрасывать через переменную окружения

const API_URL = process.env.REACT_APP_GATEWAY;

class UsersApi extends APIBuilder {
    constructor() {
        super({
            baseURL: API_URL,
        });
    }

    getFoo() {
        return this.get("/data/users.json")
            .then((response) => {
                return response.json();
            })
            .catch((e) => {
                throw new Error(e);
            });
    }
}

export default new UsersApi();
