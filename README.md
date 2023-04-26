# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

В проектной работе сделан визуализатор алгоритмов сортировки и работы со структурами данных.


## Строка

На этой странице происходит плавный разворот строки, введенной пользователем. Для этого используется метод двух указателей.  Работает на строчках с чётным и нечётным количеством символов, количество символов в строке от 1 до 11.

![Начальное состояние страницы](README_static/Untitled.png)

Начальное состояние страницы

Введите текст в инпут и нажмите "развернуть". 

**Визуализация**

Сначала на экране появляется слово, буквы которого записаны в синие кружки.

![Строка в исходном виде](README_static/Untitled%201.png)

Строка в исходном виде

Далее розовым цветом выделяются круги для предстаящей смены. Через полсекунды эти круги меняются местами и выделяются зелёным и алгоритм переходит к следующим элементам. 

На скриншоте показана строка, в которой поменяли местами крайние символы:

![Промежуточный этап разворота строки](README_static/Untitled%202.png)

Промежуточный этап разворота строки

Алгоритм работает, пока не развернёт всю строку.

---

## Последовательность Фибоначчи

На этой страниц генерируется `n` чисел последовательности Фибоначчи. Можно вывести последовательность длиной от 1 до 19

![Начальное состояние страницы](README_static/Untitled%203.png)

Начальное состояние страницы

Введите длину последовательности и нажмите кнопку "рассчитать"

**Визуализация**

Элементы отображаются постепенно. Сначала появляется первый, потом второй и так до `n`. Пока ряд появился не полностью.

![Сгенерированная последовательность](README_static/Untitled%204.png)

Сгенерированная последовательность

---

## Сортировка массива

На этой странице сортируются массивы по убыванию и возрастанию. Используются два алгоритма: сортировка "пузырьком" и выбором.

![Начальное состояние страницы](README_static/Untitled%205.png)

Начальное состояние страницы

Чтобы задать массив случайных чисел, нажмите кнопку "новый массив"

- Массив состоит из целых чисел $[0; 100]$,
- Количество элементов от 3 до 17

Полученный массив отображается в виде рядов столбцов, высота которых зависит от значения элемента массива: чем больше значение, тем выше столбец.

Далее слева выбирается метод сортировки. По умолчанию стоит сортировка выбором. ЧТобы запустить процесс сортировки, надо нажать на одну из кнопок "По возрастанию" или "По убыванию"

**Визуализация**

Когда вы нажмёте «По убыванию» или «По возрастанию», начнётся процесс сортировки. Его визуализация похожа на разворот строки: элементы, занимающее нужное место, имеют зелёный цвет, элементы, над которыми работает алгоритм - розовый, а остальные - синий.

Алгоритм кончается, когда все элементы заняли нужно место

---

## Стек

На этой странцие представлена первая структура данных - Стек.

![Начальное состояние страницы](README_static/Untitled%206.png)

Начальное состояние страницы

**Визуализация добавления** 

Для добавления элемента нужно ввести его в инпут и нажать «Добавить». Тогда в стеке появляется первый элемент и инпут очищается.

Элементы стека пронумерованы снизу, а верхний элемент имеет пометку "top" над собой. При добавлении элемента он на полсекунды выделяется розовым цветом.

**Визуализация удаления**

Если нажать «Удалить», из стека извлекается верхний элемент с пометкой "top". Удаляемый элемент выделяется цветом, пометка перемещается на его левого соседа и через полсекунды элемент исчезает. 

Если в стеке всего один элемент, то после нажатия «Удалить» на странице не отображаются никакие элементы стека. 

По клику на кнопку «Очистить» из стека удаляются все элементы сразу.

---

## Очередь

На этой странцие представлена вторая структура данных - Очередь.

![Начальное состояние страницы](README_static/Untitled%207.png)

Начальное состояние страницы

**Визуализация**

Добавление и удаление происходит аналогично Стеку. Но для Очереди добавлена пометка "tail", а "top" заменил на  "head"

![Очередь с одним элементом](README_static/Untitled%208.png)

Очередь с одним элементом

При добавлении элементов в очередь позиция tail смещается, на долю секунды выделяйте новый элемент цветом розовым.

![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)

Очередь из трёх элементов в момент добавления

Если нажать «Удалить», из очереди извлекается элемент под индексом 0 (на полсекунды он выделяется розовым) a "head" будет перемещён на элемент с индексом 1.

![Очередь после `dequeue();`](README_static/Untitled%2010.png)

Очередь после `dequeue();`

---

## Связный список

На этой странцие представлена третья структура данных - Связаный список.

![Начальное состояние страницы](README_static/Untitled%2011.png)

Начальное состояние страницы

### Визуализация

**При добавлении в head** элемент появляется над первым элементом вместо надписи head.

![Добавление в head](README_static/Untitled%2012.png)

Добавление в head

Затем он занимает первое место в списке и на полсекунды выделяется зелёным цветом. Теперь над новым элементом написано head, и он указывает на предыдущий head-элемент.

![Отображение нового элемента в head](README_static/Untitled%2013.png)

Отображение нового элемента в head

**При добавлении в tail** элемент появляется в хвосте над элементом с надписью tail. Затем он занимает последнее место в списке и на полсекунды выделяется зелёным цветом. Теперь под новым элементом написано tail.

**При добавлении элемента по индексу** должны быть заполнены два поля: «Введите значение» и «Введите индекс». Добавление происходит по следующему алгоритму: 

- По клику на «Добавить по индексу» новый элемент должен отобразиться над первым элементом.
- Пока ищем нужный индекс, поочерёдно подсвечиваем элементы. Добавляемый элемент двигается по списку до искомого индекса.
- Когда индекс найден, отображаем новый элемент над ним и добавляем.

В этом примере число 10 должно занимать индекс 2.

![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)

Добавление по индексу. Поиск индекса

После успешного добавления 10 стоит под порядковым номером 2 и указывает на 34. Новый добавленный элемент выделяется зелёным цветом. Через полсекунды убираются все цветовые выделения.

![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)

Добавление по индексу. Новый элемент в списке

**При удалении элемента по индексу** последовательно выделяются цветом элементы, пока не достигается нужный индексс. Затем очищается значение в элементе и снизу отображается маленький кружок с удаляемым значением.

Например, вводится индекс 2. Сначала цветом выделяется элемент с индексом 0, потом с индексом 1. При достижении нужного индекса, то снизу отображается элемент под индексом 2, а само место становится пустым

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)

Удаление элемента под индексом 2

**При удалении элемента из tail** кружок замещает надпись tail.

![Удаление элемента из tail](README_static/Untitled%2017.png)

Удаление элемента из tail
