
---

# Thinking Tester Contact List

**Thinking Tester Contact List** is a QA-focused pet project aimed at gaining practical skills in API testing and end-to-end (E2E) testing using **Cypress**.

## Project Objectives

- Improve and practice API testing skills using Cypress.
- Practice end-to-end (E2E) testing using Cypress.
- Work with real web applications to simulate real-world testing scenarios.

## Requirements

Before running this project, ensure you have the following installed:

- **Node.js**: [Download and install Node.js LTS version](https://nodejs.org/en)
- **Cypress**: Install via npm (instructions below)
- **Faker.js**: Install via npm
  
  ```bash
    npm install @faker-js/faker --save-dev
   ```
### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/thinking-tester-contact-list.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd thinking-tester-contact-list
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Install Cypress and dependencies:**

    ```bash
    npm install cypress --save-dev
    ```
    
    **Ubuntu/Debian**
    ```bash
    apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
    ```
    
   **Ubuntu 24.04**
    ```bash
    apt-get install libgtk2.0-0t64 libgtk-3-0t64 libgbm-dev libnotify-dev libnss3 libxss1 libasound2t64 libxtst6 xauth xvfb
    ```
    
## Usage

To open the Cypress Test Runner, use the following command:

```bash
npx cypress open
```

This will launch the Cypress UI where you can run your tests interactively.

To run the tests headlessly in the console, use:

```bash
npx cypress run
```

## API Documentation

For API testing, you can refer to the official API documentation here:

- [API Documentation](https://documenter.getpostman.com/view/4012288/TzK2bEa8#c2fbd380-e1c9-468b-a617-394ce0089d72)

## Live Site

You can access the live application here:

- [Thinking Tester Contact List](https://thinking-tester-contact-list.herokuapp.com/contactList)

## Random Data Generation

For generating random data in your tests, this project uses the [Faker.js library](https://fakerjs.dev/api/string.html#alpha).

