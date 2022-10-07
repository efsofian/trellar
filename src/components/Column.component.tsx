import React from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { AddNewItem } from "./AddNewItem.component";
import { ColumnContainer, ColumnTitle } from "../styles";
import { Card } from "./Card.component";
import { useAppState } from "../state/app.context";
import { addTask, moveList, moveTask, setDraggedItem } from "../state/actions";
import { useItemDrag } from "../utils/useItemDrag";
import { isHidden } from "../utils/isHidden";

type ColumnProps = {
	text: string;
	id: string;
	isPreview?: boolean;
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
	const { draggedItem, getTaskByListId, dispatch } = useAppState();
	const tasks = getTaskByListId(id);
	const ref = React.useRef<HTMLDivElement>(null);
	const { drag } = useItemDrag({ type: "COLUMN", id, text });
	const [, drop] = useDrop({
		accept: ["COLUMN", "CARD"],
		hover: throttle(200, () => {
			if (!draggedItem) {
				return;
			}
			if (draggedItem.type === "COLUMN") {
				if (draggedItem.id === id) {
					return;
				}
				dispatch(moveList(draggedItem.id, id));
			} else {
				if (draggedItem.columnId === id) {
					return;
				}
				if (tasks.length) {
					return;
				}
				dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
				dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
			}
		}),
	});

	drag(drop(ref));

	return (
		<ColumnContainer
			ref={ref}
			isPreview={isPreview}
			isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}>
			<ColumnTitle>{text}</ColumnTitle>
			{tasks.map((task) => (
				<Card text={task.text} key={task.id} id={task.id} columnId={id} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another card"
				onAdd={(text) => dispatch(addTask(text, id))}
				dark
			/>
		</ColumnContainer>
	);
};
