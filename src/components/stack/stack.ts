import { IStack } from "../../types/interfaces";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  };

  pop = () => {
    this.container.pop();
  };

  getSize = () => {
    return this.container.length
  }

  getContainer = () => {
    return this.container
  }
}