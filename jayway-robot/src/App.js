import "./App.css";
import { useState } from "react";
import { RobotInput } from "./components/RobotInput";
import Button from "@mui/material/Button";

function App() {
  const [xAxis, setXaxis] = useState("");
  const [yAxis, setYaxis] = useState("");
  const [robotXLocation, setRobotXLocation] = useState("");
  const [robotYLocation, setRobotYLocation] = useState("");
  const [robotDirection, setRobotDirection] = useState("");
  const [instruction, setInstruction] = useState("");

  const [room, setRoom] = useState({
    xAxis: "",
    yAxis: "",
  });
  const [robot, setRobot] = useState({
    x: "",
    y: "",
    direction: "",
    instructions: "",
  });

  //create change Function with purpose to enter setState-func as callback
  const changeFunc = (e, cb) => {
    cb(Number(e.target.value));
  };

  //Validation function to check wheter input is valid
  const validationFunc = (xaxis, yaxis, locx, locy, dir) => {
    //check that room x- and y-axis are of valid inputs
    const checkXAxis = typeof Number(xaxis) == "number" && Number(xaxis) > 0;
    const checkYAxis = typeof Number(yaxis) == "number" && Number(yaxis) > 0;

    //check that location is valid
    // UPDATED: Changed locx < xAxis instead of < xAxis - 1)
    const locationX = locx < xAxis && locx >= 0;
    const locationY = locy < yAxis && locy >= 0;

    // UPDATED: To check that the Robot direction is valid (N,E,S or W)
    const direction = dir.toUpperCase();
    const validDirection = ["N", "S", "W", "E"];
    const checkDir = validDirection.include(direction);

    if (checkXAxis && checkYAxis && locationX && locationY && checkDir) {
      console.log("input is valid!");
    } else {
      console.log("invalid input");
    }
  };

  const handleClick2 = (e) => {
    console.log(room);
    console.log(robot);

    let x = robot.x;
    let y = robot.y;
    let dir = robot.direction;

    const instArr = robot.instructions.toUpperCase().split("");

    instArr.forEach((inst) => {
      //Check for adjustment to direction instruction
      //UPDATED: consolidated the cases resulting in the same direction
      if ((inst === "L" && dir === "N") || (inst === "R" && dir === "S")) {
        dir = "W";
      } else if (
        (inst === "L" && dir === "W") ||
        (inst === "R" && dir === "E")
      ) {
        dir = "S";
      } else if (
        (inst === "L" && dir === "S") ||
        (inst === "R" && dir === "N")
      ) {
        dir = "E";
      } else if (
        (inst === "L" && dir === "E") ||
        (inst === "R" && dir === "W")
      ) {
        dir = "N";
      }

      //Movement
      if (inst === "F" && dir === "E" && x < room.xAxis) {
        x++;
      }
      if (inst === "F" && dir === "W" && x > 0) {
        x--;
      }
      if (inst === "F" && dir === "S" && y < room.yAxis) {
        y++;
      }
      if (inst === "F" && dir === "N" && y > 0) {
        y--;
      }
    });

    console.log(x, y, dir);

    setRobot((prevState) => ({
      ...prevState,
      x,
      y,
      direction: dir,
    }));
  };

  const handleClick = (e) => {
    //assign new variables to refrain from updating state in a loop
    const axisX = xAxis;
    const axisY = yAxis;
    let x = robotXLocation;
    let y = robotYLocation;
    let dir = robotDirection;

    //run validation to confirm wheter parameters are valid
    validationFunc(axisX, axisY, x, y);

    //Create an array from the instruction-string. Making it uppercase to handle both lower and upper-case letters.
    const instArr = instruction.toUpperCase().split("");

    //loop through the instruction-array to determine appropriate action
    instArr.forEach((inst) => {
      //Check for adjustment to direction instruction
      //UPDATED: consolidated the cases resulting in the same direction
      if ((inst === "L" && dir === "N") || (inst === "R" && dir === "S")) {
        dir = "W";
      } else if (
        (inst === "L" && dir === "W") ||
        (inst === "R" && dir === "E")
      ) {
        dir = "S";
      } else if (
        (inst === "L" && dir === "S") ||
        (inst === "R" && dir === "N")
      ) {
        dir = "E";
      } else if (
        (inst === "L" && dir === "E") ||
        (inst === "R" && dir === "W")
      ) {
        dir = "N";
      }

      //Movement
      if (inst === "F" && dir === "E" && x < xAxis) {
        x++;
      }
      if (inst === "F" && dir === "W" && x > 0) {
        x--;
      }
      if (inst === "F" && dir === "S" && y < yAxis) {
        y++;
      }
      if (inst === "F" && dir === "N" && y > 0) {
        y--;
      }
    });

    //Update state with corresponding robot location after the loop has been run through
    setRobotYLocation(y);
    setRobotXLocation(x);
    setRobotDirection(dir);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <RobotInput
            text={"Room X-axis (number > 0)"}
            name="x-axis"
            onChange={(e) =>
              setRoom((prevState) => ({
                ...prevState,
                xAxis: Number(e.target.value),
              }))
            }
          />
          <RobotInput
            text={"Room Y-axis (number > 0"}
            name="y-axis"
            onChange={(e) =>
              setRoom((prevState) => ({
                ...prevState,
                yAxis: Number(e.target.value),
              }))
            }
          />
        </div>
        <div style={{ margin: "10px" }}>
          <RobotInput
            text={"Robot X-location (number)"}
            name="x-location"
            onChange={(e) =>
              setRobot((prevState) => ({
                ...prevState,
                x: Number(e.target.value),
              }))
            }
          />
          <RobotInput
            text={"Robot Y-location (number)"}
            name="y-location"
            onChange={(e) =>
              setRobot((prevState) => ({
                ...prevState,
                y: Number(e.target.value),
              }))
            }
          />
          <RobotInput
            text={"Robot Direction (N,W,S or E)"}
            name="direction"
            onChange={(e) =>
              setRobot((prevState) => ({
                ...prevState,
                direction: e.target.value,
              }))
            }
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <RobotInput
            text={"Instructions"}
            name="instructions"
            onChange={(e) =>
              setRobot((prevState) => ({
                ...prevState,
                instructions: e.target.value,
              }))
            }
          />
        </div>

        <Button variant="outlined" onClick={handleClick2}>
          Calculate
        </Button>
        <div>
          (x,y,direction) = ({robot.x},{robot.y},{robot.direction})
        </div>
        <div style={{ height: "70px" }}></div>
        <div>
          <RobotInput
            text={"Room X-axis (number > 0)"}
            onChange={(e) => {
              changeFunc(e, setXaxis);
            }}
          />
          <RobotInput
            text={"Room Y-axis (number > 0"}
            onChange={(e) => {
              changeFunc(e, setYaxis);
            }}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <RobotInput
            text={"Robot X-location (number)"}
            onChange={(e) => {
              changeFunc(e, setRobotXLocation);
            }}
          />
          <RobotInput
            text={"Robot Y-location (number)"}
            onChange={(e) => {
              changeFunc(e, setRobotYLocation);
            }}
          />
          <RobotInput
            text={"Robot Direction (N,W,S or E)"}
            onChange={(e) => setRobotDirection(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <RobotInput
            text={"Instructions"}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </div>

        <Button variant="outlined" onClick={handleClick}>
          Calculate
        </Button>
        <div>
          (x,y,direction) = ({robotXLocation},{robotYLocation},{robotDirection})
        </div>
      </header>
    </div>
  );
}

export default App;
