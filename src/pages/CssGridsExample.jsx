import React from 'react';
import '../grids.css';

export function CssGridsExample() {
    return (
        <div className="grid-container">
            {/* These are the grid items */}
            <div className="grid-item header">Header</div>
            <div className="grid-item sidebar">Sidebar</div>
            <div className="grid-item main-content">Main Content</div>
            <div className="grid-item footer">Footer</div>
        </div>
    );
}
