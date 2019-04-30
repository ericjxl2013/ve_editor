import { ParseError } from "./positions";

export abstract class ForwardQuery<T> {

  protected itemBuffer: Array<T> = [];

  protected endReached: boolean = false;

  protected problemCollector: Array<ParseError> = [];

  protected endOfInputIndicator: T | undefined = undefined;

  public next(): T {
    return this.nextOffset(1);
  }

  public nextOffset(offset: number): T {
    while (this.itemBuffer.length <= offset && !this.endReached) {
      let item: T | undefined = this.fetch();
      if (item !== undefined) {
        this.itemBuffer.push(item);
      } else {
        this.endReached = true;
      }
    }
    if (offset >= this.itemBuffer.length) {
      if (this.endOfInputIndicator === undefined) {
        this.endOfInputIndicator = this.endOfInput();
      }
      return this.endOfInputIndicator;
    } else {
      return this.itemBuffer[offset];
    }
  }

  public current(): T {
    return this.nextOffset(0);
  }

  protected abstract endOfInput(): T;

  protected abstract fetch(): T | undefined;

  public consume(): T {
    let result: T = this.current();
    this.consumeNext(1);
    return result;
  }

  public consumeNext(numberOfItems: number): void {
    if (numberOfItems < 0) {
      return;
    }
    while (numberOfItems-- > 0) {
      if (this.itemBuffer.length !== 0) {
        this.itemBuffer.shift();
      } else {
        if (this.endReached) {
          return;
        } else {
          let item: T | undefined = this.fetch();
          if (item === undefined) {
            this.endReached = true;
          }
        }
      }
    }
  }

  public getProblemCollector(): Array<ParseError> {
    return this.problemCollector;
  }

  public setProblemCollector(problemCollector: Array<ParseError>): void {
    this.problemCollector = problemCollector;
  }


}