# test-node.js-robots

This is a solution for a simple node.js test case described in details at 
https://github.com/guidesmiths/interview-code-challenges/blob/master/node/martian-robots/instructions.md

I've created class Robot.js to implement the logic of a robot,
and the main.js program to read input from console and run
a set of paths (consisting of sets of moves) per each robot.

The main program parameters are in the following global variables:

MAX_X, MAX_Y = size of the grid

robot_inputs_arr = inputs per robot

scent_arr = knowledge about lost robots

The main loop goes per robot (their inputs array).
Per each robot, a Robot object is created using its inputs.
Then after corresponding conditions check, there is loop over robot moves to run each move via Robot.doMove() method.
