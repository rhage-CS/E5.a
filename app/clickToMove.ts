import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

/** The direction from one tile to a neighboring one, or undefined if not a neighbor. */
function directionTo(from: Position, to: Position): Direction | undefined {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dx === 1 && dy === 0) return "right";
  if (dx === -1 && dy === 0) return "left";
  if (dx === 0 && dy === 1) return "down";
  if (dx === 0 && dy === -1) return "up";
  return undefined;
}

// Strategy: one more way of turning input into Commands. Clicking a tile next
// to the player moves there; the board and the model are unchanged.
export const clickToMove: Controller = {
  label: "Click a neighboring tile",
  attach(session, board) {
    const stop = board.onTileClick((at) => {
      const { player } = session.getState().puzzle;
      const direction = directionTo(player, at);
      if (direction) session.dispatch({ kind: "move", direction });
    });
    return stop;
  },
};
