
describe('My tests', () => {
  let token: string;

  before(() => {
    cy.getToken().then((t: string) => {
      token = t;
      cy.log("token = ", token);
    });
  });

  it('should make a request with the token', () => {
    cy.request({
      method: 'GET',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body[0]).to.have.property('_id');
      expect(response.body[0]).to.have.property('firstName', "Johdfsn");
    })
  });
});