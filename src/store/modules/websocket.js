import * as WebsocketUtil from '@/utils/websocketutil';

const websocket = {
	state: {
		websocket: {}
	},
	mutations: {
  		SET_Websocket: (state, websocket) => {
      		state.websocket = websocket
    	}
	},
	actions: {
		InitWebsocket({commit, state}){
			return new Promise((resolve, reject) => {
        		SessionStorageUtil.initWebSocket();
        		resolve();
      		});
		}
	}
}

export default websocket;