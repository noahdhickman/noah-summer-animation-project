# Resource Statistics

This document details the metrics and format specifications for resource statistics in the Quodsim 2D animation system. Resource statistics provide performance metrics for resource components in the simulation model.

## Overview

Resource statistics capture key performance indicators for resources, including:

- Utilization
- Allocation counts
- Queue lengths
- Wait times
- Idle times

These statistics can be displayed during animation playback to provide additional insights into resource performance.

## Component-Metric File Approach

In the component-metric pair approach, each statistic for a resource is stored in a separate file:

- `res1_utilization.json`: Utilization statistics for Resource 1
- `res1_queue_length.json`: Queue length statistics for Resource 1
- `res2_allocations.json`: Allocation statistics for Resource 2

Each file contains both summary statistics and time-series data for a specific metric. For information on the general file structure, see [Statistics File Structure](./01_statistics_file_structure.md).

## System-Level Resource Files

System-level resource statistics aggregate data across all resources:

- `system_resource_average_utilization.json`: Average utilization across all resources
- `system_resource_total_queue_length.json`: Sum of all resource queue lengths

## Common Resource Metrics

### Utilization

Utilization measures the fraction of resource capacity in use over time.

File: `res1_utilization.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "resource",
    "componentId": "res1",
    "componentName": "Pharmacist",
    "metricName": "utilization",
    "metricDisplayName": "Utilization",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 0.75,     // Average utilization (0.0-1.0)
    "min": 0,         // Minimum utilization
    "max": 1.0,       // Maximum utilization
    "standardDeviation": 0.20,  // Standard deviation of utilization
    "capacity": 3,    // Resource capacity
    "final": 0        // Utilization at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 0.33, 0.67, 1.0, 1.0, 0.67, 0.33, 0.33, 0],
    "interpolation": "step"
  }
}
```

### Queue Length

Queue length measures the number of entities waiting for the resource.

File: `res1_queue_length.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "resource",
    "componentId": "res1",
    "componentName": "Pharmacist",
    "metricName": "queueLength",
    "metricDisplayName": "Queue Length",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 2.5,      // Average queue length (time-weighted)
    "min": 0,         // Minimum queue length
    "max": 8,         // Maximum queue length
    "standardDeviation": 1.8,  // Standard deviation of queue length
    "timeWeighted": true,      // Whether statistics are time-weighted
    "final": 0        // Queue length at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 0, 2, 6, 8, 4, 2, 0, 0],
    "interpolation": "linear"
  }
}
```

### Allocations

Allocations measures the concurrent number of resource units allocated to entities.

File: `res1_allocations.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "resource",
    "componentId": "res1",
    "componentName": "Pharmacist",
    "metricName": "allocations",
    "metricDisplayName": "Allocations",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "total": 85,      // Total number of allocations
    "perTimeUnit": 0.18,  // Allocations per time unit
    "concurrent": {
      "mean": 2.25,   // Average number of concurrent allocations
      "min": 0,       // Minimum number of concurrent allocations
      "max": 3,       // Maximum number of concurrent allocations (limited by capacity)
      "standardDeviation": 0.75  // Standard deviation of concurrent allocations
    },
    "final": 0        // Number of allocations at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 1, 2, 3, 3, 2, 1, 1, 0],
    "interpolation": "step"
  }
}
```

### Cumulative Allocations

Cumulative allocations shows the total count of allocations over time.

File: `res1_cumulative_allocations.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "resource",
    "componentId": "res1",
    "componentName": "Pharmacist",
    "metricName": "cumulativeAllocations",
    "metricDisplayName": "Cumulative Allocations",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "total": 85,      // Total number of allocations
    "perTimeUnit": 0.18,  // Allocations per time unit
    "final": 85       // Final count at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 12, 28, 45, 60, 72, 79, 83, 85],
    "interpolation": "linear"
  }
}
```

### Wait Time

Wait time measures how long entities wait for the resource.

File: `res1_wait_time.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "resource",
    "componentId": "res1",
    "componentName": "Pharmacist",
    "metricName": "waitTime",
    "metricDisplayName": "Wait Time",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 8.5,      // Average wait time
    "min": 0,         // Minimum wait time
    "max": 25.5,      // Maximum wait time
    "standardDeviation": 6.2,  // Standard deviation of wait times
    "count": 85,      // Number of entities that waited
    "total": 722.5    // Total wait time across all entities
  },
  "timeSeries": {
    "times": [10.5, 25.8, 42.3, 65.7, 85.2, 120.4, 150.8, 180.2, 210.5],
    "values": [0, 5.2, 12.8, 18.5, 25.5, 15.3, 8.7, 3.5, 0],
    "interpolation": "linear"
  }
}
```

### Idle Time

Idle time measures periods when the resource is not in use.

File: `res1_idle_time.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "resource",
    "componentId": "res1",
    "componentName": "Pharmacist",
    "metricName": "idleTime",
    "metricDisplayName": "Idle Time",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 10.2,     // Average duration of idle periods
    "min": 0.5,       // Minimum idle period duration
    "max": 30.0,      // Maximum idle period duration
    "standardDeviation": 7.5,  // Standard deviation of idle period durations
    "count": 25,      // Number of idle periods
    "total": 255.0    // Total idle time
  },
  "timeSeries": {
    "times": [12.5, 35.0, 87.2, 145.8, 220.3, 310.5, 390.2, 450.6],
    "values": [0, 5.2, 18.5, 30.0, 12.5, 8.2, 15.5, 25.0],
    "interpolation": "linear"
  }
}
```

