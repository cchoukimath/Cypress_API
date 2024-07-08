//client ID: Ov23liob0yeBeNslphsc

//client secret ID: 9b304dc6b475afb49a788f186533068cba6d3059

//authorization code:b1088ceb10a50bb652ed

//access token: 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&scope=&token_type

describe("OAuth",()=>{
let accessToken="";
it("get OAuth2 Access token",()=>{
cy.request({
    method:'POST',
    url:'https://github.com/login/oauth/access_token',
    qs:{
        client_id:'Ov23liob0yeBeNslphsc',
        client_secret:'9b304dc6b475afb49a788f186533068cba6d3059',
        code: '75a7bce3b5600ca7208b'
    }
})
.then((response)=>{
    const params=response.body.split('&');
    accessToken=params[0].split("=")[1];
})
})
it("OAUth2 demo",()=>{
    cy.request({
        method:'GET',
        url:'https://api.github.com/user/repos',
        headers:{
            Authorization:'Bearer '+accessToken
        }
    }).then((reponse)=>{
        expect(response.status).to.eq(200);
        expect(response.body[0].id).to.equal(201070920);
    })
})


})

