import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as RE from "fp-ts/Refinement";

type Box = BlueBox | RedBox;

type BlueBox = {
  t: "Blue";
  value: string;
};
type RedBox = {
  t: "Red";
  value: string;
};

// this are typesafe
const parseBlueBox = (box: Box): O.Option<BlueBox> =>
  box.t === "Blue" ? O.some(box) : O.none;
const parseRedBox = (box: Box): O.Option<RedBox> =>
  box.t === "Red" ? O.some(box) : O.none;

const isBlueBox = RE.fromOptionK(parseBlueBox);
const isRedBox = RE.fromOptionK(parseRedBox);

const boxes: Array<Box> = [
  { t: "Blue", value: "I'm blue box" },
  { t: "Red", value: "I'm red box" },
];

const onlyBlueBoxes = A.filterMap(parseBlueBox)(boxes);
console.log(onlyBlueBoxes);

const redBox: RedBox = {
  t: "Red",
  value: "I'm red box",
};
console.log(isBlueBox(redBox));
