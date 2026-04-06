import type { Item } from '@wfcd/items';
import { find } from '@wfcd/items/utilities';

export function findItem(uniqueName: string): Item | undefined {
  const item = find.findItem(uniqueName);
  if (item === undefined) return undefined;

  delete item.patchlogs;
  if ('components' in item) {
    delete item.components;
    delete item.buildPrice;
    delete item.skipBuildTimePrice;
    delete item.buildQuantity;
    delete item.consumeOnBuild;
    delete item.buildTime;
  }

  if ('damagePerShot' in item) delete item.damagePerShot;

  if ('conclave' in item) {
    delete item.conclave;
    delete item.introduced;
  }

  return item;
}
