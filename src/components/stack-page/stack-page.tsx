import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../stack/stack";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';

export const StackPage: React.FC = () => {
  const [element, setElement] = useState<string>('');
  const [arr, setArr] = useState<{element: string, state: ElementStates}[]>([]);
  const [loader, setLoader] = useState<ActiveStackButton>();
  enum ActiveStackButton {
    Add = 'add',
    Delete = 'delete',
    Clear = 'clear'
  } 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement(e.currentTarget.value);
  }

  async function handleAddButton () {
    setLoader(ActiveStackButton.Add);
    stack.push(element);
    setElement('');
    const workArr = stack.getContainer();

    setArr(workArr.map((item, index) => {
      if(index === workArr.length - 1) {
        return {element: item, state: ElementStates.Changing}
      } else {
        return {element: item, state: ElementStates.Default}
      }
    }))

    await timer(500);

    setArr(workArr.map(item => {
      return {element: item, state: ElementStates.Default}
    }))
    setLoader(undefined);
  }

  const timer = (ms: number) => {
    return new Promise(res => setTimeout(res, ms))
  }

  async function handleDeleteButton () {
    setLoader(ActiveStackButton.Delete);
    let workArr = [...stack.getContainer()];
    stack.pop();

    setArr(workArr.map((item, index) => {
      if(index === workArr.length - 1) {
        return {element: item, state: ElementStates.Changing}
      } else {
        return {element: item, state: ElementStates.Default}
      }
    }))

    await timer(500);
    workArr = [...stack.getContainer()];
    const doneArr = workArr.map(item => {
      return {element: item, state: ElementStates.Default}
    });
    
    setArr([...doneArr]);
    setLoader(undefined);
  }
  const handleClearButton = () => {
    setLoader(ActiveStackButton.Clear);
    for(let i = 0; i < stack.getSize(); i) {
      stack.pop();
      console.log(stack.getSize())
    }
    setArr([])
    setLoader(undefined);
  }
  
  return (
    <SolutionLayout title="Стек">
      <div className={styles.input_box}>
        <Input
          maxLength={4}
          isLimitText={true}
          value={element}
          onChange={handleInputChange}
          extraClass={`${styles.input} ${styles.mr25}`} />
        <Button 
          isLoader={loader === ActiveStackButton.Add ? true : false}
          disabled={
            element
              ? loader && loader !== ActiveStackButton.Add
                ? true
                : false
              : true
          }
          text="Добавить"
          onClick={handleAddButton}
          extraClass={styles.mr25}/>
        <Button
          isLoader={loader === ActiveStackButton.Delete ? true : false}
          disabled={
            arr[0]
              ? loader && loader !== ActiveStackButton.Delete
                ? true
                : false
              : true
          }
          text="Удалить"
          onClick={handleDeleteButton}
          extraClass={styles.mr100}/>
        <Button
          isLoader={loader === ActiveStackButton.Clear ? true : false}
          disabled={
            arr[0]
              ? loader && loader !== ActiveStackButton.Clear
                ? true
                : false
              : true
          }
          text="Очистить"
          onClick={handleClearButton}/>
      </div>
      <div className={styles.circle_box}>
        {arr.map((item, index) => {
          return <Circle
            key={index}
            head={index === arr.length-1 ? 'top': ''}
            letter={item.element}
            state={item.state}
            extraClass={styles.mr25}
            index={index}/>
        })}
      </div>
    </SolutionLayout>
  );
};
const stack = new Stack<string>();