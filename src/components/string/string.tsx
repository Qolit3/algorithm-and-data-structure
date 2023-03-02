import React, { ChangeEvent, useEffect, useState} from "react";
import { ElementStates } from "../../types/element-states";
import styles from './string.module.css'

import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  
  const [render, setRender] = useState<boolean>(false);
  const [arrWithState, setArrWithState] = useState<{state: ElementStates, element: string}[]>([]);
  const [loader, setLoader] = useState<boolean>(false);  
  const [arr, setArr] = useState<string[]>([])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArr(e.currentTarget.value.split(''));
  }
  
  const handleButtonClick = () => {
    setLoader(true)
    setArrWithState(arr.map((item, index) => {
      if(index === 0 || index === arr.length - 1) {
        return {
          element: item,
          state: ElementStates.Changing
        }
      }
      return {
        element: item,
        state: ElementStates.Default
      }
    }))

    setRender(!render);
    
  } 

  useEffect(() => {
    let workArray = [...arrWithState];
    let tmp;
    let start = 0;
    let end = workArray.length - 1;
    if(workArray.length === 1) {
      setArrWithState([{
        element: arrWithState[0].element,
        state: ElementStates.Modified
      }])
    } else {
      let reverseTimer = setInterval(() => {
        if(start === end) {
          workArray[start].state = ElementStates.Modified
        } else {
          tmp = workArray[start];
          workArray[start] = workArray[end];
          workArray[end] = tmp;
          workArray[start].state = ElementStates.Modified;
          workArray[end].state = ElementStates.Modified;
          if(!(start + 1 === end)) {
            workArray[start + 1].state = ElementStates.Changing;
            workArray[end - 1].state = ElementStates.Changing
          }
        }
        
        setArrWithState([...workArray]);
        
        start++;
        end--;
      }, 1000);
      setTimeout(() => {
        clearInterval(reverseTimer); 
        setLoader(false)
      }, Math.floor((arrWithState.length+1)/2)*1000)    

    }
    
  }, [render])

  
  return (
    <SolutionLayout title="Строка">
     <div>
      <div className={styles.input_box}>
        <Input
          isLimitText={true}
          maxLength={11}
          onChange={handleInputChange}
          extraClass={styles.input}  />
        <Button
          disabled={arr[0] ? false : true}
          isLoader={loader}
          text="Развернуть"
          type="button"
          onClick={handleButtonClick}/>
      </div>
      <div className={styles.circle_box}>
      {arrWithState.map((item, index) => {
        return <Circle
          key={index}
          letter={item.element}
          state={item.state}
          extraClass={styles.circle} />
      })}  
      </div>
     </div>
    </SolutionLayout>
  );
}