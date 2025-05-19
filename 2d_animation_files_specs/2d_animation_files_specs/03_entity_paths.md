# Entity Paths

This document details the format specifications for **external entity path files**. These files are referenced from the main `core_animation_file.json` (via the `entityPathDataFiles` array) and define how individual entities move through the simulation model over time. Each file typically contains a batch of entities, often grouped by their entry time into the simulation.

> **Note:** For multi-replication support, entity path files follow the same format but are stored in replication-specific directories with filenames that include the replication number. See [Multi-Replication Structure](./01b_multi_replication_structure.md) for details.

## Path File Structure

Each external entity path file (e.g., `paths_t0_t60.json`) is a JSON object. The keys of this object are unique entity IDs. The value for each entity ID is an object containing the entity's `type` and its chronological `path` (an array of path points).

Example content of an entity path file (e.g., `entity_paths/batch_001.json`):

```json
{
  "entity-001": {
    "type": "Patient", // Links to visualization.entityTypes in core_animation_file.json
    "path": [
      {
        "clock": 0.5,
        "x": 50,
        "y": 250,
        "event": "EMA", // Entity Model Arrival
        "state": "arrived",
        "componentId": "gen_patient_arrival" // ID of the generator
      },
      {
        "clock": 0.8,
        "x": 145,
        "y": 250,
        "event": "TRV", // Traveling
        "state": "traveling",
        "componentId": "conn_entry_to_reg" // ID of the connector being traversed
      },
      {
        "clock": 1.2,
        "x": 150,  // Arrived at input buffer of act1
        "y": 230,  // Example: y-offset if queueing visually
        "event": "ARQ", // Activity Request (arrived at activity/input buffer)
        "state": "waiting",
        "componentId": "act1"
      }
      // ... more path points for entity-001
    ]
  },
  "entity-002": {
    "type": "Patient",
    "path": [
      // ... path points for entity-002
    ]
  }
  // ... more entities that entered within the time window for this batch file
}
```

Each entity within a batch file has:
- A unique ID as the key (e.g., "entity-001")
- A type identifier (e.g., "Patient"), which maps to a definition in the `visualization.entityTypes` section of the main core_animation_file.json. This determines the entity's visual appearance (sprite, scale, etc.)
- An array of path points, ordered chronologically, defining its movement and state changes

## Path Points

Each path point object in the path array represents a significant moment or state change in the entity's journey:

```json
{
  "clock": 12.5,          // Simulation time of this event/state.
  "x": 160,               // X-coordinate position of the entity at this point.
  "y": 255,               // Y-coordinate position of the entity at this point.
  "event": "ASP",         // Event code (e.g., Activity Start Processing). See Event Codes below.
  "state": "processing",  // Entity's state (e.g., "idle", "traveling", "waiting", "processing", "blocked", "exited").
  "componentId": "act1",  // ID of the primary component associated with this event/state.
  "attributes": {         // Optional: Key-value pairs of entity attributes at this time.
    "priority": 1,
    "dueDate": "2025-05-16T19:00:00Z"
  }
}
```

### Path Point Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `clock` | number | Yes | Simulation time at which this point in the path occurs. Must be in the timeUnit specified in metadata. |
| `x` | number | Yes | X-coordinate position of the entity. This allows for smooth animation between component locations and visualization of queues. |
| `y` | number | Yes | Y-coordinate position of the entity. |
| `event` | string | No | Short code representing the simulation event that led to this path point (e.g., "EMA", "ASP", "AEP"). Useful for debugging or advanced event-specific visuals. |
| `state` | string | Yes | The entity's logical or visual state at this point (e.g., "traveling", "waiting", "processing", "blocked", "exited"). This state can be used by the animation engine to change the entity's sprite or appearance. |
| `componentId` | string | No | The ID of the model component (Activity, Resource, Generator, Connector) the entity is interacting with or located at. Can be null if the entity is, for example, just exiting the model not from a specific component. |
| `attributes` | object | No | An optional key-value map of entity attributes relevant at this point in time. Values can be strings, numbers, or booleans. |

## Entity States

Common entity states include:

| State | Description | Visual Implication |
|-------|-------------|-------------------|
| `arrived` | Entity has just arrived in the model | Default entity appearance |
| `traveling` | Entity is moving between components | May show movement animation |
| `waiting` | Entity is in a queue or waiting for a resource/activity | May show waiting pose/animation |
| `processing` | Entity is undergoing an operation at an activity or with a resource | May show processing animation |
| `blocked` | Entity is unable to move to its next location (e.g., output buffer full) | May show waiting pose |
| `exited` | Entity has left the model | Entity removed from view |

Custom states can also be defined and used if the animation engine is configured to understand them (e.g., via `visualization.entityTypes[type].stateSprites`).

## Event Codes

