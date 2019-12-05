doc({
  attach_id: "about/about",
  tests: [
    test("ul structure gets links above nested ULs", () => {
      var test_sb  = document.getElementById('test-sandbox'),
          doctree1 = test_sb.querySelector('#first_level'),
          doctree2 = test_sb.querySelector('#second');

      var links_in_first_level,
          links_in_second_level,
          links_in_third_level,
          name_of_more1_link,
          name_of_more1_link2,
          name_of_more2_link,
          name_of_more2_link2,
          toggle_test1_classes,
          toggle_test2_classes;

      const first_level  = doctree1
            second_level = doctree2.querySelector("#second_level"),
            third_level  = doctree2.querySelector("#third_level");

      const doctrees = test_sb.querySelectorAll(".doctree");
      doctrees.forEach(doctree => {
        new DocTree(doctree);
      });

      links_in_first_level  = first_level.querySelectorAll("li.doctree-expand").length;
      links_in_second_level = second_level.querySelectorAll("li.doctree-expand").length;
      links_in_third_level  = third_level.querySelectorAll("li.doctree-expand").length;

      function eventFire(el, etype){
        if (el.fireEvent) {
          el.fireEvent('on' + etype);
        } else {
          var evObj = document.createEvent('Events');
          evObj.initEvent(etype, true, false);
          el.dispatchEvent(evObj);
        }
      }

      var first_more_link = test_sb.querySelector("#second #second_level > .doctree-expand > a");
      eventFire(first_more_link, "click");
      name_of_more1_link = Array.prototype.slice.call(first_more_link.parentNode.parentNode.classList).join(" ");

      eventFire(first_more_link, "click");
      name_of_more1_link2 = Array.prototype.slice.call(first_more_link.parentNode.parentNode.classList).join(" ");

      var second_more_link = test_sb.querySelector("#second #third_level > .doctree-expand > a");
      eventFire(second_more_link, "click");
      name_of_more2_link = Array.prototype.slice.call(second_more_link.parentNode.parentNode.classList).join(" ");

      eventFire(second_more_link, "click");
      name_of_more2_link2 = Array.prototype.slice.call(second_more_link.parentNode.parentNode.classList).join(" ");
      eventFire(second_more_link, "click"); // Close it again for the next test

      var two_level_test_level1 = test_sb.querySelector("#alt > ul > li.doctree-expand > a");
      eventFire(two_level_test_level1, "click");
      toggle_test1_classes = [test_sb.querySelector("#alt-child").classList[0], test_sb.querySelector("#third_level").classList[0]];

      var two_level_test_level2 = test_sb.querySelector("#third_level > li.doctree-expand > a");
      eventFire(two_level_test_level2, "click");
      eventFire(two_level_test_level2, "click");
      toggle_test2_classes = [test_sb.querySelector("#alt-child").classList[0], test_sb.querySelector("#third_level").classList[0]];

      return [
        assert("First level does not have links", links_in_first_level, 0)
        , assert("Second level nest has links", links_in_second_level, 1)
        , assert("Third level nest has links", links_in_third_level, 1)
        , assert("Clicking on 'more' expands", name_of_more1_link, "visible")
        , assert("Clicking on 'more' again contracts", name_of_more1_link2, "")
        , assert("Clicking on 'more' on additional level expands", name_of_more2_link, "visible")
        , assert("Clicking on 'more' on additional level again contracts", name_of_more2_link2, "")
        , assert("Expanding a ul does not expand the child ul", toggle_test1_classes, ["visible", null])
        , assert("Expanding a ul's expanded child ul only collapses child ul", toggle_test2_classes, ["visible", ""])
      ]
    }, `
      <ul class="doctree" id="first_level">
        <li>
          <h1>First Level</h1>
          <p>...</p>
        </li> 
      </ul>

      <ul class="doctree" id="second"> 
        <li>
          <h1>First Level</h1>
          <p>...</p>
          <ul id="second_level">
            <li> 
              <h1>Second Level</h1>
              <p>...</p>
            </li>
          </ul>
        </li> 

        <li id="alt">
          <h1>First Level</h1>
          <p>...</p>
          <ul id="alt-child">
            <li> 
              <h1>Second Level</h1>
              <p>...</p>
              <ul id="third_level">
                <li>...</li>
              </ul>
            </li>
          </ul>
        </li> 

      </ul>
    `)
  ]
});
