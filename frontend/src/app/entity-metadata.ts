import { EntityMetadataMap } from '@ngrx/data';

import { Account } from './accounts/model/account';

const entityMetadata: EntityMetadataMap = {
  Account: {
    selectId: (account: Account) => account._id,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
};

export const entityConfig = {
  entityMetadata,
};
