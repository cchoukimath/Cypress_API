describe("Authentication", () => {
  it("Basic Authentication", () => {
    cy.request({
      method: "GET",
      url: "https://postman-echo.com/basic-auth",
      auth: {
        user: "postman",
        pass: "password",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
    });
  });

  it("Digest Authentication", () => {
    cy.request({
      method: "GET",
      url: "https://postman-echo.com/digest-auth",
      auth: {
        username: "postman",
        password: "password",
        method: "degest",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
    });
  });

  const token = "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";

  it("Bearer token Authentication", () => {
    cy.request({
      method: "GET",
      url: "https://api.github.com/user/repos",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/vnd.github.v3+json",
      },
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response); // Log response for debugging
      expect(response.status).to.eq(200);
    });
  });

  it("API Key Authentication", () => {
    cy.request({
      method: "GET",
      url: "api.openweathermap.org/data/2.5/forecast/daily",
      qs:{
        q:'Delhi',
        appid:'API KEY and Value' //to be given here
      },
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response); // Log response for debugging
      expect(response.status).to.eq(200);
    });
  });
})
