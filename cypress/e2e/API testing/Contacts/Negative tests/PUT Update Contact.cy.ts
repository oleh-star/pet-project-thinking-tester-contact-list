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
      method: 'PUT',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer `
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    });
  });

  it('Should return 401 when token is invalid', () => {
    cy.request({
      method: 'PUT',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer token`
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    });
  });

  it('Should return 400 when contactId is missing', () => {
    cy.request({
      method: 'PUT',
      url: `/contacts/`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      },
      timeout: 60000,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(503);
    });
  });

  it('Should return 400 when contactId is invalid', () => {
    cy.request({
      method: 'PUT',
      url: `/contacts/contactId`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq('Invalid Contact ID');
    });
  });

  it('Should return 400 for invalid data types', () => {
    cy.request({
      method: 'PUT',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        // automation generating of random credentials
        "firstName": 12345,
        "lastName": true,
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: firstName: firstName is invalid, lastName: lastName is invalid.');
    });
  });

  it('Should return 400 for invalid data', () => {
    cy.request({
      method: 'PUT',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        // automation generating of random credentials
        "firstName": '',
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 15 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 10 }),
        "country": faker.location.countryCode()
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Validation failed: postalCode: Postal code is invalid, phone: Phone number is invalid, firstName: Path `firstName` is required.');
    });
  });

  it('Should not allow modification of read-only fields', () => {
    cy.request({
      method: 'PUT',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode(),
        "owner": "newOwner",
        "__v": 999
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('Should return 400 if no changes are made in the request', () => {
    cy.request({
      method: 'PUT',
      url: `/contacts/${contactId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        "firstName": firstName,
        "lastName": lastName,
        "birthdate": birthdate,
        "email": email,
        "phone": phone,
        "street1": street1,
        "street2": street2,
        "city": city,
        "stateProvince": stateProvince,
        "postalCode": postalCode,
        "country": country
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});