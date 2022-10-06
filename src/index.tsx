import React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";
import { App } from "./App";
import { AppStateProvider } from "./state/app.context";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<DndProvider backend={HTML5Backend}>
			<AppStateProvider>
				<App />
			</AppStateProvider>
		</DndProvider>
	</React.StrictMode>
);
