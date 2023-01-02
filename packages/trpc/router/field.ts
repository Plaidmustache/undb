import { CreateFieldCommand, createFieldCommandInput } from '@egodb/core'
import type { ICommandBus } from '@egodb/domain'
import { z } from 'zod'
import type { publicProcedure } from '../trpc'
import { router } from '../trpc'
import { createSelectFieldRouter } from './select-field'

const TAG_TABLE = 'table'
const tags = [TAG_TABLE]

export const createFieldRouter = (procedure: typeof publicProcedure) => (commandBus: ICommandBus) =>
  router({
    create: procedure
      .meta({ openapi: { method: 'POST', path: '/table.field.create', tags } })
      .input(createFieldCommandInput)
      .output(z.void())
      .mutation(({ input }) => {
        const cmd = new CreateFieldCommand(input)
        return commandBus.execute(cmd)
      }),
    select: createSelectFieldRouter(procedure)(commandBus),
  })
