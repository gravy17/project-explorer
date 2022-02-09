import { createContext, useState, useEffect, useRef, useCallback } from "react";

export const MessageContext = createContext({
  notify: () => {}
});

const Toast = ({children, status, closeMsg}) => {
	const [wideView, setWideView] = useState(false)
	const timer= useRef(null);
	
	useEffect(() => {
		timer.current = setTimeout(() => {closeMsg()}, 1000*5);
		return function cleanup() {
			clearTimeout(timer.current);
			timer.current = null;
			setWideView(false);
			closeMsg();
		}
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
				<p className={'pre-line h6 mb-0 strong-text'+ status}>
					{children}
				</p>
				</div>
				<span className="float-right closeBtn mr-1 mt-0" onClick={close}><i className="gg-close"></i></span>
			</div>
		</div>
	);
}

export default function ToastProvider({ children }) {
  const messages = useRef([]);
  const [showing, setShowing] = useState(false);
	const [status, setStatus] = useState('');

	const hideToast = useCallback(() => {
		setShowing(false);
		setStatus('');
		messages.current = [];
  }, [])

  const notify = useCallback((msg, status) => {
		if(typeof msg === 'object'){
			if(msg.length){
				msg.map((item) => {
					messages.current.push(item);
				})
			} else {
				messages.current.push(msg.message);
			}
		}
		if(typeof msg === 'string'){
			if(msg.startsWith('\[') && msg.endsWith('\]')){
				let msgArr = JSON.parse(msg) 
				msgArr.map((item) => {
					messages.current.push(item);
				})
			} else {
				messages.current.push(msg);
			}
		}
		messages.current = [...new Set(messages.current)]
		setStatus(status || 'info');
		setShowing(true);
  }, [messages.current])

  return (
    <MessageContext.Provider
      value={{
        notify
      }}
    >
      {children}
			{showing && <Toast status={status} closeMsg={hideToast}>{messages.current.map(message => message+'\n')}</Toast>}
    </MessageContext.Provider>
  );
}