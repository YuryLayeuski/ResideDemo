var Nightmare = require('nightmare');
var assert = require('assert');
var nightmareOptions = {
    show: true,
    typeInterval: 80,
    pollInterval: 80,
    waitTimeout: 50000,
    'webPreferences':{                 //Lets clear the session
    partition: 'nopersist'
    }                             
};
var domain = 'http://www.github.com';


 describe('Reside Demo', function() {
  it('Login to GitHub with existing account and create new reply', function(done) {
    this.timeout(50000);

    require('../components/login.js');

    new Nightmare(nightmareOptions)
      .viewport(1200, 1100)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.11 Safari/537.36")
      .goto(domain)
      .wait('a[href="/login"]')
      .click('a[href="/login"]')
      .wait('input#login_field')
      .loginWithAccount()
      .wait('img.avatar')
      .goto(domain+'/settings/replies')
      .wait('input#saved-reply-title-field')
      .type('input#saved-reply-title-field', 'My first test reply')
      .type('#comment_body_1', 'Test Reply')
      .click('button.btn.btn-primary')
      .visible('div.flash.flash-full.flash-notice')   //check that banner "Your saved reply was created successfully" is visible
      .wait('span.listgroup-item-title.css-truncate')
      //.screenshot(__dirname + "/newReply.png")

      .evaluate(function () {
        var returnObj = {};
        returnObj.title = document.querySelector('span.listgroup-item-title.css-truncate').textContent.trim();
        returnObj.body = document.querySelector('span.listgroup-item-body').textContent.trim();
        return returnObj;    
       })
      .end()
      .run(function(error, results){
      if(error) {
          console.log('ERROR');
          console.log(error);
      }
      assert.equal(results.title, 'My first test reply');  //assert that title for reply correct 
      assert.equal(results.body, 'Test Reply');  //assert that body for reply correct
      done();
      });
    });
  });


describe('Reside Demo', function() {
  it('Verifying that user is able to change reply and save', function(done) {
    this.timeout(50000);

    require('../components/login.js');

    new Nightmare(nightmareOptions)
      .viewport(1200, 1100)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.11 Safari/537.36")
      .goto(domain)
      .wait('a[href="/login"]')
      .click('a[href="/login"]')
      .wait('input#login_field')
      .loginWithAccount()
      .wait('img.avatar')
      .goto(domain+'/settings/replies')
      .wait('form.BtnGroup-form button.BtnGroup-item')
      .click('form.BtnGroup-form button.BtnGroup-item')
      .wait('#saved-reply-title-field')
      .type('#saved-reply-title-field', '')
      .type('#saved-reply-title-field', 'Updated reply')
      .type('#comment_body_1', '')
      .type('#comment_body_1', 'Updated text for reply')
      .click('div.form-actions button[type="submit"]')
      .visible('.flash.flash-full.flash-notice div.container')
      .wait('span.listgroup-item-title.css-truncate')
       //.screenshot(__dirname + "/newReply.png")

      .evaluate(function () {
        var returnObj = {};
        returnObj.title = document.querySelector('span.listgroup-item-title.css-truncate').textContent.trim();
        returnObj.body = document.querySelector('span.listgroup-item-body').textContent.trim();
        return returnObj;    
       })
      .end()
      .run(function(error, results){
      if(error) {
          console.log('ERROR');
          console.log(error);
      }
      assert.equal(results.title, 'Updated reply');  //assert that title for reply updated
      assert.equal(results.body, 'Updated text for reply');  //assert that body for reply updated
      done();
      });
    });
  });



describe('Reside Demo', function() {
  it('Verifying that user is able to delete reply', function(done) {
    this.timeout(50000);

    require('../components/login.js');

    new Nightmare(nightmareOptions)
      .viewport(1200, 1100)
      .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.11 Safari/537.36")
      .goto(domain)
      .wait('a[href="/login"]')
      .click('a[href="/login"]')
      .wait('input#login_field')
      .loginWithAccount()
      .wait('img.avatar')
      .goto(domain+'/settings/replies')
      .wait('form.BtnGroup-form button.BtnGroup-item')
      .click('form.BtnGroup-form button.BtnGroup-item.btn-danger')
      .wait(1000)
      //.screenshot(__dirname + "/deleteReply.png")
      
      .evaluate(function () {
        return !document.querySelector('.listgroup-item.listgroup-item-preview.js-saved-reply-list-item');   
       })
      .end()
      .run(function(error, result){
      if(error) {
          console.log('ERROR');
          console.log(error);
      }
      assert(result);  //check that reply was deleted, not exist on the page
      done();
      });
    });
  });



