# Dashboard Definitions

This document details the format specifications for dashboard definitions in the Quodsim 2D animation system, focusing on how they relate to the `references` section in the `core_animation.json` file.

## Overview

Dashboards provide advanced visualizations of simulation statistics during animation playback. While the basic core animation file does not directly include dashboard definitions, it can reference external visualization files that define dashboards.

## External Visualization Files

The `references` section in the core animation file can point to external visualization files:

```json
"references": {
  "visualizationFiles": [
    {
      "type": "display",
      "path": "visualization/hospital_er_flow_20250516_rep1_display_config.json"
    }
  ]
}
```

These referenced files can contain dashboard definitions that enhance the animation with statistical displays.

## Dashboard Structure

A typical dashboard configuration in an external visualization file might use this structure:

```json
{
  "dashboards": [
    {
      "id": "performance_dashboard",
      "name": "Performance Dashboard",
      "description": "Key performance indicators and metrics",
      "layout": {
        "type": "grid",
        "columns": 12,
        "rows": 8
      },
      "panels": [
        // Panel definitions...
      ],
      "defaultVisible": true
    }
    // More dashboards...
  ]
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the dashboard |
| `name` | string | Yes | Display name for the dashboard |
| `description` | string | No | Description of the dashboard |
| `layout` | object | Yes | Layout configuration |
| `panels` | array | Yes | Array of panel definitions |
| `defaultVisible` | boolean | No | Whether the dashboard is visible by default (default: false) |

## Relation to Statistics Files

Dashboards typically use data from the statistics files referenced in the core animation file:

```json
"statisticsDataFiles": [
  {
    "type": "activity_metric",
    "componentId": "act1", 
    "metricName": "queueLength",
    "filePath": "statistics/act1_queue_length.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  }
  // More statistics files...
]
```

Dashboard panels can reference these statistics files to display metrics in charts, gauges, tables, and other visualizations.

## Integration with Animation

Dashboards should integrate with the animation playback:

1. **Time Synchronization**: Dashboard visualizations should update as the animation progresses
2. **Component Selection**: Clicking on components in the animation might highlight related data in dashboards
3. **Visual Consistency**: Dashboards should use a consistent visual style with the animation

## Example

Here's a simple example of how dashboard definitions might be related to the core animation file:

**In core_animation.json**:
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1"
  },
  "statisticsDataFiles": [
    {
      "type": "activity_metric",
      "componentId": "act1", 
      "metricName": "queueLength",
      "filePath": "statistics/act1_queue_length.json",
      "timeStart": 0.0,
      "timeEnd": 480.0
    }
  ],
  "references": {
    "visualizationFiles": [
      {
        "type": "display",
        "path": "visualization/hospital_er_flow_20250516_rep1_display_config.json"
      }
    ]
  }
}
```

**In hospital_er_flow_20250516_rep1_display_config.json**:
```json
{
  "dashboards": [
    {
      "id": "performance_dashboard",
      "name": "Performance Dashboard",
      "layout": {
        "type": "grid",
        "columns": 12,
        "rows": 8
      },
      "panels": [
        {
          "id": "queue_length_chart",
          "type": "chart",
          "title": "Queue Lengths Over Time",
          "position": {
            "x": 0,
            "y": 0,
            "width": 6,
            "height": 4
          },
          "options": {
            "chartType": "line",
            "metrics": [
              {
                "componentId": "act1",
                "metricName": "queueLength",
                "label": "Register Queue"
              }
              // More metrics...
            ]
          }
        }
        // More panels...
      ]
    }
  ]
}
```

## Implementation Notes

The specific dashboard capabilities depend on the animation engine implementation. Animation engine developers should:

1. Load the core animation file
2. Load any referenced visualization files containing dashboard definitions
3. Create dashboard UI components based on these definitions
4. Connect dashboards to simulation statistics data
5. Synchronize dashboards with animation playback

The animation engine's UI should provide controls for:
- Showing/hiding dashboards
- Minimizing/maximizing dashboard panels
- Interacting with dashboard elements

## Conclusion

While dashboard definitions are not directly part of the core animation file format, they can be referenced through external visualization files. This separation allows for a clean core format while enabling rich statistical visualizations through external configuration files.
