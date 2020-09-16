//============================================================
// the task is very sequential (e.g. moves in sequence,
// robots in sequence), thus I see no needs of parallelisation
// in this particular task
//============================================================

const valid_commands_arr = ["L", "R", "F"]; // may add later

var MAX_X = 0;
var MAX_Y = 0;

var robot_inputs_arr = [];

var robot_i_line1 = "";
var robot_i_line2 = "";
var robot_i_inputs = "";

var scent_arr = []; // will accumulate here the grid points+orient+comm
// where previous robots were lost

const myRobotClass = require("./Robot.js");

process.stdout.write("--- Enter input strings terminated with ^D ---\n");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

//============================================================
// Read input:
// -- first the grid size
// -- then concat PAIR lines into 1 string per robot
// so end up with array of strings per robot.
// For real big projects would be better to validate input
// data when reading it. For this simple task validation
// here would make it too complex, so validate in main processing
//============================================================
process.stdin.on("data", (input) => {
  if ((MAX_X == 0) & (MAX_Y == 0)) {
    // this means FIRST line (grid SIZE)
    //-----------------------------------------------------

    let arr_max = input.split(" ");
    MAX_X = parseInt(arr_max[0]); // may add try/catch later in real project
    MAX_Y = parseInt(arr_max[1]);

    //-----------------------------------------------------
  } else {
    // AFTER first line
    //-----------------------------------------------------

    if (robot_i_line1 == "") {
      // 1st line for i-th robot

      robot_i_line1 = input.trim(); // ready to read THIS robot 2nd line
    } else {
      // 2nd line for i-th robot

      robot_i_line2 = input.trim();
      robot_i_inputs = robot_i_line1 + " " + robot_i_line2;

      robot_inputs_arr.push(robot_i_inputs);

      robot_i_line1 = ""; // ready to read 1st line for NEXT robot
    } // if robot first line

    //-----------------------------------------------------
  } // else AFTER grid size
}); // process.stdin.on
//============================================================
process.stdin.on("end", () => {
  main_processing();
});
//============================================================
function check_command(com) {
  let com_char_ok = false;

  valid_commands_arr.forEach((com_char) => {
    if (com == com_char) {
      com_char_ok = true;
    }
  }); // forEachValidComm

  return com_char_ok;
} // fun
//============================================================
function main_processing() {
  // in REAL online projects I use special LOGGER utility
  // to log ASYNC to log files, customized with verocity
  // levels, e.g. silent/warn/info/debug
  // Since this proj. is very sequential, we can use
  // console.log, which is blocking and not suitable
  // for real async web projects.
  console.log("------ now processing robots/moves ------");

  // forEach is SYNCHRONOUS, so it is safe here
  robot_inputs_arr.forEach((robot_i_inp) => {
    //--------------------------------------------------

    let currentRobot = new myRobotClass(robot_i_inp);

    currentRobot.check(MAX_X, MAX_Y);

    currentRobot.getComArr().forEach((com_j) => {
      if (check_command(com_j)) {
        scent_arr = currentRobot.doMove(com_j, MAX_X, MAX_Y, scent_arr);
      } else {
        // valid command char

        console.log("ERROR -5: bad robot_command");
        process.exit(-5);
      } // if valid command char
    }); // forEach command

    console.log(currentRobot.getEnd());

    //--------------------------------------------------
  }); // forEach robot
}
//============================================================

