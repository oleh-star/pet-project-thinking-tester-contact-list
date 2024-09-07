import { faker } from '@faker-js/faker'

describe('Login and get token', () => {
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

  it('API Login test', () => {
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
        "country": faker.location.countryCode()
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.keys('_id', 'firstName', 'lastName', 'phone', 'email', 'birthdate', 'street1', 'street2', 'city', 'stateProvince', 'postalCode', 'country', 'owner', '__v').and.not.empty;
      expect(response.body.firstName).to.not.eq(firstName);
      expect(response.body.lastName).to.not.eq(lastName);
      expect(response.body.phone).to.not.eq(phone);
      expect(response.body.email).to.not.eq(email);
      expect(response.body.birthdate).to.not.eq(birthdate);
      expect(response.body.street1).to.not.eq(street1);
      expect(response.body.street2).to.not.eq(street2);
      expect(response.body.city).to.not.eq(city);
      expect(response.body.stateProvince).to.not.eq(stateProvince);
      expect(response.body.postalCode).to.not.eq(postalCode);
      expect(response.body.country).to.not.eq(country);
      expect(response.body.owner).to.eq(owner);
      expect(response.body.__v).to.eq(v);
    })
  })
})