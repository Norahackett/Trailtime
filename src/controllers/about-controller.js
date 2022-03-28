export const aboutController = {
    index: {
        handler: function (request, h) {
            const viewData = {
                title: "About Trailtime",
            };
            return h.view("about-view", viewData);
        },
    },
};