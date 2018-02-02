import React from 'react';
import ReactDOM from 'react-dom';
import mainLogo from '../imgs/mainLogo.png';
import style from "../scss/style.scss";
import 'bootstrap/dist/css/bootstrap.css';

class Mainlogo extends React.Component {
	render() {
		return (
			<img src={this.props.src} className={style.mainlogo}/>
		)
	}
}

class LoginInput extends React.Component {
	render() {
		return (
			<div className="input-group input-group-lg form-group">
        		<span className="input-group-addon">
          			<i class=""></i>
        		</span>
        		<input type="text" name="user" className="form-control" />
      		</div>
		)
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Mainlogo src={mainLogo}/>
				<LoginInput />
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);