import React, { createContext, useContext, Dispatch } from "react";
import { AppState, AppStateReducer, List, Task } from "./appstate.reducer";
import { useImmerReducer } from "use-immer";
import { Action } from "./actions";
import { DragItem } from "../utils/DragItem";

const appData: AppState = {
	draggedItem: null,
	lists: [
		{
			id: "0",
			text: "To Do",
			tasks: [
				{
					id: "c0",
					text: "Find a girl",
				},
			],
		},
		{
			id: "1",
			text: "In Progress",
			tasks: [
				{
					id: "c2",
					text: "Get married",
				},
			],
		},
		{
			id: "2",
			text: "Done",
			tasks: [
				{
					id: "c3",
					text: "Get children",
				},
			],
		},
	],
};

type AppStateContextProps = {
	lists: List[];
	getTaskByListId: (id: string) => Task[];
	children?: React.ReactNode;
	dispatch: Dispatch<Action>;
	draggedItem: DragItem | null;
};

const AppStateContext = createContext<AppStateContextProps>(
	{} as AppStateContextProps
);

export const AppStateProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useImmerReducer(AppStateReducer, appData);
	const { lists, draggedItem } = state;
	const getTaskByListId = (id: string) => {
		return lists.find((list) => list.id === id)?.tasks || [];
	};
	return (
		<AppStateContext.Provider
			value={{ lists, getTaskByListId, dispatch, draggedItem }}>
			{children}
		</AppStateContext.Provider>
	);
};

export const useAppState = () => {
	return useContext(AppStateContext);
};
