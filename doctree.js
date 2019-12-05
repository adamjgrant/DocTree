class DocTree {
  constructor(parent_element) {
    this.parent_element = parent_element;
    this.initiate_sub_sections();
    this.bind_links();
    this.sub_sects = false;
  }

  initiate_sub_sections() {
    this.sub_sections().forEach(sub_section => {
      (sub_section => {
        sub_section.parent_element.prepend(this.link_element());
      })(sub_section);
    });
  }

  bind_links() {
    this.sub_sections().forEach(sub_section => {
      (sub_section => {
        var expander     = sub_section.parent_element.querySelector("li.doctree-expand"),
            clickHandler = (e) => {
              var link = e.target,
                  ul   = link.parentNode;

              if (Array.prototype.slice.call(ul.classList).indexOf('visible') > -1) {
                ul.classList.remove('visible');
              }
              else {
                ul.classList.add('visible');
              }
            }
        expander.addEventListener("click", clickHandler);
      })(sub_section);
    });
  }

  link_element() {
    var link = document.createElement("li");
    link.classList.add("doctree-expand");
    link.innerHTML = "<a href='#'>";
    return link;
  }
  
  child_nodes() {
    if (typeof(this.parent_element.childNodes) != 'object') return [];
    return Array.prototype.slice.call(this.parent_element.childNodes);
  }
  
  sub_sections() {
    if (this.sub_sects) return this.sub_sects;
    this.sub_sects = this.child_nodes().filter(childNode => { 
      return (typeof(childNode.querySelectorAll) == 'function');
    }).map(childNode => {
      return Array.prototype.slice.call(childNode.querySelectorAll(":scope > ul"));
    }).flat().flat().map(doc_tree => {
      return new DocTree(doc_tree);
    });

    return this.sub_sects
  } 
};

// BASIC USAGE
//
// const doctrees = document.querySelectorAll(".doctree");
// doctrees.forEach(doctree => {
//   new DocTree(doctree)
// })
