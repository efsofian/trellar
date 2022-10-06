import { useDrag } from "react-dnd";
import { setDraggedItem } from "../state/actions";
import { useAppState } from "../state/app.context";
import { DragItem } from "./DragItem";

export const useItemDrag = (item: DragItem) => {
	const { dispatch } = useAppState();
	const [_, drag] = useDrag({
		type: item.type,
		item: () => {
			dispatch(setDraggedItem(item));
			return item;
		},
		end: () => dispatch(setDraggedItem(null)),
	});
	return { drag };
};
