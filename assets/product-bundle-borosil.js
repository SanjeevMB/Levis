class ProductBundle extends HTMLElement {
  constructor() {
    super();

    this.bundleButton = this.querySelector('.bundleProduct');
    this.bundleButton.addEventListener('click', this.getVariants.bind(this));
  }

  getVariants() {
    let variantData = [];
    this.querySelectorAll('input[type="checkbox"]:checked').forEach(function(input) {
      let qty = input.nextElementSibling.nextElementSibling;
        variantData.push({
          "id": parseInt(input.value),
          "quantity": parseInt(qty.value),
        });      
    });

    if(variantData.length == 0) {
      console.log('Please select a product!!')
    } else {
      this.addBundleProducts(variantData);
    }
  }

  addBundleProducts(variantData) {
    let formData = {
     'items': variantData
    };
    
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      location.href = '/cart';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

customElements.define('product-bundle', ProductBundle);