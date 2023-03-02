import { IQueue } from "../../types/interfaces";

export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container.splice(this.tail % this.size, 1, item);
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    
    delete(this.container[this.head % this.size]);
    this.length--;
    this.head++;
  };

  clear = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    for (let i = this.head; i < this.getTail(); i++) {
      this.dequeue()
    }
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  getSize = () => {
    return this.container.length
  }

  getContainer = () => {
    return this.container
  }

  getHead = () => {
    return this.head
  }

  getTail = () => {
    return this.tail
  }

  isEmpty = () => this.length === 0;
}