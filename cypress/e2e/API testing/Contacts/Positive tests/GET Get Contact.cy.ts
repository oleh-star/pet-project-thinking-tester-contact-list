
describe('Get contact', () => {
  let token: string;
  let contactId: string;
  before(() => {
    cy.getToken().then((t: string) => {
      token = t;
      cy.log(`token: ${token}`);
    });
    cy.getContactId().then((с: string) =>{
      contactId = с;
      cy.log(`contactId: ${contactId}`);
    })
  });

  it('Get specific contact', () => {
    cy.request({
      method: 'GET',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.keys('_id', 'firstName', 'lastName', 'phone', 'email', 'birthdate', 'street1', 'street2', 'city', 'stateProvince', 'postalCode', 'country', 'owner', '__v');
    })
  });
});