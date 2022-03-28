import { assert } from "chai";
import { trailtimeService } from "./trailtime-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
    setup(async () => {
        trailtimeService.clearAuth();
        await trailtimeService.createUser(maggie);
        await trailtimeService.authenticate(maggieCredentials);
        await trailtimeService.deleteAllUsers();
    });

    test("authenticate", async () => {
        const returnedUser = await trailtimeService.createUser(maggie);
        const response = await trailtimeService.authenticate(maggieCredentials);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test("verify Token", async () => {
        const returnedUser = await trailtimeService.createUser(maggie);
        const response = await trailtimeService.authenticate(maggieCredentials);

        const userInfo = decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });

    test("check Unauthorized", async () => {
        trailtimeService.clearAuth();
        try {
            await trailtimeService.deleteAllUsers();
            assert.fail("Route not protected");
        } catch (error) {
            assert.equal(error.response.data.statusCode, 401);
        }
    });
});