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

const emailRegExp = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

const LoginInput = props => {
	if (props.show === false) {
		return null
	}
	return (
		<div className={`input-group input-group-lg form-group ${props.error?'has-error':''} ${props.error?style.hasError:''}`}>
        	<span className={`input-group-addon ${style.inputGroupAddon}`}>
				<i className={`fa ${props.icon}`}></i>
        	</span>
        	<input type={props.type} required placeholder={props.placeholder} onChange={props.onChange} name={props.name} className={`form-control ${style.formControl} input-sm`} />
      	</div>
	)
}

const LoginButton = props => {
	if (props.show === false) {
		return null
	}
	return (
		<button type="button" className="btn btn-info btn-lg btn-block form-group" disabled={props.disabled} onClick={props.onClick}>{props.innerHtml}</button>
	)
}

const LoginLink = props => {
	if (props.show === false) {
		return null
	}
	return (
		<div className={`${style.forgottenPassword} ${props.textAlgin}`}>
			<p><a className="btn btn-link btn-sm" onClick={props.onClick}>{props.text}</a></p>
        	<p><a target="_blank" className="btn btn-link btn-sm"></a></p>
      	</div>
	)
}

const Remember = props => {
	if (props.show === false) {
		return null
	}
	return (
		<div className="form-group">
        	<label className="input-sm">
          		<input type="checkbox" name="remember" value={props.value} onChange={props.onChange}/>
          		记住我的信息
        	</label>
      	</div>
	)
}

const LoginError = props => {
	if (props.show === false) {
		return null
	}
	return (
		<div className="alert alert-danger">{props.text}</div>
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
			resetPasswordShow: false,
			rememberMeShow: true,
			forgetPasswordLinkShow: true,
			loginLinkShow: false,
			userError: false,
			passWordError: false,
			emailError: false,
			certificateError: false,
			EmailAddressError: false,
			rememberMe: false,
			EmailAddressNotExist: false
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
					certificateError: false
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
					certificateError: false
				});
				break;
			case 'email':
				if (event.target.value === '') {
					this.setState({
						emailError: true,
					});
				} else {
					this.setState({
						emailError: false
					});
				}
				if (emailRegExp.test(event.target.value) || event.target.value === '') {
					this.setState({
						EmailAddressError: false
					});
				} else {
					this.setState({
						EmailAddressError: true
					});
				}
				this.setState({
					email: event.target.value
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

	handleSubmit(name, event) {
		switch (name) {
			case 'login':
				let db = base64.encode('xueteng1' + '/' + this.state.user + ':' + this.state.passWord)
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
						certificateError: true,
					}))
				break;
			case 'resetPassword':
				break;
			default:
				break
		}
	}

	handleClick(name, event) {
		switch (name) {
			case 'forgetPasswordLinkShow':
				this.setState({
					user: '',
					passWord: '',
					email: '',
					userShow: false,
					passWordShow: false,
					emailShow: true,
					loginShow: false,
					resetPasswordShow: true,
					rememberMeShow: false,
					forgetPasswordLinkShow: false,
					loginLinkShow: true,
					userError: false,
					passWordError: false,
					emailError: false,
					certificateError: false,
					EmailAddressError: false,
					rememberMe: false,
					EmailAddressNotExist: false
				})
				break
			case 'loginLinkShow':
				this.setState({
					user: '',
					passWord: '',
					email: '',
					userShow: true,
					passWordShow: true,
					emailShow: false,
					loginShow: true,
					resetPasswordShow: false,
					rememberMeShow: true,
					forgetPasswordLinkShow: true,
					loginLinkShow: false,
					userError: false,
					passWordError: false,
					emailError: false,
					certificateError: false,
					EmailAddressError: false,
					rememberMe: false,
					EmailAddressNotExist: false
				})
				break
		}
	}

	render() {
		return (
			<div className="clearfix" style={{marginBottom:'15px'}}>
				<form>
					<LoginInput type={'text'} show={this.state.userShow} error={this.state.userError} icon={'fa-user'} placeholder={'用户名'} onChange={this.handleChange.bind(this,'user')} name={'user'} />
					<LoginInput type={'password'} show={this.state.passWordShow} error={this.state.passWordError} icon={'fa-lock'} placeholder={'密码'} onChange={this.handleChange.bind(this,'passWord')} name={'passWord'} />
					<LoginInput type={'email'} show={this.state.emailShow} error={this.state.emailError} icon={'fa-envelope'} placeholder={'邮件地址'} onChange={this.handleChange.bind(this,'email')} name={'email'} />
      				<Remember show={this.state.rememberMeShow} value={this.state.rememberMe} onClick={this.handleChange.bind(this,'rememberMe')} />
      				<LoginButton show={this.state.loginShow} disabled={this.state.user===""?'disabled':(this.state.passWord===""?'disabled':false)} innerHtml={'登录'} onClick={this.handleSubmit.bind(this,'login')} />
      				<LoginButton show={this.state.resetPasswordShow} disabled={this.state.email===''?'disabled':false} innerHtml={'重置密码'} onClick={this.handleSubmit.bind(this,'resetPassword')} />
      				<LoginLink show={this.state.forgetPasswordLinkShow} textAlgin={'text-center'} text={'忘记密码？'} onClick={this.handleClick.bind(this,'forgetPasswordLinkShow')} />
      				<LoginLink show={this.state.loginLinkShow} textAlgin={'text-right'} text={'登陆'} onClick={this.handleClick.bind(this,'loginLinkShow')} />
      			</form>
      			<LoginError show={this.state.certificateError} text={'凭证无效'}/>
      			<LoginError show={this.state.EmailAddressError} text={'邮件地址无效'}/>
      			<LoginError show={this.state.EmailAddressNotExist} text={'不能用这个邮件地址重置密码：邮件地址不存在！'}/>
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