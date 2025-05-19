# Entity Statistics

This document details the metrics and format specifications for entity statistics in the Quodsim 2D animation system. Entity statistics provide performance metrics for entities that flow through the simulation model.

## Overview

Entity statistics capture key performance indicators for entities, including:

- Time in system
- Waiting times
- Processing times
- State durations
- Value-added time
- Entity counts

These statistics can be displayed during animation playback to provide additional insights into entity flow and performance.

## Component-Metric File Approach

In the component-metric pair approach, entity statistics are organized in two categories:

1. **Entity-Type Metrics**: Statistics for a specific entity type and metric
   - `entity_customer_time_in_system.json`: Time in system for Customer entities
   - `entity_patient_wait_time.json`: Wait time for Patient entities

2. **System-Level Entity Metrics**: Aggregate statistics across all entities
   - `system_entity_count.json`: Total entity count over time
   - `system_average_time_in_system.json`: Average time in system across all entities

Each file contains both summary statistics and time-series data for a specific metric. For information on the general file structure, see [Statistics File Structure](./01_statistics_file_structure.md).

## Common Entity-Type Metrics

### Time in System

Time in system measures the total time an entity spends in the simulation.

File: `entity_customer_time_in_system.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "entity_type",
    "entityType": "Customer",
    "metricName": "timeInSystem",
    "metricDisplayName": "Time in System",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 38.5,     // Average time in system
    "min": 15.2,      // Minimum time in system
    "max": 95.2,      // Maximum time in system
    "standardDeviation": 16.8,  // Standard deviation of time in system
    "count": 150,     // Number of entities
    "total": 5775.0   // Total time in system across all entities
  },
  "timeSeries": {
    "times": [60, 120, 180, 240, 300, 360, 420, 480],
    "values": [25.5, 30.2, 32.8, 35.0, 36.2, 37.5, 38.0, 38.5],
    "interpolation": "linear"
  }
}
```

### Wait Time

Wait time measures the total time entities spend waiting in queues.

File: `entity_customer_wait_time.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "entity_type",
    "entityType": "Customer",
    "metricName": "waitTime",
    "metricDisplayName": "Wait Time",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 22.5,     // Average wait time
    "min": 3.8,       // Minimum wait time
    "max": 65.8,      // Maximum wait time
    "standardDeviation": 14.2,  // Standard deviation of wait times
    "count": 150,     // Number of entities
    "total": 3375.0,  // Total wait time across all entities
    "percentage": 58.4  // Percentage of time in system spent waiting
  },
  "timeSeries": {
    "times": [60, 120, 180, 240, 300, 360, 420, 480],
    "values": [15.2, 18.5, 20.3, 21.2, 21.8, 22.2, 22.4, 22.5],
    "interpolation": "linear"
  }
}
```

### Processing Time

Processing time measures the total time entities spend being processed by activities.

File: `entity_customer_processing_time.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "entity_type",
    "entityType": "Customer",
    "metricName": "processingTime",
    "metricDisplayName": "Processing Time",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 16.0,     // Average processing time
    "min": 11.4,      // Minimum processing time
    "max": 29.4,      // Maximum processing time
    "standardDeviation": 5.5,  // Standard deviation of processing times
    "count": 150,     // Number of entities
    "total": 2400.0,  // Total processing time across all entities
    "percentage": 41.6  // Percentage of time in system spent in processing
  },
  "timeSeries": {
    "times": [60, 120, 180, 240, 300, 360, 420, 480],
    "values": [10.3, 11.7, 12.5, 13.8, 14.4, 15.3, 15.6, 16.0],
    "interpolation": "linear"
  }
}
```

### Value-Added Time

Value-added time measures the time spent in value-adding activities.

File: `entity_customer_value_added_time.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "entity_type",
    "entityType": "Customer",
    "metricName": "valueAddedTime",
    "metricDisplayName": "Value-Added Time",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 16.0,     // Average value-added time
    "min": 11.4,      // Minimum value-added time
    "max": 29.4,      // Maximum value-added time
    "standardDeviation": 5.5,  // Standard deviation of value-added times
    "count": 150,     // Number of entities
    "total": 2400.0,  // Total value-added time across all entities
    "percentage": 41.6  // Percentage of time in system that is value-added
  },
  "timeSeries": {
    "times": [60, 120, 180, 240, 300, 360, 420, 480],
    "values": [10.3, 11.7, 12.5, 13.8, 14.4, 15.3, 15.6, 16.0],
    "interpolation": "linear"
  }
}
```

### State Duration - Waiting

State duration metrics measure how long entities spend in a specific state.

