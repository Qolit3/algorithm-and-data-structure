export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getSize: () => number;
  getContainer: () => T[];
}

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getSize: () => number;
  getContainer: () => (T | undefined)[];
  getHead: () => number;
  getTail: () => number;
}

export interface ILinkedList<T> {
  getList: () => T[];
  append: (element: T) => void;
  prepend: (element: T) => void;
  pop: () => void;
  shift: () => void;
  getSize: () => number;
  insertAt: (element: T, index: number) => void;
  deleteAt: (index: number) => void;
}