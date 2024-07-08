//first method
describe("Approach1 - Hard coded values", () => {
  it("Approach1", () => {
    const requestBody = {
      name: "morpheus",
      job: "leader",
    };

    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users/",
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq("morpheus");
      expect(response.body.job).to.eq("leader");
    });
  });
});

//second method

describe("Approach 2 - Dynamically generating JSON object", () => {
  it("Approach2", () => {
    const requestBody = {
      name: Math.random().toString(5).substring(2),
      job: "Engineer",
    };

    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users/",
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(requestBody.name);
      expect(response.body.job).to.eq(requestBody.job);
    });
  });
});

//third method

describe("Approach 3 - Using fixture", () => {
  it("Approach3- Fixtures", () => {
    cy.fixture("Test").then((data) => {
      const requestBody = data;

      cy.request({
        method: "POST",
        url: "https://reqres.in/api/users/",
        body: requestBody,
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.name).to.eq(requestBody.name);
        expect(response.body.job).to.eq(requestBody.job);
      });
    });
    
  });
});
