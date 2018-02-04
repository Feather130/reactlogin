import React from 'react';
import ReactDOM from 'react-dom';
import mainLogo from '../imgs/mainLogo.png';
import style from '../scss/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

class MainLogo extends React.Component {
	render() {
		return (
			<img 
				src={mainLogo} 
				className={style.mainlogo} 
				style={{backgroundImage: 'url(' + mainLogo + ')'}}
			/>
		)
	}
}

class LoginInput extends React.Component {
	render() {
		return (
			<div className="clearfix" style={{marginBottom:'15px'}}>
				<form>
					<div className={`input-group input-group-lg form-group has-error ${style.hasError}`}>
        				<span className={`input-group-addon ${style.inputGroupAddon}`}>
							<i className="fa fa-user"></i>
        				</span>
        				<input type="text" name="user" required className={`form-control ${style.formControl} input-sm`} placeholder="用户名" />
      				</div>
      				<div className={`input-group input-group-lg form-group has-error ${style.hasError}`}>
        				<span className={`input-group-addon ${style.inputGroupAddon}`}>
          					<i className="fa fa-lock"></i>
        				</span>
        				<input type="password" name="password" required className={`form-control ${style.formControl} input-sm`} placeholder="密码" />
      				</div>
      				<div className="form-group">
        				<label className="c8y-checkbox input-sm">
          					<input type="checkbox" name="remember" />
          					<span></span>
          					记住我的信息
        				</label>
      				</div>
      				<button type="submit" className="btn btn-info btn-lg btn-block form-group" disabled="disabled">登录</button>
      				<div className={`${style.forgottenPassword} text-center`}>
						<p><a className="btn btn-link btn-sm">忘记密码？</a></p>
        				<p><a target="_blank" className="btn btn-link btn-sm"></a></p>
      				</div>
      			</form>
      		</div>
		)
	}
}

class App extends React.Component {
	render() {
		return (
			<div className={style.loading}>
				<MainLogo/>
				<LoginInput />
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);