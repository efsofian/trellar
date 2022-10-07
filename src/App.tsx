import { AppContainer } from "./styles";
import { Column } from "./components/Column.component";
import { AddNewItem } from "./components/AddNewItem.component";
import { useAppState } from "./state/app.context";
import { addList } from "./state/actions";
import { CustomDragLayer } from "./components/CustomDragLayer.component";

export const App = () => {
	const { lists, dispatch } = useAppState();
	return (
		<AppContainer>
			<CustomDragLayer />
			{lists.map((list) => (
				<Column text={list.text} key={list.id} id={list.id} />
			))}
			<AddNewItem
				toggleButtonText="+ Add another list"
				onAdd={(text) => dispatch(addList(text))}
			/>
		</AppContainer>
	);
};
