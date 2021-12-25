import NubElements, { NubFuncElement, NubVarElement } from "./nub.elements";
import { NubErrors } from "./nub.errors";
import { NubGlobals, NubSettings } from "./nub.settings";

interface Settings {
  root?: string;
  data?: any;
  functions?: any;
}

enum ParseMode {
  Attribute,
  Tag,
}

export default class Nub {
  public data: any;
  public functions: any;
  private rootElement: HTMLElement;

  constructor(settings: Settings) {
    (window as any).__Nub = this;

    if (settings.root == null) {
      throw NubErrors.NoRootElement;
    }

    this.rootElement = document.querySelector(settings.root);
    if (this.rootElement == null) {
      throw NubErrors.NoRootElement;
    }

    this.init(settings);
  }

  private init(settings: Settings) {
    this.data = settings.data;
    this.functions = settings.functions;

    NubElements.register();

    this.initObservers();
    this.rerender();

    this.parseEvents();
  }

  private rerender() {
    this.parseVariables(ParseMode.Attribute);
    this.parseVariables(ParseMode.Tag);

    this.parseFunctions(ParseMode.Attribute);
    this.parseFunctions(ParseMode.Tag);

    this.parseConditionals();
  }

  private initObservers() {
    Object.keys(this.data).forEach((val) => {
      this.data["_" + val] = this.data[val];
      const self = this;
      Object.defineProperty(this.data, val, {
        get: function () {
          return this["_" + val];
        },
        set: function (v) {
          this["_" + val] = v;
          self.rerender();
        },
      });
    });

    console.log("[nub.js] Initialized observers");
  }

  private parseVariables(parseMode: ParseMode) {
    const nubVarElements =
      parseMode == ParseMode.Attribute
        ? document.querySelectorAll(
            "[\\" + NubGlobals.VariableAttributeName + "]"
          )
        : document.querySelectorAll(NubGlobals.VariableTagName);

    nubVarElements.forEach((elem) => {
      const varElement = elem as NubVarElement;

      const variableName =
        parseMode == ParseMode.Attribute
          ? elem.getAttribute("#var")
          : varElement.__NubVariable;

      if (variableName == null) {
        throw NubErrors.VariableNoValue;
      }

      const variableValue = this.data[variableName];
      if (variableValue == null) {
        throw NubErrors.VariableNotFound;
      }

      elem.innerHTML = variableValue;
    });
  }

  private parseFunctions(parseMode: ParseMode) {
    const nubFuncElements =
      parseMode == ParseMode.Attribute
        ? document.querySelectorAll(
            "[\\" + NubGlobals.FunctionAttributeName + "]"
          )
        : document.querySelectorAll(NubGlobals.FunctionTagName);

    nubFuncElements.forEach((elem) => {
      const funcElement = elem as NubFuncElement;

      const functionName =
        parseMode == ParseMode.Attribute
          ? elem.getAttribute(NubGlobals.FunctionAttributeName)
          : funcElement.__NubFunction;

      if (functionName == null) {
        throw NubErrors.VariableNoValue;
      }

      var functionValue = eval("window.__Nub.functions." + functionName);
      elem.innerHTML = functionValue;
    });
  }

  private parseConditionals() {
    const ifConditions = document.querySelectorAll("[if]");

    ifConditions.forEach((elem) => {
      var code = elem.getAttribute("if");
      var isFunc: boolean =
        code.indexOf("(") !== -1 && code.indexOf(")") !== -1;

      const condition = (
        isFunc
          ? eval("window.__Nub.functions." + code)
          : eval("window.__Nub.data." + code)
      ) as boolean;
      (elem as any).style.display = condition ? "block" : "none";
    });
  }

  private parseEvents() {
    const clickEvent = document.querySelectorAll("[n-click]");
    const inputEvent = document.querySelectorAll(
      "input[n-input], input[n-bind]"
    );
    const focusEvent = document.querySelectorAll("[n-focus]");

    clickEvent.forEach((elem) => {
      elem.addEventListener("click", function () {
        const action = elem.getAttribute("n-click");
        eval("window.__Nub.functions." + action);
      });
    });

    inputEvent.forEach((elem) => {
      const self = this;
      elem.addEventListener("input", function () {
        const value = (elem as HTMLInputElement).value;
        const bindVar = elem.getAttribute("n-bind");
        if (bindVar != null) {
          self.data[bindVar] = value;
          return;
        }

        const action = elem.getAttribute("n-input");
        eval(
          "window.__Nub.functions." +
            action +
            '("' +
            (elem as HTMLInputElement).value +
            '")'
        );
      });
    });

    focusEvent.forEach((elem) => {
      elem.addEventListener("focus", function () {
        const action = elem.getAttribute("n-focus");
        eval("window.__Nub.functions." + action);
      });
    });
  }
}
