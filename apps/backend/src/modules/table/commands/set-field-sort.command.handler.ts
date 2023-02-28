import { ITableRepository } from '@egodb/core'
import { SetFieldSortCommand, SetFieldSortCommandHandler as DomainHandler } from '@egodb/cqrs'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import { InjectTableReposiory } from '../adapters'

@CommandHandler(SetFieldSortCommand)
export class SetFieldSortCommandHandler extends DomainHandler implements ICommandHandler<SetFieldSortCommand> {
  constructor(
    @InjectTableReposiory()
    protected readonly repo: ITableRepository,
  ) {
    super(repo)
  }
}
