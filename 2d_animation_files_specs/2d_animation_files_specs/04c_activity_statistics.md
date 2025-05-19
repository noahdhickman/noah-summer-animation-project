# Activity Statistics

This document details the metrics and format specifications for activity statistics in the Quodsim 2D animation system. Activity statistics provide performance metrics for activity components in the simulation model.

## Overview

Activity statistics capture key performance indicators for activities, including:

- Processing times
- Queue lengths
- Throughput
- Utilization
- Entity counts

These statistics can be displayed during animation playback to provide additional insights into model performance.

## Component-Metric File Approach

In the component-metric pair approach, each statistic for an activity is stored in a separate file:

- `act1_queue_length.json`: Queue length statistics for Activity 1
- `act1_utilization.json`: Utilization statistics for Activity 1
- `act2_processing_time.json`: Processing time statistics for Activity 2

Each file contains both summary statistics and time-series data for a specific metric. For information on the general file structure, see [Statistics File Structure](./01_statistics_file_structure.md).

## System-Level Activity Files

System-level activity statistics aggregate data across all activities:

- `system_activity_total_queue_length.json`: Sum of all activity queue lengths
- `system_activity_average_utilization.json`: Average utilization across all activities

## Common Activity Metrics

### Queue Length

Queue length measures the number of entities waiting in the input buffer of an activity.

File: `act1_queue_length.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "activity",
    "componentId": "act1",
    "componentName": "Register",
    "metricName": "queueLength",
    "metricDisplayName": "Queue Length",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 3.2,      // Average queue length (time-weighted)
    "min": 0,         // Minimum queue length
    "max": 8,         // Maximum queue length
    "standardDeviation": 2.1,  // Standard deviation of queue length
    "timeWeighted": true,      // Whether statistics are time-weighted
    "final": 0        // Queue length at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 2, 5, 8, 6, 4, 3, 1, 0],
    "interpolation": "linear"
  }
}
```

### Utilization

Utilization measures the fraction of activity capacity in use over time.

File: `act1_utilization.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "activity",
    "componentId": "act1",
    "componentName": "Register",
    "metricName": "utilization",
    "metricDisplayName": "Utilization",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 0.85,     // Average utilization (0.0-1.0)
    "min": 0,         // Minimum utilization
    "max": 1.0,       // Maximum utilization
    "standardDeviation": 0.22,  // Standard deviation of utilization
    "final": 0        // Utilization at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 0],
    "interpolation": "step"
  }
}
```

### Processing Time

Processing time measures how long entities spend being processed by the activity.

File: `act1_processing_time.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "activity",
    "componentId": "act1",
    "componentName": "Register",
    "metricName": "processingTime",
    "metricDisplayName": "Processing Time",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 5.3,      // Average processing time
    "min": 2.1,       // Minimum processing time
    "max": 10.5,      // Maximum processing time
    "standardDeviation": 1.8,  // Standard deviation of processing times
    "count": 57,      // Number of entities processed
    "total": 302.1    // Total processing time across all entities
  },
  "timeSeries": {
    "times": [10.5, 15.3, 22.7, 35.2, 42.8, 51.9, 65.4, 78.2, 85.6],
    "values": [4.2, 5.8, 3.1, 6.7, 5.3, 4.9, 7.2, 5.6, 4.8]
  }
}
```

### Wait Time

Wait time measures how long entities spend waiting in the input buffer.

File: `act1_wait_time.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "activity",
    "componentId": "act1",
    "componentName": "Register",
    "metricName": "waitTime",
    "metricDisplayName": "Wait Time",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 12.3,     // Average wait time
    "min": 0,         // Minimum wait time
    "max": 35.8,      // Maximum wait time
    "standardDeviation": 8.5,  // Standard deviation of wait times
    "count": 57,      // Number of entities that waited
    "total": 701.1    // Total wait time across all entities
  },
  "timeSeries": {
    "times": [10.5, 15.3, 22.7, 35.2, 42.8, 51.9, 65.4, 78.2, 85.6],
    "values": [0, 5.2, 18.5, 22.3, 15.8, 12.4, 8.7, 5.1, 3.2]
  }
}
```

### Throughput

Throughput measures the rate of entity flow through the activity.

