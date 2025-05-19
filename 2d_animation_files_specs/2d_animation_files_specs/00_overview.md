# Quodsi 2D Animation System: Overview and Data Pipeline

**Last Updated:** May 18, 2025

## 1. Introduction

The Quodsi 2D Animation System provides a web-based visualization of discrete event simulations built using Quodsi's modeling capabilities within diagramming tools like LucidChart or Miro. It aims to offer a clear, dynamic replay of entity movements, component state changes, and overall system behavior based on the simulation results.

This document outlines the architecture of the animation system, the data flow from simulation model definition to animated replay, and how the Quodsi simulation engine generates the necessary data.

## 2. System Architecture & Data Flow

The animation system comprises several key stages and data artifacts:

```mermaid
graph TD
    A[1. Diagramming Tool (LucidChart/Miro) <br/> User defines visual model with Quodsi properties] --> B{2. "Simulate" Action};
    B --> C[3. Model Export <br/> `model.json` (definitions, x/y coords) <br/> `diagram.svg` (visual layout)];
    C --> D[4. Quodsi Simulation Engine (Python) <br/> - Loads `model.json` into `ModelDefinition` <br/> - Runs Discrete Event Simulation];
    D --> E[5. Raw Simulation Output <br/> `rep_1_events.csv` (detailed event log)];
    subgraph F[6. Output Product Generation (Python Backend)]
        direction LR
        C --> F1[`model.json` (for layout & static data)];
        E --> F2[`rep_1_events.csv` (for dynamics)];
        F1 --> G{Processes Data};
        F2 --> G;
        G --> H1[`core_animation.json` (main manifest)];
        G --> H2[`entity_paths/batch_NNN.json` (entity movement data)];
        G --> H3[`statistics_XYZ.json` (simulation statistics)];
    end
    H1 --> I[7. Web-Based Animation Engine <br/> (React, Phaser/ExcaliburJS)];
    H2 --> I;
    H3 --> I;
    subgraph J[User Interaction]
        direction LR
        K[User selects output folder] --> I;
    end
    C -- `diagram.svg` directly to --> I;
```

### Data Flow Explained:

1. **Model Creation (Diagramming Tool)**: 
   - The user constructs a process model in a tool like LucidChart, using standard shapes and connectors.
   - Quodsi extensions allow the user to assign simulation properties (e.g., activity capacity, processing times, resource requirements, generator inter-arrival times) to these visual elements.

2. **Initiate Simulation**: 
   - The user triggers the "Simulate" action within the diagramming tool.

3. **Model Export**:
   - **model.json**: The Quodsi extension exports the simulation model definition. This crucial file contains:
     - Definitions for all simulation components (entities, activities, resources, generators, connectors) including their parameters (capacities, timings, logic).
     - Key Visual Data: id, name, x, y coordinates, and often width and height for each component, as positioned by the user on the diagram.
   - **diagram.svg**: An SVG representation of the diagram page is exported, providing the visual backdrop for the animation.

4. **Quodsi Simulation Engine (Python)**:
   - The backend Python engine receives or loads the model.json.
   - It deserializes model.json into its internal ModelDefinition structure (composed of ActivityDef, ResourceDef, GeneratorDef, EntityDef, ConnectorDef dataclasses, as detailed in quodsim/model_definition/README.md).
   - The engine then runs the discrete event simulation using these definitions, leveraging libraries like SimPy for event scheduling and component interaction.

5. **Raw Simulation Output**:
   - **rep_1_events.csv** (or similar): During the simulation, the engine logs detailed events. Each row in this CSV typically includes:
     - ent_type, ent_id (Entity Type and ID)
     - act_id, res_id, cnt_id, op_id (Component IDs)
     - event_type (e.g., "EMA" - Entity Model Arrival, "ASP" - Activity Start Processing)
     - value (event-specific data)
     - rep (replication number)
     - clock (simulation timestamp of the event)
   - This raw log is the ground truth for all dynamic behavior in the simulation.

