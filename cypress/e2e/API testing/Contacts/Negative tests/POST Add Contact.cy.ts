import { faker } from '@faker-js/faker'

describe('Add new contact', () => {
  let token: string;
  let contactId: string;

  before(() => {
    cy.getToken().then((t: string) => {
      token = t;
      cy.log(`token: ${token}`);
    })
  });

  it('Should return 401 when token is missing', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer `
      },
      failOnStatusCode: false,
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
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    })
  });

  it('Should return 401 when token is invalid', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer token`
      },
      failOnStatusCode: false,
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
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('error', 'Please authenticate.');
    })
  });

  it('Should return 400 when firstName is missing', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        // automation generating of random credentials
        "firstName": "",
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
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: firstName: Path `firstName` is required.');
    })
  });

  it('Should return 400 when all field are missed', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        // automation generating of random credentials
        "firstName": "",
        "lastName": "",
        "birthdate": "",
        "email": "",
        "phone": "",
        "street1": "",
        "street2": "",
        "city": "",
        "stateProvince": "",
        "postalCode": "",
        "country": ""
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: firstName: Path `firstName` is required., lastName: Path `lastName` is required., birthdate: Birthdate is invalid, email: Email is invalid, phone: Phone number is invalid, postalCode: Postal code is invalid');
    })
  });

  it('Should return 400 when email format is invalid', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": "invalidEmailFormat",
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: email: Email is invalid');
    })
  });

  it('Should return 400 when phone number is too short', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 5 }),//6 minimum valid length
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: phone: Phone number is invalid');
    })
  });

  it('Should return 400 when phone number is too long', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 12 }),//11 maximum valid length
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: phone: Phone number is invalid');
    })
  });

  it('Should return 400 when firstName is too long', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        "firstName": faker.string.alpha({ length: 256 }), // very long name
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

    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('_message', 'Contact validation failed');
    })
  });

  it('Should return 400 when birthdate format is invalid', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": 'invalid-date',
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: birthdate: Birthdate is invalid');
    })
  });

  it('Should fail when birthdate is in the future', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": '2100-01-01',
        "email": faker.internet.email(),
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message', 'Contact validation failed: birthdate: Birthdate is invalid');
    })
  });

  it('Should return 400 when postalCode is too short', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
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
        "postalCode": faker.string.numeric({ length: 2 }), //3 minimum valid length
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).have.property('message', 'Contact validation failed: postalCode: Postal code is invalid');
    })
  });

  it('Should return 400 when postalCode is too long', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
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
        "postalCode": faker.string.numeric({ length: 8 }), //7 maximum valid length
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).have.property('message', 'Contact validation failed: postalCode: Postal code is invalid');
    })
  });

  it('Should return 400 when email already exists', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      },
      failOnStatusCode: false,
      body: {
        // automation generating of random credentials
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "birthdate": faker.date.birthdate().toISOString().split('T')[0],
        "email": 'glennie_robel95@hotmail.com', //this email already exist
        "phone": faker.string.numeric({ length: 10 }),
        "street1": faker.location.streetAddress(),
        "street2": faker.location.streetAddress(),
        "city": faker.location.city(),
        "stateProvince": faker.location.state({ abbreviated: true }),
        "postalCode": faker.string.numeric({ length: 5 }),
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).have.property('message', 'Contact validation failed: email: email is invalid');
    })
  });

});