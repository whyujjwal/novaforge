/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { Event } from 'vs/base/common/event';

export const IAgentService = createDecorator<IAgentService>('agentService');

export interface IAgentTask {
	task: string;
	codeContext?: string;
	files?: string[];
	parameters?: any;
}

export interface IAgentService {
	readonly _serviceBrand: undefined;

	readonly onDidLog: Event<string>;
	readonly onDidChangeRunning: Event<boolean>;

	isRunning(): boolean;
	runTask(task: IAgentTask): Promise<void>;
}
