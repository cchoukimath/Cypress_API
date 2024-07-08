describe("test", () => {
    let authToken = null;
  
    before("creating access token", () => {
      cy.request({
        method: 'POST',
        url: 'https://simple-books-api.glitch.me/api-clients',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          clientName: 'ABC',
          clientEmail: Math.random().toString(5).substring(2) + "@gmail.com"
        }
      }).then((response) => {
        authToken = response.body.accessToken;
        cy.log('Auth Token: ' + authToken); // Log the token
      });
    });
  
    before("creating new order", () => {
      cy.wait(500); // Wait for a short period to ensure the token is set
      cy.request({
        method: 'POST',
        url: 'https://simple-books-api.glitch.me/orders',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken // Added space after Bearer
        },
        body: {
          bookId: 1,
          customerName: "xyzabc"
        },
        failOnStatusCode: false // Do not fail on 401, handle it manually
      }).then((response) => {
        if (response.status === 401) {
          cy.log('Unauthorized: Check the auth token and headers.');
        }
        expect(response.status).to.eq(201);
        expect(response.body.created).to.eq(true);
      });
    });
  
    it("fetching orders", () => {
      cy.request({
        method: 'GET',
        url: 'https://simple-books-api.glitch.me/orders/',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken 
        },
        cookies: {
          'cookieName': 'mycookie' 
        },
        failOnStatusCode: false // Do not fail on 401, handle it manually
      }).then((response) => {
        if (response.status === 401) {
          cy.log('Unauthorized: Check the auth token and headers.');
        }
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(1); 
      });
    });
  });
  