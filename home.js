const {Builder, By, Key, until} = require('selenium-webdriver');
let assert = require('assert');
let faker = require('faker');

let URL = 'https://2d.su/';
let linkToShorten = "https://rawgit.com/Marak/faker.js/master/examples/browser/index.html"
let name = faker.name.firstName() + " " + faker.name.lastName();
let email = faker.internet.email();
let subject = faker.lorem.word();
let message = faker.lorem.sentence();



console.log("%c===CREATED USER===", "color:green");
console.log("%cNAME/EMAIL: " + name + " " + email, "color:green");


(async function shortenLink() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {

    await driver.get(URL);
    await driver.findElement(By.id('url')).sendKeys(linkToShorten, Key.RETURN);
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.wait(until.elementLocated(By.css('.input-group > .form-control.input-lg')),10000);
    let innerText = await driver.findElement(By.css('.input-group > .form-control.input-lg')).getAttribute("value");
    assert.match(innerText, /2d.su/);

  } finally {
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.quit();
  }
})();

(async function sendMessage() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
  
      await driver.get(URL);
      await driver.findElement(By.id('name')).sendKeys(name);
      await driver.findElement(By.id('email')).sendKeys(email);
      await driver.findElement(By.id('subject')).sendKeys(subject);
      await driver.findElement(By.id('message')).sendKeys(message);
      await driver.findElement(By.id('accept')).click();
      await driver.findElement(By.id('invisibleCaptchaContact')).click();

      await driver.wait(until.elementLocated(By.css('.alert.alert-success')),10000);
      const element = driver.findElement(By.css('.alert.alert-success'));
      assert.strictEqual(await element.getText(), 'Your message has been sent!');
      

  
    } finally {
      await driver.manage().setTimeouts( { implicit: 10000 } );
      await driver.quit();
    }
  })();
