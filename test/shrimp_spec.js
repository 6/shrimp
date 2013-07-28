describe('shrimp', function() {
  afterEach(function() {
    shrimp.reset();
    shrimp.destroy();
  });

  describe('#init', function() {
    it('makes the console UI visible', function() {
      expect($('#shrimp-console').length).to.equal(0);
      shrimp.init();
      expect($('#shrimp-console').length).to.equal(1);
    });

    it('only initializes one console at a time', function() {
      shrimp.init();
      shrimp.init();
      shrimp.init();
      expect($('#shrimp-console').length).to.equal(1);
    });
  });

  describe('#destroy', function() {
    it('removes an existing console', function() {
      shrimp.init();
      expect($('#shrimp-console').length).to.equal(1);

      shrimp.destroy();
      expect($('#shrimp-console').length).to.equal(0);
    });

    it('does nothing if there is no console', function() {
      expect($('#shrimp-console').length).to.equal(0);
      shrimp.destroy();
      expect($('#shrimp-console').length).to.equal(0);
    });
  });

  var sharedExamplesPrintMethods = function(describedMethod) {
    context('the console UI is open', function() {
      beforeEach(function() {
        shrimp.init();
      });

      it('appends the value to the console', function() {
        expect($(".shrimp-log").length).to.equal(0);

        shrimp[describedMethod]("some text");
        expect($(".shrimp-log").length).to.equal(1);

        shrimp[describedMethod]("more text");
        expect($(".shrimp-log").length).to.equal(2);

        expect($(".shrimp-log")[0].innerHTML).to.equal("some text");
        expect($(".shrimp-log")[1].innerHTML).to.equal("more text");
      });
    });

    context('the console UI is not open', function() {
      it('recods the log and shows it when the UI is opened', function() {
        expect($(".shrimp-log").length).to.equal(0);

        shrimp[describedMethod]("some text");
        expect($(".shrimp-log").length).to.equal(0);

        shrimp[describedMethod]("more text");
        expect($(".shrimp-log").length).to.equal(0);

        shrimp.init();
        expect($(".shrimp-log").length).to.equal(2);

        expect($(".shrimp-log")[0].innerHTML).to.equal("some text");
        expect($(".shrimp-log")[1].innerHTML).to.equal("more text");
      });
    });
  };

  describe('#log', function() {
    sharedExamplesPrintMethods('log');
  });

  describe('#error', function() {
    sharedExamplesPrintMethods('error');
  });

  describe('#info', function() {
    sharedExamplesPrintMethods('info');
  });
});
