import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  const leftList: number[] = []
  const rightRecord: Record<number, number> = {}

  for (const pair of data) {
    const [left, right] = pair.split(/\s+/).map(Number);

    if (rightRecord[right] == null) rightRecord[right] = 1;
    else rightRecord[right] += 1;

    leftList.push(left);
  }

  let similarity = 0;

  for (const left of leftList) {
    const appearances = rightRecord[left] || 0;
    similarity += left * appearances;
  }


  return similarity;
}

await runSolution(day1b);
