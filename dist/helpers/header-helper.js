export class MyHeaders {
    _headers;
    _normalizedNames;
    constructor() {
        this._headers = new Map();
        this._normalizedNames = new Map();
    }
    append(name, value) {
        const existingValues = this.getAll(name);
        if (!existingValues) {
            this.set(name, value);
        }
        else {
            this.set(name, value, existingValues);
        }
    }
    delete(name) {
        const lcName = name.toLowerCase();
        this._normalizedNames.delete(lcName);
        this._headers.delete(lcName);
    }
    get(name) {
        const values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 1 ? values : values[0];
    }
    has(name) {
        return this._headers.has(name.toLowerCase());
    }
    keys() {
        return Array.from(this._normalizedNames.values());
    }
    values() {
        return Array.from(this._headers.values());
    }
    uniq(a) {
        return Array.from(new Set(a));
    }
    toJSON() {
        const serialized = {};
        this._headers.forEach((values, name) => {
            const split = [];
            values.forEach(v => {
                split.push(...v.split(','));
            });
            const _name = this._normalizedNames.get(name);
            if (_name && split.length) {
                serialized[_name] = split.length > 1 ? split : split[0];
            }
        });
        return serialized;
    }
    toArrayResult() {
        const obj = this.toJSON();
        const result = [];
        Object.keys(obj).forEach(key => {
            const val = obj[key];
            if (Array.isArray(val)) {
                val.forEach(val2 => {
                    result.push([key, val2]);
                });
            }
            else {
                result.push([key, val]);
            }
        });
        return result;
    }
    getAll(name) {
        return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
    }
    set(name, value, oldValues) {
        let _values = Array.isArray(value) ? [...value] : [value];
        if (oldValues) {
            _values = [..._values, ...oldValues];
        }
        _values = this.uniq(_values);
        this._headers.set(name.toLowerCase(), _values);
        this.setNormalizedName(name);
    }
    setNormalizedName(name) {
        const lcName = name.toLowerCase();
        if (!this._normalizedNames.has(lcName)) {
            this._normalizedNames.set(lcName, name);
        }
    }
}
//# sourceMappingURL=header-helper.js.map