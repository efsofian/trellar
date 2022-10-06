import { AddNewItem } from "./AddNewItem.component";
import { ColumnContainer, ColumnTitle } from "../styles";
import { Card } from "./Card.component";
import { useAppState } from "../state/app.context";

type ColumnProps = {
	text: string;
	id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
	const { getTaskByListId } = useAppState();
	const tasks = getTaskByListId(id);
	return (
		<ColumnContainer>
			<ColumnTitle>{text}</ColumnTitle>
			{tasks.map((task) => (
				<Card text={task.text} key={task.id} id={task.id} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another card"
				onAdd={() => console.log("new item added")}
				dark
			/>
		</ColumnContainer>
	);
};
