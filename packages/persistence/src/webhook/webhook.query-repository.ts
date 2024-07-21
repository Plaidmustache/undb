import { inject, singleton } from "@undb/di"
import { None, Some, type IPagination, type Option } from "@undb/domain"
import type { IWebhookDTO, IWebhookQueryRepository, WebhookSpecification } from "@undb/webhook"
import type { IQueryBuilder } from "../qb"
import { injectQueryBuilder } from "../qb.provider"
import { WebhookFilterVisitor } from "./webhook.filter-visitor"
import { WebhookMapper } from "./webhook.mapper"

@singleton()
export class WebhookQueryRepository implements IWebhookQueryRepository {
  constructor(
    @inject(WebhookMapper)
    private readonly mapper: WebhookMapper,
    @injectQueryBuilder()
    private readonly qb: IQueryBuilder,
  ) {}

  async findOneById(id: string): Promise<Option<IWebhookDTO>> {
    const wb = await this.qb
      .selectFrom("undb_webhook")
      .selectAll()
      .where((eb) => eb.eb("id", "=", id))
      .executeTakeFirst()

    return wb ? Some(this.mapper.toDTO(wb)) : None
  }

  async find(spec: Option<WebhookSpecification>, pagination: Option<IPagination>): Promise<IWebhookDTO[]> {
    const wbs = await this.qb
      .selectFrom("undb_webhook")
      .selectAll()
      .where((eb) => {
        const visitor = new WebhookFilterVisitor(eb)
        if (spec.isSome()) {
          spec.unwrap().accept(visitor)
        }

        return visitor.cond
      })
      .execute()

    return wbs.map(this.mapper.toDTO)
  }
}
