// Importar Playwright
const playwright = require('playwright');

const url = 'https://angular-6-registration-login-example.stackblitz.io/register';

// Función flecha asíncrona
(async () => {
    // Definir los navegadores en los que se quiere hacer la prueba
    for (const browserType of ['chromium', 'firefox', 'webkit']) {
        // Contenido de la prueba
        console.log(browserType + '-------------------------------------------')

        // Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        // Abrir la URL a probar en la página y cargar el proyecto en una SPA
        await page.goto(url);
        await new Promise(r => setTimeout(r, 7000));
        await page.screenshot({ path: './pagina.png' })
        await page.click('css=button')
        await new Promise(r => setTimeout(r, 9000));
        await page.screenshot({ path: './pagina2.png' })
        console.log('Project loaded')


        // Interactuar con la aplicación web
        await page.click('css=a.btn.btn-link')
        console.log(`Clicked "cancel". URL is now ${page.url()}`)

        await page.click('css=a.btn.btn-link')
        console.log(`Clicked "register". URL is now ${page.url()}`)

        await page.click('css=button.btn.btn-primary')
        let feedback = await page.$$('css=div.invalid-feedback');

        let elems = 0
        for (let i of feedback) { elems++ }
        await page.screenshot({ path: './form-feedback.png' })
        console.log(`Clicked "Register" with an empty form. Feedback is shown in ${elems} elements`)

        await page.type('input[formcontrolname="firstName"]', 'Monitor');
        await page.type('input[formcontrolname="lastName"]', 'Pruebas');
        await page.type('input[formcontrolname="username"]', 'pruebas');
        await page.type('input[formcontrolname="password"]', 'MISO4208');
        await page.click('css=button.btn.btn-primary')

        await new Promise(r => setTimeout(r, 7000));
        await page.screenshot({ path: './success-feedback.png' })

        feedback = await page.$("css=div.alert.alert-success")
        console.log(`Success dialog after creating user with message: ${await feedback.innerText()}`)

        await page.type('input[formcontrolname="username"]', 'pruebas');
        await page.type('input[formcontrolname="password"]', 'MISO4208');
        await page.click('css=button.btn.btn-primary')
        await new Promise(r => setTimeout(r, 7000));

        feedback = await page.$('text="Hi Monitor!"');
        await page.screenshot({ path: './after-login.png' })
        console.log(`Logged in. Your user was ${feedback ? 'successfully' : 'not'} created`)

        // Finalizar la prueba
        await browser.close();
    }
    return;
})(); // Llamado propio de la función
