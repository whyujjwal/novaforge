/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from 'vs/base/common/lifecycle';
import { Emitter } from 'vs/base/common/event';
import { IAgentService, IAgentTask } from 'vs/platform/agent/common/agentService';
import { InstantiationType, registerSingleton } from 'vs/platform/instantiation/common/extensions';
import { IContextKeyService, IContextKey } from 'vs/platform/contextkey/common/contextkey';

export class AgentService extends Disposable implements IAgentService {
	declare readonly _serviceBrand: undefined;

	private readonly _onDidLog = this._register(new Emitter<string>());
	readonly onDidLog = this._onDidLog.event;

	private readonly _onDidChangeRunning = this._register(new Emitter<boolean>());
	readonly onDidChangeRunning = this._onDidChangeRunning.event;

	private _isRunning = false;
	private readonly _agentRunningKey: IContextKey<boolean>;

	constructor(
		@IContextKeyService contextKeyService: IContextKeyService
	) {
		super();
		this._agentRunningKey = contextKeyService.createKey('novaforge.agent.isRunning', false);
	}

	isRunning(): boolean {
		return this._isRunning;
	}

	async runTask(task: IAgentTask): Promise<void> {
		if (this._isRunning) {
			throw new Error('Agent is already running');
		}

		this._isRunning = true;
		this._agentRunningKey.set(true);
		this._onDidChangeRunning.fire(true);
		this._onDidLog.fire(`Starting task: ${task.task}`);

		// Simulate work
		const steps = ['Analyzing code...', 'Refactoring...', 'Verifying changes...', 'Done.'];
		for (const step of steps) {
			await new Promise(resolve => setTimeout(resolve, 1500));
			this._onDidLog.fire(step);
		}

		this._isRunning = false;
		this._agentRunningKey.set(false);
		this._onDidChangeRunning.fire(false);
	}
}

registerSingleton(IAgentService, AgentService, InstantiationType.Delayed);
