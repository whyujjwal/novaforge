import * as React from 'react';

export class AdBanner extends React.Component {
	render() {
		return (
			<div style={{ width: '100%', height: '100%', backgroundColor: '#f3f3f3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid #ccc' }}>
				<div style={{ padding: '5px', fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Sponsored</div>
				<iframe
					src="http://localhost:3000/banner"
					style={{ width: '100%', flex: 1, border: 'none' }}
					sandbox="allow-scripts allow-same-origin"
				/>
			</div>
		);
	}
}
