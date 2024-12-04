import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  const reports = data.map(line => line.split(' ').map(Number));
  return reports.filter(isValidLevel).length;
}

function isValidLevel(levels: number[]): boolean {
  let state: 'increasing' | 'decreasing';

  for (let i = 0; i < levels.length - 1; i++) {
    const current = levels[i];
    const next = levels[i + 1];

    // Early returns for invalid cases
    if (current === next || Math.abs(current - next) > 3) {
      return false;
    }

    if (!state) {
      state = current > next ? 'decreasing' : 'increasing';
      continue;
    }

    if ((state === 'decreasing' && current < next) ||
        (state === 'increasing' && current > next)) {
      return false;
    }
  }

  return true;
}

await runSolution(day2a);
