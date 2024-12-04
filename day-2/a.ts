import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  const reports: number[][] = []

  for (const line of data) {
    reports.push(line.split(' ').map(Number))
  }

  let safeCount = reports.length;
  for (const levels of reports) {
    let state: 'increasing' | 'decreasing';
    for (let i = 0; i < levels.length; i++) {
      const currentLevel = levels[i];
      const nextLevel = levels[i + 1];

      // at the end
      if (!nextLevel) {
        continue;
      }

      // if 2 levels are the same, we're not safe
      if (currentLevel === nextLevel) {
        safeCount -= 1;
        break;
      }

      // difference between current and next level is more than 3
      if (Math.abs(currentLevel - nextLevel) > 3) {
        safeCount -= 1;
        break;
      }

      // if we don't have the state, we calculate it then skip to the next iteration
      if (!state) {
        state = currentLevel > nextLevel ? 'decreasing' : 'increasing';
        continue;
      }

      if (state === 'decreasing' && currentLevel < nextLevel) {
        // state changed
        safeCount -= 1;
        break;
      } else if (state === 'increasing' && currentLevel > nextLevel) {
        // state changed
        safeCount -= 1;
        break;
      }
    }
  }

  return safeCount;
}

await runSolution(day2a);
