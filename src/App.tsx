import { AppContainer } from "./styles";
import { Column } from "./components/Column.component";
import { AddNewItem } from "./components/AddNewItem.component";
import { useAppState } from "./state/app.context";

export const App = () => {
	const { lists } = useAppState();
	return (
		<AppContainer>
			{lists.map((list) => (
				<Column text={list.text} key={list.id} id={list.id} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another list"
				onAdd={(e) => console.log(e)}
			/>
		</AppContainer>
	);
};
