import type { Decoder } from "io-ts/Decoder";

import * as E from "fp-ts/Either";
import * as f from "fp-ts/function";
import * as IO from "fp-ts/IO";
import * as IOE from "fp-ts/IOEither";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import * as TO from "fp-ts/TaskOption";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type RPC<M, E, A> = TE.TaskEither<E, A>;

export const left: <M, E = never, A = never>(e: E) => RPC<M, E, A> = TE.left;

export const right: <M, E, A = never>(a: A) => RPC<M, E, A> = TE.right;

export const rightTask: <M, E = never, A = never>(
  ma: T.Task<A>
) => RPC<M, E, A> = TE.rightTask;

export const leftTask: <M, E, A = never>(me: T.Task<E>) => RPC<M, E, A> =
  TE.leftTask;

export const rightIO: <M, E = never, A = never>(ma: IO.IO<A>) => RPC<M, E, A> =
  TE.rightIO;

export const leftIO: <M, E = never, A = never>(me: IO.IO<E>) => RPC<M, E, A> =
  TE.leftIO;

export const fromIO: <M, A, E = never>(fa: IO.IO<A>) => RPC<M, E, A> =
  TE.fromIO;

export const fromTask: <M, A, E = never>(fa: T.Task<A>) => RPC<M, E, A> =
  TE.fromTask;

export const fromEither: <M, E, A>(fa: E.Either<E, A>) => RPC<M, E, A> =
  TE.fromEither;

export const fromIOEither: <M, E, A>(fa: IOE.IOEither<E, A>) => RPC<M, E, A> =
  TE.fromIOEither;

export const fromTaskOption: <M, E>(
  onNone: f.Lazy<E>
) => <A>(fa: TO.TaskOption<A>) => RPC<M, E, A> = TE.fromTaskOption;

export const chain: <MA, MB, E, A, B>(
  f: (a: A) => RPC<MB, E, B>
) => (ma: RPC<MA, E, A>) => RPC<MA & MB, E, B> = TE.chain;

export const chainIOK: <A, B>(
  f: (a: A) => IO.IO<B>
) => <M, E>(first: RPC<M, E, A>) => RPC<M, E, B> = TE.chainIOK;

export const chainFirstIOK: <A, B>(
  f: (a: A) => IO.IO<B>
) => <M, E>(first: RPC<M, E, A>) => RPC<M, E, A> = TE.chainFirstIOK;

export const orElseFirst: <M, E, B>(
  onLeft: (e: E) => RPC<M, E, B>
) => <A>(ma: RPC<M, E, A>) => RPC<M, E, A> = TE.orElseFirst;

export const orElseFirstIOK: <E, B>(
  onLeft: (e: E) => IO.IO<B>
) => <M, A>(ma: RPC<M, E, A>) => RPC<M, E, A> = TE.orElseFirstIOK;

export const of: <M, E = never, A = never>(a: A) => RPC<M, E, A> = right;

export const Do: RPC<unknown, unknown, unknown> = of({});

export type RpcHandler<M, E, A> = (...args: any[]) => Promise<E.Either<E, A>>;

export type Method = "GET" | "POST";

const methodNotAllowed = [405, "Method not allowed."] as const;

export const method =
  <A>(fm: (args: A) => string | undefined) =>
  <MT extends Method>(mt: MT) =>
  <M, E>(rpc: RPC<M, E, A>) =>
    f.pipe(
      rpc,
      chain((args) =>
        fromEither<{ method: MT }, E | typeof methodNotAllowed, typeof args>(
          f.pipe(
            args,
            E.fromPredicate(
              (args) => fm(args) === mt,
              () => methodNotAllowed
            )
          )
        )
      )
    );

const cannotDecodeQuery = [400, "Cannot decode query."] as const;

export const query =
  <A, DI>(fdi: (args: A) => DI) =>
  <DA>(decoder: Decoder<DI, DA>) =>
  <M, E>(rpc: RPC<M, E, A>) =>
    f.pipe(
      rpc,
      chain((args) =>
        fromEither<
          { query: DA },
          E | typeof cannotDecodeQuery,
          typeof args & { query: DA }
        >(
          f.pipe(args, (args) =>
            f.pipe(
              decoder.decode(fdi(args)),
              E.chain((query) => E.right({ ...args, query })),
              E.orElseW(() => E.left(cannotDecodeQuery))
            )
          )
        )
      )
    );
