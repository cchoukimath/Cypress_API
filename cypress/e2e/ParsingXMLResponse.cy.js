const xml2js = require("xml2js");
const parser = new xml2js.Parser({ explicitArray: false });

describe("xml parsing", () => {
  const xmlpayload = `<Pet>
       <id>0</id>
       <Category>
         <id>0</id>
         <name>Dog</name>
       </Category>
       <name>Jimmy</name>
       <photoUrls>
         <photoUrl>string</photoUrl>
       </photoUrls>
       <tags>
         <Tag>
           <id>0</id>
           <name>string</name>
         </Tag>
       </tags>
       <status>available</status>
     </Pet>`;
  let petid = null;

  before("creating PET", () => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/pet",
      body: xmlpayload,
      headers: {
        "Content-Type": "application/xml",
        Accept: "application/xml",
      },
      failOnStatusCode: false, // This allows handling non-2xx responses
    }).then((response) => {
      expect(response.status).to.eq(200);
      parser.parseString(response.body, (err, result) => {
        if (err) {
          throw new Error("Failed to parse XML response");
        }
        petid = result.Pet.id;
      });
    });
  });

  it("Fetching PET data-parsing xml response", () => {
    cy.request({
      method: "GET",
      url: "https://petstore.swagger.io/v2/pet/" + petid,
      body: xmlpayload,
      headers: {
        "Content-Type": "application/xml",
        Accept: "application/xml",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      parser.parseString(response.body, (err, result) => {
        expect(result.Pet.id).equal(petid);
        expect(result.Pet.name).equal("Jimmy");
      });
    });
  });
});
