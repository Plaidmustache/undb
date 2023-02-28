import { ISortDirection } from '@egodb/core'
import type { CommandProps } from '@egodb/domain'
import { Command } from '@egodb/domain'
import type { ISetFieldSortCommandInput } from './set-field-sort.command.interface.js'

export class SetFieldSortCommand extends Command implements ISetFieldSortCommandInput {
  readonly tableId: string
  readonly viewId?: string
  readonly fieldId: string
  readonly direction: ISortDirection

  constructor(props: CommandProps<ISetFieldSortCommandInput>) {
    super(props)
    this.tableId = props.tableId
    this.viewId = props.viewId
    this.fieldId = props.fieldId
    this.direction = props.direction
  }
}
