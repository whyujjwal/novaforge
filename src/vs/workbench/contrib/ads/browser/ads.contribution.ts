/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Registry } from 'vs/platform/registry/common/platform';
import { IViewContainersRegistry, Extensions as ViewExtensions, ViewContainerLocation, IViewsRegistry } from 'vs/workbench/common/views';
import { ViewPane, IViewPaneOptions } from 'vs/workbench/browser/parts/views/viewPane';
import { ViewPaneContainer } from 'vs/workbench/browser/parts/views/viewPaneContainer';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IViewDescriptorService } from 'vs/workbench/common/views';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IContextKeyService, ContextKeyExpr } from 'vs/platform/contextkey/common/contextkey';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IOpenerService } from 'vs/platform/opener/common/opener';
import { IThemeService } from 'vs/platform/theme/common/themeService';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { AdBanner } from './adBanner';

class AdViewPane extends ViewPane {
	private _root: ReactDOM.Root | undefined;

	constructor(
		options: IViewPaneOptions,
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
		const rootEl = document.createElement('div');
		rootEl.style.height = '100%';
		container.appendChild(rootEl);

		this._root = ReactDOM.createRoot(rootEl);
		this._root.render(React.createElement(AdBanner));
	}

	override dispose(): void {
		if (this._root) {
			this._root.unmount();
		}
		super.dispose();
	}
}

// Register View Container
const VIEW_CONTAINER = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: 'novaforge.ads',
	title: { value: 'Ads', original: 'Ads' },
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, ['novaforge.ads', { mergeViewWithContainerWhenSingleView: true }]),
	icon: 'codicon-broadcast',
	hideIfEmpty: false,
	order: 10
}, ViewContainerLocation.AuxiliaryBar);

const viewsRegistry = Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry);
viewsRegistry.registerViews([{
	id: 'novaforge.ads.view',
	name: { value: 'Sponsored', original: 'Sponsored' },
	containerIcon: 'codicon-broadcast',
	ctorDescriptor: new SyncDescriptor(AdViewPane),
	canToggleVisibility: true,
	when: ContextKeyExpr.equals('novaforge.agent.isRunning', true),
	workspace: true
}], VIEW_CONTAINER);
