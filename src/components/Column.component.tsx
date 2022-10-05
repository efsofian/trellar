import { AddNewItem } from "./AddNewItem.component";
import { ColumnContainer, ColumnTitle } from "../styles";
import { Card } from "./Card.component";

type ColumnProps = {
	text: String;
};

export const Column = ({ text }: ColumnProps) => {
	return (
		<ColumnContainer>
			<ColumnTitle>{text}</ColumnTitle>
			<Card text="app gen" />
			<Card text="ts gen" />
			<Card text="skill gen" />
			<AddNewItem
				toggleButtonText="+ Add another card"
				onAdd={() => console.log("new item added")}
				dark
			/>
		</ColumnContainer>
	);
};
