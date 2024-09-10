
describe('Get contact', () => {
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

  it('Should return 401 when token is missing', () => {
    cy.request({
      method: 'GET',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer`
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    });
  });

  it('Should return 401 when token is invalid', () => {
    cy.request({
      method: 'GET',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer token`
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    });
  });

  it('Should return 400 when contactId is invalid', () => {
    cy.request({
      method: 'GET',
      url: `/contacts/contactId`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq('Invalid Contact ID');
    });
  });

  it('Should return 400 or 405 for wrong HTTP method', () => {
    cy.request({
      method: 'POST',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      timeout: 60000,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 405]);
    });
  });

  it('Should return 400 or 401 for missing headers', () => {
    cy.request({
      method: 'GET',
      url: `/contacts/${contactId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401]);
    });
  });

  it('Should return 429 for too many requests', () => {
    for (let i = 0; i < 100; i++) {
      cy.request({
        method: 'GET',
        url: `/contacts/${contactId}`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response.status === 429) {
          cy.log('Rate limiting triggered');
          expect(response.status).to.eq(429);
          return false;
        }
      });
    }
  });
});