doc({
  attach_id: "about/about",
  tests: [
    test("ul structure gets links above nested ULs", () => {


      return [
        assert("First level nest has links", "", "")
        , assert("Second level nest has links", "", "")
        , assert("Third level nest has links", "", "")
      ]
    }, `
      <ul id="doctree">
        <li>
          <h1>My long article</h1>
          <p>There are many things I want to talk about, like the Civil war.</p>
          <ul>
            <li>
              <h1>Civil War</h1>

              <p>Here's a little bit about the civil war...</p>

              <p>Abraham Lincoln was assassinated, for example</p> 
              <ul>
                <li>
                  <h1>Assassination of Abraham Lincoln</h1>

                  <p>Here's a little bit about the assassination of Abraham Lincoln.</p> 
                 </li>
              </ul>

             </li>
          </ul>

          <p>But I'm also very interested in WWI</p>
          <ul>
            <li>
              <h1>World War I</h1>

              <p>Here's a little bit about the WWI...</p>
             </li>
          </ul>

          <p>and WW2</p>
          <ul>
            <li>
              <h1>World War II</h1>

              <p>Here's a little bit about WWII...</p>
             </li>
          </ul>
        </li>
      </ul>
    `)
  ]
});