6. **Output Product Generation (Python Backend)**:
   - A dedicated "Output Product Manager" component (part of the Quodsi Python backend) processes both the static model.json and the dynamic rep_1_events.csv.
   - Its primary role is to transform this raw data into the structured JSON files required by the 2D animation engine:
     - **Single-Replication Format**:
       - **core_animation.json**: The main manifest file.
         - Includes metadata about the simulation.
         - Copies the model component definitions from model.json (activities, resources, etc., with their x, y, width, height).
         - Contains entityPathDataFiles which lists references to external files containing batched entity path data. Each reference includes the file path and the entry time window (entryTimeStart, entryTimeEnd) for the entities in that batch.
         - Specifies visualization settings (background SVG path, sprite atlases, entity type definitions).
         - References statisticsFiles.
       - **entity_paths/batch_NNN.json**: One or more JSON files, each containing detailed animation paths for a batch of entities.
       - **statistics_XYZ.json**: Files containing aggregated statistics.
     - **Multi-Replication Format**:
       - **model_layout.json**: Shared static model component definitions.
       - **shared_visual_config.json**: Shared visualization settings.
       - **replications/rep_NNN/animation_manifest_rep_NNN.json**: Per-replication manifests that reference shared files and replication-specific data.
       - **replications/rep_NNN/entity_paths/batch_MMM_repNNN.json**: Replication-specific entity path data.
       - **replications/rep_NNN/statistics/stat_XXX_repNNN.json**: Replication-specific statistics.

7. **Web-Based Animation Engine**:
   - The interns' project: a React application using Phaser or ExcaliburJS.
   - The user selects a folder containing the simulation output.
   - For single-replication format:
     - The engine loads diagram.svg as the visual background.
     - It parses core_animation.json for model layout, entity path file references, and visual styles.
     - It loads entity_paths/batch_NNN.json files and statistics files as referenced.
   - For multi-replication format:
     - The engine displays available replications (from the replications/ folder).
     - When a replication is selected, it loads the replication's manifest file.
     - From the manifest, it loads shared static files (model_layout.json, shared_visual_config.json, diagram.svg).
     - It then loads the replication-specific entity path and statistics files.
   - For entity animation:
     - Instantiate a sprite based on its type and visualization settings.
     - Iterate through its path points.
     - At each clock time, update the sprite's x, y position.
     - Change the sprite's appearance based on the state (using stateSprites).
     - Animate movement between path points for visual smoothness.
   - It can also display statistics by loading the statistics files.
   - Handles user interaction (play, pause, speed control, zoom/pan).

## 3. Simulation Engine Support for Animation Data

The Quodsi Python simulation engine (quodsim.py and related modules) is designed to produce the necessary data for this animation pipeline. Key aspects include:

### 3.1. Model Definition (model_definition module)

- The ModelDefinition class and its constituent *Def classes (e.g., ActivityDef, ResourceDef, GeneratorDef, EntityDef, ConnectorDef) are directly populated from the model.json file exported by LucidChart.
- These *Def classes store the static configuration of the simulation model, including:
  - Component IDs (unique_id from DefItem base class).
  - Names, capacities, processing times/distributions, connector logic (probabilities, conditions).
  - Crucially, the model.json (and thus potentially accessible during ModelDefinition hydration if needed, though primarily used by the Output Product Manager) contains the x, y, width, height visual properties from the diagramming tool. This ensures that the semantic simulation components can be mapped back to their visual representations.

### 3.2. Simulation Runtime (runtime module & SingleReplicationModel)

- During a simulation run (SingleReplicationModel.run()), the engine uses the ModelDefinition to create runtime instances of components (e.g., Activity, Resource, Entity).
- **Event Logging**: The engine uses a SimEventStore to capture significant events as they occur. Each SimEvent object stores:
  - clock: The simulation time.
  - event_type: A SimEventType enum (e.g., ENTITY_MODEL_ARRIVAL, ACTIVITY_START_PROCESSING, RESOURCE_CAPTURE).
  - item_id, item_name, item_type: Details of the primary simulation component involved.
  - related_item_id, related_item_name, related_item_type: Details of a related component (e.g., the entity for an activity event).
  - value_1, value_2, notes: Event-specific data.
- This SimEventStore is the source for generating the rep_1_events.csv file. The CSV format provided (ent_type, ent_id, act_id, cnt_id, op_id, res_id, event_type, value, rep, clock) is a processed/flattened version of these SimEvent objects.

### 3.3. AnimationFileGenerator

The AnimationFileGenerator class processes simulation results into animation files as part of the Quodsim ecosystem. This processing step is critical and involves:

1. **Reading model.json**: To get the static definitions of all model components, including their id, name, type, and crucially their x, y, width, height from the original diagram. This data populates the model section of core_animation.json. The existing code base has some valuable clases that can be leveraged:

The AnimationFileGenerator leverages existing components like:

