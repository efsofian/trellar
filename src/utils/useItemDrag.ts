import React from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { setDraggedItem } from "../state/actions";
import { useAppState } from "../state/app.context";
import { DragItem } from "./DragItem";

export const useItemDrag = (item: DragItem) => {
	const { dispatch } = useAppState();
	const [_, drag, preview] = useDrag({
		type: item.type,
		item: () => {
			dispatch(setDraggedItem(item));
			return item;
		},
		end: () => dispatch(setDraggedItem(null)),
	});
	React.useEffect(() => {
		preview(getEmptyImage(), { captureDraggingState: true });
	}, [preview]);
	return { drag };
};
