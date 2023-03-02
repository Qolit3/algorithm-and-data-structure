import { ILinkedList } from "../../types/interfaces";

export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  getList() {
    const arr: T[] = [];
    let curr = this.head

    for(let i = 0; i < this.size; i++) {
      if(curr) {
        arr.push(curr.value);
        curr = curr?.next;
      }
    }
    return arr;
  }

  append(element: T) {
    const node = new Node(element);
    let curr = this.head;
    
    if(curr) {
      while(curr.next !== null) {
       curr = curr.next;
      }
      curr.next = node;
      
    } else {
      this.head = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    let curr = this.head;

    if(curr) {
      node.next = this.head;
      this.head = node;
    } else {
      this.head = node;
    }
    this.size++;
  }

  pop() {
    let curr = this.head;
    let prev = this.head;
    if(curr) {
      while(curr.next !== null) {
        prev = curr;
        curr = curr.next;
      }
      if(prev){
        prev.next = null;
      }
    }
  }

  shift() {
    let curr = this.head;
    if(curr) {
      this.head = curr.next;
      curr.next = null;
    }
  }

  getSize() {
    return this.size;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while(currIndex < index - 1) {
          if(curr !== null) { 
            curr = curr.next;
            currIndex++;
          }
        }
        if(curr !== null) {
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  }

  deleteAt(index: number){
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        this.head = null;
      } else {
        let curr = this.head;
        let prev = this.head;
        let currIndex = 0;
        while(currIndex < index ) {
          if(curr !== null) { 
            prev = curr;
            curr = curr.next;
            currIndex++;
          }
        }
        if(curr !== null && prev !== null) {
          prev.next = curr.next;
          curr.next = null;
        }
      }
      this.size--;
    }
  }
}