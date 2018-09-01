const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/rules/";
const sequelize = require("../../src/db/models/index").sequelize;
const Rule = require("../../src/db/models").Rule;

describe("routes : rules", () => {

  beforeEach((done) => {
    this.rule;
    sequelize.sync({force: true}).then((res) => {

     Rule.create({
       description: "This is a rule"
     })
      .then((rule) => {
        this.rule = rule;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  describe("GET /rules", () => {

    it("should return a status code 200 and all topics", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Rules");
        done();
      });
    });

  });

});
