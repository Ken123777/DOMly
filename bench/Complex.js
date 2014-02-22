suite('Complex', function() {
  var options = setup();

  benchmark('ct', function() {
    var result = document.getElementById('result');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }

    result.appendChild(templates.Complex({
      header: "Colors",
      items: [
        { name: "red", current: true, url: "#Red" },
        { name: "green", current: false, url: "#Green" },
        { name: "blue", current: false, url: "#Blue" }
      ],
      hasItems: true
    }));
  }, options);

  /*
  window.htmlbars_templates = {
    Complex: HTMLBars.compile(__html__['bench/fixtures/hbs/Complex.hbs'])
  };

  benchmark('HTMLBars', function() {
    var result = document.getElementById('result');
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }

    result.appendChild(htmlbars_templates.Complex({
      header: "Colors",
      items: [
        { name: "red", current: true, url: "#Red" },
        { name: "green", current: false, url: "#Green" },
        { name: "blue", current: false, url: "#Blue" }
      ],
      hasItems: true
    }, { helpers: HTMLBars.helpers }));
  }, options);
  */

  benchmark('Handlebars', function() {
    var result = document.getElementById('result');
    result.innerHTML = hbs_templates.Complex({
      header: "Colors",
      items: [
        { name: "red", current: true, url: "#Red" },
        { name: "green", current: false, url: "#Green" },
        { name: "blue", current: false, url: "#Blue" }
      ],
      hasItems: true
    });
  }, options);

  benchmark('doT', function() {
    var result = document.getElementById('result');
    result.innerHTML = dot_templates.Complex({
      header: "Colors",
      items: [
        { name: "red", current: true, url: "#Red" },
        { name: "green", current: false, url: "#Green" },
        { name: "blue", current: false, url: "#Blue" }
      ],
      hasItems: true
    });
  }, options);

  benchmark('lodash', function() {
    var result = document.getElementById('result');
    result.innerHTML = lodash_templates.Complex({
      header: "Colors",
      items: [
        { name: "red", current: true, url: "#Red" },
        { name: "green", current: false, url: "#Green" },
        { name: "blue", current: false, url: "#Blue" }
      ],
      hasItems: true
    });
  }, options);
});
