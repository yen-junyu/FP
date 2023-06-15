import assert from "assert";
import * as O from "fp-ts/Option";
import * as E from 'fp-ts/Either'
import * as A from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function";

// of
let a = O.of(1);
console.log(a)

// fromPredicate
const getOption = O.fromPredicate((n: number) => n >= 0)
assert.deepStrictEqual(getOption(-1), O.none)
assert.deepStrictEqual(getOption(1), O.some(1))


console.log(E.right(1))
console.log(E.left('a'))
assert.deepStrictEqual(O.getLeft(E.right(1)), O.none)
assert.deepStrictEqual(O.getLeft(E.left('a')), O.some('a'))

// map
const arr: number[] = [1,2,3];
const safeFirstElement: O.Option<number> = A.head(arr);

const firstElementTimesTwo = pipe(
  safeFirstElement,
  O.map(value => value * 2)
);
console.log(firstElementTimesTwo)



function ComputeWithFpts(array: number[]): string {
    return pipe(
      A.head(array), // O.some(1)
      O.map(n => n * 2), // O.some(2)
      O.chain(n => (n === 0 ? O.none : O.some(1 / n))), // O.some(O.some(1/2)) => O.some(1/2)
      O.filter(n => n > 1), // O.none
      O.fold(
        () => "ko",
        (result) => `the result is: ${result}`
      )
    );
  }
  
  console.log(ComputeWithFpts([1]));
  console.log(ComputeWithFpts([0.2]));