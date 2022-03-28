import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { trailtimeService } from "./trailtime-service.js";
import { maggie, maggieCredentials, lenister, testTraillists, testTrails, munster } from "../fixtures.js";

suite("Trail API tests", () => {
    let user = null;
    let ulsterTraillist = null;

    setup(async () => {
            trailtimeService.clearAuth();
            user = await trailtimeService.createUser(maggie);
            await trailtimeService.authenticate(maggieCredentials);
            await trailtimeService.deleteAllTraillists();
            await trailtimeService.deleteAllTrails();
            await trailtimeService.deleteAllUsers();
            user = await trailtimeService.createUser(maggie);
            await trailtimeService.authenticate(maggieCredentials);
            lenister.userid = user._id;
            ulsterTraillist = await trailtimeService.createTraillist(lenister);
        });

    teardown(async () => {});

    test("create trail", async () => {
        const returnedTrail = await trailtimeService.createTrail(ulsterTraillist._id, munster);
        assertSubset(munster, returnedTrail);
    });

    test("create Multiple trails", async () => {
        for (let i = 0; i < testTrails.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await trailtimeService.createTrail(ulsterTraillist._id, testTrails[i]);
        }
        const returnedTrails = await trailtimeService.getAllTrails();
        assert.equal(returnedTrails.length, testTrails.length);
        for (let i = 0; i < returnedTrails.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const trail = await trailtimeService.getTrail(returnedTrails[i]._id);
            assertSubset(trail, returnedTrails[i]);
        }
    });

    test("Delete TrailApi", async () => {
        for (let i = 0; i < testTrails.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await trailtimeService.createTrail(ulsterTraillist._id, testTrails[i]);
        }
        let returnedTrails = await trailtimeService.getAllTrails();
        assert.equal(returnedTrails.length, testTrails.length);
        for (let i = 0; i < returnedTrails.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const trail = await trailtimeService.deleteTrail(returnedTrails[i]._id);
        }
        returnedTrails = await trailtimeService.getAllTrails();
        assert.equal(returnedTrails.length, 0);
    });

    test("denormalised traillist", async () => {
        for (let i = 0; i < testTrails.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await trailtimeService.createTrail(ulsterTraillist._id, testTrails[i]);
        }
        const returnedTraillist = await trailtimeService.getTraillist(ulsterTraillist._id);
        assert.equal(returnedTraillist.trails.length, testTrails.length);
        for (let i = 0; i < testTrails.length; i += 1) {
            assertSubset(testTrails[i], returnedTraillist.trails[i]);
        }
    });
});
