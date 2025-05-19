# Core Animation File Structure

The core animation file is the primary manifest in the single-replication format of the Quodsim 2D animation system. It contains the essential model structure, entity paths or references to entity path data, and basic visual configuration necessary for animation playback.

> **Note:** For multi-replication support, see [Multi-Replication Structure](./01b_multi_replication_structure.md).

## File Format

The core animation file uses JSON format with the following high-level structure:

```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "string",
    "name": "string",
    "description": "string",
    "createdAt": "ISO-8601 date string",
    "duration": "number",
    "timeUnit": "string",
    "replication": "number"
  },
  "model": {
    "activities": [],
    "resources": [],
    "generators": [],
    "connectors": []
  },
  "entityPathDataFiles": [
    {
      "filePath": "string",
      "entryTimeStart": "number",
      "entryTimeEnd": "number",
      "entityCount": "number"
    }
  ],
  "statisticsDataFiles": [
    {
      "type": "string",
      "componentId": "string",
      "metricName": "string",
      "filePath": "string",
      "timeStart": "number",
      "timeEnd": "number"
    }
  ],
  "visualization": {
    "backgroundMode": "string",
    "spriteAtlas": {},
    "entityTypes": {}
  },
  "references": {
    "visualizationFiles": []
  }
}
```

## Sections

### Metadata

The `metadata` section contains general information about the simulation:

```json
"metadata": {
  "formatVersion": "1.0",
  "simulationId": "hospital_er_flow_20250516_rep1",
  "name": "Hospital ER Flow - Replication 1",
  "description": "Animation data for a single replication of the Hospital ER flow model.",
  "createdAt": "2025-05-16T18:30:00Z",
  "duration": 1440.0,
  "timeUnit": "MINUTES",
  "replication": 1
}
```

Fields:
- `formatVersion` (string, required): Version of the animation file format
- `simulationId` (string, required): Unique identifier for the simulation run
- `name` (string, optional): Human-readable name of the simulation
- `description` (string, optional): Brief description of the simulation
- `createdAt` (string, optional): ISO-8601 timestamp when the animation file was created
- `duration` (number, optional): Duration of the simulation in simulation time units
- `timeUnit` (string, optional): Unit of time used in the simulation (e.g., "SECONDS", "MINUTES", "HOURS", "DAYS"). Defaults to "MINUTES" if not specified.
- `replication` (number, optional): If the simulation involved multiple replications, this indicates the replication number this file pertains to

### Model

The `model` section contains definitions for simulation components with their positions and properties:

```json
"model": {
  "activities": [
    {
      "id": "act1",
      "name": "Register",
      "type": "Activity",
      "x": 100,
      "y": 200,
      "width": 80,
      "height": 60,
      "capacity": 2,
      "inputBuffer": {
        "x": 70,
        "y": 200,
        "capacity": 10
      },
      "outputBuffer": {
        "x": 130,
        "y": 200,
        "capacity": 10
      }
    }
    // More activities...
  ],
  "resources": [
    {
      "id": "res1",
      "name": "Pharmacist",
      "type": "Resource",
      "x": 300,
      "y": 50,
      "capacity": 3
    }
    // More resources...
  ],
  "generators": [
    {
      "id": "gen1",
      "name": "Customer Arrivals",
      "type": "Generator",
      "x": 50,
      "y": 200,
      "entityType": "Customer"
    }
    // More generators...
  ],
  "connectors": [
    {
      "id": "conn1",
      "name": "Register to Processing",
      "type": "Connector",
      "sourceId": "act1",
      "targetId": "act2",
      "x": 200,
      "y": 200,
      "sourceX": 130,
      "sourceY": 200,
      "targetX": 270,
      "targetY": 200
    }
    // More connectors...
  ]
}
```

Each component contains its unique ID, name, type, and position coordinates (x, y). For detailed specifications of model components, see [Model Components](./02_model_components.md).

### Entity Path Data Files

The `entityPathDataFiles` section references external files containing entity path data. This allows for efficient loading of large amounts of entity data by batching entities, typically by their entry time into the simulation model:

```json
"entityPathDataFiles": [
  {
    "filePath": "entity_paths/paths_t0_t60.json",
    "entryTimeStart": 0.0,
    "entryTimeEnd": 60.0,
    "entityCount": 753
  },
  {
    "filePath": "entity_paths/paths_t60_t120.json",
    "entryTimeStart": 60.0,
    "entryTimeEnd": 120.0,
    "entityCount": 812
  }
]
```

