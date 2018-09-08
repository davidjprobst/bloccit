const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("Topic", () => {

  describe("#create()", () => {

      it("should create a topic object with a title and description", (done) => {
        Topic.create({
          title: "Pros of Cryosleep during the long journey",
          description: "1. Not having to answer the 'are we there yet?' question."
        })
        .then((topic) => {

          expect(topic.title).toBe("Pros of Cryosleep during the long journey");
          expect(topic.description).toBe("1. Not having to answer the 'are we there yet?' question.");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

  });

});
