import { createContext, useState, useEffect, useRef } from "react";

export const MessageContext = createContext({
  messages: [],
  notify: () => {}
});

const Toast = ({children, status, closeMsg}) => {
	const [wideView, setWideView] = useState(false)
	const timer= useRef(null);
	
	useEffect(() => {
		timer.current = setTimeout(() => {close()}, 1000*5);
	}, [])

	const open = function(){
		setWideView(true);
		clearTimeout(timer.current);
		timer.current = null;
	}
	const close = function(){
		closeMsg(); 
		setWideView(false);
	}
	return(
		<div className={`position-fixed top-0 w-100 mt-5 p-3 d-flex justify-content-end ${wideView && 'wideViewToast'}`} style={{zIndex: 1021}}>
			<div className={`pre-line notification slide-left rounded py-2 px-2 position-relative clearfix ${status}-shadow`} 
			onClick={open}>
				<div className="float-left mt-0 ml-1">
				<span className={`${status}`}>{status}</span>
				<p className={'pre-line h6 mb-0 '+ status}>
					{children}
				</p>
				</div>
				<span className="float-right closeBtn mr-1 mt-0" onClick={close}><i className="gg-close"></i></span>
			</div>
		</div>
	);
}

export default function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [showing, setShowing] = useState(false);
	const [status, setStatus] = useState('');

	useEffect(() => {
		if(messages.length){
			showToast();
		}
  }, [messages]);

  const showToast = () => {
		setShowing(true);
  };

	const hideToast = () => {
		setShowing(false);
		setStatus('');
		setMessages([]);
  };

	const closeMessage = () => {
		hideToast();
	}

  const notify = (msg, status) => {
		if(typeof msg === 'object'){
			if(msg.length){
				setMessages([...messages, ...msg]);
			} else {
				setMessages([...messages, msg.message])
			}
		}
		if(typeof msg === 'string'){
			if(msg.startsWith('\[') && msg.endsWith('\]')){
				let msgArr = JSON.parse(msg) 
				setMessages([...messages, ...msgArr])
			} else {
				setMessages([...messages, msg]);
			}
		}
		setStatus(status || 'info');
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        notify
      }}
    >
      {children}
			{showing && <Toast status={status} closeMsg={closeMessage}>{messages.map(message => message+'\n')}</Toast>}
    </MessageContext.Provider>
  );
}