import "./App.css";
import { useState } from "react";
import { RobotInput } from "./components/RobotInput";
import Button from "@mui/material/Button";

function App() {
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

  //Validation function to check wheter input is valid
  const validationFunc = (xaxis, yaxis, locx, locy, dir) => {
    //check that room x- and y-axis are of valid inputs
    const checkXAxis = typeof Number(xaxis) == "number" && Number(xaxis) > 0;
    const checkYAxis = typeof Number(yaxis) == "number" && Number(yaxis) > 0;

    //check that location is valid
    // UPDATED: Changed locx < xAxis instead of < xAxis - 1)
    const locationX = locx < room.xAxis && locx >= 0;
    const locationY = locy < room.yAxis && locy >= 0;

    // UPDATED: To check that the Robot direction is valid (N,E,S or W)
    const direction = dir.toUpperCase();
    const validDirection = ["N", "S", "W", "E"];
    const checkDir = validDirection.includes(direction);

    return checkXAxis && checkYAxis && locationX && locationY && checkDir;
  };

  const handleClick = () => {
    validationFunc(room.xAxis, room.yAxis, robot.x, robot.y, robot.direction);

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

    setRobot((prevState) => ({
      ...prevState,
      x,
      y,
      direction: dir,
    }));
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

        <Button variant="outlined" onClick={handleClick}>
          Calculate
        </Button>
        <div>
          {validationFunc(
            room.xAxis,
            room.yAxis,
            robot.x,
            robot.y,
            robot.direction
          )
            ? `(x,y,direction) = (${robot.x},${robot.y},${robot.direction})`
            : `Invalid/undefined input`}
        </div>
      </header>
    </div>
  );
}

export default App;
