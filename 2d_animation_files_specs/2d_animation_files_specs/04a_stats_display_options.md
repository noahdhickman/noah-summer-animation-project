# Statistics Display Options

This document details the format specifications for statistics display options in the Quodsim 2D animation system. Statistics display options define how performance metrics are visualized during animation playback.

## Overview

Statistics display options configure:

- Positioning of statistics on screen
- Formatting and styling of displayed values
- Visibility and toggling of statistics
- Threshold highlighting
- Advanced display features

Properly configured statistics displays provide valuable insight into model performance during animation.

## Display Modes

Statistics can be displayed in several modes:

```json
"statisticsDisplayMode": "overlay"  // Can be "overlay", "hover", "panel", "integrated", or "none"
```

| Mode | Description |
|------|-------------|
| `overlay` | Display statistics as overlays on components |
| `hover` | Show statistics when hovering over components |
| `panel` | Display statistics in a separate panel |
| `integrated` | Integrate statistics into component visuals |
| `none` | Do not display statistics |

## Overlay Configuration

When using the `overlay` mode, statistics are displayed directly over components:

```json
"overlayConfig": {
  "position": "top",  // Can be "top", "bottom", "left", "right", "center"
  "offset": {"x": 0, "y": -20},
  "background": {
    "color": "#ffffff",
    "alpha": 0.7,
    "borderColor": "#333333",
    "borderWidth": 1,
    "cornerRadius": 4
  },
  "padding": {"x": 5, "y": 3},
  "maxWidth": 120,
  "followComponent": true
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `position` | string | No | Relative position to component (default: "top") |
| `offset` | object | No | Additional x/y offset in pixels |
| `background` | object | No | Background configuration |
| `padding` | object | No | Padding inside the overlay |
| `maxWidth` | number | No | Maximum width of the overlay in pixels |
| `followComponent` | boolean | No | Whether the overlay follows the component when moving |

## Hover Configuration

When using the `hover` mode, statistics are shown on hover:

```json
"hoverConfig": {
  "delayShow": 300,  // Milliseconds to delay showing
  "delayHide": 500,  // Milliseconds to delay hiding
  "position": "follow",  // Can be "follow" or a fixed position
  "offset": {"x": 10, "y": 10},
  "background": {
    "color": "#ffffff",
    "alpha": 0.9,
    "borderColor": "#333333",
    "borderWidth": 1,
    "cornerRadius": 4
  },
  "padding": {"x": 8, "y": 5},
  "maxWidth": 200
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `delayShow` | number | No | Delay before showing in milliseconds (default: 300) |
| `delayHide` | number | No | Delay before hiding in milliseconds (default: 500) |
| `position` | string | No | Positioning mode (default: "follow") |
| `offset` | object | No | Offset from cursor or component |
| `background` | object | No | Background configuration |
| `padding` | object | No | Padding inside the tooltip |
| `maxWidth` | number | No | Maximum width of the tooltip in pixels |

## Panel Configuration

When using the `panel` mode, statistics are displayed in a dedicated panel:

```json
"panelConfig": {
  "position": "right",  // Can be "right", "left", "top", "bottom"
  "width": 250,
  "height": "100%",
  "background": {
    "color": "#f5f5f5",
    "alpha": 1.0,
    "borderColor": "#cccccc",
    "borderWidth": 1
  },
  "title": "Statistics",
  "collapsible": true,
  "collapsed": false,
  "resizable": true,
  "scrollable": true,
  "sections": [
    {
      "title": "Activities",
      "expanded": true,
      "components": ["act1", "act2", "act3"]
    },
    {
      "title": "Resources",
      "expanded": false,
      "components": ["res1", "res2"]
    }
  ]
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `position` | string | No | Panel position (default: "right") |
| `width` | number/string | No | Panel width in pixels or percentage (default: 250) |
| `height` | number/string | No | Panel height in pixels or percentage (default: "100%") |
| `background` | object | No | Panel background configuration |
| `title` | string | No | Panel title |
| `collapsible` | boolean | No | Whether the panel can be collapsed (default: true) |
| `collapsed` | boolean | No | Initial collapsed state (default: false) |
| `resizable` | boolean | No | Whether the panel can be resized (default: true) |
| `scrollable` | boolean | No | Whether the panel is scrollable (default: true) |
| `sections` | array | No | Panel sections for organizing statistics |

## Integrated Configuration

When using the `integrated` mode, statistics are directly integrated into component visuals:

```json
"integratedConfig": {
  "mode": "progress",  // Can be "progress", "color", "size", "icon", or "text"
  "metric": "utilization",
  "scale": "linear",  // Can be "linear", "log", or "threshold"
  "valueRange": [0, 1],
  "visualRange": [0, 1]
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `mode` | string | No | Integration mode (default: "progress") |
| `metric` | string | Yes | Metric to visualize |
| `scale` | string | No | Scale type (default: "linear") |
| `valueRange` | array | No | Range of metric values [min, max] |
| `visualRange` | array | No | Range of visual values [min, max] |

## Component-Type Statistics Configuration

Statistics display can be configured by component type:

```json
"componentStatistics": {
  "activity": {
    "metrics": [
      {
        "name": "queueLength",
        "label": "Queue",
        "format": "{value}",
        "precision": 0,
        "visible": true,
        "showTrend": true
      },
      {
        "name": "utilization",
        "label": "Util",
        "format": "{value}%",
        "multiplier": 100,
        "precision": 0,
        "visible": true,
        "thresholds": [
          {"value": 0.7, "color": "#f39c12"},
          {"value": 0.9, "color": "#e74c3c"}
        ]
      },
      {
        "name": "processingCount",
        "label": "Processing",
        "format": "{value}",
        "precision": 0,
        "visible": true
      }
    ],
    "displayMode": "overlay",
    "overlayConfig": {
      "position": "top",
      "background": {
        "color": "#3498db",
        "alpha": 0.7,
        "borderColor": "#2980b9",
        "borderWidth": 1,
        "cornerRadius": 4
      },
      "textColor": "#ffffff"
    }
  },
  "resource": {
    "metrics": [
      {
        "name": "utilization",
        "label": "Util",
        "format": "{value}%",
        "multiplier": 100,
        "precision": 0,
        "visible": true
      },
      {
        "name": "queueLength",
        "label": "Queue",
        "format": "{value}",
        "precision": 0,
        "visible": true
      }
    ],
    "displayMode": "overlay",
    "overlayConfig": {
      "position": "top",
      "background": {
        "color": "#2ecc71",
        "alpha": 0.7,
        "borderColor": "#27ae60",
        "borderWidth": 1,
        "cornerRadius": 4
      },
      "textColor": "#ffffff"
    }
  },
  "generator": {
    "metrics": [
      {
        "name": "entityCount",
        "label": "Generated",
        "format": "{value}",
        "precision": 0,
        "visible": true
      }
    ],
    "displayMode": "overlay",
    "overlayConfig": {
      "position": "top",
      "background": {
        "color": "#e74c3c",
        "alpha": 0.7,
        "borderColor": "#c0392b",
        "borderWidth": 1,
        "cornerRadius": 4
      },
      "textColor": "#ffffff"
    }
  }
}
```

Each component type has:
- A list of metrics to display
- Display mode configuration
- Visual styling options

The `metrics` array defines which metrics should be displayed for components of this type. The animation system will look for corresponding metric files for each component.

## Metric Configuration

Each metric has its own configuration:

```json
{
  "name": "queueLength",
  "label": "Queue",
  "format": "{value}",
  "precision": 0,
  "visible": true,
  "showTrend": true,
  "showAverage": false,
  "showMin": false,
  "showMax": false,
  "multiplier": 1,
  "thresholds": [
    {"value": 5, "color": "#f39c12"},
    {"value": 10, "color": "#e74c3c"}
  ],
  "colors": {
    "increasing": "#e74c3c",
    "decreasing": "#2ecc71",
    "neutral": "#3498db"
  },
  "chartType": "line"
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Name of the metric (corresponds to metricName in statistics files) |
| `label` | string | No | Display label for the metric (default: name) |
| `format` | string | No | Format string (default: "{value}") |
| `precision` | number | No | Number of decimal places (default: 2) |
| `visible` | boolean | No | Whether the metric is visible (default: true) |
| `showTrend` | boolean | No | Show trend indicator (default: false) |
| `showAverage` | boolean | No | Show average value (default: false) |
| `showMin` | boolean | No | Show minimum value (default: false) |
| `showMax` | boolean | No | Show maximum value (default: false) |
| `multiplier` | number | No | Value multiplier (default: 1) |
| `thresholds` | array | No | Threshold configurations for highlighting |
| `colors` | object | No | Color configurations for trends |
| `chartType` | string | No | Type of mini-chart to display (if any) |

The `name` property of each metric corresponds to the `metricName` property in the statistics data files. For example, a metric named "queueLength" for component "act1" will use data from the file referenced by the `act1_queue_length.json` entry in the core animation file.

## Custom Component Statistics

Individual components can have custom statistics configurations:

```json
"components": {
  "act1": {
    "metrics": [
      {
        "name": "queueLength",
        "label": "Queue",
        "format": "{value}",
        "precision": 0,
        "visible": true,
        "thresholds": [
          {"value": 3, "color": "#f39c12"},
          {"value": 6, "color": "#e74c3c"}
        ]
      },
      {
        "name": "utilization",
        "label": "Util",
        "format": "{value}%",
        "multiplier": 100,
        "precision": 0,
        "visible": true
      }
    ],
    "displayMode": "overlay",
    "overlayConfig": {
      "position": "top",
      "background": {
        "color": "#9b59b6",
        "alpha": 0.7,
        "borderColor": "#8e44ad",
        "borderWidth": 1,
        "cornerRadius": 4
      },
      "textColor": "#ffffff"
    }
  }
}
```

Component-specific configurations override the default configurations for that component type.

## Summary Statistics

Summary statistics aggregate metrics across multiple components:

```json
"summaryStatistics": {
  "position": "top-right",
  "background": {
    "color": "#ffffff",
    "alpha": 0.9,
    "borderColor": "#333333",
    "borderWidth": 1,
    "cornerRadius": 4
  },
  "padding": {"x": 10, "y": 8},
  "width": 200,
  "title": "System Summary",
  "metrics": [
    {
      "name": "resourceAverageUtilization",
      "label": "Avg Utilization",
      "format": "{value}%",
      "multiplier": 100,
      "precision": 1,
      "visible": true
    },
    {
      "name": "resourceTotalQueueLength",
      "label": "Total Queue",
      "format": "{value}",
      "precision": 0,
      "visible": true
    },
    {
      "name": "entityCount",
      "label": "Entities",
      "format": "{value}",
      "precision": 0,
      "visible": true
    }
  ]
}
```

Summary statistics can display system-level metrics. The `name` property of each metric corresponds to the `metricName` property in the system-level statistics data files referenced in the core animation file.

## Time Series Charts

Time series charts display metric changes over time:

```json
"timeSeriesCharts": {
  "position": "bottom",
  "height": 150,
  "background": {
    "color": "#ffffff",
    "alpha": 0.9,
    "borderColor": "#cccccc",
    "borderWidth": 1
  },
  "title": "Performance Over Time",
  "collapsible": true,
  "collapsed": false,
  "charts": [
    {
      "title": "Queue Lengths",
      "metrics": [
        {
          "componentId": "act1", 
          "metricName": "queueLength", 
          "color": "#3498db", 
          "label": "Register"
        },
        {
          "componentId": "act2", 
          "metricName": "queueLength", 
          "color": "#2ecc71", 
          "label": "Processing"
        },
        {
          "componentId": "act3", 
          "metricName": "queueLength", 
          "color": "#9b59b6", 
          "label": "Checkout"
        }
      ],
      "yAxis": {
        "min": 0,
        "title": "Queue Length"
      },
      "xAxis": {
        "title": "Time"
      },
      "width": "100%",
      "height": 120,
      "visible": true
    }
  ]
}
```

Time series charts provide a historical view of metrics during animation. Each metric in the `metrics` array specifies:

- `componentId`: The ID of the component (for component-specific metrics) or null (for system-level metrics)
- `metricName`: The name of the metric (corresponding to the metric name in statistics files)
- `color`: The color to use for the metric line
- `label`: The display label for the metric in the chart legend

The animation system will look for the time series data in the appropriate statistics file as referenced in the core animation file.

## Display States

Display states control the visibility of statistics:

```json
"displayStates": {
  "default": {
    "activity": ["queueLength", "utilization"],
    "resource": ["utilization"],
    "generator": ["entityCount"]
  },
  "detailed": {
    "activity": ["queueLength", "utilization", "processingCount", "throughput"],
    "resource": ["utilization", "queueLength", "allocations"],
    "generator": ["entityCount", "arrivalRate"]
  },
  "minimal": {
    "activity": ["utilization"],
    "resource": ["utilization"],
    "generator": []
  }
}
```

Display states allow toggling between different levels of detail by specifying which metrics should be visible for each component type in each state.

## Formatting Options

Formatting options control how values are displayed:

```json
"formatting": {
  "numberFormat": {
    "decimalSeparator": ".",
    "thousandsSeparator": ",",
    "precision": 2,
    "trailingZeros": false
  },
  "timeFormat": {
    "hours": "h",
    "minutes": "m",
    "seconds": "s",
    "separator": ":"
  },
  "dateFormat": "MM/DD/YYYY",
  "percentFormat": {
    "symbol": "%",
    "position": "after",
    "space": false,
    "precision": 1
  }
}
```

These options control the display of numbers, times, dates, and percentages.

## Thresholds and Alerts

Thresholds can trigger visual alerts:

```json
"thresholds": {
  "activity": {
    "queueLength": [
      {"value": 5, "color": "#f39c12", "alert": false},
      {"value": 10, "color": "#e74c3c", "alert": true, "message": "Long queue at {component}"}
    ],
    "utilization": [
      {"value": 0.7, "color": "#f39c12", "alert": false},
      {"value": 0.9, "color": "#e74c3c", "alert": true, "message": "High utilization at {component}"}
    ]
  },
  "resource": {
    "utilization": [
      {"value": 0.7, "color": "#f39c12", "alert": false},
      {"value": 0.9, "color": "#e74c3c", "alert": true, "message": "Resource {component} is nearly maxed out"}
    ]
  }
}
```

Thresholds can change colors and trigger alert messages.

## Visibility Rules

Visibility rules control when statistics are shown:

```json
"visibilityRules": {
  "activity": {
    "queueLength": {"condition": "value > 0"},
    "processingCount": {"condition": "value > 0"}
  },
  "resource": {
    "queueLength": {"condition": "value > 0"}
  },
  "global": {
    "zoomLevel": {"min": 0.5, "max": 2.0}
  }
}
```

These rules can hide statistics when certain conditions are met.

## Animation Options

Animation options control how statistics update:

```json
"animation": {
  "duration": 500,
  "easing": "easeOutQuad",
  "valueChangeFade": true,
  "increasingColor": "#2ecc71",
  "decreasingColor": "#e74c3c"
}
```

These options control the transitions when statistic values change.

## User Interaction

User interaction options control how users can interact with statistics:

```json
"interaction": {
  "toggleVisibility": true,
  "hoverHighlight": true,
  "clickToShowDetails": true,
  "dragToReposition": false,
  "pinToComponent": true
}
```

These options define how users can manipulate statistics displays.

## Example

Here's a complete example of statistics display options:

```json
"statisticsDisplay": {
  "statisticsDisplayMode": "overlay",
  "overlayConfig": {
    "position": "top",
    "offset": {"x": 0, "y": -20},
    "background": {
      "color": "#ffffff",
      "alpha": 0.7,
      "borderColor": "#333333",
      "borderWidth": 1,
      "cornerRadius": 4
    },
    "padding": {"x": 5, "y": 3},
    "maxWidth": 120,
    "followComponent": true
  },
  "hoverConfig": {
    "delayShow": 300,
    "delayHide": 500,
    "position": "follow",
    "offset": {"x": 10, "y": 10},
    "background": {
      "color": "#ffffff",
      "alpha": 0.9,
      "borderColor": "#333333",
      "borderWidth": 1,
      "cornerRadius": 4
    },
    "padding": {"x": 8, "y": 5},
    "maxWidth": 200
  },
  "componentStatistics": {
    "activity": {
      "metrics": [
        {
          "name": "queueLength",
          "label": "Queue",
          "format": "{value}",
          "precision": 0,
          "visible": true,
          "showTrend": true,
          "thresholds": [
            {"value": 5, "color": "#f39c12"},
            {"value": 10, "color": "#e74c3c"}
          ]
        },
        {
          "name": "utilization",
          "label": "Util",
          "format": "{value}%",
          "multiplier": 100,
          "precision": 0,
          "visible": true,
          "thresholds": [
            {"value": 0.7, "color": "#f39c12"},
            {"value": 0.9, "color": "#e74c3c"}
          ]
        }
      ],
      "displayMode": "overlay",
      "overlayConfig": {
        "position": "top",
        "background": {
          "color": "#3498db",
          "alpha": 0.7,
          "borderColor": "#2980b9",
          "borderWidth": 1,
          "cornerRadius": 4
        },
        "textColor": "#ffffff"
      }
    },
    "resource": {
      "metrics": [
        {
          "name": "utilization",
          "label": "Util",
          "format": "{value}%",
          "multiplier": 100,
          "precision": 0,
          "visible": true,
          "thresholds": [
            {"value": 0.7, "color": "#f39c12"},
            {"value": 0.9, "color": "#e74c3c"}
          ]
        },
        {
          "name": "queueLength",
          "label": "Queue",
          "format": "{value}",
          "precision": 0,
          "visible": true
        }
      ],
      "displayMode": "overlay",
      "overlayConfig": {
        "position": "top",
        "background": {
          "color": "#2ecc71",
          "alpha": 0.7,
          "borderColor": "#27ae60",
          "borderWidth": 1,
          "cornerRadius": 4
        },
        "textColor": "#ffffff"
      }
    }
  },
  "summaryStatistics": {
    "position": "top-right",
    "background": {
      "color": "#ffffff",
      "alpha": 0.9,
      "borderColor": "#333333",
      "borderWidth": 1,
      "cornerRadius": 4
    },
    "padding": {"x": 10, "y": 8},
    "width": 200,
    "title": "System Summary",
    "metrics": [
      {
        "name": "resourceAverageUtilization",
        "label": "Avg Utilization",
        "format": "{value}%",
        "multiplier": 100,
        "precision": 1,
        "visible": true
      },
      {
        "name": "resourceTotalQueueLength",
        "label": "Total Queue",
        "format": "{value}",
        "precision": 0,
        "visible": true
      },
      {
        "name": "entityCount",
        "label": "Entities",
        "format": "{value}",
        "precision": 0,
        "visible": true
      }
    ]
  },
  "timeSeriesCharts": {
    "position": "bottom",
    "height": 150,
    "background": {
      "color": "#ffffff",
      "alpha": 0.9,
      "borderColor": "#cccccc",
      "borderWidth": 1
    },
    "title": "Performance Over Time",
    "collapsible": true,
    "collapsed": false,
    "charts": [
      {
        "title": "Queue Lengths",
        "metrics": [
          {"componentId": "act1", "metricName": "queueLength", "color": "#3498db", "label": "Register"},
          {"componentId": "act2", "metricName": "queueLength", "color": "#2ecc71", "label": "Processing"},
          {"componentId": "act3", "metricName": "queueLength", "color": "#9b59b6", "label": "Checkout"}
        ],
        "yAxis": {
          "min": 0,
          "title": "Queue Length"
        },
        "xAxis": {
          "title": "Time"
        },
        "width": "100%",
        "height": 120,
        "visible": true
      }
    ]
  },
  "displayStates": {
    "default": {
      "activity": ["queueLength", "utilization"],
      "resource": ["utilization"],
      "generator": ["entityCount"]
    },
    "detailed": {
      "activity": ["queueLength", "utilization", "processingCount", "throughput"],
      "resource": ["utilization", "queueLength", "allocations"],
      "generator": ["entityCount", "arrivalRate"]
    },
    "minimal": {
      "activity": ["utilization"],
      "resource": ["utilization"],
      "generator": []
    }
  },
  "formatting": {
    "numberFormat": {
      "decimalSeparator": ".",
      "thousandsSeparator": ",",
      "precision": 2,
      "trailingZeros": false
    },
    "percentFormat": {
      "symbol": "%",
      "position": "after",
      "space": false,
      "precision": 1
    }
  },
  "animation": {
    "duration": 500,
    "easing": "easeOutQuad",
    "valueChangeFade": true,
    "increasingColor": "#2ecc71",
    "decreasingColor": "#e74c3c"
  },
  "interaction": {
    "toggleVisibility": true,
    "hoverHighlight": true,
    "clickToShowDetails": true,
    "dragToReposition": false,
    "pinToComponent": true
  }
}
```

This configuration defines how statistics are displayed during animation, including which metrics to show for each component type, how to format the values, and how to style the displays.
