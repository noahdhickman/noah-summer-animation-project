# Statistics File Structure

This document outlines the structure for component-metric statistics files in the Quodsim 2D animation system. These files contain both summary metrics and time-series data for specific components and metrics.

> **Note:** For multi-replication support, statistics files follow the same format but are stored in replication-specific directories with filenames that include the replication number. See [Multi-Replication Structure](./01b_multi_replication_structure.md) for details.

## Overview

The statistics files use a component-metric approach:

- Each file contains data for a single component and metric (e.g., queue length for Activity 1)
- Files contain both summary statistics and time-series data
- Files are referenced from the core animation file via the `statisticsDataFiles` section

## File Structure

Each statistics file follows this common structure:

```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "string",
    "componentType": "string",
    "componentId": "string",
    "componentName": "string",
    "metricName": "string",
    "metricDisplayName": "string",
    "timeStart": "number",
    "timeEnd": "number",
    "timeUnit": "string"
  },
  "summary": {
    "mean": "number",
    "min": "number",
    "max": "number",
    "standardDeviation": "number",
    "count": "number",
    "total": "number",
    "final": "number"
  },
  "timeSeries": {
    "times": ["number"],
    "values": ["number"]
  }
}
```

## Metadata Section

The `metadata` section contains information about the file content:

```json
"metadata": {
  "formatVersion": "1.0",
  "simulationId": "hospital_er_flow_20250516_rep1",
  "componentType": "activity",
  "componentId": "act1",
  "componentName": "Registration",
  "metricName": "queueLength",
  "metricDisplayName": "Queue Length",
  "timeStart": 0.0,
  "timeEnd": 480.0,
  "timeUnit": "MINUTES"
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `formatVersion` | string | Yes | Version of the file format |
| `simulationId` | string | Yes | Unique identifier for the simulation (matches core file) |
| `componentType` | string | Conditional | Type of component ("activity", "resource", "generator", "connector", or "system" for system-level metrics) |
| `componentId` | string | Conditional | ID of the component (not used for system-level metrics) |
| `componentName` | string | No | Human-readable name of the component |
| `metricName` | string | Yes | Identifier for the metric (e.g., "queueLength", "utilization") |
| `metricDisplayName` | string | No | Human-readable name for the metric (e.g., "Queue Length") |
| `timeStart` | number | Yes | Start time of the data in simulation time units |
| `timeEnd` | number | Yes | End time of the data in simulation time units |
| `timeUnit` | string | Yes | Unit of time used in the simulation |

## Summary Section

The `summary` section contains aggregated statistics for the metric:

```json
"summary": {
  "mean": 3.2,
  "min": 0,
  "max": 8,
  "standardDeviation": 2.1,
  "count": 57,
  "total": 182.4,
  "final": 0
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `mean` | number | Yes | Average value of the metric |
| `min` | number | Yes | Minimum value observed |
| `max` | number | Yes | Maximum value observed |
| `standardDeviation` | number | No | Standard deviation of the values |
| `count` | number | Conditional | Number of observations or entities (if applicable) |
| `total` | number | Conditional | Sum of all values (if applicable) |
| `final` | number | No | Value at the end of the simulation |

Not all properties apply to all metrics. For example:
- `count` and `total` apply to metrics like processing time but may not apply to something like utilization
- Some metrics may have additional statistics specific to their type

## Time Series Section

The `timeSeries` section contains time-indexed data for the metric:

```json
"timeSeries": {
  "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
  "values": [0, 2, 5, 8, 6, 4, 3, 1, 0]
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `times` | array | Yes | Array of time points in simulation time units |
| `values` | array | Yes | Array of metric values corresponding to the time points |

The `times` and `values` arrays must have the same length, with values at matching indices corresponding to the same time point.

## File Types and Naming Conventions

### Component-Specific Metrics

Files for individual component metrics follow this convention:
```
{componentId}_{metricName}.json
```

Examples:
- `act1_queue_length.json`: Queue length for Activity 1
- `res1_utilization.json`: Utilization for Resource 1

### System-Level Metrics

Files for system-wide metrics follow this convention:
```
system_{metricName}.json
```

Examples:
- `system_total_queue_length.json`: Sum of all queue lengths
- `system_average_utilization.json`: Average utilization across components

### Entity-Type Metrics

Files for entity type metrics follow this convention:
```
entity_{entityType}_{metricName}.json
```

Examples:
- `entity_patient_time_in_system.json`: Time in system for Patient entities
- `entity_order_processing_time.json`: Processing time for Order entities

## Time Segmentation for Large Files

For very large time series, data can be split across multiple files, each covering a segment of the simulation time. The core animation file references these segments:

```json
// In core animation file
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
    }
  ]
}
```

Each segment file follows the same structure as a regular metric file but covers only a portion of the simulation time.

## Common Metrics by Component Type

### Activity Metrics

| Metric Name | Description | Units |
|-------------|-------------|-------|
| `queueLength` | Number of entities in input buffer | count |
| `utilization` | Fraction of capacity in use | 0.0-1.0 |
| `processingCount` | Number of entities being processed | count |
| `throughput` | Cumulative count of processed entities | count |
| `waitTime` | Wait time in input buffer | time units |
| `processingTime` | Time spent processing entities | time units |
| `outputBufferLength` | Number of entities in output buffer | count |

### Resource Metrics

| Metric Name | Description | Units |
|-------------|-------------|-------|
| `utilization` | Fraction of capacity in use | 0.0-1.0 |
| `allocations` | Number of current allocations | count |
| `queueLength` | Number of entities waiting for the resource | count |
| `idleTime` | Time between allocations | time units |
| `busyTime` | Time resource spent allocated | time units |

### Generator Metrics

| Metric Name | Description | Units |
|-------------|-------------|-------|
| `entityCount` | Number of entities generated | count |
| `interarrivalTime` | Time between entity generations | time units |
| `generationRate` | Rate of entity generation | entities per time unit |

### System Metrics

| Metric Name | Description | Units |
|-------------|-------------|-------|
| `totalQueueLength` | Sum of all queue lengths | count |
| `averageUtilization` | Average utilization across components | 0.0-1.0 |
| `entityCount` | Total entities in system | count |
| `throughput` | System-wide throughput | entities per time unit |

### Entity Type Metrics

| Metric Name | Description | Units |
|-------------|-------------|-------|
| `timeInSystem` | Time spent in the system | time units |
| `waitTime` | Total time spent waiting | time units |
| `processingTime` | Total time spent in processing | time units |
| `currentCount` | Number of entities in system | count |

## Minimal Example

A minimal valid statistics file must contain at least:

```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "simple_example",
    "componentType": "activity",
    "componentId": "act1",
    "metricName": "queueLength",
    "timeStart": 0.0,
    "timeEnd": 100.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 2.5,
    "min": 0,
    "max": 6
  },
  "timeSeries": {
    "times": [0, 50, 100],
    "values": [0, 5, 0]
  }
}
```

The `summary` section should always contain at least the basic statistics (mean, min, max), while the `timeSeries` section must contain at least the `times` and `values` arrays with the same length.

## Multi-Replication Support

For the multi-replication format, the structure of statistics files remains the same, but with these differences:

1. Files are stored in replication-specific directories:
   ```
   replications/rep_NNN/statistics/
   ```

2. Filenames include the replication number:
   ```
   activity_act1_queueLength_repNNN.json
   ```

3. References in the replication manifests use relative paths from the manifest location:
   ```json
   "statisticsDataFiles": [
     {
       "type": "activity_metric",
       "componentId": "act1",
       "metricName": "queueLength",
       "filePath": "statistics/activity_act1_queueLength_rep001.json",
       "timeStart": 0.0,
       "timeEnd": 1440.0
     }
   ]
   ```

See [Multi-Replication Structure](./01b_multi_replication_structure.md) for more details on the overall file organization.