File: `entity_customer_state_duration_waiting.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "entity_type",
    "entityType": "Customer",
    "metricName": "stateDuration_waiting",
    "metricDisplayName": "Time Spent Waiting",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 22.5,     // Average time in waiting state
    "min": 3.8,       // Minimum time in waiting state
    "max": 65.8,      // Maximum time in waiting state
    "standardDeviation": 14.2,  // Standard deviation
    "count": 150,     // Number of entities
    "total": 3375.0,  // Total time in waiting state across all entities
    "percentage": 58.4  // Percentage of time in system spent in waiting state
  },
  "timeSeries": {
    "times": [60, 120, 180, 240, 300, 360, 420, 480],
    "values": [15.2, 18.5, 20.3, 21.2, 21.8, 22.2, 22.4, 22.5],
    "interpolation": "linear"
  }
}
```

## System-Level Entity Metrics

### Entity Count

Entity count shows the total number of entities that have entered the system.

File: `system_entity_count.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "system",
    "metricName": "entityCount",
    "metricDisplayName": "Entity Count",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "total": 240,      // Total number of entities created
    "byType": {
      "Customer": 150,
      "Prescription": 90
    },
    "final": 240       // Final entity count at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 15, 45, 78, 112, 150, 180, 220, 240],
    "interpolation": "linear"
  }
}
```

### Current Entities

Current entities shows the number of entities currently in the system over time.

File: `system_current_entities.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "system",
    "metricName": "currentEntities",
    "metricDisplayName": "Current Entities",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 35.0,     // Average number of entities in system
    "min": 0,         // Minimum number of entities in system
    "max": 60,        // Maximum number of entities in system
    "standardDeviation": 20.5,  // Standard deviation
    "final": 0        // Number of entities at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 15, 30, 45, 60, 55, 45, 25, 0],
    "interpolation": "linear"
  }
}
```

### Average Time in System

Average time in system shows the running average time in system up to each time point.

File: `system_average_time_in_system.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "system",
    "metricName": "averageTimeInSystem",
    "metricDisplayName": "Average Time in System",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 35.8,     // Average time in system (final value)
    "min": 0,         // Minimum (start of simulation)
    "max": 36.2,      // Maximum (peak during simulation)
    "standardDeviation": 12.5,  // Standard deviation
    "byType": {
      "Customer": 38.5,
      "Prescription": 31.3
    },
    "final": 35.8     // Final average at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 25.5, 30.2, 32.8, 35.0, 36.2, 35.9, 35.8, 35.8],
    "interpolation": "linear"
  }
}
```

### Entities by State

Entities by state shows the number of entities in different states over time.

File: `system_entities_by_state_waiting.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "system",
    "metricName": "entitiesByState_waiting",
    "metricDisplayName": "Entities in Waiting State",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 24.0,     // Average number of entities in waiting state
    "min": 0,         // Minimum
    "max": 42,        // Maximum
    "standardDeviation": 15.3,  // Standard deviation
    "final": 0        // Value at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 10, 22, 35, 42, 38, 30, 15, 0],
    "interpolation": "linear"
  }
}
```

## Entity Individual Metrics (Optional)

For very detailed analysis, individual entity statistics can be captured:

File: `entity_individual_e10.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "entity_individual",
    "entityId": "e-10",
    "entityType": "Customer",
    "timeStart": 10.5,     // Entry time of this entity
    "timeEnd": 53.0,       // Exit time of this entity
    "timeUnit": "MINUTES"
  },
  "summary": {
    "timeInSystem": 42.5,
    "waitTime": 25.0,
    "processingTime": 17.5,
    "valueAddedTime": 17.5,
    "stateDurations": {
      "waiting": 25.0,
      "processing": 17.5,
      "traveling": 0.0,
      "blocked": 0.0
    },
    "activities": {
      "act1": {
        "waitTime": 8.5,
        "processingTime": 5.3
      },
      "act2": {
        "waitTime": 12.0,
        "processingTime": 8.7
      },
      "act3": {
        "waitTime": 4.5,
        "processingTime": 3.5
      }
    }
  },
  "path": [
    {
      "clock": 10.5,
      "state": "created",
      "componentId": "gen1"
    },
    {
      "clock": 10.8,
      "state": "traveling",
      "componentId": "conn1"
    },
    {
      "clock": 11.0,
      "state": "waiting",
      "componentId": "act1"
    },
    // More path points...
    {
      "clock": 53.0,
      "state": "exited",
      "componentId": null
    }
  ]
}
```

Note: Individual entity files may use a simplified structure that omits the time series, since individual entities follow a specific path rather than showing statistical trends over time.

## Core Animation File References

These entity metrics are referenced from the core animation file:

```json
"statisticsDataFiles": [
  {
    "type": "entity_type_metric",
    "entityType": "Customer", 
    "metricName": "timeInSystem",
    "filePath": "statistics/entity_customer_time_in_system.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "entity_type_metric",
    "entityType": "Customer",
    "metricName": "waitTime",
    "filePath": "statistics/entity_customer_wait_time.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "system_metric",
    "metricName": "entityCount",
    "filePath": "statistics/system_entity_count.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "system_metric",
    "metricName": "currentEntities",
    "filePath": "statistics/system_current_entities.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  }
]
```
