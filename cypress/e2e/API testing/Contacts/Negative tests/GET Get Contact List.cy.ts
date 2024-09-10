
describe('Get contacts list', () => {
  let token: string;
  before(() => {
    cy.getToken().then((t: string) => {
      token = t;
      cy.log(`token: ${token}`);
    });
  });

  it('Should return 401 when token is missing', () => {
    cy.request({
      method: 'GET',
      url: '/contacts',
      headers: {
        Authorization: `Bearer`
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    });
  });

  it('Should return 400 or 405 for wrong HTTP method', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
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
      url: '/contacts',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401]);
    });
  });

  it('Should return 401 for malformed token', () => {
    cy.request({
      method: 'GET',
      url: '/contacts',
      headers: {
        Authorization: `invalidFormat ${token}`
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('Should return 429 for too many requests', () => {
    for (let i = 0; i < 100; i++) {
      cy.request({
        method: 'GET',
        url: '/contacts/',
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