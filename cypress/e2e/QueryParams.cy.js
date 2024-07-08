describe("API test", () => {
    const queryParam={page:2};
  it("Passing query parameters", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users",
      qs: queryParam
    }).then((response) => {
      expect(response.status).to.equal(200);
      //expect(response.status).equal(200);
      expect(response.body.page).to.eq(2);
      expect(response.body.data).has.length(6);
      expect(response.body.data[0]).have.property("id", 7);
      expect(response.body.data[0]).have.property("first_name", "Michael");
    });
  });
});
