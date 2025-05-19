# Quodsi 2D Animation Mock Files

This directory contains mock files for the Quodsi 2D Animation Engine, demonstrating the multi-replication file structure and format.

## Overview

These files represent a Hospital Emergency Department simulation with:
- 2 replications
- 2 entity types (Patient_Type_A and Patient_Type_B)
- 1 simple entity path per type per replication
- Statistics for the Triage activity

## Directory Structure

```
mock_files/
├── model_layout.json             # Shared model components and layout
├── shared_visual_config.json     # Shared visualization settings
├── diagram.svg                   # Background SVG diagram
└── replications/                 # Contains all replication data
    ├── rep_001/                  # Replication 1 data
    │   ├── animation_manifest_rep_001.json    # Replication manifest
    │   ├── entity_paths/                      # Entity paths
    │   │   ├── batch_000_rep001.json          # Entity 1 path data
    │   │   └── batch_001_rep001.json          # Entity 2 path data
    │   └── statistics/                        # Statistics files
    │       └── activity_RpS8ImHeEGb~_processingCount_rep001.json
    └── rep_002/                  # Replication 2 data
        ├── animation_manifest_rep_002.json    # Replication manifest
        ├── entity_paths/                      # Entity paths
        │   ├── batch_000_rep002.json          # Entity 1 path data
        │   └── batch_001_rep002.json          # Entity 2 path data
        └── statistics/                        # Statistics files
            └── activity_RpS8ImHeEGb~_processingCount_rep002.json
```

## File Descriptions

### Shared Files

1. **model_layout.json**
   - Contains static model components (activities, resources, generators, connectors)
   - Includes positions, dimensions, and properties for all components
   - Shared across all replications

2. **shared_visual_config.json**
   - Contains visualization settings for the animation
   - Defines entity appearance, sprites, and default styles
   - Shared across all replications

3. **diagram.svg**
   - Background SVG diagram for the animation
   - Visual representation of the process flow

### Replication-Specific Files

1. **animation_manifest_rep_NNN.json**
   - Entry point for the replication's animation data
   - Links to shared files via relative paths
   - Contains references to replication-specific entity paths and statistics

2. **entity_paths/batch_XXX_repNNN.json**
   - Contains path data for one or more entities
   - Includes clock times, x/y coordinates, events, states, and component references
   - Entity states include: arrived, traveling, waiting, processing, blocked, exited

3. **statistics/activity_RpS8ImHeEGb~_processingCount_repNNN.json**
   - Contains time series data for Triage activity
   - Shows count of entities being processed over time
   - Includes summary statistics

## Entity Path Structure

Each entity path comprises a sequence of path points with:
- `clock`: Simulation clock time in minutes
- `x`, `y`: Coordinates for rendering the entity
- `event`: Event code (EMA, TRV, ARQ, ASP, ARL, EME, etc.)
- `state`: Entity state (arrived, traveling, waiting, processing, blocked, exited)
- `componentId`: ID of the component the entity is interacting with

## Statistics Structure

Statistics files contain:
- Metadata about the component and metric
- Summary statistics (mean, min, max, etc.)
- Time series data with timestamps and values

## Loading Sequence for Animation Engine

1. Let the user select a replication (e.g., rep_001)
2. Load the replication's manifest (animation_manifest_rep_001.json)
3. From the manifest, load shared files:
   - model_layout.json
   - shared_visual_config.json
   - diagram.svg
4. Load the entity path batch files referenced in the manifest
5. Load the statistics files referenced in the manifest
6. Begin animation playback using the combined data

## Special Notes for Developers

- For this mock data, the entities follow simple paths:
  - Patient_Type_A typically goes through Main ED
  - Patient_Type_B may go through Low Acuity or Trauma
- Different entity states are represented to demonstrate state transitions
- "Blocked" state is used when an entity is in an output buffer
- Statistics data shows a simple time series for the Triage activity
- Coordinates are consistent with the model layout and will align with the SVG background
