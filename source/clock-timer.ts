import {useEffect, useRef, useState} from 'react';

const MIN = 60;
const SECONDS = 60;
const MILLI_SECS = 1000;

type Minutes = {min: number};
type MilliSeconds = {ms: number};

type DisplayTime = {min: number; sec: number};

function useClock({duration}: {duration: number; breakTime: number}) {
	const initial: DisplayTime = {min: duration, sec: 0};
	const taskDuration = 25 * duration * SECONDS;
	const [timer, setTimer] = useState(taskDuration);
	const intervalId = useRef<NodeJS.Timeout | undefined>();
	if (timer === 0) {
		clearInterval(intervalId.current);
	}
	useEffect(() => {
		intervalId.current = setInterval(updateTime, 1000);
		function updateTime() {
			setTimer(taskDuration => taskDuration - 1);
		}
		return () => clearInterval(intervalId.current);
	}, []);
	return {timer};
}

export {useClock};
