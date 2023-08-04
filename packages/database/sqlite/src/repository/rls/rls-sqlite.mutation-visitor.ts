import type { EntityManager } from '@mikro-orm/better-sqlite'
import { wrap } from '@mikro-orm/core'
import type {
  IRLSVisitor,
  WithRLSAction,
  WithRLSActionIn,
  WithRLSId,
  WithRLSPolicy,
  WithRLSTableId,
  WithRLSViewId,
} from '@undb/authz'
import type { ISpecVisitor, ISpecification } from '@undb/domain'
import { RLS } from '../../entity/rls.js'
import { BaseEntityManager } from '../base-entity-manager.js'

export class RLSSqliteMutationVisitor extends BaseEntityManager implements IRLSVisitor {
  constructor(
    protected readonly em: EntityManager,
    public readonly id: string,
  ) {
    super(em)
  }
  withId(s: WithRLSId): void {
    throw new Error('Method not implemented.')
  }
  withTableId(s: WithRLSTableId): void {
    throw new Error('Method not implemented.')
  }
  withViewId(s: WithRLSViewId): void {
    throw new Error('Method not implemented.')
  }
  withRLSPolicy(s: WithRLSPolicy): void {
    throw new Error('Method not implemented.')
  }
  withRLSPolicyAction(s: WithRLSAction): void {
    const rls = this.em.getReference(RLS, this.id)
    wrap(rls).assign({ policy: { action: s.action } })
    this.em.persist(rls)
  }
  actionsIn(s: WithRLSActionIn): void {
    throw new Error('Method not implemented.')
  }
  or(left: ISpecification<any, ISpecVisitor>, right: ISpecification<any, ISpecVisitor>): this {
    throw new Error('Method not implemented.')
  }
  not(): this {
    throw new Error('Method not implemented.')
  }
}
