import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import base64 from "base-64";
import mainLogo from '../imgs/mainLogo.png';
import style from '../scss/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

class MainLogo extends React.Component {
	render() {
		return (
			<img 
				className={style.mainlogo}
				style={{backgroundImage: 'url(' + mainLogo + ')'}}
			/>
		)
	}
}

const LoginInput = props => {
	if (props.show === false) {
		return null
	}
	return (
		<div className={`input-group input-group-lg form-group ${props.error?'has-error':''} ${props.error?style.hasError:''}`}>
        	<span className={`input-group-addon ${style.inputGroupAddon}`}>
				<i className={`fa ${props.icon}`}></i>
        	</span>
        	<input type="text" required placeholder={props.placeholder} onChange={props.onChange} name={props.name} className={`form-control ${style.formControl} input-sm`} />
      	</div>
	)
}

const LoginButton = props => {
	if (props.show === false) {
		return null
	}
	return (
		<button type="submit" className="btn btn-info btn-lg btn-block form-group" disabled={props.disabled}>{props.innerHtml}</button>
	)
}

const LoginLink = props => {
	if (props.show === false) {
		return null
	}
	return (
		<div className={`${style.forgottenPassword} ${props.textAlgin}`}>
			<p><a className="btn btn-link btn-sm">{props.text}</a></p>
        	<p><a target="_blank" className="btn btn-link btn-sm"></a></p>
      	</div>
	)
}

class Login extends React.Component {
	constructor() {
		super()
		this.state = {
			user: '',
			passWord: '',
			email: '',
			userShow: true,
			passWordShow: true,
			emailShow: false,
			loginShow: true,
			resetEmailShow: false,
			forgetPasswordLinkShow: true,
			loginLinkShow: false,
			userError: false,
			passWordError: false,
			emailError: false,
			rememberMe: false,
			error: false
		}
		if (localStorage.getItem("_db") !== null) {
			axios({
				method: 'get',
				url: 'https://xueteng1.quarkioe.com/user/currentUser',
				headers: {
					UseXBasic: true,
					Authorization: 'Basic ' + localStorage.getItem("_db")
				}
			}).then(res => {
				sessionStorage.setItem('_db', localStorage.getItem("_db"));
				window.location = 'https://xueteng1.quarkioe.com'
			})
		};
	}

	handleChange(name, event) {
		switch (name) {
			case 'user':
				if (event.target.value === '') {
					this.setState({
						userError: true
					});
				} else {
					this.setState({
						userError: false
					});
				}
				this.setState({
					user: event.target.value,
					error: false
				});
				break;
			case 'passWord':
				if (event.target.value === '') {
					this.setState({
						passWordError: true
					});
				} else {
					this.setState({
						passWordError: false
					});
				}
				this.setState({
					passWord: event.target.value,
					error: false
				});
				break;
			case 'rememberMe':
				this.setState({
					rememberMe: true
				})
			default:
				break;
		}
	}

	handleSubmit(event) {
		let db = base64.encode('xueteng1' + '/' + this.state.user + ':' + this.state.passWord)
		event.preventDefault();
		axios({
				method: 'get',
				url: 'https://xueteng1.quarkioe.com/user/currentUser',
				headers: {
					UseXBasic: true,
					Authorization: 'Basic ' + db
				}
			})
			.then(res => {
				if (this.state.rememberMe === true) {
					localStorage.setItem('_db', db);
				}
				sessionStorage.setItem('_db', db);
				window.location = 'https://xueteng1.quarkioe.com'
			})
			.catch(error => this.setState({
				error: true,
			}))
	}

	handleClick() {

	}

	render() {
		return (
			<div className="clearfix" style={{marginBottom:'15px'}}>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<LoginInput show={this.state.userShow} error={this.state.userError} icon={'fa-user'} placeholder={'用户名'} onChange={this.handleChange.bind(this,'user')} name={'user'} />
					<LoginInput show={this.state.passWordShow} error={this.state.passWordError} icon={'fa-lock'} placeholder={'密码'} onChange={this.handleChange.bind(this,'passWord')} name={'passWord'} />
					<LoginInput show={this.state.emailShow} error={this.state.email} icon={'fa-envelope'} placeholder={'邮件地址'} onChange={this.handleChange.bind(this,'email')} name={'email'} />
      				<div className="form-group">
        				<label className="c8y-checkbox input-sm">
          					<input type="checkbox" name="remember" value={this.state.rememberMe} onChange={this.handleChange.bind(this,'rememberMe')}/>
          					<span></span>
          					记住我的信息
        				</label>
      				</div>
      				<LoginButton show={this.state.loginShow} disabled={this.state.user===""?'disabled':(this.state.passWord===""?'disabled':false)} innerHtml={'登录'} />
      				<LoginButton show={this.state.resetEmailShow} disabled={this.state.user===""?'disabled':(this.state.passWord===""?'disabled':false)} innerHtml={'重置密码'} />
      				<LoginLink show={this.state.forgetPasswordLinkShow} textAlgin={'text-center'} text={'忘记密码？'} />
      				<LoginLink show={this.state.loginLinkShow} textAlgin={'text-right'} text={'登陆'} />
      			</form>
      			<div className={`alert alert-danger ${this.state.error?style.show:style.false}`}>Invalid credentials!</div>
      		</div>
		)
	}
}

class App extends React.Component {
	render() {
		return (
			<div className={style.loading}>
				<MainLogo/>
				<Login />
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);