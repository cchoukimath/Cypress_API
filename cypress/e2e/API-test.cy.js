describe("API test with cypress", () => {
  it("GET-read", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1")
      .its('status')
      .should('equal', 200);
  });
});

describe("API test with cypress", () => {
  it("POST-create", () => {
    cy.request({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", "foo");
    });
  });
});

describe("API Testing with Cypress", () => {
  it("PUT - update", () => {
    cy.request({
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      body: {
        id: 1,
        title: "updated title",
        body: "updated body",
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("title", "updated title");
    });
  });
});

describe("API Testing with Cypress", () => {
  it("DELETE - delete", () => {
    cy.request({
      method: "DELETE",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
