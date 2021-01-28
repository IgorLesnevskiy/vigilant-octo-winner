import { normalize, schema } from "normalizr";

export const cityEntity = new schema.Entity(
    "cities",
    {},
    {
        processStrategy(value, parent, key) {
            const { id, attributes: attr } = value;
            const meta = attr.touched;

            return {
                id,

                name: attr.name,
                population: attr.population,

                createdBy: meta?.created?.id ?? null,
                createdTime: meta?.created?.time ?? null,

                modifiedBy: meta?.modified?.id ?? null,
                modifiedTime: meta?.modified?.time ?? null,
            };
        },
    }
);

export function normalizeCity(originalData) {
    return normalize(originalData, cityEntity);
}
export function normalizeCitiesList(originalData) {
    return normalize(originalData, [cityEntity]);
}
