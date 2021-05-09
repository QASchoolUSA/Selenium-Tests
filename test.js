const {Builder, By, Key, until} = require('selenium-webdriver');
let faker = require('faker');

let URL = 'http://automationpractice.com/index.php';
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password = faker.internet.password();
let address = faker.address.streetAddress();
let email = faker.internet.email();
let city = faker.address.city();


let zipcode = faker.address.zipCode();
let arr;
if (zipcode.charAt(5) == "-") {
    arr = zipcode.split("-");
    zipcode = arr[0]
}
else {
    zipcode = zipcode
}

let mobilePhone = faker.phone.phoneNumberFormat();
console.log("%c===CREATED USER===", "color:green");
console.log("%cNAME/EMAIL: " + firstName + " " + lastName + " " + email, "color:green");
console.log("%cPASSWORD: " + password, "color:green");


(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {

    await driver.get(URL);
    await driver.findElement(By.xpath('//a[@class="login"]')).click();
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.findElement(By.id('email_create')).sendKeys(email, Key.RETURN);
    await driver.findElement(By.id('customer_firstname')).sendKeys(firstName);
    await driver.findElement(By.id('customer_lastname')).sendKeys(lastName);
    await driver.findElement(By.id('passwd')).sendKeys(password);
    await driver.findElement(By.id('firstname')).sendKeys(firstName);
    await driver.findElement(By.id('lastname')).sendKeys(lastName);
    await driver.findElement(By.id('address1')).sendKeys(address);
    await driver.findElement(By.id('city')).sendKeys(city);
    await driver.findElement(By.id('postcode')).sendKeys(zipcode);
    await driver.findElement(By.id('id_state')).click();
    await driver.findElement(By.xpath('//select[@id="id_state"]/option[@value="9"]')).click();
    await driver.findElement(By.id('phone_mobile')).sendKeys(mobilePhone, Key.RETURN);
    await driver.wait(until.titleIs('My account - My Store'), 1000);

  } finally {
    await driver.manage().setTimeouts( { implicit: 10000 } );
    await driver.quit();
  }
})();