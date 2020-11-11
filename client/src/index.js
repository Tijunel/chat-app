import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopNavigation from './navigation/topNav';
import Chat from './chat/chat';

class App extends React.Component {
	constructor() {
		super();
	}

	componentDidMount = () => {
		if(!Cookies.get('userData')) {
			fetch('/api/user/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' }
			})
				.then(res => {
					if(res.status === 200) {

					}
				})
				.catch(err => { console.log(err) })
		} else {

		}
	}

	render = () => {
		return (
			<React.Fragment>
				<div id='content'>
					<TopNavigation />
					<div id='chat-space'>
						<Chat />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
