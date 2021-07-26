class MyElement extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `      
      <style>
        .disabled {      
          opacity: 0.4;
        }
      </style>     

      <div id="container">i am containter
        <input class="t-input" /> 
      </div>
    `;

    this.container = shadowRoot;
  }
  // 设置监听属性，数组为要监听的属性列表
  static get observedAttributes() {
    return ['disabled'];
  }
  // 监听到了变化
  attributeChangedCallback(attr, oldVal, newVal) {    
    if(attr === 'disabled') { 
      let container = this.container.querySelector('#container')

      console.log('watch attr change:', container, container.classList, this.disabled, oldVal, newVal);

      if(newVal && newVal === 'true') {        
        container.classList.add('disabled');      
      }      
      else {        
        container.classList.remove('disabled')      
      }
    }
  }

  // 元素被插入dom树
  connectedCallback() {
    console.log('connectedCallback');

    let input = this.container.querySelector('.t-input');
    input.addEventListener('input', function(res) {
      console.log('input change:', res.target.value);
    })
  }
  // 元素被移除dom
  disconnectCallback() {
    console.log('disconnectCallback');
  }
}

window.customElements.define('my-element', MyElement);