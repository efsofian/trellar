import { ColumnContainer, ColumnTitle, CardContainer } from "../styles";

type ColumnProps = {
	text: String;
};

export const Column = ({ text }: ColumnProps) => {
	return (
		<ColumnContainer>
			<ColumnTitle>{text}</ColumnTitle>
			<CardContainer>Gen app</CardContainer>
			<CardContainer>learn app</CardContainer>
			<CardContainer>skill app</CardContainer>
		</ColumnContainer>
	);
};
