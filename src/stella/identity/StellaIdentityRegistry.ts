import { randomUUID } from "crypto";

import type {
  StellaIdentityTrait,
} from "../../app/stella/contracts/StellaIdentityTrait";

export class StellaIdentityRegistry {
  private readonly store =
    new Map<string, StellaIdentityTrait>();

  create(
    name: string,
    description: string,
    permanent = true
  ): StellaIdentityTrait {
    const trait:
      StellaIdentityTrait = {
        id: randomUUID(),
        name,
        description,
        permanent,
      };

    this.store.set(
      trait.id,
      trait
    );

    return trait;
  }

  getAll():
    StellaIdentityTrait[] {
    return [
      ...this.store.values(),
    ];
  }

  findByName(
    name: string
  ):
    | StellaIdentityTrait
    | undefined {

    const search =
      name.toLowerCase();

    return [
      ...this.store.values(),
    ].find(
      trait =>
        trait.name
          .toLowerCase() ===
        search
    );
  }
}