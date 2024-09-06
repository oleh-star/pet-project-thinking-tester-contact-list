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

  it('Add new contact', () => {
    cy.request({
      method: 'POST',
      url: '/contacts',
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
      }
    }).then((response) => {
      contactId = response.body._id
      expect(response.status).to.eq(201);
      expect(response.body.firstName).is.not.empty;
      expect(response.body.lastName).is.not.empty;
      expect(response.body.birthdate).is.not.empty;
      expect(response.body.email).is.not.empty;
      expect(response.body.phone).to.have.length(10);
      expect(response.body.street1).is.not.empty;
      expect(response.body.street2).is.not.empty;
      expect(response.body.city).is.not.empty;
      expect(response.body.stateProvince).is.not.empty;
      expect(response.body.postalCode).is.not.empty;
      expect(response.body.country).is.not.empty;
      expect(response.body.owner).is.not.empty;
      expect(response.body.__v).eq(0);
    })
  });

  afterEach(() => {
    if (contactId) {
      cy.request({
        method: 'DELETE',
        url: `/contacts/${contactId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log('Contact are deleted')
        console.log('Contact are deleted')
      });
    }
  });
});