describe('Delete user', () => {
  let token: string;
  let contactId: string;
  before(() => {
    cy.getToken().then((t: string) => {
      token = t;
      cy.log(`token: ${token}`);
    });
    cy.getContactId().then((с: string) => {
      contactId = с;
      cy.log(`contactId: ${contactId}`);
    })
  });

  it('Get specific contact', () => {
    cy.request({
      method: 'DELETE',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('Contact deleted');
    })
  })
})