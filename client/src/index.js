import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopNavigation from './navigation/topNav';
import Chat from './chat/chat';

class App extends React.Component {
	constructor() {
		super();
	}

	render = () => {
		return (
			<React.Fragment>
				<div id='content'>
					<TopNavigation />
					<div id='chat-space'>
						<Chat/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
