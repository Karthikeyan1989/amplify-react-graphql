import React from 'react';
import { MarkerType, Position } from 'reactflow';

const customEdgeStyle = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#FF0072',
    },
    style: {
        strokeWidth: 1,
        stroke: '#FF0072',
      },
}

const customNodeStyle = {
    style: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'red'
    }
}

export const nodes = [
    {
        id: "start",
        type: "start",
        data: {
            label: 'Start',
        },
        position: { x: 250, y: 0 },
        ...customNodeStyle,
        style: {
            background: 'red',
            color: 'white',
            width: 100,
        }
    },
    {
        id: "dp",
        type: "decision",
        data: {
            label: 'Is sufficient CONT Fuel available from DP to DEST?',
        },
        position: { x: 250, y: 100 },
        ...customNodeStyle
    },
    {
        id: "continue",
        type: "process",
        data: {
            label: 'Continue to DEST',
        },
        position: { x: 140, y: 232 },
        ...customNodeStyle
    },
    {
        id: "divert",
        type: "process",
        data: {
            label: 'Divert to En Route Alternate Aerodrome (E)',
        },
        position: { x: 360, y: 225 },
        ...customNodeStyle
    },
    {
        id: "scenario1",
        type: "process",
        data: {
            label: 'Calculate 5% CONT Fuel for DP to DEST',
        },
        position: { x: 466, y: 290 },
        ...customNodeStyle
    },
    {
        id: "checkalt",
        type: "decision",
        data: {
            label: 'Is DEST ALTN required?',
        },
        position: { x: 638, y: 382 },
        ...customNodeStyle
    },
    {
        id: "calculatealt",
        type: "process",
        data: {
            label: 'Include calculations for transit to DEST ALTN',
        },
        position: { x: 842, y: 462 },
        ...customNodeStyle
    },
    {
        id: "scenario2",
        type: "process",
        data: {
            label: 'Calculate 5% CONT Fuel for entire flight',
        },
        position: { x: 638, y: 578 },
        ...customNodeStyle
    },
    {
        id: "checkmax",
        type: "decision",
        data: {
            label: 'Does fuel exceed Maximum CONT Fuel?',
        },
        position: { x: 626, y: 730 },
        ...customNodeStyle
    },
    {
        id: "compare",
        type: "decision",
        data: {
            label: 'Is Scenario 1 fuel requirement greater than Scenario 2?',
        },
        position: { x: 456, y: 458 },
        ...customNodeStyle
    },
    {
        id: "ramp1",
        type: "process",
        data: {
            label: 'Set RAMP Fuel = Fuel required for Scenario 1',
        },
        position: { x: 372, y: 634 },
        ...customNodeStyle
    },
    {
        id: "ramp2",
        type: "process",
        data: {
            label: 'Set RAMP Fuel = Fuel required for Scenario 2 + Additional RCF Backup (B/U)',
        },
        position: { x: 472, y: 753 },
        ...customNodeStyle
    },
    {
        id: "postcheck",
        type: "decision",
        data: {
            label: 'Is CONT Fuel for DP to DEST segment available at DP?',
        },
        position: { x: -36, y: 346 },
        ...customNodeStyle
    },
    {
        id: "adjust",
        type: "process",
        data: {
            label: 'Make necessary adjustments or consider using Backup fuel',
        },
        position: { x: -86, y: 560 },
        ...customNodeStyle
    },
    {
        id: "end",
        type: "end",
        data: {
            label: 'End',
        },
        position: { x: 230, y: 942 },
        ...customNodeStyle,
        style: {
            background: 'red',
            color: 'white',
            width: 100,
        }
    }
]

export const edges = [
    {
        source: "start",
        target: "dp",
        ...customEdgeStyle,
         animated: true,
    },
    {
        source: "dp",
        target: "continue",
        label: "Yes",
        ...customEdgeStyle
    },
    {
        source: "dp",
        target: "divert",
        label: "No",
        ...customEdgeStyle
    },
    {
        source: "continue",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        source: "divert",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        source: "divert",
        target: "scenario2",
        label: "End",
        ...customEdgeStyle
    },
    {
        source: "scenario1",
        target: "checkalt",
        label: "Continue",
        ...customEdgeStyle
    },
    {
        source: "checkalt",
        target: "calculatealt",
        label: "Yes",
        ...customEdgeStyle
    },
    {
        source: "checkalt",
        target: "scenario2",
        label: "No",
        ...customEdgeStyle
    },
    {
        source: "calculatealt",
        target: "scenario2",
        label: "Continue",
        ...customEdgeStyle
    },
    {
        source: "scenario2",
        target: "checkmax",
        label: "Continue",
        ...customEdgeStyle
    },
    {
        source: "checkmax",
        target: "compare",
        label: "No",
        ...customEdgeStyle
    },
    {
        source: "compare",
        target: "ramp1",
        label: "Yes",
        ...customEdgeStyle
    },
    {
        source: "compare",
        target: "ramp2",
        label: "No",
        ...customEdgeStyle
    },
    {
        source: "ramp1",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        source: "ramp2",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        source: "ramp2",
        target: "postcheck",
        label: "End",
        ...customEdgeStyle
    },
    {
        source: "postcheck",
        target: "adjust",
        label: "No",
        ...customEdgeStyle
    },
    {
        source: "adjust",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        source: "postcheck",
        target: "continue",
        label: "Yes",
        ...customEdgeStyle
    }
]