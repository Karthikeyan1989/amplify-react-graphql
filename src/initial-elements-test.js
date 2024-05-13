import React from 'react';
import { MarkerType, Position } from 'reactflow';

const position = { x: 0, y: 0 };

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

export const initialNodes = [
    {
        id: "start",
        data: {
            label: 'Start',
        },
        position,
        ...customNodeStyle,
        style: {
            background: 'red',
            color: 'white',
            width: 100,
        }
    },
    {
        id: "dp",
        // type: "decision",
        data: {
            label: 'Is sufficient CONT Fuel available from DP to DEST?',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "continue",
        // type: "process",
        data: {
            label: 'Continue to DEST',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "divert",
        // type: "process",
        data: {
            label: 'Divert to En Route Alternate Aerodrome (E)',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "scenario1",
        // type: "process",
        data: {
            label: 'Calculate 5% CONT Fuel for DP to DEST',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "checkalt",
        // type: "decision",
        data: {
            label: 'Is DEST ALTN required?',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "calculatealt",
        // type: "process",
        data: {
            label: 'Include calculations for transit to DEST ALTN',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "scenario2",
        // type: "process",
        data: {
            label: 'Calculate 5% CONT Fuel for entire flight',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "checkmax",
        // type: "decision",
        data: {
            label: 'Does fuel exceed Maximum CONT Fuel?',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "compare",
        // type: "decision",
        data: {
            label: 'Is Scenario 1 fuel requirement greater than Scenario 2?',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "ramp1",
        // type: "process",
        data: {
            label: 'Set RAMP Fuel = Fuel required for Scenario 1',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "ramp2",
        // type: "process",
        data: {
            label: 'Set RAMP Fuel = Fuel required for Scenario 2 + Additional RCF Backup (B/U)',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "postcheck",
        // type: "decision",
        data: {
            label: 'Is CONT Fuel for DP to DEST segment available at DP?',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "adjust",
        // type: "process",
        data: {
            label: 'Make necessary adjustments or consider using Backup fuel',
        },
        position,
        ...customNodeStyle
    },
    {
        id: "end",
        // type: "end",
        data: {
            label: 'End',
        },
        position,
        ...customNodeStyle,
        style: {
            background: 'red',
            color: 'white',
            width: 100,
        }
    }
]

export const initialEdges = [
    {
        id: 'e1',
        source: "start",
        target: "dp",
        ...customEdgeStyle,
         animated: true,
    },
    {
        id: 'e2',
        source: "dp",
        target: "continue",
        label: "Yes",
        ...customEdgeStyle
    },
    {
        id: 'e3',
        source: "dp",
        target: "divert",
        label: "No",
        ...customEdgeStyle
    },
    {
        id: 'e4',
        source: "continue",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        id: 'e5',
        source: "divert",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        id: 'e6',
        source: "divert",
        target: "scenario2",
        label: "End",
        ...customEdgeStyle
    },
    {
        id: 'e7',
        source: "scenario1",
        target: "checkalt",
        label: "Continue",
        ...customEdgeStyle
    },
    {
        id: 'e8',
        source: "checkalt",
        target: "calculatealt",
        label: "Yes",
        ...customEdgeStyle
    },
    {
        id: 'e9',
        source: "checkalt",
        target: "scenario2",
        label: "No",
        ...customEdgeStyle
    },
    {
        id: 'e10',
        source: "calculatealt",
        target: "scenario2",
        label: "Continue",
        ...customEdgeStyle
    },
    {
        id: 'e11',
        source: "scenario2",
        target: "checkmax",
        label: "Continue",
        ...customEdgeStyle
    },
    {
        id: 'e12',
        source: "checkmax",
        target: "compare",
        label: "No",
        ...customEdgeStyle
    },
    {
        id: 'e13',
        source: "compare",
        target: "ramp1",
        label: "Yes",
        ...customEdgeStyle
    },
    {
        id: 'e14',
        source: "compare",
        target: "ramp2",
        label: "No",
        ...customEdgeStyle
    },
    {
        id: 'e15',
        source: "ramp1",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        id: 'e16',
        source: "ramp2",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        id: 'e17',
        source: "ramp2",
        target: "postcheck",
        label: "End",
        ...customEdgeStyle
    },
    {
        id: 'e18',
        source: "postcheck",
        target: "adjust",
        label: "No",
        ...customEdgeStyle
    },
    {
        id: 'e19',
        source: "adjust",
        target: "end",
        label: "End",
        animated: true,
        ...customEdgeStyle
    },
    {
        id: 'e20',
        source: "postcheck",
        target: "continue",
        label: "Yes",
        ...customEdgeStyle
    }
]