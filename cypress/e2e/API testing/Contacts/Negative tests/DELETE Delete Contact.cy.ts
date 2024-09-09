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

  it('Should return 401 when token is invalid', () => {
    cy.request({
      method: 'DELETE',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer token`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    })
  })

  it('Should return 401 when token is missing', () => {
    cy.request({
      method: 'DELETE',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer `
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    })
  })

  it('Should return 400 when contactId does not exist', () => {
    cy.request({
      method: 'DELETE',
      url: `/contacts/contactId`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq('Invalid Contact ID');
    })
  })

  it('Should return 503 when contactId is missing', () => {
    cy.request({
      method: 'DELETE',
      url: `/contacts/`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      timeout: 60000
    }).then((response) => {
      expect(response.status).to.eq(503);
    })
  })

  it('Should return 404 when trying to delete an already deleted contact', () => {
    cy.request({
      method: 'DELETE',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request({
      method: 'DELETE',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});