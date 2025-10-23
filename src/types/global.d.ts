// Allow property access on variables typed as Object in tests
// This is a small compatibility shim so legacy tests that use `Object`
// can still access arbitrary properties like `.token` or `.data`.
declare global {
  interface Object {
    [key: string]: any;
  }
}

export {};
