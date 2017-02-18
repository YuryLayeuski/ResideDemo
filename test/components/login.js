var Nightmare = require('nightmare');

Nightmare.action('loginWithAccount',
  function(done) {
    this.evaluate_now(function () {
      document.querySelector('input#login_field').value = "yurylayeuski@gmail.com";
      document.querySelector('input#password').value = "0598003Test";
      document.querySelector('input.btn-primary.btn-block').click();
    }, done);
  }
);