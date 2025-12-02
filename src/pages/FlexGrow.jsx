import React from 'react';
import '../flex-grow.css';

export function FlexGrowExample() {
    return (
        <div className="flex-container">
            {/* Item 1: flex-grow: 1 */}
            <div className="flex-item item-a">Item A (Grow: 1)</div>

            {/* Item 2: flex-grow: 2 (Gets five times space of A and C) */}
            <div className="flex-item item-b">Item B (Grow: 5)</div>

            {/* Item 3: flex-grow: 1 */}
            <div className="flex-item item-c">Item C (Grow: 1)</div>
        </div>
    );
}
