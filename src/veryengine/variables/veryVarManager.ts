
export class VeryVarManager {
  
  public static RegisteredTypes: { [key: string]: Object } = {};

  public static GetClass(fqdn: string): any {
      if (this.RegisteredTypes && this.RegisteredTypes[fqdn]) {
          return this.RegisteredTypes[fqdn];
      }
      return null;
  }
}