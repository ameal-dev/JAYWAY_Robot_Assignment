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

  //create change Function with purpose to enter setState-func as callback
  const changeFunc = (e, cb) => {
    cb(Number(e.target.value));
  };

  //Validation function to check wheter input is valid
  const validationFunc = (xaxis, yaxis, locx, locy) => {
    //check that room x- and y-axis are of valid inputs
    const checkXAxis = typeof Number(xaxis) == "number" && Number(xaxis) > 0;
    const checkYAxis = typeof Number(yaxis) == "number" && Number(yaxis) > 0;
    //check that location is valid
    const locationX = locx < xAxis - 1 && locx >= 0;
    const locationY = locy < yAxis - 1 && locy >= 0;

    if (checkXAxis && checkYAxis && locationX && locationY) {
      console.log("input is valid!");
    } else {
      console.log("invalid input");
    }
  };

  const handleClick = (e) => {
    const axisX = xAxis;
    const axisY = yAxis;
    let x = robotXLocation;
    let y = robotYLocation;
    let dir = robotDirection;

    validationFunc(axisX, axisY, x, y);

    const instArr = instruction.toUpperCase().split("");

    instArr.forEach((inst) => {
      //Check for adjustment to direction instruction
      if (inst == "L") {
        if (dir == "N") {
          dir = "W";
        } else if (dir == "W") {
          dir = "S";
        } else if (dir == "S") {
          dir = "E";
        } else if (dir == "E") {
          dir = "N";
        }
      }
      if (inst == "R") {
        if (dir == "N") {
          dir = "E";
        } else if (dir == "W") {
          dir = "N";
        } else if (dir == "S") {
          dir = "W";
        } else if (dir == "E") {
          dir = "S";
        }
      }

      //Movement
      if (inst == "F" && dir == "E" && x < xAxis) {
        x++;
      }
      if (inst == "F" && dir == "W" && x > 0) {
        x--;
      }
      if (inst == "F" && dir == "S" && y < yAxis) {
        y++;
      }
      if (inst == "F" && dir == "N" && y > 0) {
        y--;
      }
    });

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
        <div></div>
      </header>
    </div>
  );
}

export default App;
