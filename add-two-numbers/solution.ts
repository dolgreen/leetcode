class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// the simple solution O(n)
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const firstArray: number[] = populateArray(l1);
  const secondArray: number[] = populateArray(l2);
  const firstNumber = Number(firstArray.join(""));
  const secondNumber = Number(secondArray.join(""));
  const sum = String(firstNumber + secondNumber);

  const sumList: ListNode | null = new ListNode(0);
  let listPointer = sumList;
  for (let i = sum.length - 1; i >= 0; i--) {
    listPointer.val = Number(sum[i]);
    if (!!sum[i - 1] || Number(sum[i - 1]) == 0) {
      listPointer.next = new ListNode(0);
      listPointer = listPointer.next;
    }
  }
  return sumList;
}

function populateArray(list: ListNode | null): number[] {
  let listPointer = list;
  const tempArray: number[] = [];
  while (!!listPointer) {
    tempArray.unshift(listPointer.val);
    listPointer = listPointer.next;
  }
  return tempArray;
}

// the simple solution after refactoring O(n) {O(n + m + k)} n - l1 m - l2 k - build result list
function addTwoNumbersRefactor(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const toArray = (list: ListNode | null): number[] => {
    const arr: number[] = [];
    while (list) {
      arr.unshift(list.val);
      list = list.next;
    }
    return arr;
  };

  const num1 = Number(toArray(l1).join(""));
  const num2 = Number(toArray(l2).join(""));
  const sumStr = String(num1 + num2);

  let dummy = new ListNode(Number(sumStr[sumStr.length - 1]));
  let current = dummy;
  for (let i = sumStr.length - 2; i >= 0; i--) {
    current.next = new ListNode(Number(sumStr[i]));
    current = current.next;
  }
  return dummy;
}

// more complex solution  O(n) { O(max(n, m)) }
function addTwoNumbersOptimal(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}
