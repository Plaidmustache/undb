import { z } from 'zod'
import { rootFilter } from '../../filter'
import { tableIdSchema } from '../../value-objects'
import { viewNameSchema } from '../../view'

export const setFiltersCommandInput = z.object({
  tableId: tableIdSchema,
  viewKey: viewNameSchema.optional(),
  filter: rootFilter.nullable(),
})
