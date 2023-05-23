export class MyCustomError extends Error {
    constructor(public statusCode: number, public message: string,public error:string) {
      super(message);
      this.name = 'MyCustomError';
    }
  }