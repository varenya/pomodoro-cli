import React, {useState} from 'react';
import {Text, Box, useInput, useApp} from 'ink';
import TextInput from 'ink-text-input';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import {useClock} from './clock-timer.js';

type PomodoroConfig = {
	duration: number;
	breakTime: number;
};

function TaskName({
	query,
	onChange,
}: {
	query: string;
	onChange: (input: string) => void;
}) {
	const [enteredText, setEnteredText] = useState('');
	function showText() {
		setEnteredText(query);
	}
	return (
		<>
			<Box>
				<Box marginLeft={1}>
					<Text>Enter your task name:</Text>
				</Box>
				<Box>
					<TextInput
						value={query}
						onChange={onChange}
						onSubmit={showText}
					></TextInput>
				</Box>
			</Box>
			{enteredText ? (
				<Box>
					<Box marginLeft={1}>
						<Text>You entered:</Text>
					</Box>
					<Box paddingLeft={1}>
						<Text>{enteredText}</Text>
					</Box>
				</Box>
			) : null}
		</>
	);
}

function Clock(props: PomodoroConfig) {
	const {duration, breakTime} = props;
	const {timer} = useClock({duration, breakTime});
	const paddedMinutes = timer.min.toString().padStart(2, '0');
	const paddedSeconds = timer.sec.toString().padStart(2, '0');
	const displayTimerText = `${paddedMinutes}:${paddedSeconds}`;
	return (
		<Box>
			<Gradient name={'retro'}>
				<BigText text={displayTimerText} />
			</Gradient>
			<Text>
				{paddedMinutes}:{paddedSeconds}
			</Text>
		</Box>
	);
}

export default function App(props: PomodoroConfig) {
	const {duration, breakTime} = props;
	const [query, setQuery] = useState('');
	const {exit} = useApp();
	useInput(input => {
		if (input === 'q') {
			exit();
		}
	});
	return (
		<>
			<Text color={'green'}>
				You will be starting a session for{' '}
				<Text color={'cyanBright'}>{duration}</Text> minutes
			</Text>
			<Text color={'green'}>
				Your break time will be for{' '}
				<Text color={'cyanBright'}>{breakTime} </Text>
				minutes
			</Text>
			<Clock {...props} />
			{/*<TaskName query={query} onChange={setQuery} />*/}
		</>
	);
}
