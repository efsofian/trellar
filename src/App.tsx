import { Column } from "./components/Column.component";
import { AppContainer } from "./styles";

export const App = () => {
	return (
		<AppContainer>
			<Column text="to do:" />
		</AppContainer>
	);
};
