class DocTree {
  constructor(parent_element) {
    this.parent_element = parent_element;
    this.initiate_sub_sections();
  }

  initiate_sub_sections() {
    this.sub_sections().forEach(sub_section => {
      (sub_section => {
        sub_section.parent_element.prepend(this.link_element());
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
    var sub_sects = this.child_nodes().filter(childNode => { 
      return (typeof(childNode.querySelectorAll) == 'function');
    }).map(childNode => {
      return Array.prototype.slice.call(childNode.querySelectorAll(":scope > ul"));
    }).flat().flat().map(doc_tree => {
      return new DocTree(doc_tree);
    });

    return sub_sects
  } 
};

// BASIC USAGE
//
// const doctrees = document.querySelectorAll(".doctree");
// doctrees.forEach(doctree => {
//   new DocTree(doctree)
// })
