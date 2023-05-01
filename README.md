# Web Monkey Example

Performing random testing with monkeys on web applications.

## Usage

1. Install Cypress with `npm i -g cypress`.
2. If you want to test a different website, replace `websiteURL` on `cypress/e2e/monkey_testing.cy.js`.
3. You can vary the number of monkeys by passing it as a parameter to the randomEvent or randomClicks function.
4. Run the following command to free the monkeys: `cypress run --spec "cypress/e2e/monkey_testing.cy.js"`.
5. After headless execution, you will find recordings of the interactions on `cypress/videos` directory.
6. Alternatively, you can use `cypress open` and select this project to follow running instructions by using GUI.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](LICENSE)**
- Copyright 2022 © Juan Alegría