### Allocation Duration

Allocation duration measures how long the resource is allocated to entities.

File: `res1_allocation_duration.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "resource",
    "componentId": "res1",
    "componentName": "Pharmacist",
    "metricName": "allocationDuration",
    "metricDisplayName": "Allocation Duration",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 4.2,      // Average allocation duration
    "min": 1.5,       // Minimum allocation duration
    "max": 12.0,      // Maximum allocation duration
    "standardDeviation": 2.3,  // Standard deviation of allocation durations
    "count": 85,      // Number of allocations
    "total": 357.0    // Total allocation time across all allocations
  },
  "timeSeries": {
    "times": [15.3, 42.5, 78.2, 120.5, 180.8, 240.2, 310.5, 380.2, 430.8],
    "values": [3.5, 2.8, 5.2, 8.5, 12.0, 4.8, 3.2, 2.5, 1.5],
    "interpolation": "linear"
  }
}
```

### Cost

Cost measures the economic cost of using the resource.

File: `res1_cost.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "resource",
    "componentId": "res1",
    "componentName": "Pharmacist",
    "metricName": "cost",
    "metricDisplayName": "Cost",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "total": 1785.0,  // Total cost incurred by the resource
    "perTimeUnit": 3.72,  // Cost per time unit
    "final": 1785.0   // Final cost at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 223.2, 446.4, 669.6, 892.8, 1116.0, 1339.2, 1562.4, 1785.0],
    "interpolation": "linear"
  }
}
```

## System-Level Resource Metrics

### Average Utilization

Average utilization calculates the mean utilization across all resources.

File: `system_resource_average_utilization.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "system",
    "metricName": "resourceAverageUtilization",
    "metricDisplayName": "Average Resource Utilization",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 0.68,     // Average of the utilization means for all resources
    "min": 0,         // Minimum average utilization
    "max": 1.0,       // Maximum average utilization
    "standardDeviation": 0.25,  // Standard deviation of average utilization
    "resourceCount": 3,  // Number of resources
    "final": 0        // Average utilization at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 0.11, 0.39, 0.83, 1.0, 0.56, 0.44, 0.11, 0],
    "interpolation": "linear"
  }
}
```

### Total Allocations

Total allocations sums the concurrent allocations across all resources.

File: `system_resource_total_allocations.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "system",
    "metricName": "resourceTotalAllocations",
    "metricDisplayName": "Total Resource Allocations",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 3.0,      // Average total allocations
    "min": 0,         // Minimum total allocations
    "max": 7,         // Maximum total allocations
    "standardDeviation": 2.1,  // Standard deviation
    "final": 0        // Total allocations at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 1, 3, 6, 7, 4, 3, 1, 0],
    "interpolation": "step"
  }
}
```

### Total Queue Length

Total queue length sums the queue lengths across all resources.

File: `system_resource_total_queue_length.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "system",
    "metricName": "resourceTotalQueueLength",
    "metricDisplayName": "Total Resource Queue Length",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 3.6,      // Average total queue length
    "min": 0,         // Minimum total queue length
    "max": 12,        // Maximum total queue length
    "standardDeviation": 3.2,  // Standard deviation
    "final": 0        // Total queue length at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 0, 3, 9, 12, 6, 3, 0, 0],
    "interpolation": "linear"
  }
}
```

## Core Animation File References

These resource metrics are referenced from the core animation file:

```json
"statisticsDataFiles": [
  {
    "type": "resource_metric",
    "componentId": "res1", 
    "metricName": "utilization",
    "filePath": "statistics/res1_utilization.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "resource_metric",
    "componentId": "res1",
    "metricName": "queueLength",
    "filePath": "statistics/res1_queue_length.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "resource_metric",
    "componentId": "res2",
    "metricName": "utilization",
    "filePath": "statistics/res2_utilization.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "system_metric",
    "metricName": "resourceAverageUtilization",
    "filePath": "statistics/system_resource_average_utilization.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  }
]
```

For time segmentation of large time series, the core file can reference segments:

```json
"statisticsDataFiles": [
  {
    "type": "resource_metric",
    "componentId": "res1",
    "metricName": "utilization",
    "segments": [
      {
        "filePath": "statistics/res1_utilization_t0_t120.json",
        "timeStart": 0.0,
        "timeEnd": 120.0
      },
      {
        "filePath": "statistics/res1_utilization_t120_t240.json",
        "timeStart": 120.0,
        "timeEnd": 240.0
      },
      {
        "filePath": "statistics/res1_utilization_t240_t360.json",
        "timeStart": 240.0,
        "timeEnd": 360.0
      },
      {
        "filePath": "statistics/res1_utilization_t360_t480.json",
        "timeStart": 360.0,
        "timeEnd": 480.0
      }
    ]
  }
]
```
