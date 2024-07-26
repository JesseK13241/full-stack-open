import diaries from '../data/diagnoses';

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diaries;
};

export default getDiagnoses;