import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  const reports = data.map(line => line.split(' ').map(Number));
  let safeCount = reports.length;

  for (const levels of reports) {
    const violatingIndices = processLevels(levels);
    if (violatingIndices.length === 0) continue;

    let stillViolating = true;
    for (const violatingIndex of violatingIndices) {
      const isViolated = processLevels(levels, violatingIndex).length > 0;
      if (!isViolated) {
        stillViolating = false;
        // as soon as we find a non violating level, we can consider this as safe
        break;
      }
    }

    if (stillViolating) safeCount -= 1;
  }

  return safeCount;
}

function processLevels(levels: number[], skipIndex?: number) {
  const violatingIndices: number[] = [];
  let state: 'increasing' | 'decreasing';

  for (let i = 0; i < levels.length; i++) {
    if (i === skipIndex) continue;
    const nextIndex = i + 1 === skipIndex ? i + 2 : i + 1;
    if (nextIndex >= levels.length) break;

    const current = levels[i];
    const next = levels[nextIndex];

    // if 2 levels are the same, we're not safe
    if (current === next) {
      violatingIndices.push(i);
      break;
    }

    // difference between current and next level is more than 3
    if (Math.abs(current - next) > 3) {
      violatingIndices.push(i, nextIndex);
      break;
    }

    // if we don't have the state, we calculate it then skip to the next iteration
    if (!state) {
      state = current > next ? 'decreasing' : 'increasing';
      continue;
    }

    if (state === 'increasing' && current > next ||
        state === 'decreasing' && current < next) {
      violatingIndices.push(i, nextIndex);
      const prevIndex = i - 1;
      if (prevIndex >= 0 && prevIndex !== skipIndex) violatingIndices.push(prevIndex);
      break;
    }
  }

  return violatingIndices;
}
await runSolution(day2b);
