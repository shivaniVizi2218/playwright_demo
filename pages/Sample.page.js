const ebayData=require("../data/ebay.json")
const { expect } = require("@playwright/test");
exports.SampleData = class SampleData {
    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.signin=page.locator("(//a[contains(text(),'Sign in')])[1]")
        this.userName=page.locator("//input[@id='userid']");
        this.passWord=page.locator("//input[@id='pass']");
        this.conbtn=page.locator("//button[@id='signin-continue-btn']");
        this.signInBtn=page.locator("//button[@id='sgnBt']");
        this.selcategory=page.locator("//button[text()=' Shop by category']");
        this.itemlink=page.locator("//a[text()='Computers & tablets']");
        this.ipadslink=page.locator("//div[text()='iPads']");
        this.ipaditem=page.locator(`//div[text()='2021 Apple iPad 9th Gen 64/256GB WiFi 10.2"']`);
        this.initialcartval=page.locator("//i[@id='gh-cart-n']");
        this.atc=page.locator("//span[text()='Add to cart']");
        this.homeebay=page.locator("//a[@id='gh-la']");
        this.carticon=page.locator("((//div[@class='gh-menu'])[4]/a)[1]");
        this.checkForItem=page.locator(`//a[text()='2021 Apple iPad 9th Gen 64/256GB WiFi 10.2"']`)
        this.RemCartItem=page.locator("(//span[text()='Remove'])[1]")
        this.searchitem=page.locator("//input[@id='gh-ac']");
        this.laptopitem=page.locator(`(//span[text()='Cheap Dell HP Lenovo Fujitsu Windows 10 Laptop Core i3 i5 CPU 8GB RAM 128GB SSD'])[1]`);
        this.wishlistBtn=page.locator("//span[text()='Add to watchlist']")
        this.wishListIcon=page.locator("//a[@title='Watchlist']")
        this.checkforWishItem=page.locator("//div[@class='gh-img__wrapper']");
        this.LoginUser=page.locator("//button[@id='gh-ug']");
        this.signOutBtn=page.locator("//a[text()='Sign out']")

    }
 
    async loginfunction() {
     await expect(this.signin).toBeVisible();
      await this.signin.click();
      await this.userName.click()
      await this.page.waitForTimeout(+process.env.small_wait)
      await this.userName.fill(ebayData.credentials.Username);
      await this.conbtn.click();
      await this.page.waitForTimeout(+process.env.small_wait)
      await this.passWord.fill(ebayData.credentials.password);
      expect(await this.signInBtn).toBeVisible();
      await this.signInBtn.click();
      await this.page.waitForTimeout(+process.env.small_wait)
    }
    async verifyDashboardURL() {
      expect(await global.page.url()).toEqual(process.env.URL)
    }
   
    async navigationlink() {
      let navbar_data = ebayData.navbar;
      for (let i = 0; i < navbar_data.length; i++) {
        expect(await this.page.locator(`//div[@id='mainContent']/div/ul/li/a[text()='${navbar_data[i]}']`)).toBeVisible();
        await this.page.locator(`//div[@id='mainContent']/div/ul/li/a[text()='${navbar_data[i]}']`).hover();
        await this.page.waitForTimeout(+process.env.small_wait)
      }
    }
    

    async logoutFunction(page){
    await this.homeebay.click();
    await this.LoginUser.click();
    await this.page.waitForTimeout(+process.env.small_wait)
    expect(await this.signOutBtn).toBeVisible(); 
    await this.signOutBtn.click();
    await this.page.waitForTimeout(+process.env.small_wait)
    
    }

}

