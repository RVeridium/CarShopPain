import './App.css';
import ListAll from './component/ListAll';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6">
          This is a Carshop
        </Typography>
      </Toolbar>
  </AppBar>
      <ListAll/>
    </div>
  );
}

export default App;
