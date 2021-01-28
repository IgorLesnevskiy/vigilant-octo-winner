import { normalize, schema } from "normalizr";

const userEntity = new schema.Entity(
    "user",
    {},
    {
        processStrategy(value, parent, key) {
            const { id, attributes: attr } = value;
            const meta = attr.touched;

            return {
                id,

                active: attr.active,
                name: attr.name,
                status: attr.status,
                email: attr.email,
                cityID: attr.city_id,

                avatar: {
                    imageID: attr.avatar,
                    alt: attr.name,
                    title: attr.name,
                },

                personalAgreement: !!attr.agreements.personal,

                createdBy: meta?.created?.id ?? null,
                createdTime: meta?.created?.time ?? null,

                modifiedBy: meta?.modified?.id ?? null,
                modifiedTime: meta?.modified?.time ?? null,
            };
        },
    }
);

export function normalizeUser(originalData) {
    return normalize(originalData, userEntity);
}
export function normalizeUsersList(originalData) {
    return normalize(originalData, [userEntity]);
}
