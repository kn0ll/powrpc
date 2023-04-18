import * as C from "@effect/data/Context";
import * as Either from "@effect/data/Either";
import { pipe } from "@effect/data/Function";
import * as Effect from "@effect/io/Effect";

type Res = {
  status: number;
  body?: string;
  headers?: [string, string][];
};

export type Context<Meta> = {
  method?: string;
  query?: unknown;
  body?: unknown;
  text: (res: Res) => void;
  json: (res: Res) => void;
};

const context = <Meta>() => C.Tag<Context<Meta>>("XXX");

export type Handler<Meta, E, A, Args extends unknown[]> = (
  ...args: Args
) => Promise<Either.Either<E, A>>;

export type Method = "GET" | "POST" | "DELETE";

const methodNotAllowed = {
  status: 405,
  body: "Method not allowed.",
} as const;

export const method =
  <MT extends Method>(mt: MT) =>
  <Meta, E, A>(
    self: Effect.Effect<Context<Meta>, E, A>
  ): Effect.Effect<
    Context<Meta & { method: MT }>,
    E | typeof methodNotAllowed,
    A
  > =>
    pipe(
      self,
      Effect.flatMap((a) =>
        pipe(
          context<Meta>(),
          Effect.map(({ method }) =>
            pipe(
              method,
              Either.liftPredicate(
                () => method === mt,
                () => methodNotAllowed
              ),
              Either.map(() => a)
            )
          )
        )
      ),
      Effect.flatMap(Effect.fromEither)
    );

const unprocessableContent = {
  status: 422,
  body: "Could not parse query.",
} as const;

export const query =
  <EE, EA>(parseEither: (i: unknown) => Either.Either<EE, EA>) =>
  <Meta, E, A>(
    self: Effect.Effect<Context<Meta>, E, A>
  ): Effect.Effect<
    Context<Meta & { query: EA }>,
    E | typeof unprocessableContent,
    A & { query: EA }
  > =>
    pipe(
      self,
      Effect.flatMap((a) =>
        pipe(
          context<Meta>(),
          Effect.map(({ query }) =>
            pipe(
              parseEither(query),
              Either.map((x) => ({ ...a, query: x })),
              Either.mapLeft(() => unprocessableContent)
            )
          )
        )
      ),
      Effect.flatMap(Effect.fromEither)
    );

const respond =
  (
    r: <Meta, R extends Res>({
      status,
      body,
    }: R) => Effect.Effect<Context<Meta>, never, void>
  ) =>
  <Meta, R extends Context<Meta>, E extends Res, A extends Res>(
    self: Effect.Effect<R, E, A>
  ) =>
    pipe(self, Effect.tapBoth(r, r));

export const text = respond(<Meta, R extends Res>({ status, body }: R) =>
  pipe(
    context<Meta>(),
    Effect.flatMap(({ text }) => Effect.sync(() => text({ status, body })))
  )
);

export const json = respond(<Meta, R extends Res>({ status, body }: R) =>
  pipe(
    context<Meta>(),
    Effect.flatMap(({ json }) => Effect.sync(() => json({ status, body })))
  )
);

export const handler =
  <Args extends unknown[]>(fn: (...args: Args) => Context<unknown>) =>
  <M, E extends Res, A extends Res>(
    handle: (
      self: Effect.Effect<Context<unknown>, never, unknown>
    ) => Effect.Effect<Context<M>, E, A>,
    respond = json
  ): Handler<M, E, A, Args> =>
  (...args) =>
    pipe(
      Effect.Do(),
      handle,
      respond,
      Effect.provideService(context<unknown>(), fn(...args)),
      Effect.runPromiseEither
    );
