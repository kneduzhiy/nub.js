export class NubErrors {
  private static readonly _NubLogTag = "[nub.js]";
  private static error(message: String): String {
    return `${this._NubLogTag} ${message}`;
  }

  static readonly NoRootElement = this.error("No root element specified");
  static readonly RootElementNotFound = this.error("Root element not found");
  static readonly VariableNoValue = this.error(
    "Variable declared but has no value"
  );
  static readonly VariableNotFound = this.error("Variable not found");
}
