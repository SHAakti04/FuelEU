// import { Pool, PoolMember } from "../domain/Pool";

// export class PoolingUseCase {
//   execute(year: number, members: PoolMember[]): Pool {
//     const totalCB = members.reduce((sum, m) => sum + m.cbBefore, 0);

//     if (totalCB < 0) {
//       throw new Error("Pooling not allowed: total CB is negative");
//     }

//     const surplus = members
//       .filter(m => m.cbBefore > 0)
//       .sort((a, b) => b.cbBefore - a.cbBefore);

//     const deficit = members
//       .filter(m => m.cbBefore < 0)
//       .sort((a, b) => a.cbBefore - b.cbBefore);

//     for (const d of deficit) {
//       let needed = Math.abs(d.cbBefore);

//       for (const s of surplus) {
//         if (s.cbBefore <= 0 || needed <= 0) continue;

//         const transfer = Math.min(s.cbBefore, needed);
//         s.cbBefore -= transfer;
//         needed -= transfer;
//         d.cbBefore += transfer;
//       }

//       if (d.cbBefore < 0) {
//         throw new Error("Deficit could not be fully compensated");
//       }
//     }

//     const adjusted: PoolMember[] = members.map(m => ({
//       shipId: m.shipId,
//       cbBefore: m.cbBefore,
//       cbAfter: m.cbBefore
//     }));

//     return new Pool(year, adjusted);
//   }
// }
import { Pool, PoolMember } from "../domain/Pool";

export class PoolingUseCase {
  execute(year: number, members: PoolMember[]): Pool {
    // Preserve original CB
    const working = members.map(m => ({
      shipId: m.shipId,
      cbBefore: m.cbBefore,
      cbAfter: m.cbBefore
    }));

    const totalCB = working.reduce((sum, m) => sum + m.cbBefore, 0);

    if (totalCB < 0) {
      throw new Error("Pooling not allowed: total CB is negative");
    }

    const surplus = working
      .filter(m => m.cbAfter > 0)
      .sort((a, b) => b.cbAfter - a.cbAfter);

    const deficit = working
      .filter(m => m.cbAfter < 0)
      .sort((a, b) => a.cbAfter - b.cbAfter);

    for (const d of deficit) {
      let needed = Math.abs(d.cbAfter);

      for (const s of surplus) {
        if (s.cbAfter <= 0 || needed <= 0) continue;

        const transfer = Math.min(s.cbAfter, needed);

        s.cbAfter -= transfer;
        d.cbAfter += transfer;
        needed -= transfer;
      }

      if (d.cbAfter < 0) {
        throw new Error("Deficit could not be fully compensated");
      }
    }

    return new Pool(year, working);
  }
}
