import normalizeUrl from "normalize-url";

export default class APIBuilder {
    static generateSearchParamsString(params = {}) {
        return encodeURI(String(new URLSearchParams(params)));
    }

    static isObject(object) {
        return Object.prototype.toString.call(object) === "[object Object]";
    }

    constructor({ baseURL = "" }) {
        this._base = baseURL;
    }

    get(url = "", searchParams = {}, headers = {}) {
        const requestUrl = this._buildAbsoluteUrl(url, searchParams);

        return fetch(requestUrl, {
            headers,
        });
    }

    _buildAbsoluteUrl(relativeUrl = "", searchParams = {}) {
        const url = new URL(normalizeUrl(`${this._base}${relativeUrl}`));

        if (this.constructor.isObject(searchParams) && Object.keys(searchParams).length) {
            url.search = this.constructor.generateSearchParamsString(searchParams);
        }

        return String(url);
    }
}
