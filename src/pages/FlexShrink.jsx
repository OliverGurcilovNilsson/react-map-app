import React from 'react';
import '../flex-shrink.css'; // 👈 Note the new CSS file name

export function FlexShrinkExample() {
    return (
        // The container needs a specific, small size to force overflow
        <div className="shrink-container">
            {/* Item 1: flex-shrink: 1 */}
            <div className="shrink-item item-x">Item X (Shrink: 1)</div>

            {/* Item 2: flex-shrink: 5 (Will shrink 5x more than X and Z) */}
            <div className="shrink-item item-y">Item Y (Shrink: 5)</div>

            {/* Item 3: flex-shrink: 1 */}
            <div className="shrink-item item-z">Item Z (Shrink: 1)</div>
        </div>
    );
}
