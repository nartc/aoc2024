import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  data.pop();

  const leftNums: number[] = []
  const rightNums: number[] = []

  for (const pair of data) {
    const [left, right] = pair.split(/\s+/).map(Number);

    leftNums.push(left);
    rightNums.push(right);
  }

  leftNums.sort();
  rightNums.sort();


  let answer = 0;
  for (let i = 0; i < leftNums.length; i++) {
    const dist = Math.abs(rightNums[i] - leftNums[i]);
    answer += dist;
  }

  return answer;
}

await runSolution(day1a);
