interface PropsWithClassName {
  className?: string;
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(): Chainable<any>;
    register(): Promise<Chainable<any>>;
    clearAuth(): Chainable<any>;
    cleanTests(): Chainable<any>;
    getBySel(selector: string, ...args: any[]): Chainable<any>;
  }
}
