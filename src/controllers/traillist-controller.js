import { db } from "../models/db.js";
import { TrailSpec } from "../models/joi-schemas.js";


export const traillistController = {
    index: {
        handler: async function (request, h) {
            const traillist = await db.traillistStore.getTraillistById(request.params.id);
            const viewData = {
                title: "Traillist",
                traillist: traillist,
            };
            return h.view("traillist-view", viewData);
        },
    },

    addTrail: {
        validate: {
            payload: TrailSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("traillist-view", { title: "Add trail error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const traillist = await db.traillistStore.getTraillistById(request.params.id);
            const newTrail = {
                name: request.payload.name,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
                description: request.payload.description
            };
            await db.trailStore.addTrail(traillist._id, newTrail);
            return h.redirect(`/traillist/${traillist._id}`);
        },
    },

    deleteTrail: {
        handler: async function(request, h) {
            const traillist = await db.traillistStore.getTraillistById(request.params.id);
            await db.trailStore.deleteTrail(request.params.trailid);
            return h.redirect(`/traillist/${traillist._id}`);
        },
    },
};