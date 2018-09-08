const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Why we love cats",
        description: "Photos of cats doing things that make humans love them"
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My cat is so funny",
          body: "He does this weird thing.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });


  describe("#create()", () => {

      it("should create a topic object with a title and description", (done) => {
        Topic.create({
          title: "Cats do a lot of weird things",
          description: "Here's a cat stuck in a cardboard box"
        })
        .then((topic) => {

          expect(topic.title).toBe("Cats do a lot of weird things");
          expect(topic.description).toBe("Here's a cat stuck in a cardboard box");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

      it("should not create a topic with missing title or description", (done) => {
         Topic.create({
           title: "Cats doing cat things"
         })
         .then((topic) => {
           done();
         })
         .catch((err) => {
           expect(err.message).toContain("Topic.description cannot be null");
           done();
         })
       });
  });

  describe("#getPost()", () => {

      it("should return all associates posts", (done) => {

        this.topic.getPosts()
        .then((associatedPosts) => {
          expect(associatedPosts.map(post => post.title)).toContain("My cat is so funny");
          done();
        });

      });

    });

});
