const websiteURL = 'https://losestudiantes.co';

describe('Los estudiantes under monkeys', function () {
    it('visits los estudiantes and survives monkeys with random events', function () {
        cy.visit(websiteURL);
        cy.wait(1000);
        randomEvent(10);
    })

    it('visits los estudiantes and survives monkeys with random clicks', function () {
        cy.visit(websiteURL);
        cy.wait(1000);
        randomEvent(5);
    })
})

function randomEvent(monkeysLeft) {
    // List of possible events
    const events = [
        { type: 'click', selector: 'a' },
        { type: 'type', selector: 'input[type="text"]', text: 'Random text' },
        { type: 'select', selector: 'select', value: 1 },
        { type: 'click', selector: 'button' },
    ];

    // Select a random event
    const randomIndex = Math.floor(Math.random() * events.length);
    const event = events[randomIndex];

    // Run selected event
    cy.document().then((doc) => {
        const elements = doc.querySelectorAll(event.selector);
        console.log(elements);
        if (elements.length > 0) {
            const randomElement = elements[getRandomInt(0, elements.length)];
            if (!Cypress.dom.isHidden(randomElement)) {
                if (event.type === 'click') {
                    cy.wrap(randomElement).click({ force: true });
                } else if (event.type === 'type') {
                    if (!randomElement.disabled) {
                        cy.wrap(randomElement).type(event.text, { force: true });
                    }
                } else if (event.type === 'select') {
                    cy.wrap(randomElement).select(event.value, { force: true });
                }
                monkeysLeft--;
            }
        }

        // Check if there are any monkeys left
        if (monkeysLeft > 0) {
            cy.wait(1000);
            randomEvent(monkeysLeft);
        }
    });
}

function randomClick(monkeysLeft) {
    if (monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if (!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({ force: true });
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomClick(monkeysLeft);
        });
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
