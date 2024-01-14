import {useEffect, useRef, useState} from 'react';

const MIN = 60;
const SECONDS = 60;
const MILLI_SECS = 1000;

type Minutes = {min: number};
type MilliSeconds = {ms: number};

type DisplayTime = {min: number; sec: number};

function minToMilliSeconds(time: Minutes): MilliSeconds {
	const milliSeconds = time.min * MIN * SECONDS * MILLI_SECS;
	return {ms: milliSeconds};
}
function updateTimer(displayTime: DisplayTime): DisplayTime {
	const {min, sec} = displayTime;
	const initialSeconds = sec % SECONDS;
	const newSeconds = initialSeconds === 0 ? 59 : sec - 1;
	const newMin = initialSeconds === 0 ? min - 1 : min;

	return newMin === -1
		? {...displayTime, sec: newSeconds % SECONDS}
		: {...displayTime, sec: newSeconds % SECONDS, min: newMin};
}
function useClock({duration}: {duration: number; breakTime: number}) {
	const initial: DisplayTime = {min: duration, sec: 0};
	const [timer, setTimer] = useState(initial);
	const intervalId = useRef<NodeJS.Timeout | undefined>();
	if (timer.min === 0 && timer.sec === 0) {
		clearInterval(intervalId.current);
	}
	useEffect(() => {
		intervalId.current = setInterval(updateTime, MILLI_SECS);
		function updateTime() {
			setTimer(updateTimer);
		}
		return () => clearInterval(intervalId.current);
	}, []);
	return {timer};
}

export {useClock};
