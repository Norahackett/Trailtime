import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTraillists, testTrails, lenister, ulster, munster, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Trail Model tests", () => {

    let ulsterList = null;

    setup(async () => {
        db.init("mongo");
        await db.traillistStore.deleteAllTraillists();
        await db.trailStore.deleteAllTrails();
        ulsterList = await db.traillistStore.addTraillist(ulster);
        for (let i = 0; i < testTrails.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testTrails[i] = await db.trailStore.addTrail(ulsterList._id, testTrails[i]);
        }
    });

    test("create single trail", async () => {
        const lenisterList = await db.traillistStore.addTraillist(lenister);
        const trail = await db.trailStore.addTrail(lenisterList._id, munster)
        assert.isNotNull(trail._id);
        assertSubset (munster, trail);
    });

    test("get multiple trails", async () => {
        const trails = await db.trailStore.getTrailsByTraillistId(ulsterList._id);
        assert.equal(testTrails.length, testTrails.length)
    });

    test("delete all trails", async () => {
        const trails = await db.trailStore.getAllTrails();
        assert.equal(testTrails.length, trails.length);
        await db.trailStore.deleteAllTrails();
        const newTrails = await db.trailStore.getAllTrails();
        assert.equal(0, newTrails.length);
    });

    test("get a trail - success", async () => {
        const lenisterList = await db.traillistStore.addTraillist(lenister);
        const trail = await db.trailStore.addTrail(lenisterList._id, munster)
        const newTrail = await db.trailStore.getTrailById(trail._id);
        assertSubset (munster, newTrail);
    });

    test("delete One Trail - success", async () => {
        await db.trailStore.deleteTrail(testTrails[0]._id);
        const trails = await db.trailStore.getAllTrails();
        assert.equal(trails.length, testTraillists.length - 1);
        const deletedTrail = await db.trailStore.getTrailById(testTrails[0]._id);
        assert.isNull(deletedTrail);
    });

    test("get a trail - bad params", async () => {
        assert.isNull(await db.trailStore.getTrailById(""));
        assert.isNull(await db.trailStore.getTrailById());
    });

    test("delete one trail - fail", async () => {
        await db.trailStore.deleteTrail("bad-id");
        const trails = await db.trailStore.getAllTrails();
        assert.equal(trails.length, testTraillists.length);
    });
});