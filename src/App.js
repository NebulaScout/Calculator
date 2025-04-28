import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [calc, setCalc] = useState({
    display: "0",
    operation: null,
    prevValue: null,
    reset: false,
    expression: "", // Adding an expression state to track the operation
  });

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Handle digit button clicks
  const handleDigit = (digit) => {
    if (calc.display === "0" || calc.reset) {
      setCalc({
        ...calc,
        display: digit,
        reset: false,
        expression: calc.reset && calc.operation ? calc.expression : "",
      });
    } else {
      setCalc({ ...calc, display: calc.display + digit });
    }
  };

  // Handle decimal point
  const handleDecimal = () => {
    if (calc.reset) {
      setCalc({
        ...calc,
        display: "0.",
        reset: false,
        expression: calc.operation ? calc.expression : "",
      });
    } else if (!calc.display.includes(".")) {
      setCalc({ ...calc, display: calc.display + "." });
    }
  };

  // Handle operations (+, -, *, /)
  const handleOperation = (op) => {
    const value = parseFloat(calc.display);
    const opSymbol = getOperationSymbol(op);

    if (calc.prevValue === null) {
      setCalc({
        ...calc,
        operation: op,
        prevValue: value,
        reset: true,
        expression: `${value} ${opSymbol} `,
      });
    } else {
      const result = calculate(calc.prevValue, value, calc.operation);
      setCalc({
        display: result.toString(),
        operation: op,
        prevValue: result,
        reset: true,
        expression: `${result} ${opSymbol} `,
      });
    }
  };

  // Map operation to display symbol
  const getOperationSymbol = (op) => {
    switch (op) {
      case "+":
        return "+";
      case "-":
        return "-";
      case "*":
        return "×";
      case "/":
        return "÷";
      default:
        return "";
    }
  };

  // Calculate the result of the current operation
  const handleEquals = () => {
    if (calc.prevValue === null || calc.operation === null) return;

    const value = parseFloat(calc.display);
    const result = calculate(calc.prevValue, value, calc.operation);
    const opSymbol = getOperationSymbol(calc.operation);

    setCalc({
      display: result.toString(),
      operation: null,
      prevValue: null,
      reset: true,
      expression: `${calc.expression}${value} = `,
    });
  };

  // Clear all calculator data
  const handleClear = () => {
    setCalc({
      display: "0",
      operation: null,
      prevValue: null,
      reset: false,
      expression: "",
    });
  };

  // Perform calculation based on operation
  const calculate = (a, b, operation) => {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  };

  // Calculator button component
  const Button = ({ value, onClick, className }) => (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );

  return (
    <div className={`App ${theme}`}>
      <div className="calculator-container">
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="calculator">
          <div className="display">
            <div className="expression">{calc.expression}</div>
            <div className="result">{calc.display}</div>
          </div>

          <div className="buttons">
            {/* Row 1 */}
            <div className="row">
              <Button
                value="7"
                onClick={() => handleDigit("7")}
                className="digit-btn"
              />
              <Button
                value="8"
                onClick={() => handleDigit("8")}
                className="digit-btn"
              />
              <Button
                value="9"
                onClick={() => handleDigit("9")}
                className="digit-btn"
              />
              <Button
                value="÷"
                onClick={() => handleOperation("/")}
                className="operation-btn"
              />
            </div>
            {/* Row 2 */}
            <div className="row">
              <Button
                value="4"
                onClick={() => handleDigit("4")}
                className="digit-btn"
              />
              <Button
                value="5"
                onClick={() => handleDigit("5")}
                className="digit-btn"
              />
              <Button
                value="6"
                onClick={() => handleDigit("6")}
                className="digit-btn"
              />
              <Button
                value="×"
                onClick={() => handleOperation("*")}
                className="operation-btn"
              />
            </div>
            {/* Row 3 */}
            <div className="row">
              <Button
                value="1"
                onClick={() => handleDigit("1")}
                className="digit-btn"
              />
              <Button
                value="2"
                onClick={() => handleDigit("2")}
                className="digit-btn"
              />
              <Button
                value="3"
                onClick={() => handleDigit("3")}
                className="digit-btn"
              />
              <Button
                value="-"
                onClick={() => handleOperation("-")}
                className="operation-btn"
              />
            </div>
            {/* Row 4 */}
            <div className="row">
              <Button
                value="0"
                onClick={() => handleDigit("0")}
                className="digit-btn"
              />
              <Button value="." onClick={handleDecimal} className="digit-btn" />
              <Button value="=" onClick={handleEquals} className="equals-btn" />
              <Button
                value="+"
                onClick={() => handleOperation("+")}
                className="operation-btn"
              />
              {/* Row 5 */}
            </div>
            <div className="row">
              <Button value="C" onClick={handleClear} className="clear-btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
