const expect = require("chai").expect;

const myRobotClass = require("../Robot.js");

describe("Robot.js tests:", () => {

  //------ test1 ------------------------------------------
  describe("Test1: Robot.doMove( 1 1 E + R )", () => {
    it("robot(1 1 E) + move(R) -> should be: robot(1 1 S)", () => {

      let currentRobot = new myRobotClass("1 1 E RFRFRFRF");

      currentRobot.check(5, 3);

      let scent_arr = currentRobot.doMove("R", 5, 3, []);

      let end_state = currentRobot.getEnd();

      // console.log( "end = " + end_state );
      // console.log( "sce = " + scent_arr );

      expect(end_state).to.equal("1 1 S");
    });
  }); // test 1
  //-------------------------------------------------------

  //------ test2 ------------------------------------------
  describe("Test2: Robot.doMove( 1 1 E + L )", () => {
    it("robot(1 1 E) + move(L) -> should be: robot(1 1 N)", () => {

      let currentRobot = new myRobotClass("1 1 E RFRFRFRF");

      currentRobot.check(5, 3);

      let scent_arr = currentRobot.doMove("L", 5, 3, []);

      let end_state = currentRobot.getEnd();

      expect(end_state).to.equal("1 1 N");
    });
  }); // test 2
  //-------------------------------------------------------

  //------ test3 ------------------------------------------
  describe("Test3: Robot.doMove( 1 1 E + F )", () => {
    it("robot(1 1 E) + move(F) -> should be: robot(2 1 E)", () => {

      let currentRobot = new myRobotClass("1 1 E RFRFRFRF");

      currentRobot.check(5, 3);

      let scent_arr = currentRobot.doMove("F", 5, 3, []);

      let end_state = currentRobot.getEnd();

      expect(end_state).to.equal("2 1 E");
    });
  }); // test 3
  //-------------------------------------------------------

  //------ test4 ------------------------------------------
  describe("Test4: Robot.doMove( 3 3 N + F )", () => {
    it("robot(3 3 N) + move(F) -> should be: robot(3 3 N lost)", () => {

      let currentRobot = new myRobotClass("3 3 N RFRFRFRF");

      currentRobot.check(5, 3);

      let scent_arr = currentRobot.doMove("F", 5, 3, []);

      let end_state = currentRobot.getEnd();

      expect(end_state).to.equal("3 3 N LOST");

      expect(scent_arr[0]).to.equal("3 3 N F");
    });
  }); // test 1
  //-------------------------------------------------------
});


