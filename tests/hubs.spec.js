const { getHubByLocation } = require("../db/hubs");

describe("getHubByLocation", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  test("returns the hub with the given location", async () => {
    const hub = await getHubByLocation("Arizona");
    expect(hub).toEqual({
      id: 1,
      location: "Arizona",
    });
  });

  test("throws an error when there is no hub with the given location", async () => {
    await expect(getHubByLocation("Paris")).rejects.toThrow(
      "No hub with a nearby location."
    );
  });
});
