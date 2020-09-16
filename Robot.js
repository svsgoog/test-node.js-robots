//############################################################################
// Robot class: begin
//############################################################################

const move_left  = { N: "W", E: "N", S: "E", W: "S" };
const move_right = { N: "E", E: "S", S: "W", W: "N" };

// Class Constructor
function Robot(state_str) {

  const arr_split = state_str.split(" ");

  this.x = parseInt(arr_split[0]);
  this.y = parseInt(arr_split[1]);
  this.o = arr_split[2].toUpperCase();
  this.commands = arr_split[3].toUpperCase();

  this.end = "";
  this.isLost = false;

  /* may use async LOGGER to file with verbosity levels, etc
  console.log( "new Robot: " + " x=" + this.x
                             + " y=" + this.y
                             + " o=" + this.o
                             + " c=" + this.commands );
  */
} // constructor

Robot.prototype.getX   = function () { return this.x; };
Robot.prototype.getY   = function () { return this.y; };
Robot.prototype.getO   = function () { return this.o; };
Robot.prototype.getXYO = function () { return this.x + " " + this.y + " " + this.o; };
Robot.prototype.getEnd = function () { return this.end; };
Robot.prototype.isLost = function () { return this.isLost; };
Robot.prototype.getCom = function () { return this.commands; };

//==========================================================
Robot.prototype.getComArr = function () {

  let com_arr = [];

  if (this.commands.length > 1) {
    com_arr = this.commands.split("");
  } else if (this.commands.length == 1) {
    com_arr.push(this.commands);
  } else {
    console.log("ERROR -4: bad robot_i_commands");
    process.exit(-4);
  }

  return com_arr;
}; // method getComArr
//==========================================================
Robot.prototype.check = function (max_x, max_y) {

  if (this.x < 0 || this.x > max_x) {
    console.log("ERROR -1: bad robot.x");
    process.exit(-1);
  }

  if (this.y < 0 || this.y > max_y) {
    console.log("ERROR -2: bad robot.y");
    process.exit(-2);
  }

  if (this.o != "N" && this.o != "E" && this.o != "S" && this.o != "W") {
    console.log("ERROR -3: bad robot.o");
    process.exit(-3);
  }

}; // method check
//==========================================================
Robot.prototype.isSafe = function (comm, max_x, max_y, sce_arr) {

  let this_robot = this; // forEach(function(){}) does not see "this."

  let safe_move = true;

  sce_arr.forEach((scent_str) => {
    scent_split = scent_str.split(" ");

    if (
      this_robot.x == parseInt(scent_split[0]) &&
      this_robot.y == parseInt(scent_split[1]) &&
      this_robot.o ==          scent_split[2]  &&
      comm         ==          scent_split[3]
    ) {
      safe_move = false;
      // console.log( "scent_ERR: " + "NOT SAFE move IGNORED" );
    } // if
  }); // forEach scent_arr

  return safe_move;
};
//==========================================================
Robot.prototype.doMove = function (comm, max_x, max_y, sce_arr) {

  if (!this.isLost) {

    let next_x = this.x;
    let next_y = this.y;
    let next_o = this.o;

    if (this.isSafe(comm, max_x, max_y, sce_arr)) {

      switch (comm) {
        case "L": next_o = move_left [this.o] || this.o; break;
        case "R": next_o = move_right[this.o] || this.o; break;
        case "F":
          switch (this.o) {
            case "N": next_y = this.y + 1; break;
            case "E": next_x = this.x + 1; break;
            case "S": next_y = this.y - 1; break;
            case "W": next_x = this.x - 1; break;
          }
          break;
      } // switch com
    } // if safe_move

    //--- check if next state is out of the GRID
    if (next_x < 0 || next_x > max_x || next_y < 0 || next_y > max_y) {
      this.isLost = true;
      this.end = this.getXYO() + " LOST";
      sce_arr.push(this.getXYO() + " " + comm);
    } else {
      this.x = next_x;
      this.y = next_y;
      this.o = next_o;
      this.end = this.getXYO();
    } // if outside the GRID

  } // if not lost

  return sce_arr;
}; // method doMove
//==========================================================

//############################################################################
// Robot class: end
//############################################################################

module.exports = Robot;

