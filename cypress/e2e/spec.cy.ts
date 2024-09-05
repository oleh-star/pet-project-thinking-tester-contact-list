describe('api first test', () => {
  it('api first test', () => {
    cy.request("POST", "/users/login", {
      "email": "mynana1057@fak.com",
      "password": "mynana1057@fak.com"
    }).then((response) => {
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('user');      
      expect(response.body.user).to.have.property('_id'),
      expect(response.status).to.eq(200);
    })
  })
})