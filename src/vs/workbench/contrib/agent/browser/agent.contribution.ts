/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Registry } from 'vs/platform/registry/common/platform';
import { IViewContainersRegistry, Extensions as ViewExtensions, ViewContainerLocation, IViewsRegistry } from 'vs/workbench/common/views';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { ViewPaneContainer } from 'vs/workbench/browser/parts/views/viewPaneContainer';
import { AgentViewPane } from './agentView';
import { Action2, registerAction2 } from 'vs/platform/actions/common/actions';
import { ServicesAccessor } from 'vs/platform/instantiation/common/instantiation';
import { IAgentService } from 'vs/platform/agent/common/agentService';
import { localize } from 'vs/nls';

// Register View Container
const VIEW_CONTAINER = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: 'novaforge.agent',
	title: { value: 'AI Agent', original: 'AI Agent' },
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, ['novaforge.agent', { mergeViewWithContainerWhenSingleView: true }]),
	icon: 'codicon-robot',
	hideIfEmpty: false
}, ViewContainerLocation.Sidebar);

const viewsRegistry = Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry);
viewsRegistry.registerViews([{
	id: 'novaforge.agent.view',
	name: { value: 'Agent Logs', original: 'Agent Logs' },
	containerIcon: 'codicon-robot',
	ctorDescriptor: new SyncDescriptor(AgentViewPane),
	canToggleVisibility: true,
	workspace: true
}], VIEW_CONTAINER);

// Register Command
registerAction2(class RunAgentTaskAction extends Action2 {
	constructor() {
		super({
			id: 'novaforge.agent.runTask',
			title: { value: 'Run Agent Task', original: 'Run Agent Task' },
			f1: true
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const agentService = accessor.get(IAgentService);
		try {
			await agentService.runTask({ task: 'Sample Task from Command Palette' });
		} catch (err) {
			console.error(err);
		}
	}
});
