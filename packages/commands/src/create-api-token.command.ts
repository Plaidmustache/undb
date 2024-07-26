import { Command, type CommandProps } from "@undb/domain"
import { createApiTokenDTO } from "@undb/openapi"
import { z } from "@undb/zod"

export const createApiTokenCommand = createApiTokenDTO

export type ICreateApiTokenCommand = z.infer<typeof createApiTokenCommand>

export class CreateApiTokenCommand extends Command implements ICreateApiTokenCommand {
  public readonly userId: string

  constructor(props: CommandProps<ICreateApiTokenCommand>) {
    super(props)
    this.userId = props.userId
  }
}
