import React, { ChangeEvent, useEffect, useState } from "react";
import styles from './fibonachi-page.module.css'
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const FibonacciPage: React.FC = () => {

  const [number, setNumber] = useState<number>(0);
  const [render, setRender] = useState<boolean>(false);
  const [fibonachiArr, setFibonachiArr] = useState<number[]>([]);
  const [loader, setLoader] = useState<boolean>(false);  
  let buttonDisable = true;
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(e.currentTarget.value));
  }
  
  const handleButtonClick = () => { 
    setLoader(true)
    setRender(!render);
  }

  useEffect(() => {
    
    let workArray: number[] = [];
    let i = 0;
    if(number) {
      let fillInterval = setInterval(() => {
        i === 1 || i === 0
        ? workArray[i] = 1
        : workArray[i] = workArray[i-1] + workArray[i-2];
        i++;
        setFibonachiArr([...workArray]);
      }, 500);
      setTimeout(() => {
        clearInterval(fillInterval);
        setLoader(false)
      }, ((number+1)/2)*1000)
    }
    
  }, [render])

  if(number < 1 || number > 19) {
    buttonDisable = true;
  } else {
    buttonDisable = false;
  }
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.input_box}>
        <Input
          isLimitText={true}
          max={19}
          type='number'
          step={1}
          min={0}
          onChange={handleInputChange}
          extraClass={styles.input}/>
        <Button
          isLoader={loader}
          text="Рассчитать"
          type="button"
          onClick={handleButtonClick}
          disabled={buttonDisable}/>
      </div>
      <div className={styles.circle_box}>
        {fibonachiArr.map((item, index) => {
          return <Circle
            key={index}
            letter={`${item}`}
            extraClass={styles.circle}
            tail={`${index}`}/>
        })}
      </div>
    </SolutionLayout>
  );
};
