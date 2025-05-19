# Sprite Specifications

This document details the format specifications for sprites in the Quodsim 2D animation system, focusing on the `spriteAtlas` and `entityTypes` properties in the `visualization` section of `core_animation.json`.

## Overview

Sprites are 2D images used to visually represent entities and components during animation. The sprite specification defines:

- Sprite atlas for efficiently storing multiple images
- Entity sprite appearance for different states
- Mappings between entity states and visual representations

## Sprite Atlas in Core Animation File

The core animation file defines a sprite atlas in the `visualization` section:

```json
"visualization": {
  "spriteAtlas": {
    "url": "sprites/hospital_sprites.json", // Path to the sprite atlas JSON
    "texture": "sprites/hospital_sprites.png" // Path to the sprite sheet image
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | string | Yes | Path to the sprite atlas definition (e.g., TexturePacker JSON) |
| `texture` | string | Yes | Path to the corresponding sprite sheet image |

### Atlas JSON Format

The atlas JSON file defines the regions of the texture image. Common formats include:

- TexturePacker JSON format
- Phaser/PixiJS Atlas format
- Custom atlas formats specific to the chosen game engine

## Entity Types in Core Animation File

The `entityTypes` object in the core animation file defines visual representations for different entity types:

```json
"visualization": {
  "entityTypes": {
    "Patient": {
      "defaultSprite": "patient_male_adult",
      "scale": 0.8,
      "stateSprites": {
        "waiting": "patient_sitting",
        "processing": "patient_treatment",
        "traveling": "patient_walking"
      }
    },
    "Nurse": {
      "defaultSprite": "nurse",
      "scale": 0.9,
      "stateSprites": {
        "idle": "nurse_idle",
        "busy": "nurse_working"
      }
    }
  }
}
```

Each entity type definition can include:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `defaultSprite` | string | Yes | The default sprite key to use from the sprite atlas |
| `scale` | number | No | Scale factor for the entity sprites (default: 1.0) |
| `stateSprites` | object | No | Mapping of entity states to sprite keys |

### State Sprites

The `stateSprites` object maps entity states to different sprite keys:

```json
"stateSprites": {
  "waiting": "patient_sitting",
  "processing": "patient_treatment",
  "traveling": "patient_walking"
}
```

This allows entities to change appearance based on their current state as defined in the entity path data.

Common entity states include:

| State | Description | Typical Visual Representation |
|-------|-------------|------------------------------|
| `waiting` | Entity waiting in a queue | Sitting or stationary pose |
| `processing` | Entity being processed by an activity | Activity-specific pose |
| `traveling` | Entity moving between components | Walking or movement animation |
| `blocked` | Entity unable to proceed | Frustrated or waiting pose |
| `exited` | Entity has left the system | Exit animation or invisible |

## Example Usage in Entity Paths

Entity path data (either in the `entities` section or in external entity path files) refers to these states:

```json
"entity-001": {
  "type": "Patient", // References the "Patient" key in entityTypes
  "path": [
    {
      "clock": 10.5,
      "x": 50,
      "y": 200,
      "event": "EMA",
      "state": "created", // Entity state - mapped to sprite
      "componentId": "gen1"
    },
    {
      "clock": 10.8,
      "x": 70,
      "y": 200,
      "event": "ARQ",
      "state": "waiting", // Maps to "patient_sitting" sprite
      "componentId": "act1"
    }
    // More path points...
  ]
}
```

The animation engine will use the `state` property to determine which sprite to display at each point in the entity's path.

## Extended Sprite Configuration

While the core animation file supports the basic sprite settings described above, animation engines may offer extended sprite configurations through additional visualization files referenced in the `references` section:

```json
"references": {
  "visualizationFiles": [
    {
      "type": "display",
      "path": "visualization/display_config.json"
    }
  ]
}
```

These external visualization files can provide more advanced sprite options like:

- Animated sprite sequences
- Sprite transformations
- Special effects
- Text labels
- Dynamic sprite selection based on entity attributes

The specific format for these extended configurations is detailed in separate documentation for the animation engine implementation.

## Example

Here's a complete example of sprite configuration in the core animation file:

```json
"visualization": {
  "spriteAtlas": {
    "url": "sprites/hospital_sprites.json",
    "texture": "sprites/hospital_sprites.png"
  },
  "entityTypes": {
    "Patient": {
      "defaultSprite": "patient_neutral",
      "scale": 0.8,
      "stateSprites": {
        "waiting": "patient_sitting",
        "processing": "patient_treatment",
        "traveling": "patient_walking",
        "blocked": "patient_frustrated",
        "exited": null
      }
    },
    "Nurse": {
      "defaultSprite": "nurse_female",
      "scale": 0.9,
      "stateSprites": {
        "idle": "nurse_standing",
        "busy": "nurse_working",
        "walking": "nurse_walking"
      }
    },
    "Doctor": {
      "defaultSprite": "doctor_male",
      "scale": 0.9,
      "stateSprites": {
        "idle": "doctor_standing",
        "busy": "doctor_examining",
        "walking": "doctor_walking"
      }
    }
  }
}
```

This configuration defines sprites for three entity types (Patient, Nurse, and Doctor), each with different sprites for various states.
