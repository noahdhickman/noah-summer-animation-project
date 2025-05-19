# Multi-Replication Animation File Structure

This document describes the structure for supporting multiple simulation replications in the Quodsim 2D Animation system. This approach efficiently manages animation data for simulation studies involving multiple replications of the same model.

## Overview

The multi-replication file structure separates static model data (shared across all replications) from dynamic replication-specific data. This approach:

1. Reduces redundancy by storing static data once
2. Improves scalability for handling many replications
3. Establishes clear separation between static model data and dynamic replication data

## Directory Structure

A typical multi-replication animation output has this structure:

```
simulation_output_study/                 # Root folder for simulation study
├── model_layout.json                    # SHARED: Static model components
├── shared_visual_config.json            # SHARED: Common visualization settings
├── diagram.svg                          # SHARED: Background diagram
└── replications/                        # Folder containing all replication data
    ├── rep_001/
    │   ├── animation_manifest_rep_001.json  # Replication manifest
    │   ├── entity_paths/                    # Dynamic data
    │   │   └── batch_000_rep001.json        # Entity paths (with rep ID)
    │   │   └── ...
    │   └── statistics/                      # Dynamic data
    │       └── activity_act1_queueLength_rep001.json
    │       └── ...
    ├── rep_002/
    │   ├── animation_manifest_rep_002.json
    │   ├── entity_paths/
    │   │   └── batch_000_rep002.json
    │   └── statistics/
    │       └── activity_act1_queueLength_rep002.json
    └── ...
```

## Shared Static Files

### model_layout.json

Contains the static model component definitions that remain constant across all replications:

```json
{
  "formatVersion": "1.1",
  "simulationId": "unique_simulation_study_id",
  "model": {
    "activities": [ ... ],
    "resources": [ ... ],
    "generators": [ ... ],
    "connectors": [ ... ]
  }
}
```

This file contains the same information as the `model` section in the standard `core_animation.json` file, but is separated for reuse across replications.

### shared_visual_config.json

Contains visualization settings shared across all replications:

```json
{
  "formatVersion": "1.1",
  "simulationId": "unique_simulation_study_id",
  "visualization": {
    "canvasSize": { "width": 1600, "height": 900 },
    "spriteAtlas": { ... },
    "entityTypes": { ... },
    "defaultStyles": { ... },
    "animation": { ... },
    "camera": { ... }
  }
}
```

This file contains the same information as the `visualization` section in the standard `core_animation.json` file.

### diagram.svg

The single, shared SVG file used as the visual background for all replications' animations.

## Replication-Specific Files

### animation_manifest_rep_NNN.json

A lightweight manifest file for each replication that serves as the entry point for that replication's animation:

```json
{
  "metadata": {
    "formatVersion": "1.1",
    "simulationId": "unique_simulation_study_id",
    "replication": 1,
    "name": "Simulation Name - Replication 1",
    "description": "Animation data for replication 1",
    "createdAt": "2025-05-17T18:30:00Z",
    "duration": 1440.0,
    "timeUnit": "MINUTES",
    "modelLayoutPath": "../../model_layout.json",
    "sharedVisualConfigPath": "../../shared_visual_config.json",
    "backgroundSvgPath": "../../diagram.svg"
  },
  "entityPathDataFiles": [
    {
      "filePath": "entity_paths/batch_000_rep001.json",
      "entryTimeStart": 0.0,
      "entryTimeEnd": 60.0,
      "entityCount": 253
    },
    // More batch files...
  ],
  "statisticsDataFiles": [
    {
      "type": "activity_metric",
      "componentId": "act1",
      "metricName": "queueLength",
      "filePath": "statistics/activity_act1_queueLength_rep001.json",
      "timeStart": 0.0,
      "timeEnd": 1440.0
    },
    // More statistics files...
  ]
}
```

The key differences from `core_animation.json`:

1. **No model or visualization sections**
   - Instead, it references shared files through relative paths
2. **Added path references in metadata**
   - `modelLayoutPath`: Points to the shared model layout file
   - `sharedVisualConfigPath`: Points to the shared visualization config file
   - `backgroundSvgPath`: Points to the shared diagram file
3. **Replication-specific file paths**
   - All paths to entity data and statistics include the replication number

### Entity Path and Statistics Files

These follow the same format as in single-replication mode, but with naming conventions that include the replication number:

- Entity path files: `batch_NNN_repMMM.json`
- Statistics files: `activity_XXX_metric_repMMM.json`

## Loading Sequence for Animation Engine

When using the multi-replication format, the animation engine should:

1. Display a list of available replications
2. When a replication is selected, load its manifest file (`animation_manifest_rep_NNN.json`)
3. From the manifest, load the shared static files:
   - `model_layout.json`
   - `shared_visual_config.json`
   - `diagram.svg`
4. Load the replication-specific entity path and statistics files referenced in the manifest
5. Begin animation playback

## Differences from Single-Replication Format

| Feature | Single-Replication | Multi-Replication |
|---------|-------------------|-------------------|
| Main Manifest | core_animation.json | animation_manifest_rep_NNN.json |
| Model Data | Included in main manifest | In shared model_layout.json |
| Visualization | Included in main manifest | In shared_visual_config.json |
| File Organization | Flat structure | Hierarchy with shared files and replication folders |
| File Naming | No replication suffix | Includes replication number in filenames |

## Benefits

1. **Reduced Storage Requirements**
   - Static data stored once, not duplicated for each replication
   - Significant savings for studies with many replications

2. **Improved Loading Performance**
   - Shared data loaded once and reused
   - Faster switching between replications

3. **Simplified Management**
   - Clear separation between static and dynamic data
   - Easier updating of shared components

4. **Better Scalability**
   - Support for many replications with minimal overhead
   - Efficient organization for large simulation studies