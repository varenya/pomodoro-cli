#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ pomodoro-cli

	Options
		--duration  Task duration
		--break     Break duration

	Examples
	  $ pomodoro-cli --duration=25 --break=5
`,
	{
		importMeta: import.meta,
		flags: {
			duration: {
				type: 'number',
				default: 25,
			},
			breakTime: {
				type: 'number',
				default: 5,
			},
		},
	},
);

render(<App duration={cli.flags.duration} breakTime={cli.flags.breakTime} />);
