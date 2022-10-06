import { nanoid } from "nanoid";
import { Action } from "./actions";
import { findItemIndexById, moveItem } from "../utils/arrayUtils";
import { DragItem } from "../utils/DragItem";

export type Task = {
	id: string;
	text: string;
};

export type List = {
	id: string;
	text: string;
	tasks: Task[];
};

export type AppState = {
	lists: List[];
	draggedItem: DragItem | null;
};

export const AppStateReducer = (
	state: AppState,
	action: Action
): AppState | void => {
	switch (action.type) {
		case "ADD_LIST": {
			console.log("adding list");
			state.lists.push({
				id: nanoid(),
				text: action.payload,
				tasks: [],
			});
			break;
		}

		case "ADD_TASK": {
			console.log("adding task");
			const { text, listId } = action.payload;
			const targetListIndex = findItemIndexById(state.lists, listId);
			state.lists[targetListIndex].tasks.push({
				id: nanoid(),
				text,
			});
			break;
		}
		case "MOVE_LIST": {
			const { draggedId, hoverId } = action.payload;
			const dragIndex = findItemIndexById(state.lists, draggedId);
			const hoverIndex = findItemIndexById(state.lists, hoverId);
			state.lists = moveItem(state.lists, dragIndex, hoverIndex);
			break;
		}
		case "SET_DRAGGED_ITEM": {
			state.draggedItem = action.payload;
			break;
		}
		default: {
			break;
		}
	}
};
