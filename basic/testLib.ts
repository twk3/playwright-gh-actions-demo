import { test as baseTest } from '@playwright/test';
import { 
  CurrentsFixtures,
  CurrentsWorkerFixtures,
  fixtures
} from '@currents/playwright';

export const test = baseTest.extend<CurrentsFixtures, CurrentsWorkerFixtures>(
  fixtures.defaultFixtures
);