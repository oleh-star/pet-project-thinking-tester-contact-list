import { faker } from '@faker-js/faker'

describe('Update Contact', () => {
  let token: string;
  let contactId: string;
  let firstName: string, lastName: string, phone: number, email: string, birthdate: string, street1: string, street2: string, city: string, stateProvince: string, postalCode: number, country: string, owner: string, v: any;

  before(() => {
    // Get token and contactId
    cy.getToken().then((t: string) => {
      token = t;
      cy.log(`token: ${token}`);

      return cy.getContactId();
    }).then((с: string) => {
      contactId = с;
      cy.log(`contactId: ${contactId}`);

      return cy.request({
        method: 'GET',
        url: `/contacts/${contactId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.keys('_id', 'firstName', 'lastName', 'phone', 'email', 'birthdate', 'street1', 'street2', 'city', 'stateProvince', 'postalCode', 'country', 'owner', '__v').and.not.empty;

      // Save data from response
      firstName = response.body.firstName;
      lastName = response.body.lastName;
      phone = response.body.phone;
      email = response.body.email;
      birthdate = response.body.birthdate;
      street1 = response.body.street1;
      street2 = response.body.street2;
      city = response.body.city;
      stateProvince = response.body.stateProvince;
      postalCode = response.body.postalCode;
      country = response.body.country;
      owner = response.body.owner;
      v = response.body.__v;
    });
  });

  it('Should return 401 when token is missing', () => {
    cy.request({
      method: 'PATCH',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer `
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    });
  });

  it('Should return 401 when token is invalid', () => {
    cy.request({
      method: 'PATCH',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer token`
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    });
  });

  it('Should return 503 when contactId is missing', () => {
    cy.request({
      method: 'PATCH',
      url: `/contacts/`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
      },
      timeout: 60000,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(503);
    });
  });

  it('Should return 400 when contactId is invalid', () => {
    cy.request({
      method: 'PATCH',
      url: `/contacts/contactId`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName()
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq('Invalid Contact ID');
    });
  });

  it('Should return 400 for invalid data types', () => {
    cy.request({
      method: 'PATCH',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        "firstName": 12345,
        "lastName": true
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: firstName: firstName is invalid, lastName: lastName is invalid.');
    });
  });

  it('Should return 400 for invalid data', () => {
    cy.request({
      method: 'PATCH',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        "firstName": '',
        "lastName": faker.person.lastName()
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: firstName: Path `firstName` is required.');
    });
  });

  it('Should not allow modification of read-only fields', () => {
    cy.request({
      method: 'PATCH',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        "owner": "newOwner",
        "__v": 999
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});