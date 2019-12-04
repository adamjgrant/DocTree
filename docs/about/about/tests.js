doc({
  attach_id: "about/about",
  tests: [
    test("ul structure gets links above nested ULs", () => {
      const doctree1 = document.querySelector('.doctree#first_level'),
            doctree2 = document.querySelector('.doctree#second');

      var links_in_first_level,
          links_in_second_level,
          links_in_third_level;

      const first_level  = doctree1
            second_level = doctree2.querySelector("#second_level"),
            third_level  = doctree2.querySelector("#third_level");

      links_in_first_level  = first_level.querySelectorAll("li.doctree-expand").length;
      links_in_second_level = first_level.querySelectorAll("li.doctree-expand").length;
      links_in_third_level  = first_level.querySelectorAll("li.doctree-expand").length;

      const doctrees = document.querySelectorAll(".doctree");
      doctrees.forEach(doctree => {
        new DocTree(doctree);
      });

      return [
        assert("First level does not have links", links_in_first_level, 0)
        , assert("Second level nest has links", links_in_second_level, 1)
        , assert("Third level nest has links", links_in_third_level, 1)
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
