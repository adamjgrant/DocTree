doc({
  attach_id: "about/about",
  tests: [
    test("ul structure gets links above nested ULs", () => {
      const doctree1 = document.getElementById('first_level'),
            doctree2 = document.getElementById('second');

      var links_in_first_level,
          links_in_second_level,
          links_in_third_level,
          name_of_more1_link,
          name_of_more1_link2,
          name_of_more2_link,
          name_of_more2_link2;

      const first_level  = doctree1
            second_level = doctree2.querySelector("#second_level"),
            third_level  = doctree2.querySelector("#third_level");

      const doctrees = document.querySelectorAll(".doctree");
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

      var first_more_link = document.querySelector("#second #second_level > .doctree-expand");
      eventFire(first_more_link, "click");
      name_of_more1_link = Array.prototype.slice.call(first_more_link.parentNode.classList).join(" ");

      eventFire(first_more_link, "click");
      name_of_more1_link2 = Array.prototype.slice.call(first_more_link.parentNode.classList).join(" ");

      var second_more_link = document.querySelector("#second #third_level > .doctree-expand");
      eventFire(second_more_link, "click");
      name_of_more2_link = Array.prototype.slice.call(second_more_link.parentNode.classList).join(" ");

      eventFire(second_more_link, "click");
      name_of_more2_link2 = Array.prototype.slice.call(second_more_link.parentNode.classList).join(" ");

      return [
        assert("First level does not have links", links_in_first_level, 0)
        , assert("Second level nest has links", links_in_second_level, 1)
        , assert("Third level nest has links", links_in_third_level, 1)
        , assert("Clicking on 'more' expands", name_of_more1_link, "visible")
        , assert("Clicking on 'more' again contracts", name_of_more1_link2, "")
        , assert("Clicking on 'more' on additional level expands", name_of_more2_link, "visible")
        , assert("Clicking on 'more' on additional level again contracts", name_of_more2_link2, "")
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

        <li>
          <h1>First Level</h1>
          <p>...</p>
          <ul>
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
