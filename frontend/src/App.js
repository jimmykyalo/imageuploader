import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import UploadScreen from "./screens/UploadScreen";

function App() {
  return (
    <Router>
		<Container>
			<Route path='/' component={UploadScreen} exact />
		</Container>
    </Router>
  );
}

export default App;
