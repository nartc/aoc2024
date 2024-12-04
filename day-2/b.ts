import { runSolution } from '../utils.ts';
import * as process from "node:process";

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  const reports: number[][] = []

  for (const line of data) {
    reports.push(line.split(' ').map(Number))
  }

  let safeCount = reports.length;

  for (const levels of reports) {
    const violatingIndices = processLevels(levels);
    if (violatingIndices.length === 0) continue;

    let stillViolating = true;
    for (const violatingIndex of violatingIndices) {
      const cloned = levels.slice();
      cloned.splice(violatingIndex, 1);

      const violated = processLevels(cloned).length > 0;
      if (!violated) {
        stillViolating = false;
        // as soon as we find a non violating level, we can consider this as safe
        break;
      }
    }

    if (stillViolating) safeCount -= 1;
  }

  return safeCount;
}

function processLevels(levels: number[]) {
  const violatingIndices: number[] = [];
  let state: 'increasing' | 'decreasing';

  for (let i = 0; i < levels.length; i++) {
    const currentLevel = levels[i];
    const nextLevel = levels[i + 1];
    const previousLevel = levels[i - 1];

    // at the end
    if (nextLevel == null) break;

    // if 2 levels are the same, we're not safe
    if (currentLevel === nextLevel) {
      violatingIndices.push(i);
      break;
    }

    // difference between current and next level is more than 3
    if (Math.abs(currentLevel - nextLevel) > 3) {
      violatingIndices.push(i, i + 1);
      break;
    }

    // if we don't have the state, we calculate it then skip to the next iteration
    if (!state) {
      state = currentLevel > nextLevel ? 'decreasing' : 'increasing';
      continue;
    }

    if (state === 'increasing' && currentLevel > nextLevel ||
      state === 'decreasing' && currentLevel < nextLevel
    ) {
      violatingIndices.push(i, i + 1);
      if (previousLevel) violatingIndices.push(i - 1);
      break;
    }
  }

  return violatingIndices;
}

await runSolution(day2a);
