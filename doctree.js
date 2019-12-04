class DocTree {
  constructor(parent_element) {
    this.parent_element = parent_element;
  }
  
  child_nodes() {
    return Array.prototype.slice.call(this.parent_element.childNodes);
  }
  
  sub_sections() {
    // TODO We need to also know the position of the subsections relative to the content they're found in

    return this.child_nodes().filter(childNode => { 
      return (typeof(childNode.querySelectorAll) != 'function');
    }).map(childNode => {
      return childNode.querySelectorAll("ul");
    }).flat().map(doc_tree => {
      return new DocTree(doc_tree);
    })
  }

  html() {
    // return the full markup for the doc tree.
  }
};

// var full_tree,
//    root_tree;

// root_tree  = document.getElementById('doc_tree');
// full_tree = new DocTree(root_tree);
