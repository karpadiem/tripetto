import { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { TripettoBuilder } from "@tripetto/builder/react";
import { AutoscrollRunner } from "@tripetto/runner-autoscroll";
import stylesContract from "@tripetto/runner-autoscroll/builder/styles";
import "@tripetto/runner-autoscroll/builder";
import "./styles.scss";

function App() {
  const [view, setView] = useState("preview");
  const builderControllerRef = useRef();
  const runnerControllerRef = useRef();

  return (
    <>
      <TripettoBuilder controller={builderControllerRef} className="builder" />
      <div className="runner">
        <AutoscrollRunner
          controller={runnerControllerRef}
          view={view}
          builder={builderControllerRef}
        />
      </div>
      <div
        className={"toggle-preview" + (view === "preview" ? " selected" : "")}
        onClick={() => setView("preview")}
      >
        Preview mode
      </div>
      <div
        className={"toggle-test" + (view === "test" ? " selected" : "")}
        onClick={() => setView("test")}
      >
        Test mode
      </div>
      <div
        className="edit-styles"
        onClick={() => {
          // Open the styles editor
          builderControllerRef.current.stylesEditor(
            stylesContract,
            () => runnerControllerRef.current,
            "standard"
          );
        }}
      >
        Edit styles
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(<App />);
