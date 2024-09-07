describe('Get all contacts list', () => {
  let token: string;

  before(() => {
    cy.getToken().then((t: string) => {
      token = t;
      cy.log(`token: ${token}`);
    });
  });

  it('Get all contacts list', () => {
    cy.request({
      method: 'GET',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array').and.not.empty;
      response.body.forEach((contact: any) => {
        expect(contact).to.have.keys('_id', 'firstName', 'lastName', 'phone', 'email', 'birthdate', 'street1', 'street2', 'city', 'stateProvince', 'postalCode', 'country', 'owner', '__v');
      });

    });
  });
});