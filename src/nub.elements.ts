export class NubVarElement extends HTMLElement {
  public __NubVariable: any;

  constructor() {
    super();
    this.__NubVariable = this.innerText;
  }
}

export class NubFuncElement extends HTMLElement {
  public __NubFunction: any;

  constructor() {
    super();
    this.__NubFunction = this.innerText;
  }
}

export default class NubElements {
  static register() {
    window.customElements.define("n-var", NubVarElement);
    window.customElements.define("n-func", NubFuncElement);

    console.log("[nub.js] Registered NubElements");
  }
}
