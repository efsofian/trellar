import React from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { AddNewItem } from "./AddNewItem.component";
import { ColumnContainer, ColumnTitle } from "../styles";
import { Card } from "./Card.component";
import { useAppState } from "../state/app.context";
import { addTask, moveList } from "../state/actions";
import { useItemDrag } from "../utils/useItemDrag";

type ColumnProps = {
	text: string;
	id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
	const { draggedItem, getTaskByListId, dispatch } = useAppState();
	const tasks = getTaskByListId(id);
	const ref = React.useRef<HTMLDivElement>(null);
	const { drag } = useItemDrag({ type: "COLUMN", id, text });
	const [, drop] = useDrop({
		accept: "COLUMN",
		hover: throttle(200, () => {
			if (!draggedItem) {
				return;
			}
			if (draggedItem.type === "COLUMN") {
				if (draggedItem.id === id) {
					return;
				}
				dispatch(moveList(draggedItem.id, id));
			}
		}),
	});

	drag(drop(ref));

	return (
		<ColumnContainer ref={ref}>
			<ColumnTitle>{text}</ColumnTitle>
			{tasks.map((task) => (
				<Card text={task.text} key={task.id} id={task.id} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another card"
				onAdd={(text) => dispatch(addTask(text, id))}
				dark
			/>
		</ColumnContainer>
	);
};
