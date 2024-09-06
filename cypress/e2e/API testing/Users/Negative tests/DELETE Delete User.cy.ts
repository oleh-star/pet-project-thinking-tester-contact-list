describe('Login and get token', () => {
  it('API Login test', () => {
    cy.request(
      "POST",
      "/users/login",
      {
        "email": "mynana1057@fak.com",
        "password": "mynana1057@fak.com"
      }).then((response) => {
        const token = response.body.token;
        Cypress.env('authToken', token);
        console.log(token);
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token', token);
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.have.property('_id', '66d19bb3e58d2200130d9bf8');
        expect(response.body.user).to.have.property('firstName', 'Michael');
        expect(response.body.user).to.have.property('lastName', 'Chypapa');

      })
  })
})