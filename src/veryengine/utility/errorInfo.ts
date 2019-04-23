export class ErrorInfo {

  isRight: boolean = true;
  message: string = '';

  constructor() {
    
  }

  clear(): void {
    this.isRight = true;
    this.message = '';
  }

}