import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import SocketManager from './socket';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopNavigation from './navigation/topNav';
import Chat from './chat/chat';
import ErrorPage from './chat/error';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			showError: false,
			setupDone: false
		}
	}

	componentDidMount = () => {
		this.tryConnection();
	}

	tryConnection = () => {
		// Don't allow more than 6 users
		if (!Cookies.get('userData')) {
			fetch('/api/user/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			})
				.then(res => {
					if (res.status === 200) this.establishConnection();
					else this.showError();
				})
				.catch(err => { this.showError(); })
		}
		else this.establishConnection();
	}

	establishConnection = () => {
		SocketManager.createInstance();
		this.setState({ showError: false, setupDone: true });
	}

	showError = () => {
		this.setState({ showError: true });
	}

	render = () => {
		return (
			<React.Fragment>
				<div id='content'>
					<TopNavigation />
					{this.state.setupDone ?
						(
							!this.state.showError ?
								<div id='chat-space'>
									<Chat />
								</div>
								:
								<div id='chat-space'>
									<ErrorPage retryConnection={this.tryConnection} />
								</div>
						)
						:
						<div id='chat-space'>
							<div id='error'>

							</div>
						</div>
					}
				</div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
