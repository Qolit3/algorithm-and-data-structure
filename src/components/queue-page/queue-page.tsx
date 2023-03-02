import React, { ChangeEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Queue } from "../queue/queue";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [element, setElement] = useState<string>('');
  const [arr, setArr] = useState<{ element: string | undefined, state: ElementStates }[]>([]);
  const [clear, setClear] = useState<boolean>(false);
  const [loader, setLoader] = useState<ActiveQueueButton>();

  enum ActiveQueueButton {
    Add = 'add',
    Delete = 'delete',
    Clear = 'clear' 
  }

  useEffect(() => {
    const workArr = queue.getContainer();

    for (let i = 0; i < workArr.length; i++) {
      workArr[i] = undefined;
    }

    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))

  }, [clear])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement(e.currentTarget.value);
  }

  async function handleAddButton() {
    setLoader(ActiveQueueButton.Add);
    queue.enqueue(element);
    setElement('');
    const workArr = queue.getContainer();

    setArr(workArr.map((item, index) => {
      if (index === queue.getTail() - 1) {
        return { element: item, state: ElementStates.Changing }
      } else {
        return { element: item, state: ElementStates.Default }
      }
    }))

    await timer(500);

    setArr(workArr.map(item => {
      return { element: item, state: ElementStates.Default }
    }))
    setLoader(undefined);
  }

  async function handleDeleteButton() {
    setLoader(ActiveQueueButton.Delete);
    let workArr = [...queue.getContainer()];
    queue.dequeue();

    setArr(workArr.map((item, index) => {
      if (index === queue.getHead() - 1) {
        return { element: item, state: ElementStates.Changing }
      } else {
        return { element: item, state: ElementStates.Default }
      }
    }))

    await timer(500);
    workArr = [...queue.getContainer()];
    setArr(workArr.map(item => {
      return { element: item, state: ElementStates.Default }
    }))
    setLoader(undefined);
  }

  const handleClearButton = () => {
    setLoader(ActiveQueueButton.Clear);
    /*for (let i = queue.getHead(); i < queue.getTail(); i++) {
      queue.dequeue()
    }*/
    queue.clear();
    setClear(!clear);
    setLoader(undefined);
  }

  const timer = (ms: number) => {
    return new Promise(res => setTimeout(res, ms))
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.input_box}>
        <Input maxLength={4} isLimitText={true} value={element} onChange={handleInputChange} extraClass={`${styles.input} ${styles.mr25}`} />
        <Button
          disabled={
            element
              ? loader && loader !== ActiveQueueButton.Add
                ? true
                : false
              : true
          }
          isLoader={loader === ActiveQueueButton.Add ? true : false}
          text="Добавить"
          onClick={handleAddButton}
          extraClass={styles.mr25}/>
        <Button
          disabled={
            !queue.isEmpty()
              ? loader && loader !== ActiveQueueButton.Delete
                ? true
                : false
              : true
          }
          isLoader={loader === ActiveQueueButton.Delete ? true : false}
          text="Удалить"
          onClick={handleDeleteButton}
          extraClass={styles.mr100}/>
        <Button
          disabled={
            !queue.isEmpty()
              ? loader && loader !== ActiveQueueButton.Clear
                ? true
                : false
              : true
          }
          isLoader={loader === ActiveQueueButton.Clear ? true : false}
          text="Очистить"
          onClick={handleClearButton} />
      </div>
      <div className={styles.circle_box}>
        {arr.map((item, index) => {
          return <Circle
            key={index}
            letter={item.element}
            head={index === queue.getHead() && !queue.isEmpty() ? 'head' : ''}
            tail={index === queue.getTail() - 1 && !queue.isEmpty() ? 'tail' : ''}
            state={item.state}
            extraClass={styles.mr25}
            index={index} />
        })}
      </div>
    </SolutionLayout>
  );
};