Fields for each object in the array:
- `filePath` (string, required): Relative path to the external JSON file containing entity path data
- `entryTimeStart` (number, required): The simulation clock time at or after which entities in the referenced file enter the model (inclusive)
- `entryTimeEnd` (number, required): The simulation clock time before which entities in the referenced file enter the model (exclusive)
- `entityCount` (number, optional): The number of entities whose paths are defined in the referenced file

For the structure of these external entity path files, see [Entity Paths](./03_entity_paths.md).

### Statistics Data Files

The `statisticsDataFiles` section references external files containing statistical data for model components and system-level metrics. Each file contains both summary statistics and time series data for a specific component-metric pair:

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
    "type": "resource_metric",
    "componentId": "res1", 
    "metricName": "utilization",
    "filePath": "statistics/res1_utilization.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  },
  {
    "type": "system_metric",
    "metricName": "totalQueueLength",
    "filePath": "statistics/system_total_queue_length.json",
    "timeStart": 0.0,
    "timeEnd": 480.0
  }
]
```

Fields for each object in the array:
- `type` (string, required): Type of statistic, one of: 
  - `activity_metric`: Metric for a specific activity
  - `resource_metric`: Metric for a specific resource
  - `generator_metric`: Metric for a specific generator
  - `connector_metric`: Metric for a specific connector
  - `entity_type_metric`: Metric for a specific entity type
  - `system_metric`: System-wide metric
- `componentId` (string, conditional): Required for component-specific metrics (activity, resource, generator, connector)
- `entityType` (string, conditional): Required for entity type metrics
- `metricName` (string, required): Name of the metric (e.g., "queueLength", "utilization")
- `filePath` (string, required): Relative path to the statistics data file
- `timeStart` (number, optional): Start time of the data in the file
- `timeEnd` (number, optional): End time of the data in the file

For larger simulations, time series data can be segmented across multiple files:

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
      }
    ]
  }
]
```

The structure of the statistics data files is detailed in the statistics documentation.

### Visualization

The `visualization` section contains basic configuration for the visual representation:

```json
"visualization": {
  "backgroundMode": "svg", // Can be "svg", "image", "color", "transparent", "rendered"
  "svgPath": "diagram_layout.svg", // Path to the diagram's SVG representation
  "backgroundImage": {
    "url": "process_diagram.png",
    "width": 1200,
    "height": 800
  },
  "spriteAtlas": {
    "url": "sprites/hospital_sprites.json", // Path to the sprite atlas JSON
    "texture": "sprites/hospital_sprites.png" // Path to the sprite sheet image
  },
  "entityTypes": {
    "Patient": {
      "defaultSprite": "patient_male_adult",
      "scale": 0.8,
      "stateSprites": {
        "waiting": "patient_sitting",
        "processing": "patient_treatment",
        "traveling": "patient_walking"
      }
    }
    // Other entity types...
  }
}
```

The `entityTypes` defined here provide the visual mappings for entity types specified in the entity paths or external entity path files.

For details on visual configuration, see [Visual Configuration](./04_visual_configuration.md).

### References

The `references` section contains links to related files:

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

This section allows the animation system to locate additional configuration files for loading.

## Minimal Example

A minimal valid core animation file must contain at least:

```json
{
  "metadata": {
    "formatVersion": "1.0",
    "simulationId": "minimal_sim_01"
  },
  "model": {
    "activities": [],
    "resources": [],
    "generators": [],
    "connectors": []
  }
}
```

Additional sections and fields enhance functionality but are technically optional. The file can use either the `entities` section for direct inclusion of entity paths or the `entityPathDataFiles` section for referencing external entity path data files. Using both is allowed but typically unnecessary.

## Relationship to Multi-Replication Format

In the [multi-replication format](./01b_multi_replication_structure.md) (v1.1), the content of this file is split into three separate files:

1. **model_layout.json**: Contains the model section
2. **shared_visual_config.json**: Contains the visualization section
3. **replications/rep_NNN/animation_manifest_rep_NNN.json**: Contains metadata and references to entity paths and statistics

This separation allows for more efficient handling of multiple replications by sharing static data across replications.