These are typically short strings derived from the simulation engine's event types:

| Event Code | Description | Component Type | Notes |
|------------|-------------|----------------|-------|
| `EMA` | Entity Model Arrival | Generator | Entity creation |
| `EMS` | Entity Model Start | Generator | First movement from generator |
| `TRV` | Traveling | Connector | Generic travel event |
| `ARQ` | Activity Request | Activity | Arrival at activity queue |
| `ACQ` | Activity Capture | Activity | Seized activity unit |
| `ASP` | Activity Start Processing | Activity | Processing begins |
| `AEP` | Activity End Processing | Activity | Processing completes |
| `ARL` | Activity Release | Activity | Entity leaves activity |
| `RRQ` | Resource Request | Resource | Entity requests resource |
| `RCQ` | Resource Capture | Resource | Resource allocated to entity |
| `RRL` | Resource Release | Resource | Entity releases resource |
| `EME` | Entity Model Exit | N/A | Entity leaves the system |

The exact list of event codes can be specific to the simulation engine. They are primarily for detailed animation logic or debugging rather than direct display. The `state` field is more commonly used for visual changes.

## Time Mapping

Path points are ordered chronologically by the `clock` property, which maps to simulation time. The animation engine uses these timestamps to:

1. Correctly time the display of entities
2. Interpolate positions between path points for smooth animation
3. Synchronize entity movements with statistics and other time-based elements

## Position Specifications

Entity positions are specified using absolute coordinates:

```json
{
  "clock": 12.5,
  "x": 160,
  "y": 255,
  // Other properties...
}
```

The animation engine interpolates positions between consecutive path points for smooth movement. For example, if an entity moves from (160, 255) at time 12.5 to (200, 255) at time 15.0, the animation engine will calculate intermediate positions for each frame.

## Example Entity Path File

Here's a complete example of an entity path file with multiple entities:

```json
{
  "entity-001": {
    "type": "Patient",
    "path": [
      {
        "clock": 0.5,
        "x": 50,
        "y": 250,
        "event": "EMA",
        "state": "arrived",
        "componentId": "gen_patient_arrival"
      },
      {
        "clock": 0.8,
        "x": 145,
        "y": 250,
        "event": "TRV",
        "state": "traveling",
        "componentId": "conn_entry_to_reg"
      },
      {
        "clock": 1.2,
        "x": 150,
        "y": 230,
        "event": "ARQ",
        "state": "waiting",
        "componentId": "act_registration"
      },
      {
        "clock": 5.5,
        "x": 160,
        "y": 250,
        "event": "ASP",
        "state": "processing",
        "componentId": "act_registration"
      },
      {
        "clock": 8.7,
        "x": 160,
        "y": 250,
        "event": "AEP",
        "state": "processing",
        "componentId": "act_registration"
      },
      {
        "clock": 8.8,
        "x": 170,
        "y": 250,
        "event": "ARL",
        "state": "traveling",
        "componentId": "act_registration"
      },
      {
        "clock": 9.2,
        "x": 220,
        "y": 250,
        "event": "TRV",
        "state": "traveling",
        "componentId": "conn_reg_to_triage"
      },
      {
        "clock": 9.5,
        "x": 250,
        "y": 250,
        "event": "ARQ",
        "state": "waiting",
        "componentId": "act_triage"
      }
    ]
  },
  "entity-002": {
    "type": "Patient",
    "path": [
      {
        "clock": 2.5,
        "x": 50,
        "y": 250,
        "event": "EMA",
        "state": "arrived",
        "componentId": "gen_patient_arrival"
      },
      {
        "clock": 2.8,
        "x": 145,
        "y": 250,
        "event": "TRV",
        "state": "traveling",
        "componentId": "conn_entry_to_reg"
      },
      {
        "clock": 3.2,
        "x": 150,
        "y": 235,
        "event": "ARQ",
        "state": "waiting",
        "componentId": "act_registration"
      }
    ]
  }
}
```

This example shows patient entities moving through a hospital model: they arrive at a generator, travel to registration, get processed, and then move on to triage. The path points capture key moments and state changes in each entity's journey through the system.

# Multi-Replication Support

For the multi-replication format, the structure of entity path files remains the same, but:

1. Files are stored in replication-specific directories:
   ```
   replications/rep_NNN/entity_paths/
   ```

2. Filenames include the replication number:
   ```
   batch_000_repNNN.json
   ```

3. References in the replication manifests use relative paths from the manifest location:
   ```json
   "entityPathDataFiles": [
     {
       "filePath": "entity_paths/batch_000_rep001.json",
       "entryTimeStart": 0.0,
       "entryTimeEnd": 60.0,
       "entityCount": 253
     }
   ]
   ```

See [Multi-Replication Structure](./01b_multi_replication_structure.md) for more details on the overall file organization.
