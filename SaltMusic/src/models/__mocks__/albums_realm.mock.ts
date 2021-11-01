export default class Realm {
    schema: any = [];
    data: any = [];
    constructor(params: any) {
        require('lodash').each(params.schema, (schema: { name: string | number; }) => {
            this.data[schema.name] = [];
            this.data[schema.name].filtered = () => {
                return this.data[schema.name];
            };
        });
        this.schema = params.schema;
    }
    objects(schemaName: string | number) {
        return this.data[schemaName];
    }
    write(fn: () => void) {
        fn();
    }
    create(schemaName: string | number, data: any) {
        this.data[schemaName].push(data);
        return data;
    }
};