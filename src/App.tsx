import { AppContainer } from "./styles";
import { Column } from "./components/Column.component";
import { AddNewItem } from "./components/AddNewItem.component";

export const App = () => {
	return (
		<AppContainer>
			<Column text="Todo:" />
			<AddNewItem
				toggleButtonText="+ Add another list"
				onAdd={() => console.log("add list")}
			/>
		</AppContainer>
	);
};