File: `act1_throughput.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "activity",
    "componentId": "act1",
    "componentName": "Register",
    "metricName": "throughput",
    "metricDisplayName": "Throughput",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "total": 57,               // Total number of entities processed
    "perTimeUnit": 0.12,       // Entities processed per time unit
    "final": 57                // Cumulative throughput at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 8, 18, 30, 40, 47, 52, 56, 57],
    "interpolation": "linear"
  }
}
```

### Processing Count

Processing count shows the number of entities being processed at a given time.

File: `act1_processing_count.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "activity",
    "componentId": "act1",
    "componentName": "Register",
    "metricName": "processingCount",
    "metricDisplayName": "Processing Count",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 1.5,      // Average number of entities being processed
    "min": 0,         // Minimum processing count
    "max": 2,         // Maximum processing count (limited by activity capacity)
    "standardDeviation": 0.7,  // Standard deviation of processing count
    "final": 0        // Processing count at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 1, 2, 2, 2, 1, 1, 1, 0],
    "interpolation": "step"
  }
}
```

### Output Buffer Length

Output buffer length shows the number of entities in the output buffer.

File: `act1_output_buffer_length.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "activity",
    "componentId": "act1",
    "componentName": "Register",
    "metricName": "outputBufferLength",
    "metricDisplayName": "Output Buffer Length",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 0.5,      // Average output buffer length
    "min": 0,         // Minimum output buffer length
    "max": 2,         // Maximum output buffer length
    "standardDeviation": 0.6,  // Standard deviation of output buffer length
    "final": 0        // Output buffer length at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 0, 1, 2, 1, 1, 0, 0, 0],
    "interpolation": "step"
  }
}
```

## System-Level Activity Metrics

### Total Queue Length

Total queue length sums the queue lengths across all activities.

File: `system_activity_total_queue_length.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "system",
    "metricName": "totalQueueLength",
    "metricDisplayName": "Total Queue Length",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 7.1,      // Average total queue length
    "min": 0,         // Minimum total queue length
    "max": 19,        // Maximum total queue length
    "standardDeviation": 4.8,  // Standard deviation of total queue length
    "final": 0        // Total queue length at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 3, 9, 17, 15, 10, 6, 2, 0],
    "interpolation": "linear"
  }
}
```

### Average Utilization

Average utilization calculates the mean utilization across all activities.

File: `system_activity_average_utilization.json`
```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "pharmacy_process_20250516",
    "componentType": "system",
    "metricName": "averageUtilization",
    "metricDisplayName": "Average Utilization",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 0.65,     // Average of the utilization means for all activities
    "min": 0,         // Minimum average utilization
    "max": 1.0,       // Maximum average utilization
    "standardDeviation": 0.28,  // Standard deviation of average utilization
    "final": 0        // Average utilization at end of simulation
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 0.17, 0.5, 0.83, 1.0, 0.5, 0.5, 0.17, 0],
    "interpolation": "linear"
  }
}
```

## Core Animation File References

These activity metrics are referenced from the core animation file:

```json
"statisticsDataFiles": [
  {
    "type": "activity_metric",
    "componentId": "act1", 
    "metricName": "queueLength",
    "filePath": "statistics/act1_queue_length.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "activity_metric",
    "componentId": "act1",
    "metricName": "utilization",
    "filePath": "statistics/act1_utilization.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "activity_metric",
    "componentId": "act2",
    "metricName": "queueLength",
    "filePath": "statistics/act2_queue_length.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "system_metric",
    "metricName": "totalQueueLength",
    "filePath": "statistics/system_activity_total_queue_length.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  }
]
```

For time segmentation of large time series, the core file can reference segments:

```json
"statisticsDataFiles": [
  {
    "type": "activity_metric",
    "componentId": "act1",
    "metricName": "queueLength",
    "segments": [
      {
        "filePath": "statistics/act1_queue_length_t0_t120.json",
        "timeStart": 0.0,
        "timeEnd": 120.0
      },
      {
        "filePath": "statistics/act1_queue_length_t120_t240.json",
        "timeStart": 120.0,
        "timeEnd": 240.0
      },
      {
        "filePath": "statistics/act1_queue_length_t240_t360.json",
        "timeStart": 240.0,
        "timeEnd": 360.0
      },
      {
        "filePath": "statistics/act1_queue_length_t360_t480.json",
        "timeStart": 360.0,
        "timeEnd": 480.0
      }
    ]
  }
]
```
