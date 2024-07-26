import { singleton } from "@undb/di"
import type { ApiTokenDo, IApiTokenRepository } from "@undb/openapi"
import type { IQueryBuilder } from "../qb"
import { injectQueryBuilder } from "../qb.provider"

@singleton()
export class ApiTokenRepository implements IApiTokenRepository {
  constructor(
    @injectQueryBuilder()
    private readonly qb: IQueryBuilder,
  ) {}
  async insert(token: ApiTokenDo): Promise<void> {
    await this.qb
      .insertInto("undb_api_token")
      .values({
        id: token.id.value,
        user_id: token.userId,
        token: token.token.value,
      })
      .execute()
  }

  async deleteOneById(id: string): Promise<void> {
    await this.qb.deleteFrom("undb_api_token").where("undb_api_token.id", "=", id).execute()
  }
}
