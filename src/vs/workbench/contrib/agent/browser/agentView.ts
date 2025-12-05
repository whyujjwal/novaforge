/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ViewPane, IViewPaneOptions } from 'vs/workbench/browser/parts/views/viewPane';
import { IAgentService } from 'vs/platform/agent/common/agentService';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { IViewDescriptorService } from 'vs/workbench/common/views';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IOpenerService } from 'vs/platform/opener/common/opener';
import { IThemeService } from 'vs/platform/theme/common/themeService';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';

export class AgentViewPane extends ViewPane {
	private _logContainer: HTMLElement | undefined;

	constructor(
		options: IViewPaneOptions,
		@IAgentService private readonly agentService: IAgentService,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@ITelemetryService telemetryService: ITelemetryService
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, telemetryService);
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);
		this._logContainer = document.createElement('div');
		this._logContainer.style.padding = '10px';
		this._logContainer.style.fontFamily = 'monospace';
		this._logContainer.style.whiteSpace = 'pre-wrap';
		this._logContainer.style.height = '100%';
		this._logContainer.style.overflowY = 'auto';
		this._logContainer.style.userSelect = 'text';
		container.appendChild(this._logContainer);

		this._register(this.agentService.onDidLog(log => {
			if (this._logContainer) {
				const entry = document.createElement('div');
				entry.textContent = `[${new Date().toLocaleTimeString()}] ${log}`;
				this._logContainer.appendChild(entry);
				this._logContainer.scrollTop = this._logContainer.scrollHeight;
			}
		}));
	}
}