- **LucidModelDefinitionJsonReader**: For loading model definitions from JSON files
- **ModelDefinition**: For accessing model component properties
- **SimEventStore**: For accessing raw simulation events directly

2. **Processing SimEventStore data**: This provides the raw chronological data of everything that happened during the simulation, and the AnimationFileGenerator parses this into entity paths and statistics.

3. **Constructing Entity Paths**:
   - Iterate through events, grouping them by ent_id.  (Maybe SimEventStore can be enhanced to support this.)
   - For each entity, reconstruct its journey through the system event by event. Maybe a dedicated dataclass that takes the SimEvent list of a specific entity and processes them as needed.

4. **Generating x, y for Path Points**:
   - When an entity arrives at or interacts with a component (e.g., act_id in an event), its x,y position can be initially set to the known coordinates of that component (from instance of ModelDefinition from model.json).
   - For depicting queues at an activity, the inputBuffer properties (like x, y, direction, spacing from 02_model_components.md) specified in model.json (and passed to core_animation.json) can be used to calculate distinct x,y positions for entities waiting in the queue. The Output Product Manager would need to maintain a count of entities in a queue at any given time (derivable from arrival/departure events) to place a new arrival at the correct visual slot.
   - For movement along connectors (TRV events), the path points can interpolate between the source component's exit point and the target component's entry point. If connectors have defined pathPoints (as per 02_model_components.md, sourced from model.json if LucidChart provides this for lines), those explicit points should be used. Otherwise, a straight line is assumed. The x,y in the entity path point would reflect intermediate positions along this trajectory at specific clock times.
   - Map raw simulation event_type codes to the animation's event codes and determine the entity's state based on the event type and context (e.g., after "ASP", state is "processing").

5. **Package these paths** into the entity_paths/batch_NNN.json files, batching by entity entry time.

6. **Generating core_animation.json**: Populate metadata, model component data (from model.json), references to the batched entity path files, and visualization settings.

7. **Generating Statistics Files**: Aggregate event data to produce utilization, throughput, queue length statistics, etc., formatted as per the statistics file specifications.

### 3.4. Key Data Points from Simulation Engine for Animation:

To support the animation file formats, the simulation engine and subsequent output processing must provide:

**From model.json** (via LucidChart export):
- Unique IDs for all components.
- Types and names of components.
- x, y coordinates for all components (generators, activities, resources).
- width, height for activities (and potentially other components if relevant for visuals).
- Specific visual properties for input/output buffers of activities if detailed queueing is desired (e.g., buffer anchor points, direction, visual capacity/spacing).
- Path/waypoint data for connectors if they are not simple straight lines (LucidChart lines can have multiple segments).

**From Simulation Run** (event log):
- Entity unique ID (ent_id).
- Entity type (ent_type linking to visualization.entityTypes).
- Timestamp (clock) for every significant event in an entity's lifecycle.
- The event_type code for each event.
- The ID of the component(s) the entity is interacting with (act_id, res_id, gen_id, cnt_id).
- Relevant entity attributes (attributes) at different points if they affect visualization or logic.

## 4. Animation Engine (Interns' Project)

The web-based animation engine will:

- Allow the user to select a folder containing the simulation output.
- Load and render diagram.svg as the static background.
- Parse core_animation.json for model layout, entity path file references, and visual styles.
- Load entity_paths/batch_NNN.json files (potentially incrementally based on entryTimeStart and current animation clock).
- For each entity:
  - Instantiate a sprite based on its type and visualization.entityTypes.
  - Iterate through its path points.
  - At each clock time, update the sprite's x, y position.
  - Change the sprite's appearance based on the state (using stateSprites).
  - Animate movement between path points for visual smoothness.
- Display statistics from loaded statistics files.
- Handle user interaction (play, pause, speed control, zoom/pan).

## 5. Conclusion

The Quodsi 2D animation system is designed with a clear data pipeline, where structured JSON files serve as the interface between the Python simulation backend and the TypeScript/JavaScript animation frontend. 

The system supports two file formats:

1. **Single-Replication Format**: A self-contained structure with all data in one directory, suitable for visualizing individual simulation runs.

2. **Multi-Replication Format**: An efficient structure that separates shared static data from replication-specific dynamic data, ideal for simulation studies with multiple replications.

The simulation engine generates the detailed event logs necessary, and the AnimationFileGenerator transforms this raw data, along with the visual layout from model.json, into a rich, replayable animation dataset. This architecture supports accurate and detailed visualization of complex simulation models with efficient handling of multiple replications.
