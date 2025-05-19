# Time Series Format

This document details the format specifications for time series data in the Quodsim 2D animation system. Time series data provides a chronological sequence of values for metrics over the course of a simulation.

## Overview

Time series data captures how metrics change over time during a simulation. This data enables:

- Visualization of trends and patterns
- Animation of dynamic charts during playback
- Synchronization of statistics with entity movement
- Analysis of system behavior over time

## Basic Structure

In the component-metric approach, time series data is stored as parallel arrays in the `timeSeries` section of each statistics file:

```json
"timeSeries": {
  "times": [0, 10, 20, 30, 40, 50],
  "values": [0, 5, 8, 12, 10, 7]
}
```

The `times` array contains time points, and the `values` array contains corresponding metric values at those time points.

## Properties

Each time series consists of two parallel arrays:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `times` | array | Yes | Array of time points in simulation time units |
| `values` | array | Yes | Array of values corresponding to the time points |

Both arrays must have the same length, with values at matching indices corresponding to the same time point.

## Time Points

The `times` array contains time points in the simulation's time units:

```json
"times": [0, 10, 20, 30, 40, 50, 60]
```

Time points:
- Must be in ascending order
- Should start from the beginning of the simulation (typically 0)
- Should end at or near the simulation's duration
- Should be appropriate for the level of detail needed

## Values

The `values` array contains the metric values at each time point:

```json
"values": [0, 5, 8, 12, 10, 7, 3]
```

Values:
- Can be of any numeric type (integers, floats)
- May include null values to represent missing data
- Should be appropriate for the metric they represent (e.g., counts should be non-negative)

## Sampling Methods

Time series data can be sampled using different methods:

### Regular Interval Sampling

Data is sampled at regular intervals:

```json
// Example of a queue length metric sampled every 60 time units
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "hospital_er_flow_20250516_rep1",
    "componentType": "activity",
    "componentId": "act1",
    "metricName": "queueLength",
    "timeStart": 0.0,
    "timeEnd": 480.0,
    "timeUnit": "MINUTES"
  },
  "summary": {
    "mean": 3.5,
    "min": 0,
    "max": 8
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 3, 5, 8, 6, 4, 3, 1, 0]
  }
}
```

### Event-Based Sampling

Data is sampled when events of interest occur, resulting in irregular intervals:

```json
// Example of a queue length metric sampled at irregular intervals
"timeSeries": {
  "times": [0, 12.5, 15.8, 32.1, 45.7, 58.2, 75.0, 92.3, 120.0],
  "values": [0, 1, 2, 3, 2, 1, 3, 4, 2]
}
```

### Hybrid Sampling

A combination of regular interval and event-based sampling:

```json
// Example with both regular interval points and event-driven points
"timeSeries": {
  "times": [0, 10, 12.5, 15.8, 20, 30, 32.1, 40, 45.7, 50, 58.2, 60],
  "values": [0, 0, 1, 2, 2, 3, 3, 2, 2, 1, 1, 0]
}
```

## Interpolation

The animation system can interpolate between time points to provide smooth visualization. This can be specified in the time series data:

```json
"timeSeries": {
  "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
  "values": [0, 2, 5, 8, 6, 4, 3, 1, 0],
  "interpolation": "linear"  // Can be "linear", "step", or "spline"
}
```

If not specified, linear interpolation is typically used by default.

## Common Time Series Metrics by Component Type

Different component types have typical time series metrics:

### Activity Metrics

- `queueLength`: Number of entities in the input buffer over time
- `utilization`: Fraction of capacity in use over time (0.0-1.0)
- `processingCount`: Number of entities being processed over time
- `cumulativeThroughput`: Cumulative count of processed entities over time
- `outputBufferLength`: Number of entities in the output buffer over time

### Resource Metrics

- `utilization`: Fraction of capacity in use over time (0.0-1.0)
- `allocations`: Number of current allocations over time
- `queueLength`: Number of entities waiting for the resource over time

### System Metrics

- `totalQueueLength`: Sum of all queue lengths over time
- `averageUtilization`: Average utilization across all components over time
- `entityCount`: Total number of entities in the system over time
- `throughput`: Rate of entities exiting the system over time

## Data Reduction Techniques

For long simulations, time series data can become large. Several reduction methods can be used:

### Downsampling

Storing only a subset of data points using methods like:
- Average values over intervals
- Min/max values over intervals
- First/last value in each interval

```json
// Example of downsampled data (hourly samples for a day-long simulation)
"timeSeries": {
  "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
  "values": [0, 2, 5, 8, 6, 4, 3, 1, 0],
  "samplingMethod": "average",
  "originalSampleCount": 480  // Indicates original had 480 samples before downsampling
}
```

### Variable Resolution

Higher resolution for important time periods:

```json
// Example with high resolution during a critical period (120-125)
"timeSeries": {
  "times": [0, 60, 120, 121, 122, 123, 124, 125, 180, 240, 300],
  "values": [0, 2, 5, 6, 7, 8, 8, 7, 4, 3, 0]
}
```

### Time Segmentation

For very large datasets, time series can be split across multiple files, each covering a segment of the simulation time. The core animation file references these segments:

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

Each segment file follows the standard structure but only contains data for its time range.

## Example

Here's a complete example of a statistics file with time series data for an activity's queue length:

```json
{
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
  },
  "summary": {
    "mean": 3.2,
    "min": 0,
    "max": 8,
    "standardDeviation": 2.1,
    "final": 0
  },
  "timeSeries": {
    "times": [0, 60, 120, 180, 240, 300, 360, 420, 480],
    "values": [0, 2, 5, 8, 6, 4, 3, 1, 0],
    "interpolation": "linear"
  }
}
```

This example shows queue length data for a registration activity in a hospital process simulation, with both summary statistics and time series data in the same file.
