class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.sectionId = this.dataset.sectionId;
    this.productUrl = this.dataset.productUrl;
    this.variants = JSON.parse(this.querySelector('script').textContent);
    
    this.addEventListener('input', this.inputChange);
  }

  inputChange() {
    let selectedValues = [];
    let currentVariant = {};

    this.querySelectorAll('input').forEach(function(input) {
      if(input.checked) {
        selectedValues.push(input.value);
      }
    })

    this.variants.forEach(function(variant) {
      if(JSON.stringify(variant.options) == JSON.stringify(selectedValues)) {
        currentVariant = variant;
      }
    })

    let _this = this;
    let productUrl = this.productUrl;

    let url = `${this.productUrl}?variant=${currentVariant.id}&section_id=${this.sectionId}`;
    fetch(url)
      .then(res => res.text())
      .then(function(data){
        let html = new DOMParser().parseFromString(data, "text/html");
        _this.innerHTML = html.querySelector(`[data-product-url="${productUrl}"]`).innerHTML;
      });
  }
}

customElements.define('product-card', ProductCard);