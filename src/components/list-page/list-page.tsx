import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "../list/list";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css'

export const ListPage: React.FC = () => {

  const [element, setElement] = useState<string>('');
  const [index, setIndex] = useState<string>('');
  const [arr, setArr] = useState<{ element: string, state: ElementStates }[]>([]);
  const [headTopCircle, setHeadTopCircle] = useState<string>('');
  const [tailTopCircle, setTailTopCircle] = useState<string>('');
  const [headBotCircle, setHeadBotCircle] = useState<string>('');
  const [tailBotCircle, setTailBotCircle] = useState<string>('');
  const [insertCircle, setInsertCircle] = useState<{ element: string, index: number } | undefined>();
  const [deleteCircle, setDeleteCircle] = useState<string>('');
  const [loader, setLoader] = useState<ActiveListButton>();

  enum ActiveListButton {
    AddHead = 'addHead',
    AddTail = 'addTail',
    DeleteHead = 'deleteHead',
    DeleteTail = 'deleteTail',
    AddIndex = 'addIndex',
    DeleteIndex = 'deleteIndex'
  }

  let numIndex = Number(index ? index : '-');

  const handleElementInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement(e.currentTarget.value);
  }

  const handleIndexInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.currentTarget.value);
  }

  const handleAppendButton = async () => {
    setLoader(ActiveListButton.AddTail);
    setTailTopCircle(element);

    await timer(500);

    list.append(element);
    const workArr = list.getList();
    setTailTopCircle('');

    setArr(workArr.map((item, index) => {
      if (index === workArr.length - 1) {
        return {
          element: item,
          state: ElementStates.Modified
        }
      }
      return {
        element: item,
        state: ElementStates.Default
      }
    }))

    await timer(500);

    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setLoader(undefined);
  }

  const handlePrependButton = async () => {
    setLoader(ActiveListButton.AddHead);
    setHeadTopCircle(element);

    await timer(500);

    list.prepend(element);
    const workArr = list.getList();
    setHeadTopCircle('');

    setArr(workArr.map((item, index) => {
      if (index) {
        return {
          element: item,
          state: ElementStates.Default
        }
      }
      return {
        element: item,
        state: ElementStates.Modified
      }
    }))

    await timer(500);

    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setLoader(undefined);
  }

  const handlePopButton = async () => {
    setLoader(ActiveListButton.DeleteTail);
    setTailBotCircle(arr[arr.length - 1].element);
    await timer(500);
    list.pop();

    const workArr = list.getList();
    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setTailBotCircle('');
    setLoader(undefined);
  }

  const handleShiftButton = async () => {
    setLoader(ActiveListButton.DeleteHead);
    setHeadBotCircle(arr[0].element);
    await timer(500);

    list.shift();
    const workArr = list.getList();
    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setHeadBotCircle('');
    setLoader(undefined);
  }

  const handleInsertAtButton = async () => {
    setLoader(ActiveListButton.AddIndex);
    let jumpArr = [...arr];
    setInsertCircle({
      element: element,
      index: 0
    });

    let i = 1;

    let interval = setInterval(() => {
      setInsertCircle({
        element: element,
        index: i
      })
      setArr(jumpArr.map((item, index) => {
        if (index < i) {
          return {
            element: item.element,
            state: ElementStates.Changing
          }
        }
        return {
          element: item.element,
          state: ElementStates.Default
        }
      }))
      i++;
    }, 1000)
    setTimeout(() => { clearInterval(interval) }, numIndex * 1000);

    await timer(numIndex * 1000 + 500);

    list.insertAt(element, numIndex);
    const workArr = list.getList();
    setInsertCircle(undefined)
    setArr(workArr.map((item, index) => {
      if (index === numIndex) {
        return {
          element: item,
          state: ElementStates.Modified
        }
      } else if (index < numIndex) {
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

    await timer(500);

    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setLoader(undefined);
  }

  const handleDeleteAtButton = async () => {
    setLoader(ActiveListButton.DeleteIndex);
    const jumpArr = [...arr];
    let i = 0;
    let interval = setInterval(() => {
      setArr(jumpArr.map((item, index) => {
        if (index <= i) {
          return {
            element: item.element,
            state: ElementStates.Changing
          }
        }
        return {
          element: item.element,
          state: ElementStates.Default
        }
      }))
      i++;
    }, 1000)

    setTimeout(() => clearInterval(interval), (numIndex + 1) * 1000)

    await timer((numIndex + 1) * 1000 + 500);

    setDeleteCircle(arr[numIndex].element);

    await timer(1000);

    list.deleteAt(numIndex);
    const workArr = list.getList();
    setArr(workArr.map(item => {
      return {
        element: item,
        state: ElementStates.Default
      }
    }))
    setDeleteCircle('');
    setLoader(undefined);
  }

  const timer = (ms: number) => {
    return new Promise(res => setTimeout(res, ms))
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.control_box}>
        <div className={styles.input_box}>
          <Input
            value={element}
            onChange={handleElementInputChange}
            extraClass={styles.input}
            maxLength={4}
            isLimitText={true} />
          <Button
            disabled={
              element
                ? loader && loader !== ActiveListButton.AddHead
                  ? true
                  : false
                : true
            }
            isLoader={loader === ActiveListButton.AddHead ? true : false}
            onClick={handlePrependButton}
            text='Добавить в head'
            extraClass={styles.small_button}
          />
          <Button
            disabled={
              element
                ? loader && loader !== ActiveListButton.AddTail
                  ? true
                  : false
                : true
            }
            isLoader={loader === ActiveListButton.AddTail ? true : false}
            onClick={handleAppendButton}
            text='Добавить в tail'
            extraClass={styles.small_button}
          />
          <Button
            disabled={
              list.getSize()
                ? loader && loader !== ActiveListButton.DeleteHead
                  ? true
                  : false
                : true
            }
            isLoader={loader === ActiveListButton.DeleteHead ? true : false}
            onClick={handleShiftButton}
            text='Удалить из head'
            extraClass={styles.small_button}
          />
          <Button
            disabled={
              list.getSize()
                ? loader && loader !== ActiveListButton.DeleteTail
                  ? true
                  : false
                : true
            }
            isLoader={loader === ActiveListButton.DeleteTail ? true : false}
            onClick={handlePopButton}
            text='Удалить из tail'
            extraClass={styles.small_button}
          />

        </div>
        <div className={styles.input_box}>
          <Input
            value={index}
            onChange={handleIndexInputChange}
            extraClass={styles.input} />
          <Button
            disabled={
              numIndex >=0 && numIndex <= arr.length - 1 && element
                ? loader && loader !== ActiveListButton.AddIndex
                  ? true
                  : false
                : true
            }
            isLoader={loader === ActiveListButton.AddIndex ? true : false}
            onClick={handleInsertAtButton}
            text='Добавить по индексу'
            extraClass={styles.large_button}
          />
          <Button
            disabled={
              list.getSize() && numIndex >=0 && numIndex <= arr.length - 1
                ? loader && loader !== ActiveListButton.DeleteIndex
                  ? true
                  : false
                : true
            }
            isLoader={loader === ActiveListButton.DeleteIndex ? true : false}
            onClick={handleDeleteAtButton}
            text='Удалить по индексу'
            extraClass={styles.large_button}
          />
        </div>
      </div>
      <div className={styles.circle_box}>
        {arr.map((item, index) => {
          return (
            <div key={index} className={styles.flex}>
              <Circle
                letter={
                  numIndex === index && deleteCircle
                    ? ''
                    : tailBotCircle && index === arr.length - 1 && index
                      ? ''
                      : headBotCircle && !index
                        ? ''
                        : item.element
                }
                index={index}
                tail={
                  deleteCircle && numIndex === index
                    ? <Circle
                      letter={deleteCircle}
                      isSmall={true}
                      state={ElementStates.Changing}
                    />
                    : tailBotCircle && index === arr.length - 1 && index
                      ? <Circle
                        letter={tailBotCircle}
                        isSmall={true}
                        state={ElementStates.Changing}
                      />
                      : headBotCircle && !index
                        ? <Circle
                          letter={headBotCircle}
                          isSmall={true}
                          state={ElementStates.Changing}
                        />
                        : index === arr.length - 1 && index
                          ? 'tail'
                          : ''
                }
                state={item.state}
                head={
                  headTopCircle && !index
                    ? <Circle
                      letter={headTopCircle}
                      isSmall={true}
                      state={ElementStates.Changing}
                    />
                    : tailTopCircle && index === arr.length - 1 && index
                      ? <Circle
                        letter={headTopCircle}
                        isSmall={true}
                        state={ElementStates.Changing}
                      />
                      : insertCircle?.element && index === insertCircle.index
                        ? <Circle
                          letter={insertCircle.element}
                          isSmall={true}
                          state={ElementStates.Changing}
                        />
                        : index
                          ? ''
                          : 'head'
                }
                extraClass="mr-8" />
              {index !== arr.length - 1 ? <ArrowIcon /> : ''}
            </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};


const list = new LinkedList<string>();